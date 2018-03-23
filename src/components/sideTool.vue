<template>
  <div v-show="sideShow>=200" class="side-tool">
    <ul>
      <li>
        <a href="javascript:;" @click="backTop" class="function-button">
          <i class="fa fa-chevron-up"></i>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
    export default {
      data(){
        return {
          sideShow:false
        }
      },
      methods:{
        backTop(){
          let toTop = function () {
            let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
            currentPosition-=10;
            if(currentPosition>0){
              window.scrollTo(0,currentPosition)
            }
            else {
              window.scrollTo(0,0);
              clearInterval(back);
              back=null
            }
          };
          let back = setInterval(toTop,1)
        },
        scrollTop(){
          this.sideShow = document.documentElement.scrollTop || document.body.scrollTop;
        }
      },
      created(){
        window.addEventListener('scroll',this.scrollTop)
      }
    }
</script>
<style lang="stylus" type="text/stylus">
  .side-tool
    position fixed
    bottom 40px
    right 40px
    z-index 101
    transition-duration 0.3s
    ul
      li
        border 1px solid #dcdcdc
        border-bottom none
        background-color #ffffff
        transition-duration 0.2s
        &:hover
          background-color #eef3ee
        &:last-child
          border-bottom 1px solid #dcdcdc
        .function-button
          cursor pointer
          width 50px
          height 50px
          text-align center
          display block
          i
            padding-top 16px
            font-size 20px
            display block
</style>
