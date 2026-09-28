FROM alpine:3.20 AS certs
RUN apk add --no-cache ca-certificates

FROM scratch
ENV PATH="/bin:${PATH}"
COPY --from=ghcr.io/antyung88/scratch-curl:stable /bin /bin
COPY --from=certs /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt

COPY configs/config_prod.yaml ./configs/config.yaml
COPY configs/config_camper_prod.yaml ./configs/config_camper_prod.yaml
COPY site ./site
COPY camper ./camper
COPY build/ .

# server port
EXPOSE 80
# debug (health-check)
EXPOSE 5300

CMD ["./app"]
