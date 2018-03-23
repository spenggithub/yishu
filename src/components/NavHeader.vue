<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="width-limit">
      <!--左上方logo-->
      <a href="/" class="logo">
        <img src="../assets/image/logo.png" alt="">
      </a>
      <!--右上角-->
      <!--未登录显示登录注册写文章-->
      <router-link  to="/write" class="btn write-btn">
        <i class="icon-write"></i>
        写文章</router-link>
      <div class="user" v-if="nickname">
        <div class="dropdown">

          <router-link @click="userIndex" :to="{name:'ArticleList',params:{userId:userId}}" class="username avatar">
            <img :src="api+/avatar/+avatarName" alt=""> <i class="fa fa-sort-down"></i>
          </router-link>
        </div>
        <ul class="dropdown-menu">
          <li>
            <router-link :to="{name:'ArticleList',params:{userId:userId}}">
              <i class="fa fa-user"></i>
              <span>我的主页</span>
            </router-link>
          </li>
          <li>
            <router-link to="/bookmarks">
              <i class="fa fa-bookmark"></i>
              <span>收藏的文章</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{name:'Profile'}">
              <i class="fa fa-cog"></i>
              <span>设置</span>
            </router-link>
          </li>
          <li>
            <a href="javascript:;" @click="logout">
              <i class="fa fa-sign-out"></i>
              <span>退出</span>
            </a>
          </li>
        </ul>
      </div>
      <!--<div class="style-mode">
        <a href="" class="style-mode-btn">
          <i class="fa fa-font"></i>
        </a>
        <div class="popover-modal">
          <div class="meta">
            <i class="fa fa-moon-o"></i>
            <span>夜间模式</span>
          </div>
          <div class="switch day-night-group">
            <a @click="toggleReadMode(true)" href="javascript:;" class="switch-btn" :class="{'active':isNightMode}">开</a>
            <a @click="toggleReadMode(false)" href="javascript:;" class="switch-btn" :class="{'active':!isNightMode}">关</a>
          </div>
          <hr>
          <div class="switch font-family-group">
            <a href="javascript:;" class="switch-btn active font-song">宋体</a>
            <a href="javascript:;" class="switch-btn font-hei">黑体</a>
          </div>
          <div class="switch">
            <a href="javascript:;" class="switch-btn">简</a>
            <a href="javascript:;" class="switch-btn">繁</a>
          </div>
        </div>
      </div>-->
      <router-link v-if="!nickname" to="/register" class="btn sign-up">注册</router-link>
      <router-link v-if="!nickname" to="/login" class="btn log-in">登录</router-link>
      <div class="container">
        <div class="collapse navbar-collapse" id="menu">
          <ul class="nav nav-bar-nav">
            <!--<li class="tab active">-->
              <!--<a href="/">-->
                <!--<span class="menu-text">首页</span>-->
                <!--<i class="fa fa-compass"></i>-->
              <!--</a>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
  import axios from 'axios'
    export default {
      data(){
        return {
          itemShow:false,
          avatarName:localStorage.avatarName,
          api:this.$store.state.api,
        }
      },
      computed:{
        nickname(){
          return this.$store.state.nickname
        },
        userId(){
          return this.$store.state.userId
        },
        isNightMode(){
          return this.$store.state.isNightMode
        }
      },
      methods:{
        checkLogin(){
          axios.get(this.api+'/user/checkLogin').then((response)=>{
            let res = response.data;
            if(res.status==='0'){
              this.$store.commit('updateUserInfo',res.result.username);
              this.$store.commit('updateUserId',res.result.userId);
              this.$store.commit('updateUserEmail',res.result.email);
              this.$store.commit('updateUserFollows',res.result.follows);
              this.$store.commit('updateUserFans',res.result.fans);
              this.$store.commit('updateIsNightMode',res.result.isNightMode);
              localStorage.userId = res.result.userId
            }
          })
        },
        userIndex(){
          this.$router.push({name:'User',params:{userId:userId},query: {
            t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
          }})
        },
        logout(){
          axios.post(this.api+'/user/logout').then(response=>{
            let res = response.data;
            if(res.status==='0'){
              this.checkLogin();
            }
          })
        },
        toggleReadMode(isNightMode){
          axios.post(this.api+'/setting/readMode',{
            isNightMode:isNightMode
          }).then(response=>{
            let res = response.data;
            if(res.status==='0'){
              this.$store.state.isNightMode = !this.$store.state.isNightMode
            }
          })
        }
      },
      mounted(){
        this.checkLogin();
      }
    }
