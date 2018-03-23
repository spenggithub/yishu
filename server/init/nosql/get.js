const Article = require('../../models/articles');
const User = require('../../models/users')
class Get{
  static async getArticleList(email){
    return new Promise((resolve,reject)=>{
      try {
        Article.find({email:email},(err,docs)=>{
          if(err){
            resolve(false)
          }
          else{
            resolve(docs)
          }
        })
      }
      catch (e){
        reject(e)
      }
    });
  }
  static async getArticleContent(articleId){
    return new Promise((resolve,reject)=>{
      try {
        Article.findOne({_id:articleId},(err,doc)=>{
          if(err){
            resolve(false)
          }
          else {
            resolve(doc)
            doc.viewNums++;
            doc.save((err,doc)=>{
              if(err){
                console.log(err);
              }
              else {
                console.log('success');
              }
            })
          }
        })
      }
      catch (err){
        reject(err)
      }
    })
  }
  static async getAuthorInfo(articleId){
    return new Promise((resolve,reject)=>{
      try {
        Article.findOne({_id:articleId},(err,doc)=>{
          if(err){
            resolve(false)
          }
          else {
            let email = doc.email;
            User.findOne({email:email},(err,doc)=>{
              if(err){
                resolve(false)
              }
              else {
                resolve(doc)
              }
            })
          }
        })
      }
      catch (err){
        reject(err)
      }
    })
  }
  static async getUserInfo(userId){
    return new Promise((resolve,reject)=>{
      try {
            User.findOne({_id:userId},(err,doc)=>{
              if(err){
                resolve(false)
              }
              else {
                resolve(doc)
              }
        })
      }
      catch (err){
        reject(err)
      }
    })
  }

}
module.exports = Get;
