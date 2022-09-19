# Laz

Laz is a personal expenses tracker software on the browser.

### Why

After years of tracking, we find ourselves losing all motivation to track any expense every now and then.

This procrastination turns into days, weeks, and on a few occassions - months.

This software is designed so that you only spend a minute a day to think out loud every expense you remember.

We minimize every interaction so there's little to no barrier to log your expenses.

## Running Locally

Go the `ui` folder then copy `.env` like so:

```bash
cp .env.example .env.local
```

Copy its values from our private Discord server. Afterwards, you're good to go:

```bash
npm install && npm run dev
```

Afterwards, open up `http://localhost:3000`.

### Running API

By default, we recommend you to consume the staging API.

If you plan on running the API locally, check the `api` directory for more information.

## Setting up Rollbar

Go to [Rollbar](https://rollbar.com/) and create your project from there.

Afterwards, get your project's access token and add it to your local env (`.env.local`):

```
NEXT_PUBLIC_ROLLBAR_TOKEN=<insert access token here>
```

If you're running Laz for production, don't forget to change `NEXT_PUBLIC_ROLLBAR_ENV` as well:

```
NEXT_PUBLIC_ROLLBAR_ENV=production
```
