<template>
  <div>
    <nav-header></nav-header>
    <div class="container setting">
      <div class="row">
        <aside>
          <ul>
            <li>
              <router-link to="/settings/basic">
                <div class="setting-icon">
                  <i class="fa fa-list"></i>
                </div>
                <span>基础设置</span>
              </router-link>
            </li>
            <li>
              <router-link to="/settings/profile">
                <div class="setting-icon">
                  <i class="fa fa-id-card"></i>
                </div>
                <span>个人资料</span>
              </router-link>
            </li>
            <li>
              <router-link to="/settings/basic">
                <div class="setting-icon">
                  <i class="fa fa-ban"></i>
                </div>
                <span>黑名单</span>
              </router-link>
            </li>
            <li>
              <router-link to="/settings/basic">
                <div class="setting-icon">
                  <i class="fa fa-cog"></i>
                </div>
                <span>账号管理</span>
              </router-link>
            </li>
          </ul>
        </aside>
        <div class="col-xs-16 col-xs-offset-8 main">
          <router-view :userInfo="userInfo" :avatarName="avatarName"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import NavHeader from '../components/NavHeader.vue'
  import axios from 'axios'
    export default {
      data(){
        return {
          userInfo:{},
          avatarName:'',
          api:this.$store.state.api,
        }
      },
      components:{
        NavHeader
      },
      methods:{
        getAuthorInfo(){
          let userId = localStorage.userId;
          axios.get(this.api+'/user/getUserInfo',{
            params:{'userId':userId}
          }).then((response)=>{
            let res = response.data;
            if(res.status==='0'){
              this.userInfo = res.result;
              this.avatarName = res.result.avatar
            }
          });
        },
      },
      created(){
        this.getAuthorInfo()
      }
    }
</script>
<style lang="stylus" type="text/stylus">
  .setting
    .row
      padding-top 30px
      aside
        position fixed
        top 0
        bottom 0
        margin 86px 0 0
        padding 0 0 30px
        width 280px
        overflow auto
        ul
          list-style none
          li.active a,li:hover a
            background-color #f0f0f0
            border-radius 4px
          a
            padding 10px 15px
            font-size 15px
            display block
            transition-duration 0.2s
            .setting-icon
              margin-right 15px
              width 32px
              height 32px
              text-align center
              color #ffffff
              background-color #a0a0a0
              border-radius 4px
              display inline-block
              vertical-align middle
              i
                margin 6px 0 0 1px
                font-size 18px
                display block

            span
              vertical-align middle
      .main
        padding-left 0
        .avatar
          width 100px
          height 100px
        .col-xs-5,.col-xs-6,.col-xs-8,.col-xs-11,.col-xs-16,.col-xs-18
          padding 0
        .setting-save
          width 100px
          margin 30px 0 60px
          border-radius 20px
          border none
        .hide
          position absolute
          display block!important
          width 82px
          opacity 0
        table
          width 100%
        tr
          border-bottom 1px solid #f0f0f0
        td
          padding 20px 0
          width 130px
        span
          margin 0 20px 0 6px
          font-size 15px
          vertical-align middle
        form
          margin 0
        textarea
          width 100%
          height 100px
          margin-bottom 10px
          padding 8px 10px
          font-size 15px
          border 1px solid #c8c8c8
          border-radius 4px
          background-color hsla(0,0%,71%,.1)
          display block
          resize none
          outline none
        input[type=email],input[type=text]
          padding 5px 10px
          font-size 15px
          border 1px solid #c8c8c8
          border-radius 4px
          background-color hsla(0,0%,71%,.1)
        p
          margin 0
          padding 8px 0 0
          font-size 12px
          color #969696
          clear both
        .setting-verticle
          vertical-align bottom
        .setting-title
          font-size 15px
          color #969696
        .top-line
          padding-top 0
        .btn-hollow
          font-size 14px

</style>
