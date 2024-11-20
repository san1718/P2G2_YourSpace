const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const helpers = require('./utils/helpers');

const routes = require('./controllers');
const helpers = require('./utils/helpers');
require('dotenv').config();


const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });


// Configure session middleware
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 3600000, // 1 hour
    httpOnly: true,
    secure: false,

// Configure session
const sess = {
  secret: process.env.SESSION_SECRET || 'Super secret secret',
  cookie: {
    maxAge: 3600000, // 1 hour
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production

    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));


// Set up Handlebars.js as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and form data

// Set Handlebars.js as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Set up routes
app.use(routes);

// Connect to the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
  });
});

// Register routes
app.use(routes);

// Handle database syncing and server start
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
});