</script>
<style lang="stylus" type="text/stylus">
  nav
    &:before
      content ''
      display table
    &:after
      clear both
      content ''
      display table
    height 56px
    .width-limit
      max-width 1440px
      margin 0 auto
      .logo
        float left
        height 56px
        padding 14px 25px 15px 20px
        img
          width 55px
          height 26px
      .sign-up
        float right
        width 80px
        height 38px
        line-height 24px
        font-size 15px
        color rgb(234, 111, 90)
        background-color: transparent;
        margin: 9px 5px 0 15px;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(236, 97, 73, 0.7);
        border-image: initial;
        border-radius: 20px
        transition 0.1s ease-in
        &:hover
          background rgb(254, 247, 246)
      .log-in
        float right
        font-size 15px
        margin 16px 6px 0 10px
        &:hover
          color rgb(150,150,150)
      .write-btn
        float right
        width 100px
        height 40px
        line-height 29px
        font-size 15px
        color #ffffff
        background-color: rgb(234, 111, 90);
        margin: 8px 15px 0;
        border-radius: 20px;
        i
          margin-right 3px
          font-size 19px
          vertical-align middle
      .user
        position relative
        float right
        height 56px
        &:hover
          background rgb(244, 244, 244)
        &:hover .dropdown-menu
          display inline-block
        .dropdown
          margin-top 9px
          .avatar
            width 40px
            height 40px
            margin 8px 28px 8px 20px
            img
              width 40px!important
              height 40px!important
            .fa
              transform: translateY(-2px)
              color #999
        .dropdown-menu
          position absolute
          left 0
          border-radius 0 0 4px 4px
          margin-top -2px
          li
            transition-duration 0.2s
            &:hover
              background rgb(245, 245, 245)
          &>li>a
            display block
            clear both
            font-weight 400
            color #333333
            white-space nowrap
          a
            padding 10px 20px
            line-height 30px
          i
            margin-right 15px
            font-size 18px
            color #ea6f5a
            vertical-align middle
          span
            vertical-align middle
      .style-mode
        position relative
        float right
        margin-top 15px
        .style-mode-btn
          line-height 20px
          padding 17px 10px 17px 15px
          font-size 24px
          color #969696
        .popover-modal
          position absolute
          top 41px
          left -86px
          z-index 1
          padding 20px 20px 20px 24px
          margin-left -80px
          min-width 235px
          background-color #ffffff
          border-radius 4px
          box-shadow: 0 2px 8px rgba(0,0,0,.1);
          filter: drop-shadow(0 0 8px rgba(0,0,0,.1));
          -webkit-filter: drop-shadow(0 0 8px rgba(0,0,0,.1));
          hr
            margin 20px -20px
            border-color: #f0f0f0;
            border 1px solid
          .meta
            padding-left 4px
            margin-right 16px
            font-size 14px
            color #969696
            line-height 40px
            vertical-align middle
            display inline-block
            i
              position relative
              top 2px
              margin-right 5px
              font-size 17px
            span
              vertical-align middle
          .day-night-group
            width auto
            vertical-align middle
            display inline-block
            float right
          .switch
            font-size 0
            letter-spacing -4px
          .switch-btn
            width 49%
            text-align center
            font-size 14px
            letter-spacing 0!important
            color #969696
            border 1px solid #e5e5e5
            vertical-align middle
            display inline-block
            &.active
              color #ffffff
              background-color: #6dacf4
              border-color #6dacf4
              box-shadow: inset 0 0 6px rgba(0, 0, 0, .1)
            &:first-child
              padding 10px 13px 10px 17px
              border-radius 20px 0 0 20px
              border-right none
            &:last-child
              padding 10px 17px 10px 13px
              border-radius 0 20px 20px 0
              border-left none


          .font-family-group
            margin-bottom 10px
            .font-song
              font-family Georgia,Times New Roman,Times,Songti SC,serif
            .font-hei
              font-family -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif
          &:after
            position absolute
            top -10px
            left 78%
            content ''
            display inline-block
            border 9px solid transparent
            border-top none
            top: -9px;
            border-bottom: 9px solid #fff;
  .navbar-default
    background #ffffff
    border-color: rgb(240,240,240)
  .navbar-fixed-top
    top 0
    border-width 0 0 1px
  .navbar
    min-height 50px
    margin-bottom 20px
    border-style solid
    border-image initial
</style>
