## Initial setup

Create .env file in root/back directory by .example.env template
- PORT=3033 (specified in the docker compose(back service) or another that will be used)
- DB_HOST=host.docker.internal (or localhost or another host that linked to used DB)
- DB_PORT=3306 (specified in the docker compose(mysqldb service) or another that will be used)
- DB_USER=mysql (specified in the docker compose(mysqldb service) or another that will be used)
- DB_USER_PASS=password (specified in the docker compose(mysqldb service) or another that will be used)
- DB_NAME=testdb (specified in the docker compose(mysqldb service) or another that will be used)
- DB_ROOT_PASS=password (specified in the docker compose(mysqldb service) or another that will be used)
- COIN_API_KEY=coin-api-key(from: https://www.coinapi.io)

Create .env file in root/front directory by .example.env template
- PORT=3303 (specified in the docker compose(front service) or another that will be used)

## Start

1. docker-compose up -d (start all services)
2. open http://localhost:3303 (port used that specified in .env)
3. use currency exchange app :)

!Query update rate for Live Price - 1 in 15 seconds.

## Finish

- docker-compose down (stopped all services)
