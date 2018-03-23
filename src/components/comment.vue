<template>
    <div id="comment-list">
      <form class="new-comment">
        <a href="" class="avatar">
          <img :src="api+'/avatar/'+avatarName" alt="avatar">
        </a>
        <textarea v-model="post_comment_content" @focus="sendBtnDisplay" placeholder="写下你的评论"></textarea>
        <transition name="fade">
          <div v-show="sendBtn" class="write-function-block">
            <a href="javascript:;" @click="postComment" class="btn btn-send">发送</a>
            <a href="javascript:;" class="cancel">取消</a>
          </div>
        </transition>
      </form>
      <div class="normal-comment-list" id="normal-comment-list">
        <div class="top">
          <span>{{comments.length}}</span>
          <a href="javascript:;" class="author-only">只看作者</a>
          <div class="pull-right">
            <a href="" class="active">按喜欢排序</a>
            <a href="">按时间正序</a>
            <a href="">按时间倒叙</a>
          </div>
        </div>
        <div v-for="(comment,index) in comments" class="comment">
          <div>
            <div class="author">
              <a href="" target="_blank" class="avatar">
                <img :src="'/avatar/'+commentUser[index].avatar" alt="avatar">
              </a>
              <div class="info">
                <a href="" target="_blank" class="name">{{commentUser[index].username}}</a>
                <div class="meta">
                  <span>{{comment.floor}}楼 ·{{comment.create_time}}</span>
                </div>
              </div>
            </div>
            <div class="comment-wrap">
              <p>{{comment.content}}</p>
              <div @click="clickThumbBtn(index,comment._id)" class="tool-group">
                <a href="javascript:;">
                  <i class="fa" :class="{'fa-thumbs-o-up':!thumb[index],'fa-thumbs-up':thumb[index]}"></i>
                  <span>{{comment.thumbs.length>0?comment.thumbs.length+'人':''}}赞</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import axios from 'axios'
    export default {
      data(){
        return{
          sendBtn:false,
          post_comment_content:'',
         comments:[],
         commentUser:{},
          avatarName:localStorage.avatarName,
          api:this.$store.state.api,
        };
      },
      methods:{
       // 获取评论列表
       getComments(){
         let articleId = this.$route.params.articleId;
         let userId = this.$store.state.userId;
         axios.get(this.api+'/article/getArticleContent',{
           params:{
             articleId:articleId
           }
         }).then(response=>{
           let res = response.data;
           if(res.status==='0'){
             this.comments = res.result.comments.reverse();
             this.commentUser = res.commentUser;
           }
         })
       },
       // 发表评论
        postComment(){
          let articleId = this.$route.params.articleId;
          let post_comment_content = this.post_comment_content;
          axios.post(this.api+'/article/postComment',{
            articleId:articleId,
            post_comment_content:post_comment_content
          }).then(response=>{
            let res = response.data;
            if(res.status==='0'){
              this.getComments()
            }
          })
        },
//        发送按钮切换状态
        sendBtnDisplay(){
          this.sendBtn = true
        },
//        点赞
        clickThumbBtn(index,commentId){
         console.log(commentId);
          axios.post(this.api+'/article/clickThumb',{
            userId:this.$store.state.userId,
            articleId:this.$route.params.articleId,
            commentId:commentId
          }).then(response=>{
            let res = response.data;
            if(res.status==='0'){
              this.getComments()
            }
          });
        }
      },
      mounted(){
       this.getComments()
      },
      computed:{
        thumb(){
          let userId = this.$store.state.userId;
          let thumb=[];
          for(let i = 0;i<this.comments.length;i++){
            for(let j = 0;j<this.comments[i].thumbs.length;j++){
              if(this.comments[i].thumbs[j]===userId){
                thumb[i] = true;
              }
            }
          }
          return thumb
        }
      }
    }
</script>
<style lang="stylus" type="text/stylus">
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
    opacity: 0
  #comment-list
    padding-top 20px
    .new-comment
      position relative
      margin-left 48px
      .avatar
        margin-right: 5px
        width: 38px
        height: 38px
        vertical-align: middle
        display: inline-block
        position absolute
        left -48px
      textarea
        padding: 10px 15px
        width: 100%
        height: 80px
        font-size: 13px
        border: 1px solid #dcdcdc
        border-radius: 4px
        background-color: hsla(0,0%,71%,.1)
        resize: none
        display: inline-block
        vertical-align: top
        outline-style: none
      .btn-send
        float: right;
        width: 78px;
        margin: 10px 0;
        padding: 8px 18px;
        font-size: 16px;
        border: none;
        border-radius: 20px;
        color: #fff!important;
        background-color: #42c02e;
        cursor: pointer
        outline: none
        display: block
      .cancel
        float: right
        margin: 18px 30px 0 0
        font-size: 16px
        color: #969696
    .normal-comment-list
      clear both
      margin-top 50px
      .top
        padding-bottom 20px
        font-size 17px
        font-weight 700
        border-bottom: 1px solid #f0f0f0
        span
          vertical-align middle
        .author-only
          margin-left 10px
          padding 4px 8px
          font-size 12px
          color #969696
          border 1px solid #e1e1e1
          border-radius 12px
        .pull-right
          float right
          .active
            color #2f2f2f
          a
            margin-left: 10px
            font-size: 12px
            font-weight: 400
            color: #969696
            display: inline-block
      .comment
        padding: 20px 0 30px
        border-bottom: 1px solid #f0f0f0
        .author
          margin-bottom: 15px
          .avatar
            margin-right: 5px
            width: 38px
            height: 38px
            vertical-align: middle
            display: inline-block
            border: 1px solid #ddd
            border-radius: 50%
            background #db5462
          .info
            display inline-block
            vertical-align middle
            .name
              font-size 15px
              color #333
              line-height 22px
            .meta
              font-size: 12px;
              color: #969696;
        .comment-wrap
          p
            font-size 16px
            margin 10px 0
            line-height 1.5
          .tool-group
            &:hover a
              color #333
            &:hover i
              color #ea6f5a
            a
              margin-right 10px
              font-size 0
              color #969696
              display inline-block
              transition-duration 0.2s
              i
                margin-right: 5px
                font-size: 18px
                vertical-align: middle
                transition-duration 0.2s
                &.fa-thumbs-up
                  color #ea6f5a
              span
                vertical-align middle
                font-size 14px
</style>
