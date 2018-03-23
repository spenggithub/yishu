<template>
  <div id="app" :class="{'reader-night-mode':isNightMode}">
    <router-view/>
  </div>
</template>

<script>
  let orignalSetItem = localStorage.setItem;
    localStorage.setItem = function (key,newValue) {
      let setItemEvent = new Event("setItemEvent");
      setItemEvent.newValue = newValue;
      window.dispatchEvent(setItemEvent);
      orignalSetItem.apply(this,arguments)
    };
export default {
  name: 'app',
  data(){
    return {
      value:''
    }
  },
  computed:{
    isNightMode(){
      return this.$store.state.isNightMode
    }
  }
}
</script>

<style lang="stylus" type="text/stylus">
  @import "assets/stylus/index.styl"
  @import "assets/icon/font-awesome.min.css"
  @import "assets/stylus/modal.css"
</style>
