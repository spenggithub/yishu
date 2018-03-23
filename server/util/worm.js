const superagent = require('superagent');
const  cheerio = require('cheerio')
class Worm{
  static  async getJianshuArticleList() {
    return new Promise((resolve,reject)=>{
      superagent.get('http://www.jianshu.com/')
        .end((err,sres)=>{
          if(err){
            return console.log(err);
          }
          let jianshuArticleList = [];
          let $ = cheerio.load(sres.text);
          $('.note-list li').each(function (idx,element) {
            let $element = $(element);
            jianshuArticleList.push({
              title:$element.find('.title').text(),
              href:'http://www.jianshu.com' + $element.find('.title').attr('href'),
              abstract:$element.find('.abstract').text(),
              avatar:$element.find('img').attr('src'),
              nickname:$element.find('.nickname').text(),
              wrapImgHref:$element.find('.wrap-img').attr('href'),
              wrapimg:$element.find('img.img-blur-done').attr('src')
            })
          });
          $('.wrap-img').each(function (idx,element) {
            let $element = $(element);
            jianshuArticleList[idx].wrapImgHref = $element.attr('href');
            jianshuArticleList[idx].wrapImg = $element.find('img').attr('src')
          });
          resolve(jianshuArticleList)
        });
    })
  }
  static async getBanner(){
    return new Promise((resolve,reject)=>{
      superagent.get('http://www.jianshu.com/')
        .end((err,sres)=>{
          if(err){
            return console.log(err);
          }
          let bannerList = [];
          let $ = cheerio.load(sres.text);
          $('.banner img').each(function (idx,element) {
            let $element = $(element);
            bannerList.push($element.attr('src'))
          });
          resolve(bannerList)
        });
    })
  }
}
module.exports = Worm
