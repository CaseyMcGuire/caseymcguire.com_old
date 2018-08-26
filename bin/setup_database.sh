#!/usr/bin/env bash

if [ -z "$MY_SITE_USER" ]; then
  echo "Need to set MY_SITE_USER environment variable"
  exit 1
fi

if [ -z "$MY_SITE_HOST" ]; then
  echo "Need to set MY_SITE_HOST environment variable"
  exit 1
fi

if [ -z "$MY_SITE_DATABASE" ]; then
  echo "Need to set MY_SITE_DATABASE environment variable"
  exit 1
fi

if [ -z "$MY_SITE_PASSWORD" ]; then
  echo "Need to set MY_SITE_PASSWORD environment variable"
  exit 1
fi

echo "All environment variables are set"
echo "Setting up database..."

psql -U postgres -c "CREATE USER $MY_SITE_USER WITH ENCRYPTED PASSWORD '$MY_SITE_PASSWORD';"
psql -U postgres -c "CREATE DATABASE $MY_SITE_DATABASE;"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $MY_SITE_DATABASE TO $MY_SITE_USER;"

echo "running migrations..."
npm run db-migrate up


