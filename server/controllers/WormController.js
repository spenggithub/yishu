const Worm = require('../util/worm');
class WormController{
  static async getJianshuArticle(ctx){
    let jianshuArticleList = await Worm.getJianshuArticleList();
    //允许跨域
    ctx.body = {
      status:'0',
      msg:'success',
      result:jianshuArticleList
    }
  }
  static async getBanner(ctx){
    let bannerList = await Worm.getBanner();
    ctx.body = {
      status:'0',
      msg:'success',
      result:bannerList
    }
  }
}
module.exports = WormController
