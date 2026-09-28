package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

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

	configFile := "./configs/config_camper.yaml"
	if !shoemaker.Mode.IsDev() && fileExists("./configs/config_camper_prod.yaml") {
		configFile = "./configs/config_camper_prod.yaml"
	} else if !fileExists(configFile) {
		configFile = "./configs/config.yaml"
	}

	config, err := setting.NewConfigFromPath(configFile)
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
			logrus.Warnf("file server: %v", err)
		}
		closer.Close()
	}()

	logrus.Infof("Camper server started on %s serving %s", config.ServerPort, config.File)

	app.Run(ctx)
	if err != nil {
		logrus.Fatal(fmt.Errorf("app: %w", err))
	}
}

func fileExists(filename string) bool {
	_, err := os.Stat(filename)
	return err == nil
}
