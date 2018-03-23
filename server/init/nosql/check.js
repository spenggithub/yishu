const User = require('../../models/users');
const bcrypt = require('bcrypt-nodejs');
class Check{
  static async checkUser(email,password) {
    return new Promise((resolve,reject)=>{
      try {
        User.findOne({email:email},(err,doc)=>{
          if(doc){
            let checkResult = bcrypt.compareSync(password,doc.password);
            if(checkResult){
              resolve(doc)
            }
            else{
              resolve(false)
            }
          }else {
            resolve(false)
          }
        })
      }
      catch (err){
        reject(err)
      }
    });
  }
  static checkLogin(ctx){
    let loginResult = ctx.session;
    return loginResult;
  }
  static async selectUser(userId){
    return new Promise((resolve,reject)=>{
      try {
        User.findOne({_id:userId},(err,doc)=>{
          if(doc){
            resolve(doc)
          }
          else {
            resolve(false)
          }
        });
      }
      catch (e){
        reject(e)
      }
    });
  }
  static async selectUserByEmail(email){
    return new Promise((resolve,reject)=>{
      try {
        User.findOne({email:email},(err,doc)=>{
          if(doc){
            resolve(doc)
          }
          else {
            resolve(false)
          }
        });
      }
      catch (e){
        reject(e)
      }
    });
  }
}
var hash = bcrypt.hashSync('123456');
// User.findOne({email:'874134292@qq.com'},(err,doc)=>{
//   console.log(doc.password);
// })
module.exports = Check;




