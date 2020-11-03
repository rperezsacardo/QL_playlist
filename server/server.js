'use strict';

require('dotenv').config();

const debug = require('debug')('server:server');
const app = require('./app');

const PORT = parseInt(process.env.PORT, 10);

const onError = (error) => {
  const { syscall, port, code } = error;
  if (syscall === 'listen' && code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
    process.exit(1);
  } else {
    console.error('There was an unknown error.');
    debug(error);
    throw error;
  }
};

const onListening = (server) => {
  const { port } = server.address();
  debug(`Node server listening on ${port}`);
  if (process.env.NODE_ENV === 'development')
    debug(`Visit http://localhost:${port} to develop your app`);
};

const server = app.listen(PORT);
server.on('error', (error) => onError(error));
server.on('listening', () => onListening(server));
