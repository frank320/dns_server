/**
 * Created by frank on 2017/5/27.
 * DNS解析服务器
 */

const app = require('express')()

app.use(function (req, res) {
  console.log(req.url);
  console.log(req.path);
  console.log(req.query);
  res.send('ok')
})
app.listen(80, function () {
  console.log(`server is running at port 80`);
})