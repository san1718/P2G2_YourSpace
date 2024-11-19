const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const http = require('http'); // Import http
const helpers = require('./utils/helpers');
const { Server } = require('socket.io'); // Import socket.io

const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


// Create the HTTP server and Socket.IO instance
const server = http.createServer(app);
const io = new Server(server);


// Socket.IO connection logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast message to all connected users
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));


const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});
