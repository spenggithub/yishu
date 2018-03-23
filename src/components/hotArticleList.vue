<template>
  <ul class="note-list">
    <li v-for="(article,index) in articleList" class="note-item">
      <div class="content">
        <div class="author">
          <a href="" class="avatar" target="_blank"></a>
          <div class="info">
            <router-link to="" target="_blank" class="nickname">{{authorList[index].username}}</router-link>
            <time>{{article.create_time|timeFormat}}</time>
          </div>
        </div>
        <router-link :to="{name:'Article',params:{'articleId':article._id}}" target="_blank" class="title">{{article.title}}</router-link>
        <p class="abstract">{{article.content.replace(/<\/?[^>]*>/g,'')}}</p>
        <div class="meta">
          <router-link :to="{name:'Article',params:{articleId:article._id}}" target="_blank"><i class="fa fa-eye"></i>{{article.viewNums}}</router-link>
          <a href="" target="_blank">
            <i class="fa fa-comment"></i>{{article.comments.length}}
          </a>
          <span>
            <i class="fa fa-heart"></i>{{article.collected.length}}
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
    export default {
      props:['articleList']
    }
</script>
<style>
</style>
