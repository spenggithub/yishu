const path = require('path');
const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-body');
const routers = require('./routers/index');
const convert = require('koa-convert');
const koaLogger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const flashSimple = require('koa-flash-simple');
const koaStatic =require('koa-static');
const multer = require('koa-multer');
const app = new Koa();
app.use(cors({
  origin(ctx){
    return 'http://www.vjianshu.xyz'
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ["GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH"],
  allowHeaders: ["Access-Control-Allow-Headers", "X-Requested-With, accept, content-type, xxxx"],
}))
//sesstion存储配置
const sessionMysqlConfig = {
  user: 'root',
  password: '18961855677Ww',
  database: 'session',
  host: 3306,
};
// 配置session中间件
// 存放sessionId的cookie配置
let cookie = {
  maxAge: 60*60*1000*1000, // cookie有效时长
  path: '/', // 写cookie所在的路径
};
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig),
  cookie:cookie
}));
// 配置控制台日志中间件
app.use(convert(koaLogger()));

// 配置ctx.body解析中间件
app.use(bodyParser({multipart:true}));
//配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname,'./uploads')));
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());
app.listen(3000);
