require('babel-core/register');
require('css-modules-require-hook/preset');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.config.dev');

server.listen(8080);

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true }
}));

app.use('/public', express.static(__dirname + '/public'))


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
