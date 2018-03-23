<template>
  <div>
    <nav-header></nav-header>
    <person>
      <ul slot="usermenu" class="trigger-menu">
        <li>
          <router-link :class="{'active':activeItem1}" class="item" :to="{name:'Follow'}">
            关注用户
          </router-link>
        </li>
        <li>
          <router-link :class="{'active':activeItem2}" class="item" :to="{name:'Fans'}">
            粉丝
          </router-link>
        </li>
      </ul>
      <div slot="list">
        <transition name="fade">
        <router-view></router-view>
        </transition>
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

      }
    },
    components:{
      NavHeader,
      Person
    },
    computed:{
      activeItem1(){
        return this.$route.path.indexOf('following')>=0;
      },
      activeItem2(){
        return this.$route.path.indexOf('fans')>=0;
      }
    }
  }
</script>
<style lang="stylus" type="text/stylus">
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>
