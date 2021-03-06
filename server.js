/*eslint-env es6*/
// const debug = require('debug')("node-angular");
// const http = require('http');
// const app = require('./backend/app');
const { parse } = require('rss-to-json');

parse('https://vnexpress.net/rss/tin-moi-nhat.rss').then(rss => {
    console.log(JSON.stringify(rss, null, 3));
});

// const normalizePort = val => {
//   var port = parseInt(val, 10);
//   if (isNaN(port)) {
//     return val;
//   }

//   if (port >= 0) {
//     return port;
//   }
//   return false;
// }

// const onError = error => {
//   if (error.syscall !== "listen") {
//     throw error;
//   }
//   const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
//   switch (error.code) {
//     case "EACCES":
//       console.error(bind + " required elevated privileges");
//       process.exit(1);
//     case "EADDRINUSE":
//       console.error(bind + " is already in use");
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// const onListening = () => {
//   const addr = server.address();
//   const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
//   debug("Listening on " + bind);
// }

// const port = normalizePort(process.env.PORT || "3000");
// app.set('port', port);

// const server = http.createServer(app);
// server.on("error", onError);
// server.on("listening", onListening)
// server.listen(port);