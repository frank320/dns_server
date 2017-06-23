/**
 * Created by wikeLi on 2017/5/27.
 * 本地DNS代理服务器
 */
var dns = require('native-dns');
var server = dns.createServer();
var app = require('express')()

server.on('request', function (request, response) {
  response.answer.push(dns.A({
    name: request.question[0].name,
    address: '192.168.1.101',
    ttl: 600,
  }));
  response.answer.push(dns.A({
    name: request.question[0].name,
    address: '192.168.1.101',
    ttl: 600,
  }));
  response.additional.push(dns.A({
    name: 'game1.tjbtn.net',
    address: '192.168.1.101',
    ttl: 600,
  }));

  response.send();
});

server.on('listening', function () {
  console.log('dns server is running at port 53');
})
server.on('error', function (err, buff, req, res) {
  console.log(err.stack);
});

//app.get('/', function (req, res) {
//  res.send('hahhaha')
//})

server.serve(53);
//app.listen(80, function () {
//  console.log(`server is runing at port 80`);
//})