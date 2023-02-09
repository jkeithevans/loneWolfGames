const http = require('http');
const app = require('./app');

const port = 3111;

app.set('port', port);

const server = http.createServer(app);

server.listen(port); 
server.on('error', portError);
server.on('listening', portListener); 

function portError(error) {
  if (error.syscall !== "listen") throw error;

  switch (error.code) { 
    case "EACCES": 
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1); 
      break;
    case "EADDRINUSE": 
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  };
};

function portListener() {
  const address = server.address(); 
  console.log(`Listening on port ${address.port}`);
};