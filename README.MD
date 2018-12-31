#### Setup
You must have Postgresql and Node installed and have a `.env` file in the root project directory with the following environment variables set:


- SESSION_SECRET
  - String used to sign session ID cookie
- MY_SITE_USER
   - Name of database user
- MY_SITE_HOST      
   - Hostname of the database (probably 'localhost' if running locally)
- MY_SITE_DATABASE  
  - The name of the database 
- MY_SITE_PASSWORD  
  - The password of the database user

Once these are set, setup the database by running the following: 
```$xslt
npm run setup-database
```

Then, run the following to watch for changed files and to start the server. 
 
```$xslt
# In one terminal, run:
npm run watch-dev

# In another terminal, run:  
npm run start-server
```