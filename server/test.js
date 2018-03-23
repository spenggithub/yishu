const captcha = require('./util/captcha');
const Koa = require('koa');
const app = new Koa();

app.use(ctx=>{
  var str = captcha.makeStr()
  var img = captcha.makeCapcha(str);
  ctx.set('Content-Type','image/bmp')
  ctx.body = img.getFileData()
  console.log(img.getFileData().toString('base64'));
})
app.listen(3001)
// http.createServer(function (req,res) {
//   if(req.url == '/favicon.ico'){
//     return res.end();
//   }
//   console.time("bmp24");
//   var img = makeCapcha();
//   // var img = makeImg2();
//   console.timeEnd("bmp24");
//
//   res.end(img.getFileData());
//
// }).listen(3001);

console.log('localhost:3000');
