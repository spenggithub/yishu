<template>
  <div>
    <table>
      <thead>
        <th class="setting-head"></th>
        <th></th>
      </thead>
      <tbody class="information">
        <tr>
          <td class="top-line setting-title setting-verticle">性别</td>
          <td class="top-line">
            <input type="radio" value="1" name="sex" v-model="sex"><span>男</span>
            <input type="radio" value="2" name="sex" v-model="sex"><span>女</span>
            <input type="radio" value="0" name="sex" v-model="sex"><span>保密</span>
          </td>
        </tr>
        <tr>
          <td class="setting-title pull-left">个人简介</td>
          <td>
            <form>
              <textarea v-model="description" placeholder="填写你的个人简介"></textarea>
            </form>
          </td>
        </tr>
      <tr>
        <td class="setting-title pull-left setting-input">个人网站</td>
        <td>
          <form action="">
            <input type="text" v-model="website" name="website" placeholder="http://你的网址">
            <p class="pull-right">填写后会在个人主页显示图标</p>
          </form>
        </td>
      </tr>
      <tr>
        <td class="setting-title">微信二维码</td>
        <td class="weixin-qrcode">
          <input type="file" class="hide">
          <img src="" alt="">
          <a href="" class="btn btn-hollow">
            <input type="file" class="hide">
            更换图片
          </a>
          <a href="" class="cancel-bind">删除</a>
          <p class="pull-right active">在个人主页显示图标</p>
        </td>
      </tr>
      <tr>
        <td class="setting-title setting-input pull-left">社交账号</td>
        <td class="social-bind">
          <p>你可以通过绑定的社交账户登录简书。出于安全尹素，你最初用来创建账户的社交账号不能移除。</p>
          <ul class="social-bind-list">
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
    <input type="button" @click="editInfo" class="btn btn-success setting-save" value="保存">
    <modal name="saveSuccess">
      修改成功
    </modal>
  </div>
</template>
<script>
  import axios from 'axios'
    export default {
      props:['userInfo'],
      data(){
        return {
          sex:'',
          description:this.userInfo.description,
          website:this.userInfo.website,
          api:this.$store.state.api,
        }
      },
      methods:{
        editInfo(){
          let sex = Number(this.sex);
          let description = this.description;
          let website = this.website;
          axios.post(this.api+'/user/editInfo',{
            sex:sex,
            description:description,
            website:website
          }).then(response=>{
            let res = response.data;
            if(res.status==='0'){
              this.show ()
            }
          })
        },
        show () {
          this.$modal.show('saveSuccess');
        }
      }
    }
</script>
<style lang="stylus" type="text/stylus">
  .information
    input[name=website]
      width 100%
      margin-bottom 10px
</style>
