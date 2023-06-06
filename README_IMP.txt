https://www.youtube.com/watch?v=SBvmnHTQIPY&ab_channel=TraversyMedia

-----

npm i express mongoose connect-mongo express-session express-handlebars dotenv method-override moment morgan passport passport-google-oauth20

express - web framework to create routes, etc
mongoose - work with db, create models, etc
connect-mongo - allow us to store sessions in db, so when we reset the server we do not get logged out
express-session - for sessions and cookies
express-handlebars - template engine (can also use pug, ejs, etc)
dotenv - for config, for env variables
method-override - aloows us to make put and delete requests from templates, by default only get and post
moment - format dates
morgan - logging
passport - authentication
passport-google-oauth20 - google authentication using oauth 2.0

-----

express-session

- make sure session config is above passport middleware

resave (bool) - save session if nothing is modified ?
saveUninitialized (bool) - create session if nothing is stored ?

-----

npm i -D nodemon cross-env jsdoc

nodemon - will continuously watch our server so we do not have to restart it everytime we make a change
cross-env - global variable for our node env inside start/dev scripts, avoids confusion since it is different depending on windows, mac, linux, etc
jsdoc - generate api documentation

-----

npm i -D eslint eslint-config-semistandard eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-sort eslint-plugin-standard eslint-plugin-jsdoc

-----

add dev and production run scripts in package.json
