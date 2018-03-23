<template>
  <div>
    <table>
      <thead>
      <tr>
        <th class="setting-head responsive-head"></th>
        <th></th>
      </tr>
      </thead>
      <tbody class="base">
        <tr>
          <td class="top-line">
            <div class="avatar">
              <img :src="api+'/avatar/'+avatarName" alt="">
            </div>
          </td>
          <td class="top-line">
            <a v-show="!isUploding" href="" class="btn btn-hollow">
              <input type="file" @change="uploadAvatar" accept="image/png,image/gif,image/jpeg" class="hide" name="avatar">
              更改头像
            </a>
          </td>
        </tr>
        <tr>
          <td class="setting-title">昵称</td>
          <td>
            <input type="text" v-model="nickname" placeholder="请输入昵称">
          </td>
        </tr>
        <tr>
          <td class="setting-title">电子邮件</td>
          <td>
            <form action="">
              <input type="button" value="发送" class="btn btn-hollow pull-right">
              <input type="email" placeholder="请输入你的常用邮箱">
            </form>
          </td>
        </tr>
        <tr>
          <td class="setting-title setting-verticle">语言设置</td>
          <td>
            <div class="col-xs-8">
              <input type="radio" value="zh-CN">
              <span>中文简体</span>
            </div>
            <div class="col-xs-16">
              <input type="radio" value="zh-TW">
              <span>中文繁体</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    props:['userInfo','avatarName'],
    data(){
      return {
        nickname:this.userInfo.username,
        isUploding:false,
        userInfoChild:{},
        api:this.$store.state.api,
      }
    },
    methods:{
      uploadAvatar(e){
        this.isUploding = true;
        let avatarFile = e.target.files[0];
      //  创建form对象
        let param = new FormData();
        param.append('avatar',avatarFile);
        param.append('aaa','0');
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        axios.post(this.api+'/user/uploadAvatar',param,config).then(response=>{
            let res = response.data;
            if(res.status==='0'){
              this.isUploding = false;
              localStorage.avatarName = localStorage.userId+'.png'
              location.reload(true)
            }
        })
      }
    }
  }
</script>
<style lang="stylus" type="text/stylus">
</style>
