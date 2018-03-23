const router = require('koa-router')();
const SettingController = require('../controllers/SettingController');

const routers = router
//阅读模式
  .post('/readMode',SettingController.readMode)
module.exports = routers;
