package main

import (
	"github.com/ipfs/go-ipfs-api"
	"mime/multipart"
)

// Uploads a file to the IPFS node
func UploadPgpKey(f *multipart.File) (string, error) {
	// TODO: this value goes into the configuration file
	s := shell.NewShell("127.0.0.1:5001")
	mhash, err := s.Add(*f)
	if err != nil {
		return "", err
	}
	return mhash, nil
}


