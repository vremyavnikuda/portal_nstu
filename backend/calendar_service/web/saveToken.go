package web

import (
	"encoding/json"
	"golang.org/x/oauth2"
	"log"
	"os"
)

func SaveToken(path string, token *oauth2.Token) {
	f, err := os.OpenFile("credentials.json", os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		log.Fatalf("Unable to cache oauth token: %v", err)
	}
	defer func(f *os.File) {
		err := f.Close()
		if err != nil {
			log.Fatalf("Unable to close token file: %v", err)
		}
	}(f)
	err = json.NewEncoder(f).Encode(token)
	if err != nil {
		return
	}
}
