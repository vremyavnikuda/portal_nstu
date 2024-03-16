package client

import (
	"context"
	"net/http"
	"portal_nstu/backend/calendar_service/web"

	"golang.org/x/oauth2"
)

func GetClient(config *oauth2.Config) *http.Client {
	tokFile := "token.json"
	tok, err := web.TokenFromFile(tokFile)
	if err != nil {
		tok = web.GetTokenFromWeb(config)
		web.SaveToken(tokFile, tok)
	}
	return config.Client(context.Background(), tok)
}
