const mongoose = require('mongoose');
const User = require('../models/users');
const Check = require('../init/nosql/check');
const Edit = require('../init/nosql/edit');
const Create = require('../init/nosql/create');
const Get = require('../init/nosql/get');
class ArticleController{
  //发表文章
  static async createArticle(ctx){
    let now = new Date();
    let minutes=(now.getMinutes()>=0 && now.getMinutes()<10)?'0'+now.getMinutes():now.getMinutes();
    let create_time = now.getFullYear() + '年'+now.getMonth()+'月'+now.getDate()+'日'+now.getHours()+':'+ minutes;
    let articleContent = {
      title:ctx.request.body.title,
      email:ctx.session.email,
      content:ctx.request.body.content,
      create_time:create_time
    };
    let createResult = Create.createArticle(articleContent);
    if(createResult){
      ctx.body = {
        status:'0',
        msg:'success'
      }
    }
    else {
      ctx.body = {
        status:'1',
        msg:'failed'
      }
    }
  }
  //编辑文章
  static async editArticle(ctx){
    let articleId = ctx.request.body.articleId;
    let title = ctx.request.body.title;
    let content = ctx.request.body.content;
    let editResult = await Edit.editArticle(articleId,title,content);
    if(editResult){
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
  //获取文章列表
  static async getArticleList(ctx){
    let userId = ctx.query.userId;
    let userInfo = await Get.getUserInfo(userId);
    let userEmail = userInfo.email;
    let articleListResult = await Get.getArticleList(userEmail);
    if(articleListResult){
      ctx.body = {
        status:'0',
        msg:'success',
        result:articleListResult
      }
    }
  }
  //获取单篇文章的内容
  static async getArticleContent(ctx){
    let articleId = ctx.request.query.articleId;
    let articleResult = await Get.getArticleContent(articleId);
    if(articleResult){
      let comments = articleResult.comments;
      let commentUser = [];
      for(let i = 0;i<comments.length;i++){
        let userInfo = await Get.getUserInfo(comments[i].userId)
        commentUser.push(userInfo)
      }
      ctx.body = {
        status:'0',
        msg:'success',
        result:articleResult,
        commentUser:commentUser
      }
    }
    else {
      ctx.body = {
        status:'1',
        msg:'failed'
      }
    }
  }
  //获取作者信息
  static async getAuthorInfo(ctx){
    let articleId = ctx.request.query.articleId;
    let authorResult = await Get.getAuthorInfo(articleId);
    ctx.set('Access-Control-Allow-Origin','*');
    ctx.set('Access-Control-Allow-Methods:GET,POST')
    if(authorResult){
      ctx.body = {
        status:'0',
        msg:'success',
        result:authorResult
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
  //发表评论
  static async postComment(ctx){
    let now = new Date();
    let minutes=(now.getMinutes()>=0 && now.getMinutes()<10)?'0'+now.getMinutes():now.getMinutes();
    let create_time = now.getFullYear() + '年'+(now.getMonth()+1).toString()+'月'+now.getDate()+'日'+now.getHours()+':'+ minutes;
    let comment_content = ctx.request.body.post_comment_content;
    let articleId = ctx.request.body.articleId;
    let userId = ctx.session.userId;
    let comment = {
      content:comment_content,
      userId:userId,
      thumb:0,
      create_time:create_time
    };
    let postCommentResult = await Create.postComment(articleId,comment);
    if(postCommentResult){
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
//  给评论点赞
  static async clickThumb(ctx){
    let userId =ctx.request.body.userId;
    console.log(userId);
    let articleId = ctx.request.body.articleId;
    let commentId = ctx.request.body.commentId;
    let thumbResult = await Create.clickThumb(userId,articleId,commentId);
    if(thumbResult){
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
//  收藏/取消收藏
  static async toggleCollect(ctx){
    let userId = ctx.request.body.userId;
    let articleId = ctx.request.body.articleId;
    let toggleCollectResult = await Create.toggleCollect(articleId,userId)
    if(toggleCollectResult){
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
}
module.exports= ArticleController;
