<template>
  <div>
    <nav-header></nav-header>
    <person>
      <ul slot="usermenu" class="trigger-menu">
        <li v-for="value in menus">
          <router-link  class="item" to="">
            <i class="fa" :class="value.icon"></i>{{value.text}}
          </router-link>
        </li>
      </ul>
      <div slot="list">
        <router-view></router-view>
      </div>
    </person>
  </div>
</template>
<script>
    import axios from 'axios'
    import NavHeader from '../components/NavHeader.vue'
    import Person from '../components/person.vue'
    export default {
      data(){
        return {
          menus:[
            {text:'文章',icon:'fa-file-text'},
            {text:'动态',icon:'fa-bell'},
            {text:'最新评论',icon:'fa-comments'},
            {text:'热门',icon:'fa-fire'}
          ]
        }
      },
      components:{
        NavHeader,
        Person
      }
    }
</script>
<style>
</style>
