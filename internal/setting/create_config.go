package setting

import (
	"context"
	"fmt"

	"github.com/alexander-sapozhnikov/shoemaker"
)

func NewConfig(ctx context.Context) (Config, error) {
	configSource, err := shoemaker.NewConfig[Config](ctx)
	if err != nil {
		return configSource, fmt.Errorf("ошибка создания конфига: %w", err)
	}
	return configSource, nil
}
