package main

import (
	"github.com/didip/tollbooth"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"os"
	"time"
)

func NewRouter() *mux.Router {
	limit := tollbooth.NewLimiter(50, time.Millisecond)

	// Router definition
	router := mux.NewRouter().StrictSlash(true)

	// Serve frontend if exists
	frontendPath := "dist/"
	_, err := os.Stat(frontendPath)
	if err == nil && !os.IsNotExist(err) {
		router.Methods("Get").Name("static").Handler(addDefaultHeadersHandler(http.FileServer(http.Dir(frontendPath))))
	} else {
		log.Println("Could not find frontend code to serve. Not serving front end.")
	}

	router.
	Methods("Post").
		Path("/identity").
		Name("IdentityCreate").
		Handler(tollbooth.LimitHandler(limit, http.HandlerFunc(CreateIdentity)))

	router.
	Methods("Get").
		Path("/identity").
		Name("IdentityGet").
		Handler(tollbooth.LimitHandler(limit, http.HandlerFunc(FindIdentity)))

	return router
}

// Adds the default security headers to the webapp, allows cross origin when in debug
func addDefaultHeadersHandler(fn http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-XSRF-TOKEN, x-auth-token")
		fn.ServeHTTP(w, r)
	}
}
