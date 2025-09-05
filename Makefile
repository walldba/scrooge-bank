up:
	docker compose up -d

build:
	docker compose up -d --build --force-recreate --renew-anon-volumes

down:
	docker compose down

exec:
	docker compose exec scrooge-bank-api bash

log:
	docker logs --tail 100 -f scrooge-bank-api

restart:
	docker compose restart