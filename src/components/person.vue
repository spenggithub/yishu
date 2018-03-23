<template>
    <div class="container person">
      <div class="row">
        <main>
          <div class="main-top">
            <a href="" class="avatar">
              <img :src="api+'/avatar/'+avatarName" alt="avatar">
            </a>
            <div class="title">
              <a href="" class="name">{{authorInfo.username}}</a>
              <i class="fa" :class="{'fa-mars':authorInfo.sex===0,'fa-venus':authorInfo.sex===1}"></i>
            </div>
            <div class="info">
              <ul>
                <li>
                  <div class="meta-block">
                    <router-link :to="{name:'Follow'}">
                      <p>{{followsNum}}</p>
                      关注 <i class="fa fa-angle-right"></i>
                    </router-link>
                  </div>
                </li>
                <li>
                  <div class="meta-block">
                    <router-link :to="{name:'Fans'}">
                      <p>{{fansNum}}</p>
                      粉丝 <i class="fa fa-angle-right"></i>
                    </router-link>
                  </div>
                </li>
                <li>
                  <div class="meta-block">
                    <router-link :to="{name:'ArticleList'}">
                      <p>{{articleList.length}}</p>
                      文章 <i class="fa fa-angle-right"></i>
                    </router-link>
                  </div>
                </li>
                <li>
                  <div class="meta-block">
                    <a href="">
                      <p>{{10}}</p>
                      字数 <i class="fa fa-angle-right"></i>
                    </a>
                  </div>
                </li>
                <li>
                  <div class="meta-block">
                    <a href="">
                      <p>{{collectedNum}}</p>
                      被收藏 <i class="fa fa-angle-right"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <slot name="usermenu"></slot>
          <div id="list-container">
            <slot name="list"></slot>
          </div>
        </main>
        <aside>
          <div v-show="authorInfo._id===userId">
            <div class="title">个人介绍</div>
            <a @click="user_intro_edit" href="javasrcipt:;" class="function-btn">
              <i class="fa fa-pencil"></i>
              编辑
            </a>
            <form v-show="user_intro_form" action="" class="profile-edit js-intro-form">
              <textarea v-model="description" name="user-intro" id="user-intro"></textarea>
              <input type="button" @click="editDescription" value="保存" class="btn btn-hollow">
              <a href="javascript:;" @click="user_intro_edit">取消</a>
            </form>
            <div class="description">
              <div class="js-intro" v-show="!user_intro_form">{{description}}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
</template>
<script>
  import axios from 'axios'
    export default {
      data(){
        return {
          menus:[
            {text:'文章',icon:'fa-file-text'},
            {text:'动态',icon:'fa-bell'},
            {text:'最新评论',icon:'fa-comments'},
            {text:'热门',icon:'fa-fire'}
            ],
          itemShow:true,
          description:'',
          user_intro_form:false,
          authorInfo:{},
          followsNum:'',
          fansNum:'',
          articleList:[],
          avatarName:'',
          api:this.$store.state.api,
        }
      },
      methods:{
        user_intro_edit(){
          this.user_intro_form = !this.user_intro_form
        },
        editDescription(){
          let description = this.description;
          axios.post(this.api+'/user/editDescription',{
            description:description
          }).then(response=>{
            let res = response.data;
            if(res.status==='0'){
              this.user_intro_form = false;
            }
          })
        },
        getAuthorInfo(){
          let userId = this.$route.params.userId;
          axios.get(this.api+'/user/getUserInfo',{
            params:{'userId':userId}
          }).then((response)=>{
            let res = response.data;
            if(res.status==='0'){
              this.authorInfo = res.result;
              this.description = res.result.description
              this.followsNum = res.result.follows.length
              this.fansNum = res.result.fans.length
              this.avatarName = res.result.avatar

            }
          }).catch(response=>{
            if(response instanceof Error){
              this.$router.push({name:'NotFound',path:'/sdsds'})
            }
          })
        },
        getArticleList(){
          let userId = this.$route.params.userId;
          axios.get(this.api+'/article/getArticleList',{
            params:{'userId':userId}
          }).then(response=>{
            let res = response.data;
            if(res.status==='0'){
              this.articleList = res.result.reverse();
              let collectedNum = 0;
              this.articleList.forEach(article=>{
                collectedNum+=article.collected.length;
              });
              this.$store.commit('updateCollectedNum',collectedNum)
            }
          })
        }
      },
      mounted(){
        this.getAuthorInfo()
        this.getArticleList()
      },
      computed:{
        collectedNum(){
          return this.$store.state.collectedNum
        },
        userId(){
          return this.$store.state.userId
        }
      }
    }
</script>
<style lang="stylus" type="text/stylus">
  .person
    padding-top 0
    margin-left: -15px
    margin-right: -15px
    .row
      padding-top 30px
      margin-left: -15px
      margin-right: -15px
      &:after,&:before
        content: ""
        display: table
      main
        padding-right 0
        width 66.66667%
        float left
        position relative
        min-height 1px
        padding-left 15px
        .main-top
          margin-bottom 20px
          .avatar
            display block
            float left
            width 80px
            height 80px
            margin-left -2px
          .title
            padding 5px 0 0 100px
            .name
              display inline
              font-size 21px
              font-weight 700
              vertical-align middle
            i
              font-size 17px
              vertical-align middle
            .fa-mars
              color #3194d0
            .fa-venus
              color #ea6f5a
          .info
            margin-top 4px
            padding-left 100px
            font-size 14px
            ul
              font-size 0
              li
                display inline-block
                .meta-block
                  a
                    color #969696
                    p
                      font-size 15px
                      margin-bottom -3px
                      color #333
                  font-size 12px
                  margin 0 7px 6px 0
                  padding 0 7px 0 0
                  border-right 1px solid #f0f0f0
        .trigger-menu
          margin-bottom 20px
          border-bottom 1px solid #f0f0f0
          font-size 0
          li
            position relative
            display inline-block
            padding 8px 0
            margin-bottom -1px
            &.active
              border-bottom 2px solid #646464
            a
              display block
              padding 13px 20px
              font-size 15px
              font-weight 700
              line-height 25px
              color #969696
              transition all 0.2s ease-in
              &.active
                color #333
                &:after
                  width 100%
              i
                margin-right 5px
                font-size 17px
              &:after
                content ''
                position absolute
                top 66px
                left 0
                width 0
                height 2px
                background #333
                transition:width 0.3s linear
              &:hover
                color #333
                &:after
                  width 100%

        aside
          padding 0
          margin-left 4.16667%
          width 29.16667%
          float left
          position: relative
          min-height: 1px
      aside
        position relative
        padding 0
        margin-left: 4.16667%
        width 29.16667%
        float left
        .title
          float left
          margin-bottom 10px
          font-size 14px
          color #969696
        .function-btn
          float right
          font-size 14px
          color #969696
        .description
          position relative
          margin-bottom 16px
          padding 0 0 16px
          text-align left
          font-size 0
          border-bottom 1px solid #f0f0f0
          clear both
          word-break break-word
          .js-intro
            margin-bottom 10px
            line-height 20px
            font-size 14px
        .profile-edit
          textarea
            margin-bottom 5px
            width 100%
            height 125px
            padding 5px 10px
            font-size 14px
            background hsla(0,0%,71%,.1)
            border: 1px solid #c8c8c8
            border-radius: 4px
            resize: none
            outline: none
          .btn-hollow
            padding 5px 20px
            font-size 14px
          a
            margin-left: 10px
            font-size: 14px
            color: #969696
            line-height: 34px
            vertical-align: middle
</style>
