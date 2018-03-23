const Article = require('../../models/articles');
const User = require('../../models/users');
const bcrypt = require('bcrypt-nodejs');

class Create {
  //发布文章
  static async createArticle(articleContent) {
    return new Promise((resolve, reject) => {
      try {
        Article.create(articleContent, err => {
          if (err) {
            resolve(false)
          }
          else {
            resolve(true)
          }
        })
      }
      catch (err) {
        reject(err)
      }
    })
  }

  //创建用户
  static async createUser(username, email, password) {
    return new Promise((resolve, reject) => {
      try {
        User.findOne({email: email}, (err, doc) => {
          if (doc) {
            resolve(false)
          }
          else {
            let hashPassword = bcrypt.hashSync(password);
            User.create({email: email, username: username, password: hashPassword}, (err, doc) => {
              if (err) {
                resolve(false)
              }
              else {
                resolve(doc)
              }

            })
          }
        })
      }
      catch (err) {
        reject(err)
      }
    })
  }

  //发表评论
  static async postComment(articleId, comment) {
    return new Promise((resolve, reject) => {
      try {
        Article.findOne({_id: articleId}, (err, doc) => {
          if (doc) {
            comment.floor = doc.comments.length + 1;
            doc.comments.push(comment);
            doc.save((err, doc) => {
              if (err) {
                resolve(false)
              }
              else {
                resolve(true)
              }
            })
          } else {
            resolve(false)
          }
        })
      }
      catch (err) {
        reject(err)
      }
    })
  }

  //点赞
  static async clickThumb(userId, articleId, commentId) {
    return new Promise((resolve, reject) => {
      try {
        Article.findOne({_id: articleId}, (err, doc) => {
          if (doc) {
            let comments = doc.comments;
            for (let i = 0; i < comments.length; i++) {
              if (comments[i].id === commentId) {
                let thumbs = comments[i].thumbs;
                if (thumbs.indexOf(userId) >= 0) {
                  thumbs.splice(thumbs.indexOf(userId), 1);
                }
                else {
                  thumbs.push(userId);
                }
              }
            }
            doc.save((err, doc) => {
              if (err) {
                resolve(false)
              }
              else {
                resolve(true);
              }
            })
          }
          else {
            resolve(false)
          }
        })
      }
      catch (err) {
        reject(err)
      }
    })
  }

  //关注/取消关注
  static async toggleFollow(authorId, userId) {
    return new Promise((resolve, reject) => {
      try {
        User.findOne({_id: authorId}, (err, doc) => {
          if (doc) {
            let fans = doc.fans;
            if (fans.indexOf(userId) >= 0) {
              fans.splice(fans.indexOf(userId), 1);
              User.findOne({_id: userId}, (err, doc) => {
                if (doc) {
                  doc.follows.splice(doc.follows.indexOf(authorId), 1)
                }
                doc.save((err, doc) => {
                  if (err) {
                    resolve(false)
                  }
                  else {
                    resolve(true);
                  }
                })
              })
            }
            else {
              fans.push(userId);
              User.findOne({_id: userId}, (err, doc) => {
                if (doc) {
                  doc.follows.push(authorId)
                }
                doc.save((err, doc) => {
                  if (err) {
                    resolve(false)
                  }
                  else {
                    resolve(true);
                  }
                })
              })
            }
            doc.save((err, doc) => {
              if (err) {
                resolve(false)
              }
              else {
                resolve(true);
              }
            })
          }
          else {
            resolve(false)
          }
        });
      }
      catch (err) {
        reject(err)
      }
    });
  }

//  收藏/取消收藏
  static async toggleCollect(articleId, userId) {
    return new Promise((resolve,reject)=>{
      try {
        Article.findOne({_id: articleId},(err,doc)=>{
          if(doc){
            let collected = doc.collected;
            if(collected.indexOf(userId)>=0){
              //  取消收藏
              let index = collected.indexOf(userId);
              collected.splice(index,1)
              User.findOne({_id:userId},(err,doc)=>{
                if(doc){
                  doc.collections.splice(index,1)
                }
                doc.save((err, doc) => {
                  if (err) {
                    resolve(false)
                  }
                  else {
                    resolve(true);
                  }
                })
              })
              doc.save((err, doc) => {
                if (err) {
                  resolve(false)
                }
                else {
                  resolve(true);
                }
              })
            }
            else {
              collected.push(userId);
              User.findOne({_id:userId},(err,doc)=>{
                if(doc){
                  doc.collections.push(articleId)
                }
                doc.save((err, doc) => {
                  if (err) {
                    resolve(false)
                  }
                  else {
                    resolve(true);
                  }
                })
              })
            }
            doc.save((err, doc) => {
              if (err) {
                resolve(false)
              }
              else {
                resolve(true);
              }
            })
          }
          else {
            resolve(false)
          }
        });
      }
      catch (err){
        reject(err)
      }
    });
  }
}

module.exports = Create;
