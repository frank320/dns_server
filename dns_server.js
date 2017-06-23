/**
 * Created by wikeLi on 2017/5/27.
 */
var fs = require('fs');
var path = require('path');
var dns = require('native-dns');
var http = require('http');
var express = require('express');

String.prototype.endsWith = function(s) {
  return this.length >= s.length && this.substr(this.length - s.length) == s;
};

var startDns = function(example_port, callback) {
  var server = dns.createServer();
  server.on('request', function(request, response) {
    var found = false;

    for (var q = 0; q < request.question.length; q++)
    {
      var name = request.question[q].name;
      if (name.endsWith("game1.tjbtn.net"))
      {
        response.answer.push(dns.A({
          name:name,
          address:'192.168.1.101',
          port:example_port,
          ttl:600
        }));
        found = true;
      }
    }
    if (found)
    {
      response.send();
    }
  });

  server.on('error', function(err, buff, req, res) {
    console.log(JSON.stringify(err));
  });

  server.on('listening', function() {
    console.log("DNS server started on port 53");
    if (callback)
    {
      callback();
    }
  });

  server.serve(53);
  return server;
};

var startHttp = function(serverPort) {

  var app = express();
  var server = http.createServer(app);
  app.get('/', function(req, res, next) {
    res.send('Hello from ' + req.headers.host);
  });
  server.listen(serverPort, 'game1.tn.net');
  console.log('https server started on port ' + serverPort);
  return server;
};

var server_port = parseInt(process.argv[2] ||80);
var httpsServer;

var dnsServer = startDns(server_port, function() {
  httpsServer = startHttp(server_port)
});

process.on('SIGINT', function() {
  console.log("shutting down");
  if (httpsServer)
  {
    httpsServer.close();
  }
  if (dnsServer)
  {
    dnsServer.close();
  }
});