<template>
  <div>
    <nav-header></nav-header>
    <div class="container bookmarks" id="js-page-top">
      <div class="row">
        <div class="col-xs-18 col-xs-offset-3 main">
          <img class="tag-banner" src="/static/collect-note.png" alt="Collect note">
          <article-list :authorList="authorList" :articleList="collectedArticleList"></article-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import NavHeader from '../components/NavHeader.vue'
  import ArticleList from '../components/ArticleList.vue'
    export default {
      components:{
        ArticleList,
        NavHeader
      },
      data(){
        return {
          collectedArticleList:[],
          authorList:[],
          api:this.$store.state.api,
        }
      },
      methods:{
        getCollectedArticleList(){
          axios.get(this.api+'/user/getCollectedArticleList',{
            params:{'userId':this.userId}
          }).then(response=>{
            let res = response.data;
            if(res.status==='0'){
              this.collectedArticleList = res.result[0];
              this.authorList = res.result[1]
            }
          })
        }
      },
      mounted(){
        this.getCollectedArticleList()
      },
      computed:{
        userId(){
          return localStorage.userId
        }
      }
    }
</script>
<style lang="stylus" type="text/stylus">
  .bookmarks
    .row
      padding-top 30px
</style>
