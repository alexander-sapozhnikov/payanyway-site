package setting

import (
	"context"
	"fmt"
	"os"

	"github.com/alexander-sapozhnikov/shoemaker"
	"gopkg.in/yaml.v3"
)

func NewConfig(ctx context.Context) (Config, error) {
	configSource, err := shoemaker.NewConfig[Config](ctx)
	if err != nil {
		return configSource, fmt.Errorf("ошибка создания конфига: %w", err)
	}
	return configSource, nil
}

func NewConfigFromPath(path string) (Config, error) {
	var configSource Config
	data, err := os.ReadFile(path)
	if err != nil {
		return configSource, fmt.Errorf("ошибка чтения файла конфига %s: %w", path, err)
	}

	err = yaml.Unmarshal(data, &configSource)
	if err != nil {
		return configSource, fmt.Errorf("ошибка парсинга файла конфига: %w", err)
	}

	return configSource, nil
}
