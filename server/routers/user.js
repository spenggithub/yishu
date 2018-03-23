const router = require('koa-router')();
const UserController = require('../controllers/UserController');

const routers = router
  //登录
  .post('/login',UserController.login)
  //注册
  .post('/register',UserController.register)
  //检查邮箱
  .post('/emailCheck',UserController.emailCheck)
  //编辑个性签名
  .post('/editDescription',UserController.editDescription)
  //关注/取消关注
  .post('/toggleFollow',UserController.toggleFollow)
  //  退出登录
  .post('/logout',UserController.logout)
  //上传头像
  .post('/uploadAvatar',UserController.uploadAvatar)
  //登录检测
  .get('/checkLogin',UserController.checkLogin)
  //获取用户信息
  .get('/getUserInfo',UserController.getUserInfo)
  //获取关注人列表
  .get('/getFollowingList',UserController.getFollowingList)
//获取粉丝列表
  .get('/getFansList',UserController.getFansList)
//获取收藏的文章列表
  .get('/getCollectedArticleList',UserController.getCollectedArticleList)
  //编辑个人信息
  .post('/editInfo',UserController.editInfo)
//获取验证码
  .get('/getCaptcha',UserController.getCaptcha)
  .post('/checkCaptcha',UserController.checkCaptcha)
module.exports = routers;
