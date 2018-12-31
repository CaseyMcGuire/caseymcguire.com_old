require("dotenv").config();
const execSync = require("child_process").execSync;

if (!process.env.MY_SITE_USER) {
  console.log("Need to set MY_SITE_USER environment variable");
  process.exit();
}

if (!process.env.MY_SITE_HOST) {
  console.log("Need to set MY_SITE_HOST environment variable");
  process.exit();
}

if (!process.env.MY_SITE_DATABASE) {
  console.log("Need to set MY_SITE_DATABASE environment variable");
  process.exit();
}

if (!process.env.MY_SITE_PASSWORD) {
  console.log("Need to set MY_SITE_PASSWORD environment variable");
  process.exit();
}

console.log("All environment variables are set");
console.log("Setting up database...");

execSync('psql -U postgres -c "CREATE USER $MY_SITE_USER WITH ENCRYPTED PASSWORD \'$MY_SITE_PASSWORD\';"');
execSync('psql -U postgres -c "CREATE DATABASE $MY_SITE_DATABASE;"');
execSync('psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $MY_SITE_DATABASE TO $MY_SITE_USER;"');

console.log("running migrations...");
execSync('npm run db-migrate up');


