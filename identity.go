package main

import (
	"encoding/hex"
	"encoding/json"
	"errors"
	"github.com/ethereum/go-ethereum/crypto"
	"golang.org/x/crypto/openpgp"
	"golang.org/x/crypto/openpgp/armor"
	"golang.org/x/crypto/openpgp/packet"
	"log"
	"math/rand"
	"net/http"
	"regexp"
	"strings"
	"time"
)

var emailExp = regexp.MustCompile(`<[[:graph:]]+>`)
var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

type Identity struct {
	Id               int64 `json:"id"`
	Created          *time.Time `json:"created"`
	PgpIpfsHash      string `json:"pgpIpfsHash"`
	Email            string `json:"email"`
	EthAddress       string `json:"ethereumAddress"`
	Verified         bool `json:"-"`
	VerificationHash string `json:"-"`
}

// Create an Identity from a request
func CreateIdentity(w http.ResponseWriter, r *http.Request) {
	ident := Identity{}
	err := parseIdentity(r, &ident)
	if err != nil {
		log.Printf(err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = storeIdentity(&ident)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(ident)
}

// Parse an Identity from an incoming request
func parseIdentity(r *http.Request, i *Identity) (error) {
	r.ParseMultipartForm(32 << 20)
	file, handler, err := r.FormFile("pgp")
	if err != nil {
		return err
	}

	defer file.Close()

	log.Printf("%v", handler.Header)

	// decode armor and check key type
	block, err := armor.Decode(file)
	if err != nil {
		return err
	}

	// Check that it's actually a public key
	if block.Type != openpgp.PublicKeyType {
		return errors.New("Pgp key was not valid")
	}

	reader := packet.NewReader(block.Body)
	entity, err := openpgp.ReadEntity(reader)
	if err != nil {
		return err
	}

	var email string
	for _, v := range entity.Identities {
		email = emailExp.FindString(v.Name)
		if len(email) > 2 {
			email = email[1:len(email)-1]
		}
	}

	if len(email) == 0 {
		return errors.New("Could not find email address within public key")
	}

	ethAddressTime := r.FormValue("addressTime")
	// ethAddressTime = "\x19Ethereum Signed Message:\n" + strconv.Itoa(len(ethAddressTime)) + ethAddressTime
	if len(ethAddressTime) == 0 {
		return errors.New("Could not find ETH address within request")
	}

	sig := r.FormValue("signature")

	keckHash := crypto.Sha3Hash([]byte(ethAddressTime))
	log.Printf("Keckhash: %s, len: %d", keckHash.Hex(), len(keckHash.Bytes()))

	byteSig, err := hex.DecodeString(sig[2:])
	if err != nil {
		return err
	}

	// Needs to be here since web3 is different than geth
	byteSig[64] = byteSig[64] - 27

	log.Printf("sig: %s", sig)

	pubKey, err := crypto.SigToPub(keckHash.Bytes(), byteSig)
	if err != nil {
		return err
	}

	splitAddress := strings.Split(ethAddressTime, ":")
	ethAddress := splitAddress[0]
	log.Printf("ethAddress: %s", splitAddress[0])

	pubKeyAddr := crypto.PubkeyToAddress(*pubKey)
	addrHex := pubKeyAddr.Hex()

	if addrHex != ethAddress {
		return errors.New("Signed request address does not match address provided.")
	}

	i.Email = email
	i.Created = &entity.PrimaryKey.CreationTime
	i.EthAddress = ethAddress
	i.VerificationHash = RandStringRunes(20)

	file.Seek(0, 0)
	mhash, err := UploadPgpKey(&file)
	if err != nil {
		return err
	}

	i.PgpIpfsHash = mhash
	return nil
}

// Puts an Identity in the database
func storeIdentity(i *Identity) error {
	stmt := "INSERT INTO user_info (created_at, ipfs_hash, email, eth_address, verification_hash) VALUES (?,?,?,?,?)"
	_, err := Database.Exec(stmt, i.Created, i.PgpIpfsHash, i.Email, i.EthAddress, i.VerificationHash)
	return err
}

func FindIdentity(w http.ResponseWriter, r *http.Request) {
	identities, err := SearchIdentity()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(identities)
}

func SearchIdentity() ([]Identity, error) {
	var identities []Identity
	stmt := "SELECT * FROM user_info"
	// stmt := "SELECT * FROM user_info WHERE eth_address LIKE '%?%' OR email LIKE '%?%' OR ipfs_hash LIKE %?%"
	rows, err := Database.Query(stmt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		ident := Identity{}
		ident.Created = &time.Time{}
		err := rows.Scan(&ident.Id, &ident.Created, &ident.PgpIpfsHash, &ident.Email, &ident.EthAddress, &ident.Verified, &ident.VerificationHash)
		if err != nil {
			return nil, err
		}
		identities = append(identities, ident)
	}

	err = rows.Err()
	if err != nil {
		log.Print(err)
		return nil, err
	}

	return identities, err
}

func RandStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}
