# server port
EXPOSE 80


COPY --from=build /app/configs/config_prod.yaml ./configs/config.yaml
COPY --from=build /app/site ./site
