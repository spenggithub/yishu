<template>
  <div class="page">
    <div class="error">
      <h1 class="header">易书 - 404</h1>
      <div class="content">
        <p><strong>你似乎闯进了奇怪的未知领域...</strong></p>
        <p>来源链接是否正确？用户、文章是否存在？</p>
        <hr>
        <p>
          <a href="/">返回首页</a>
          <span>或者</span>
          <a href="javascript:;" @click="historyBack">返回上页</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      methods:{
        historyBack(){
          this.$router.go(-2)
        }
      },
      mounted(){
        document.title='您要找的页面不存在 - 简书'
      }
    }
</script>
<style lang="stylus" type="text/stylus">
  body
    padding-top 0
    color #222
    font 16px/1.7 'Helvetica Neue', Helvetica, Arial, Sans-serif
    background #eff2f5
  .error
    margin 169px auto 0
    width 404px
    .header
      overflow hidden
      font-size 1.8em
      line-height 1.2
      margin 0 0 .33em .33em
    .content
      padding 2em 1.25em
      border 1px solid #babbbc
      border-radius 5px
      background #f7f7f7
      text-align center
      p
        margin 0 0 1.7em
        color #999999
        &:last-child
          margin-bottom 0

      strong
        font-size 1.1em
        color #000
      hr
        margin 1.3em 0
      a
        color #ea6f5a
</style>
