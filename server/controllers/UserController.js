const mongoose = require('mongoose');
const User = require('../models/users');
const Check = require('../init/nosql/check');
const Create = require('../init/nosql/create');
const Get = require('../init/nosql/get');
const Edit = require('../init/nosql/edit');
const Captcha = require('../util/captcha');
const os = require('os');
const copyAvatar = require('../util/copyAvatar');
const path = require('path');
class UserController{
  //登录
  static async  login(ctx){
    let email = ctx.request.body.email;
    console.log(email);
    let password = ctx.request.body.password;
    console.log(password);
    let userResult = await Check.checkUser(email,password);
    if(userResult){
      ctx.body = {
        status:'0',
        msg:'登入成功',
        username:userResult.username,
        result:userResult
      };
      let session = ctx.session;
      session.isLogin = true;
      session.username = userResult.username
      session.userId = userResult.id;
      session.email = userResult.email;
    }else {
      ctx.body = {
        status:'1',
        msg:'用户名或密码错误'
      };
    }

  }
  //检测登录
  static async checkLogin(ctx){
    let loginResult = Check.checkLogin(ctx);
    ctx.body = {
      status:'0',
      msg:'success',
      result:loginResult
    }
  }
  //退出
  static async logout(ctx){
    ctx.session = null
    if(!ctx.session){
      ctx.body = {
        status:'0',
        msg:'success',
        result:''
      }
    }
  }
  //获取用户信息
  static async getUserInfo(ctx){
    let userId = ctx.request.query.userId;
    let userResult = await Check.selectUser(userId);
    if(userResult){
      ctx.body = {
        status:'0',
        msg:'success',
        result:userResult
      }
    }
    else {
      ctx.status=404;
      ctx.body = {
        status:'1',
        msg:'fail',
        result:userResult
      }
    }

  }
  //注册
  static async register(ctx){
    let username = ctx.request.body.username;
    let email = ctx.request.body.email;
    let password = ctx.request.body.password;
    let registerResult = await Create.createUser(username,email,password);
    if(registerResult){
      ctx.body = {
        status:'0',
        msg:'success',
        result:registerResult
      };
      let session = ctx.session;
      session.isLogin = true;
      session.username = registerResult.username;
      session.userId = registerResult.id;
      session.email = registerResult.email;
    }
    else{
      ctx.body = {
        status:'1',
        msg:'fail'
      };
    }
  }
  //检测邮箱是否可用
  static async emailCheck(ctx){
    let email = ctx.request.body.email;
    if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)){
      let emailCheckResult = await Check.selectUserByEmail(email);
      ctx.set('Access-Control-Allow-Origin','http://www.vjianshu.xyz');
      ctx.set('Access-Control-Allow-Methods:GET,POST')
      if(emailCheckResult){
        ctx.body={
          status:'0',
          msg:'success',
          result:'该邮箱已经注册，换一个吧'
        }
      }
      else {
        ctx.body={
          status:'1',
          msg:'fail',
          result:'恭喜你,该邮箱可以使用!'
        }
      }
    }
    else{
      ctx.body = {
        status:'2',
        msg:'fail',
        result:'请输入正确的邮箱格式'
      }
    }

  }
  //编辑签名
  static async editDescription(ctx){
    let userId = ctx.session.userId;
    let description = ctx.request.body.description;
    let editDesResult = await Edit.editDescription(userId,description);
    if(editDesResult){
      ctx.body = {
        status:'0',
        msg:'success',
        result:''
      }
    }
    else {
      ctx.body = {
        status:'1',
        msg:'fail',
        result:''
      }
    }

  }
  //关注/取消关注
  static async toggleFollow(ctx){
    let authorId = ctx.request.body.authorId;
    let userId = ctx.request.body.userId;
    let toggleFollowResult = Create.toggleFollow(authorId,userId);
    if(toggleFollowResult){
      ctx.body = {
        status:'0',
        msg:'success',
        result:''
      }
    }
    else {
      ctx.body = {
        status:'1',
        msg:'fail',
        result:''
      }
    }
  }
  //  获取关注列表
  static async getFollowingList(ctx){
    let userId = ctx.query.userId;
    let userInfo = await Get.getUserInfo(userId);
    if(userInfo){
      let follows = userInfo.follows;
      let followers = [];
      for(let i = 0;i<follows.length;i++){
        let follower = await Get.getUserInfo(follows[i]);
        let articleList = await Get.getArticleList(follower.email);
        follower.articleNums = articleList.length;
        followers.push(follower)
      }
      ctx.body = {
        status:'0',
        msg:'fail',
        result:followers
      }
    }
  }
  //  获取粉丝列表
  static async getFansList(ctx){
    let userId = ctx.query.userId;
    let userInfo = await Get.getUserInfo(userId);
    if(userInfo){
      let fans = userInfo.fans;
      let fansList = [];
        for(let i = 0;i<fans.length;i++){
          let fan = await Get.getUserInfo(fans[i]);
          let articleList = await Get.getArticleList(fan.email);
          fan.articleNums = articleList.length;
          fansList.push(fan)
        }
        ctx.body = {
          status:'0',
          msg:'fail',
          result:fansList
        }
    }
  }
  //  获取收藏文章
  static async getCollectedArticleList(ctx){
    let userId = ctx.query.userId;
    let userInfo = await Get.getUserInfo(userId);
    let articleList = [];
    let authorList = [];
    if(userInfo){
      let collectionArticleId = userInfo.collections
      for(let i = 0;i<collectionArticleId.length;i++){
        let article = await Get.getArticleContent(collectionArticleId[i]);
        let author = await Get.getAuthorInfo(collectionArticleId[i]);
        articleList.push(article)
        authorList.push(author)
      }
      ctx.body = {
        status:'0',
        msg:'success',
        result:[articleList,authorList]
      };
    }
    else {
      ctx.body = {
        status:'1',
        msg:'fail',
        result:''
      }
    }
  }
  //  编辑个人信息
  static async editInfo(ctx){
    let userId = ctx.session.userId;
    let infoDoc = ctx.request.body;
    let editResult = await Edit.editInfo(userId,infoDoc)
    if(editResult){
      ctx.body = {
        status:'0',
        msg:'success',
        result:''
      }
    }
  }
  //  获取验证码
  static async getCaptcha(ctx){
    UserController.str = Captcha.makeStr()
    let img = Captcha.makeCapcha(UserController.str);
    console.log(UserController.str);
    if(img){
      ctx.body = {
        status:'0',
        msg:'success',
        result:'data:bmp;base64,'+img.getFileData().toString('base64')
      }
    }
    else{
      ctx.body = {
        status:'1',
        msg:'fail',
      }
    }
  }
  //验证验证码
  static async checkCaptcha(ctx){
    let captchaStr = ctx.request.body.captchaStr;
    ctx.set('Access-Control-Allow-Origin','http://www.vjianshu.xyz');
    ctx.set('Access-Control-Allow-Methods:GET,POST')
    if(captchaStr.toLowerCase()===UserController.str.toLowerCase()){
      ctx.body = {
        status:'0',
        msg:'success',
        result:''
      }
    }
    else{
      ctx.body = {
        status:'1',
        msg:'fail',
        result:''
      }
    }

  }
//  上传头像
  static async uploadAvatar(ctx){
    let userId = ctx.session.userId;
    let filePath = ctx.request.body.files.avatar.path;
    let avatarPath = path.resolve('./uploads/avatar/'+userId+'.png');
    const files = ctx.request.body.files || {};
    //读取保存在临时目录中的头像
    let copyAvatarResult = await copyAvatar(filePath,avatarPath,userId);
    let saveAvatar = await  Edit.findByIDEditAvatar(userId,userId+'.png');
    if(saveAvatar){
      ctx.body = {
        status:'0',
        msg:'success'
      }
    }
    else {
      ctx.body = {
        status:'1',
        msg:'fail'
      }
    }
  }
}
UserController.str = '';
module.exports= UserController;
