package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/handlers"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

type Config struct {
	MySql MySqlConfig `json:"mysql"`
	Email EmailConfig `json:"email"`
	Debug bool `json:"debug"`
}

type MySqlConfig struct {
	Endpoint string `json:"endpoint"`
	Port     string `json:"port"`
	Username string `json:"username"`
	Password string `json:"password"`
	Database string `json:"database"`
}

type EmailConfig struct {
	Endpoint string `json:"endpoint"`
	Port     string `json:"port"`
	Username string `json:"username"`
	Password string `json:"password"`
}

var Database *sql.DB
var Cfg Config

func main() {
	log.Println("Starting Identity Server")
	var err error
	readConfig(&Cfg)
	Database, err = initDb(Cfg.MySql.Username, Cfg.MySql.Password, Cfg.MySql.Endpoint, Cfg.MySql.Port, Cfg.MySql.Database)
	if err != nil {
		log.Fatal(err)
		return
	}

	router := NewRouter()

	// Get the port from the env
	port := os.Getenv("PORT")
	if port == "" {
		port = "8082"
	}

	if Cfg.Debug {
		handler := cors.Default().Handler(router)
		log.Fatal(http.ListenAndServe(":"+port, handler))
	} else {
		log.Fatal(http.ListenAndServe(":"+port, handlers.CORS()(router)))
	}
	log.Println("Stopping Identity Server")
}

// Initialize the Identity database
func initDb(username, password, endpoint, port, database string) (*sql.DB, error) {
	// Create url for connection
	url := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", username, password, endpoint, port, database)

	// Open connection to SQL DB
	db, err := sql.Open("mysql", url)
	if err != nil {
		return nil, err
	}

	// Test database connection
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, err
}

func readConfig(cfg *Config) {
	configFileName := "config.json"
	if len(os.Args) > 1 {
		configFileName = os.Args[1]
	}

	configFileName, _ = filepath.Abs(configFileName)
	log.Printf("Loading config: %v", configFileName)

	configFile, err := os.Open(configFileName)
	if err != nil {
		log.Fatal("File error: ", err.Error())
	}

	defer configFile.Close()
	jsonParser := json.NewDecoder(configFile)
	if err := jsonParser.Decode(&cfg); err != nil {
		log.Fatal("Config error: ", err.Error())
	}
}
