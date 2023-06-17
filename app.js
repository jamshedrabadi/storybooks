const constants = require('./constants/index.js');
const dbConfig = require('./config/db.js');
const dotenv = require('dotenv');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const mongoStore = require('connect-mongo');
const morgan = require('morgan');
const passport = require('passport');
const passportConfig = require('./config/passport.js');
const path = require('path');
const session = require('express-session');

// Load Config
dotenv.config();

// Passport Config
passportConfig.initPassportConfig(passport);

// Load DB
dbConfig.connectDB();

const app = express();
const port = process.env.PORT || 3001;

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logger
if (process.env.NODE_ENV === constants.ENV.DEVELOPMENT) {
    app.use(morgan('dev'));
}

// Handlebars Helpers
const { formatDate, truncate, stripTags } = require('./helpers/hbs.js');

// Handlebars
app.engine('.hbs', expressHandlebars.engine({
    helpers: { formatDate, truncate, stripTags },
    defaultlayout: 'main',
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

// Sessions
const sessionConfig = {
    secret: constants.SESSION.SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: process.env.MONGO_URI }),
};
app.use(session(sessionConfig));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/auth', require('./routes/auth.js'));
app.use('/stories', require('./routes/stories.js'));

// eslint-disable-next-line no-console
app.listen(port, console.log(`Server running on ${process.env.NODE_ENV} environment on port ${port}`));
