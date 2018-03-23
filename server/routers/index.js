const router = require('koa-router')();
const user = require('./user');
const article = require('./article');
const  worm = require('./worm');
const setting = require('./setting');
router.use('/user',user.routes(),user.allowedMethods());
router.use('/article',article.routes(),article.allowedMethods());
router.use('/worm',worm.routes(),worm.allowedMethods());
router.use('/setting',setting.routes(),setting.allowedMethods());
module.exports = router
