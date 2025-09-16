package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/alexander-sapozhnikov/payanyway-site/internal/setting"
	"github.com/alexander-sapozhnikov/shoemaker/closer"
)

func main() {
	config, err := setting.NewConfig(context.Background())
	if err != nil {
		log.Fatalf("failed to create config: %v", err)
	}
	serverMux := http.NewServeMux()
	serverMux.Handle("/", http.FileServer(http.Dir(config.File)))
	dataServer := &http.Server{
		Addr:    config.ServerPort,
		Handler: serverMux,
	}
	closer.Bind(func() { _ = dataServer.Close() })

	err = dataServer.ListenAndServe()
	if err != nil {
		log.Fatal(fmt.Errorf("file server: %w", err))
	}
}
