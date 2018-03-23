<template>
  <div>
    <nav-header></nav-header>
    <div class="container index">
      <div class="row">
        <!--<swiper :options="swiperOption" ref="mySwiper">-->
          <!--&lt;!&ndash; slides &ndash;&gt;-->
          <!--<swiper-slide>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[0]" alt=""></a>-->
            <!--</div>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[1]" alt=""></a>-->
            <!--</div>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[2]" alt=""></a>-->
            <!--</div>-->
          <!--</swiper-slide>-->
          <!--<swiper-slide>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[1]" alt=""></a>-->
            <!--</div>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[2]" alt=""></a>-->
            <!--</div>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[3]" alt=""></a>-->
            <!--</div>-->
          <!--</swiper-slide>-->
          <!--<swiper-slide>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[2]" alt=""></a>-->
            <!--</div>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[3]" alt=""></a>-->
            <!--</div>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[4]" alt=""></a>-->
            <!--</div>-->
          <!--</swiper-slide>-->
          <!--<swiper-slide>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[3]" alt=""></a>-->
            <!--</div>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[4]" alt=""></a>-->
            <!--</div>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[5]" alt=""></a>-->
            <!--</div>-->
          <!--</swiper-slide>-->
          <!--<swiper-slide>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[4]" alt=""></a>-->
            <!--</div>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[5]" alt=""></a>-->
            <!--</div>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[0]" alt=""></a>-->
            <!--</div>-->
          <!--</swiper-slide>-->
          <!--<swiper-slide>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[5]" alt=""></a>-->
            <!--</div>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[0]" alt=""></a>-->
            <!--</div>-->
            <!--<div class="banner">-->
              <!--<a href=""><img :src="bannerList[1]" alt=""></a>-->
            <!--</div>-->
          <!--</swiper-slide>-->
          <!--&lt;!&ndash; Optional controls &ndash;&gt;-->
          <!--<div class="swiper-pagination"  slot="pagination"></div>-->
          <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
          <!--<div class="swiper-button-next" slot="button-next"></div>-->
          <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
        <!--</swiper>-->
        <div class="col-xs-16 main">
          <div class="recommend-collection">
            <a href="" class="collection">
              <img src="../assets/image/jianshu.svg" alt="">
              <div class="name">简书热门</div>
            </a>
            <a href="" class="collection">
              <img src="../assets/image/nodejs.svg" alt="">
              <div class="name">CNode精华</div>
            </a>
          </div>
          <div class="split-line"></div>
          <div id="list-container">
            <recommend-article :articleList="articleList"></recommend-article>
          </div>
        </div>
      </div>
    </div>
    <side-tool></side-tool>
  </div>
</template>
<script>
  import sideTool from '../components/sideTool.vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import NavHeader from '../components/NavHeader.vue'
  import RecommendArticle from '../components/RecommendArticle.vue'
  import axios from 'axios'
    export default {
      name: 'carrousel',
      data(){
        return {
          api:this.$store.state.api,
          articleList:[],
          swiperOption: {
            // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
            notNextTick: true,
            // swiper configs 所有的配置同swiper官方api配置
            autoplay: 3000,
            prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next',
            effect:'fade',
            mousewheelControl : true,
            loop:true
          },
          // bannerList:[]
        }
      },
      components:{
        NavHeader,
        RecommendArticle,
        swiper,
        swiperSlide,
        sideTool
      },
      methods:{
        checkLogin(){
          axios.get(this.api+'/user/checkLogin').then((response)=>{
            let res = response.data;
          })
        },
        getJianShu(){
          axios.get(this.api+'/worm/jianshuArticle').then(response=>{
              let res = response.data;
              this.articleList = res.result;
          })
        },
        getBanner(){
          axios.get('/worm/getBanner').then(response=>{
            let res = response.data
            this.bannerList = res.result;
            console.log(res);
          });
        }
      },
      mounted(){
        // this.checkLogin()
        this.getJianShu()
        // this.getBanner()
      }
    }
</script>
<style lang="stylus" type="text/stylus">
  .row
    margin-left -15px
    margin-right -15px
  .index
    .main
      padding-top 40px
      padding-right 0
      .recommend-collection
        margin-bottom 20px
        .collection
          display inline-block
          margin 0 18px 18px 0
          min-height 32px
          background-color #f7f7f7
          border 1px solid #dcdcdc
          border-radius 4px
          vertical-align top
          overflow hidden
          img
            width 32px
            height 32px
          .name
            display inline-block
            padding 0 11px 0 6px
            font-size 14px
    .banner
      display inline-block
      width 33.333%
      img
        width 100%
        background hsla(0,0%,71%,.2)
      &:first-child
        width 66.666%
        float left
</style>
