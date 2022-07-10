## Laz API

This codebase relies on Laravel Sail. To proceed, we require you to install Docker.

### Running API

Go to the `/api` directory. Install the dependencies with:

```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
```

Create .env file:

```
cp .env.example .env
```

Afterwards, run:

```bash
./vendor/bin/sail up
```

Run migrations and seed data:

```bash
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan db:seed
```

Install Passport keys and and create client id/secret:

```
sail artisan install
sail artisan passport:client --password
```

Copy the output's client id and secret as we'll use it in the next step:

If you haven't setup `.env` file for the `ui` directory, you can do so by:

```bash
cd ../ui
cp .env.example .env
```

Open up `.env` then update the values of `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` based on the output
