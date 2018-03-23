const fs = require('fs');
const User = require('../models/users');
async function copyAvatar(filePath,avatarPath,userId) {
  return new Promise((resolve,reject)=>{
    fs.readFile(filePath,(err,file)=>{
      if(err){
        resolve(false)
      }
      else {
        fs.writeFile(avatarPath,file,err=>{
          if(err){
            resolve(false)
          }
          else{
            User.findByIdAndUpdate(userId,{ $set: { avatar: userId+'.png' }},{upsert:true},(err,doc)=>{
              if(doc){
                resolve(true)
              }
              else {
                resolve(false)
              }
            });
          }
        })
      }
    })
  });
}
module.exports = copyAvatar
