<template>
  <Sign>
    <div slot="title" class="normal-title">
      <router-link to="/login">登录</router-link>
      <b>·</b>
      <router-link to="/register" class="active">注册</router-link>
    </div>
    <div slot="sign" class="ys-sign-up-container">
      <form action="" method="post" id="new-user">
        <div class="input-prepend restyle ys-normal">
          <input type="text"  placeholder="你的昵称" name="username" v-model="username" id="username">
          <i class="fa fa-user"></i>
        </div>
        <div class="input-prepend">
          <input type="email" @blur="emailValidate" name="email" id="email" v-model="email" placeholder="请输入注册邮箱">
          <div :class="{'tooltip-error':!emailCanUse,'tooltip-success':emailCanUse}" class="tooltip tooltip-username right" v-show="emailCheckResult">
            <div class="tooltip-arrow tooltip-arrow-border"></div>
            <div class="tooltip-arrow tooltip-arrow-bg"></div>
            <div class="tooltip-inner">
              <i class="fa" :class="{'fa-warning':!emailCanUse,'fa-check':emailCanUse}"></i>
              <span>{{emailCheckResult}}</span>
            </div>
          </div>
          <i class="fa fa-paper-plane"></i>
        </div>
        <div class="input-prepend">
          <input type="password" name="email" id="password" v-model="password" placeholder="请输入密码">
          <i class="fa fa-lock"></i>
        </div>
        <div class="input-prepend">
          <input type="text" @blur="checkCaptcha" style="float: left;width: 160px" name="email" id="captcha" v-model="captchaStr" placeholder="请输入验证码">
          <img @click="changeCaptcha" :src="captcha" alt="">
          <i class="fa fa-check-circle"></i>
          <div :class="{'tooltip-error':!captchaValidate,'tooltip-success':captchaValidate}" class="tooltip tooltip-captcha right" v-show="captchaValidateResult">
            <div class="tooltip-arrow tooltip-arrow-border"></div>
            <div class="tooltip-arrow tooltip-arrow-bg"></div>
            <div class="tooltip-inner">
              <i class="fa" :class="{'fa-warning':!captchaValidate,'fa-check':captchaValidate}"></i>
              <span>{{captchaValidateResult}}</span>
            </div>
          </div>
        </div>
        <div style="clear: both" class="remember-btn">
          <input type="checkbox" value="true" checked name="remember-me">
          <span>记住我</span>
        </div>
        <input @click="register" :disabled="!canRegister" type="button" name="commit" value="注册" class="sign-up-button">
      </form>

    </div>
  </Sign>
</template>
<script>
  import axios from 'axios'
  import Sign from '../components/sign.vue'
    export default {
      data(){
        return {
          username:'',
          email:'',
          password:'',
          emailCheckResult:'',
          emailCanUse:false,
          captcha:'',
          captchaStr:'',
          captchaValidate:false,
          captchaValidateResult:'',
          api:this.$store.state.api,
        }
      },
      components:{
        Sign
      },
      computed:{
        canRegister(){
          return (this.username && this.password && this.emailCanUse && this.captchaValidate)
        }
      },
      methods:{
        register(){
          axios.post(this.api+'/user/register',{
            username:this.username,
            email:this.email,
            password:this.password
          }).then(response=>{
            let res = response.data;
            if(res.status==='0'){
              localStorage.setItem('avatarName',res.result.avatar);
              this.$router.push({path:'/'})
            }
          })
        },
        emailValidate(){
          if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.email)){
              axios.post(this.api+'/user/emailCheck',{
                email:this.email
              }).then(response=>{
                let res = response.data;
                this.emailCheckResult = res.result;
                if(res.status==='1'){
                  this.emailCanUse = true
                }
                else {
                  this.emailCanUse = false
                }
              })
          }
          else{
            this.emailCanUse=false;
            this.emailCheckResult = '请输入正确的邮箱格式'
          }
        },
        checkLogin(){
          if(this.$store.state.userId){
            this.$router.push({path:'/'})
          }
        },
        getCaptcha(){
          axios.get(this.api+'/user/getCaptcha').then(response=>{
            let res = response.data;
            if(res.status==='0'){
              this.captcha = res.result;
            }
          })
        },
        checkCaptcha(){
          let captchaStr = this.captchaStr;
          axios.post(this.api+'/user/checkCaptcha',{
            captchaStr : captchaStr
          }).then(response=>{
              let res = response.data;
              if(res.status==='0'){
                this.captchaValidate = true;
                this.captchaValidateResult = '验证码输入正确'
               }
               else{
                this.captchaValidate = false;
                this.captchaValidateResult = '验证码错误'
              }

          })
        },
        changeCaptcha(){
          this.getCaptcha()
        }
      },
      mounted(){
        this.checkLogin()
        this.getCaptcha()
      }
    }
</script>
<style lang="stylus" type="text/stylus">
  input:disabled
    background #ffffff!important
    border 1px solid #cccccc!important
    color #cccccc!important
</style>
