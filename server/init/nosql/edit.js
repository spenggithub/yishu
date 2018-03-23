const Article = require('../../models/articles');
const User = require('../../models/users');
const bcrypt = require('bcrypt-nodejs');
class Edit{
  static async editDescription(userId,description){
    return new Promise((resolve,reject)=>{
      try {
        console.log(description)
        User.update({_id:userId},{$set:{description: description}},(err)=>{
          if(err){
            resolve(false)
          }
          else {
            resolve(true)
          }
        })
      }
      catch (err){
        reject(err)
      }
    })
  }
  //编辑个人信息
  static async editInfo(userId,infoDoc){
    return new Promise((resolve,reject)=>{
      try {
        User.findByIdAndUpdate(userId,{$set:{sex:infoDoc.sex,description:infoDoc.description,website:infoDoc.website}},{upsert:true},(err,doc)=>{
          if(doc){
            resolve(true)
          }
          else {
            resolve(false)
          }
        })
      }
      catch (err){
        reject(err)
      }
    })
  }
  //编辑文章
  static async editArticle(articleId,title,content){
    return new Promise((resolve,reject)=>{
      try {
        Article.findByIdAndUpdate(articleId,{$set:{title:title,content:content}},(err,doc)=>{
          if(doc){
            resolve(true)
          }
          else {
            resolve(false)
          }
        })
      }
      catch (err){
        reject(err)
      }
    })
  }
//  按照id查找用户并修改头像
  static async findByIDEditAvatar(userId,avatar){
    return new Promise((resolve,reject)=>{
      try {
        User.update({_id:userId},{$set:{avatar: avatar}},(err)=>{
          if(err){
            resolve(false)
          }
          else {
            resolve(true)
          }
        })
      }
      catch (err){
        reject(err)
      }
    })
  }
}
module.exports = Edit;
