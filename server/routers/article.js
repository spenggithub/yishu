const router = require('koa-router')();
const ArticleController = require('../controllers/ArticleController');

const routers = router
  //创建一篇文章
  .post('/createArticle',ArticleController.createArticle)
  // 编辑文章内容
  .post('/editArticle',ArticleController.editArticle)
  //发表评论
  .post('/postComment',ArticleController.postComment)
  //给评论点赞
  .post('/clickThumb',ArticleController.clickThumb)
  //收藏\取消收藏
  .post('/toggleCollect',ArticleController.toggleCollect)
  //获取文章列表
  .get('/getArticleList',ArticleController.getArticleList)
  //获取一篇文章的内容
  .get('/getArticleContent',ArticleController.getArticleContent)
  // .get('getComments',ArticleController.getComments)
  //获取作者信息
  .get('/getAuthorInfo',ArticleController.getAuthorInfo);
module.exports = routers;
