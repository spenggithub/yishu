<template>
  <Sign>
    <div slot="title" class="normal-title">
      <router-link to="/login" class="active">登录</router-link>
      <b>·</b>
      <router-link to="/register">注册</router-link>
    </div>
    <div slot="sign" class="ys-sign-in-container">
      <form action="" method="post" id="new-session">
        <div class="input-prepend restyle ys-normal">
          <input type="email"  placeholder="请输入邮箱" name="email" v-model="email" id="email">
          <i class="fa fa-user"></i>
        </div>
        <div class="input-prepend">
          <input type="password" name="password" id="password" v-model="password" placeholder="请输入密码">
          <i class="fa fa-lock"></i>
        </div>
        <div class="remember-btn">
          <input type="checkbox" value="true" checked name="remember-me">
          <span>记住我</span>
        </div>
        <input @click="login" type="button" name="commit" value="登录" class="sign-in-button">
      </form>
      <div class="tooltip tooltip-error right" v-show="loginResult">
        <div class="tooltip-arrow tooltip-arrow-border"></div>
        <div class="tooltip-arrow tooltip-arrow-bg"></div>
        <div class="tooltip-inner">
          <i class="fa fa-warning"></i>
          <span>{{loginResult}}</span>
        </div>
      </div>
    </div>
  </Sign>
</template>
<script>
  import Sign from '../components/sign.vue'
  import axios from 'axios'
    export default {
      components:{
        Sign
      },
      data(){
        return {
          email:'',
          password:'',
          loginResult:'',
          api:this.$store.state.api,
        }
      },
      methods:{
        login(){
          let email = this.email;
          let password = this.password;
          axios.post(this.api+'/user/login',{
            email:this.email,
            password:this.password
          }).then(response=>{
            let res = response.data;
            if(res.status==='0'){
              localStorage.avatarName = res.result.avatar;
              this.$router.push({path:'/'})
            }
            else {
              this.loginResult = res.msg;
            }
          })
        },
        checkLogin(){
          if(this.$store.state.userId){
            this.$router.push({path:'/'})
          }
        }
      },
      mounted(){
        this.checkLogin()
      }
    }
</script>
<style lang="stylus" type="text/stylus">
  .ys-sign-in-container
    position relative
  .tooltip
    width 230px
    left 300px
    top 32px!important
  .tooltip-error
    font-size 14px
    line-height 25px
    white-space nowrap
    background none
    &.right
      .tooltip-arrow-bg
        left 2px
        border-right-color #ffffff
      .tooltip-arrow-border
        border-right-color: #ea6f5a
    .tooltip-inner
      max-width 280px
      color #333
      border 1px solid #ea6f5a
      background-color #ffffff
      i
        position static
        margin-right 5px
        font-size 20px
        color #ea6f5a
        vertical-align middle
      span
        vertical-align middle
        display inline-block
        white-space normal
        max-width 230px
</style>
