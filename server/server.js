// express
const express =  require('express')
const app = express()
// http server
const server = require('http').Server(app)
// socket io
const io =  require('socket.io')(server)
// path
const path = require('path')
// port
const port = process.env.PORT || 3000

// Exports socket object
module.exports.io = io


// set public path
const publicPath = path.resolve(__dirname, '../public')
app.use(express.static(publicPath))

require('./sockets/chat')

// Routes
app.get('/', function (req, res) {
    res.sendFile(`${publicPath}/index.html`);
  });

  app.get('/chat', function (req, res) {
    res.sendFile(`${publicPath}/chat.html`);
  });

server.listen(port, (err) => {
    if (err) throw new Error(err)
    console.log(`Server runs on port ${ port }`)
});

