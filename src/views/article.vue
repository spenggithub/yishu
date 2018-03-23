<template>
  <div>
    <nav-header></nav-header>
    <div class="note">
      <div class="post">
        <div class="article">
          <h1 class="title">{{articleContent.title}}</h1>
          <!--作者区域-->
          <div class="author">
            <a href="" class="avatar">
              <img :src="api+'/avatar/'+avatarName" alt="">
            </a>
            <div class="info">
              <span class="name">
                <a href="">{{authorInfo.username}}</a>
              </span>
              <div class="meta">
                <span class="publish-time">{{articleContent.create_time}}</span>
                <span class="wordage">字数 0</span>
                <span class="views-count">阅读 0</span>
                <span class="comments-count">评论 0</span>
                <span class="likes-count">喜欢 0</span>
              </div>

            </div>
            <!--如果是当前作者，加入编辑按钮-->
            <router-link  v-if="authorInfo._id===this.$store.state.userId" :to="{name:'Edit',params:{articleId:articleContent._id}}" class="edit">编辑文章</router-link>
          </div>
          <!--文章内容-->
          <div class="show-content ql-editor" v-html="articleContent.content">
          </div>
          <!--文章底部作者信息-->
          <div class="follow-detail">
            <div class="info">
              <a href="" class="avatar">
                <img :src="api+'/avatar/'+avatarName" alt="">
              </a>
              <a @click="togglefollow" v-show="!oneself" href="javascript:;" class="btn btn-success follow" :class="{'btn-success':!isFollowed,'follow':!isFollowed,'following':isFollowed,'btn-default':isFollowed}">
                <i class="fa" :class="{'fa-plus':!isFollowed,'fa-check':isFollowed}"></i>
                <span>{{isFollowed?'已关注':'关注'}}</span></a>
              <a href="" class="title">{{authorInfo.username}}</a>
              <p>写了 53698字，被 {{fansNum}} 人关注，文章被收藏 {{0}} 次</p>
            </div>
            <div class="signature">
              {{authorInfo.description}}
            </div>
          </div>
          <div class="meta-bottom">
            <div class="like">
              <div @click="toggleCollect" class="btn like-group" :class="{'active':isCollected}">
                <div class="btn-like">
                  <a href="javascript:;">
                    <i class="fa fa-heart-o"></i>
                    收藏
                  </a>
                </div>
                <div class="modal-wrap">
                  <a href="javascript:;">{{collected.length}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <comment :comments="comments" :commentUser="commentUser" v-on:getComments="getArticleContent"></comment>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import NavHeader from '../components/NavHeader.vue'
  import Comment from '../components/comment.vue'

  export default {
    components: {
      NavHeader,
      Comment
    },
    data() {
      return {
        articleContent: {},
        authorInfo: {},
        isFollowed:false,
        isCollected:false,
        collected:[],
        fansNum:'',
        comments:[],
        commentUser:{},
        avatarName:'',
        api:this.$store.state.api,
      }
    },
    methods: {
      getSimpleText(html) {
        let re1 = new RegExp("<.+?>", "g");
        let abstract = html.replace(re1, '')
        return abstract
      },
      getArticleContent() {
        let articleId = this.$route.params.articleId
        axios.get(this.api+'/article/getArticleContent', {
          params: {'articleId': articleId}
        }).then(response => {
          let res = response.data;
          if (res.status === '0') {
            this.collected = res.result.collected;
            this.articleContent = res.result;
            this.comments = res.result.comments.reverse();
            this.commentUser = res.commentUser;
            let userId = this.$store.state.userId;
            if(this.articleContent.collected.indexOf(userId)>=0){
              this.isCollected = true
            }
            else{
              this.isCollected = false
            }
          }
        })
      },
      getAuthorInfo() {
        let articleId = this.$route.params.articleId;
        axios.get(this.api+'/article/getAuthorInfo', {
          params: {'articleId': articleId}
        }).then(response => {
          let res = response.data;
          let userId = this.$store.state.userId;
          let articleId = this.articleContent._id;
          if (res.status === '0') {
            this.avatarName = res.result.avatar
            this.authorInfo = res.result;
            this.fansNum = res.result.fans.length;
            if(this.authorInfo.fans.indexOf(userId)>=0){
              this.isFollowed = true
            }
            else {
              this.isFollowed = false
            }
          }
        })
      },
      togglefollow(){
        axios.post(this.api+'/user/toggleFollow',{
          userId:this.$store.state.userId,
          authorId:this.authorInfo._id
        }).then(response=>{
          let res = response.data;
          if(res.status==='0'){
            this.getAuthorInfo()
          }
        })
      },
      toggleCollect(){
        axios.post(this.api+'/article/toggleCollect',{
          userId:this.$store.state.userId,
          articleId:this.articleContent._id
        }).then(response=>{
          let res = response.data;
          if(res.status==='0'){
            this.getArticleContent();
          }
        });
      }
    },
    computed:{
      oneself(){
        return this.$store.state.userId===this.authorInfo._id
      }
    },
    mounted() {
      this.getArticleContent();
      this.getAuthorInfo()
    }
  }
</script>
<style lang="stylus" type="text/stylus">
  .note
    position relative
    padding-top 10px
    .post
      margin 0 auto
      padding-top 20px
      padding-bottom 40px
      width 620px
      .article
        .title
          word-break: break-word
          margin 20px 0 0
          font-size 34px
          font-weight: 700
          line-height 1.3
        .author
          margin 30px 0 40px
          .avatar
            width 48px
            height 48px
            vertical-align middle
            display inline-block
          .info
            vertical-align middle
            display inline-block
            margin-left 8px
            .name
              margin-right 3px
              font-size 16px
              vertical-align middle
          .edit
            float right
            margin-top 8px
            padding 0 12px
            font-size 14px
            border 1px solid #dcdcdc
            color #9b9b9b
            line-height 30px
            border-radius 50px
          .meta
            margin-top 5px
            font-size 12px
            color #969696
            span
              padding-right 5px
        .show-content
          color #2f2f2f
          word-break break-word !important
          font-size 16px
          font-weight 400
          line-height 1.7
        .follow-detail
          padding 20px
          background-color: hsla(0, 0%, 71%, .1)
          border: 1px solid #e1e1e1
          border-radius: 4px
          font-size: 12px
          .info
            min-height 47px
            .avatar
              float left
              margin-right 10px
              width 48px
              height 48px
              border: 1px solid #ddd;
              border-radius: 50%;
              background #db5462
            .btn
              float right
              margin-top 4px
              padding: 13px 0
              width: 100px
              font-size: 16px
              span
                margin-left 2px
                display inline
            .title
              margin-right 3px
              font-size 17px
              line-height 1.8
              vertical-align middle
              font-weight normal
            p
              margin-bottom 0
              color #969696
          .signature
            margin-top: 20px
            padding-top: 20px
            border-top: 1px solid #e1e1e1
            color: #969696
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
        .meta-bottom
          margin-top 30px
          margin-bottom 80px
          .like
            display inline-block
            .like-group
              &:hover
                background rgb(254, 247, 246)
              &.active
                background #ea6f5a
                & i,& a,.modal-wrap
                  color #ffffff!important
                  border-color #ffffff!important
              padding 17px 0 17px
              font-size 0
              border 1px solid #ea6f5a
              border-radius 40px
              .btn-like
                font-size 19px
                display inline-block
                a
                  color #ea6f5a
                  padding 18px 15px 18px 30px
                  i
                    margin-right 5px
                    font-size 21px
              .modal-wrap
                font-size 18px
                border-left 1px solid rgba(236,97,73,.4)
                display inline-block
                a
                  color #ea6f5a
                  padding: 18px 30px 18px 17px
</style>
