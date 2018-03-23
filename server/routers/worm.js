const router = require('koa-router')();
const WormController = require('../controllers/WormController');

const routers = router
//获取简书首页热门文章
  .get('/jianshuArticle',WormController.getJianshuArticle)
  .get('/getBanner',WormController.getBanner)
module.exports = routers;
