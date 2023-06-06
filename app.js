const constants = require('./constants/index.js');
const dbConfig = require('./config/db.js');
const dotenv = require('dotenv');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
// Load Config
dotenv.config();
// Load DB
dbConfig.connectDB();

const app = express();
const port = process.env.PORT || 3001;

// Logger
if (process.env.NODE_ENV === constants.ENV.DEVELOPMENT) {
    app.use(morgan('dev'));
}

// Handlebars
app.engine('.hbs', expressHandlebars.engine({ defaultlayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// eslint-disable-next-line no-console
app.listen(port, console.log(`Server running on ${process.env.NODE_ENV} environment on port ${port}`));
