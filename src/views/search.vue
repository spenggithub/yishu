<template>
  <div>
    <nav-header></nav-header>
    <div class="container search">
      <div class="row">
        <div class="aside"></div>
        <div class="col-xs-16 col-xs-offset-8 main"></div>
        <div class="top">
          <div class="relevant">
            <div class="title">相关用户</div>
            <a href="" class="function-btn">
              查看全部
            </a>
            <div class="container-fluid list">
              <div class="col-xs-8"></div>
            </div>
          </div>
          <div class="relevant"></div>
        </div>
        <div class="search-content">
          <div class="sort-type"></div>
          <div class="result"></div>
          <article-list></article-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import NavHeader from '../components/NavHeader'
  import ArticleList from '../components/ArticleList'
    export default {
      components:{
        NavHeader,
        ArticleList
      },
      data(){
        return {
          articleList:[]
        }
      },
      methods:{

      }
    }
</script>
<style lang="stylus" type="text/stylus">
  .search
    .aside
      background #449fdb
      position fixed
      top 0
      bottom 0
      margin 86px 0 0
      padding 0 0 30px
      width 280px
      overflow auto
    .main
      padding-left 0
      .top
        margin-bottom 30px
        background hsla(0,0%,71%,.1)
        border 1px solid #f0f0f0
        border-radius 4px
</style>
