package main

import (
	"context"
	"fmt"
	"net/http"

	"github.com/alexander-sapozhnikov/payanyway-site/internal/setting"
	"github.com/alexander-sapozhnikov/shoemaker"
	"github.com/alexander-sapozhnikov/shoemaker/closer"
	"github.com/sirupsen/logrus"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	closer.Bind(cancel)

	app, err := shoemaker.Init(ctx)
	if err != nil {
		logrus.Fatalf("shoemaker.Init: %v", err)
	}

	config, err := setting.NewConfig(context.Background())
	if err != nil {
		logrus.Fatalf("failed to create config: %v", err)
	}
	serverMux := http.NewServeMux()
	serverMux.Handle("/", http.FileServer(http.Dir(config.File)))
	dataServer := &http.Server{
		Addr:    config.ServerPort,
		Handler: serverMux,
	}
	closer.Bind(func() { _ = dataServer.Close() })

	go func() {
		err := dataServer.ListenAndServe()
		if err != nil {
			logrus.Warnf("file server: %w", err)
		}
		closer.Close()
	}()

	app.Run(ctx)
	if err != nil {
		logrus.Fatal(fmt.Errorf("app: %w", err))
	}
}
