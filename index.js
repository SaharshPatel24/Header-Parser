// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
const expressip = require('express-ip');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + 'public'));
app.use(expressip().getIpInfoMiddleware);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/whoami", function (req, res) {
  var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  console.log(ip);
  var info = {
    'ipaddress': ip,
    'language': req.headers["accept-language"].split(',')[0],
    'software': req.headers['user-agent'].split(') ')[0].split(' (')[1]
  };
  res.send(info);
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
