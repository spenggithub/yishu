<template>
  <div>
    <nav-header></nav-header>
    <div class="write-main">
      <div class="write-title-input">
        <textarea v-model="title" placeholder="请输入标题" class="input" name="" id=""  rows="1"></textarea>
      </div>
      <quill-editor ref="myTextEditor" v-model="content"></quill-editor>
      <div class="popover">
        <button @click="editArticle" class="btn btn-theme" :disabled="!canPost" type="button">发布更新<i class="fa fa-angle-down"></i></button>
      </div>
    </div>
    <modal name="hello-world">
      修改成功
    </modal>
  </div>
</template>
<script>
  import axios from 'axios'
  import NavHeader from '../components/NavHeader.vue'
  export default {
    data(){
      return {
        title:'',
        content:'',
        mdShow:false,
        articleContent:{},
        api:this.$store.state.api,
      }
    },
    computed:{
      canPost(){
        if (this.title !=='' && this.content!==''){
          return true
        }
        else {
          return false
        }
      }
    },
    components:{
      NavHeader
    },
    methods:{
      getArticleContent() {
        let articleId = this.$route.params.articleId;
        axios.get(this.api+'/article/getArticleContent', {
          params: {'articleId': articleId}
        }).then(response => {
          let res = response.data;
          if (res.status === '0') {
            this.articleContent = res.result;
            this.title = res.result.title;
            this.content = res.result.content
          }
        })
      },
      editArticle(){
        let articleId = this.$route.params.articleId;
        axios.post(this.api+'/article/editArticle',{
          articleId:articleId,
          title:this.title,
          content:this.content
        }).then(response=>{
          let res = response.data;
          if(res.status==='0'){
            this.show()
          }
        })
      },
      show () {
        this.$modal.show('hello-world');
      }
    },
    mounted(){
      this.getArticleContent()
    }
  }
</script>
<style lang="stylus" type="text/stylus">
  .write-main
    margin 47px auto 0
    padding 0
    width 660px
    z-index 1
    .write-title-input
      height inherit
      margin 16px 0
      padding 0
      width 100%
      position relative
      background #ffffff
      border-radius 3px
      .input
        min-height 44px
        display block
        width 100%
        border 0
        font-size 32px
        line-height 1.4
        font-weight 700
        outline none
        box-shadow none
    .popover
      float right
      .btn
        width 100px
        height 35px
        font-size 16px
        background-color: transparent;
        border-style none
        &[disabled]
          color: #808080;
          cursor: default;
          opacity: 0.5;
          border-radius: 4px;
          border 1px solid #ccc
</style>
