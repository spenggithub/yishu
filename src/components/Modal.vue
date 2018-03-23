<template>
  <div>
    <div v-bind:class="{'md-show':mdShow}" class="md-modal modal-msg md-modal-transition">
      <div class="md-modal-inner">
        <div class="md-top">
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div @click="closeModal" class="md-overlay" v-if="mdShow"></div>
  </div>
</template>
<script>
  export default {
    props:['mdShow'],
    methods:{
      closeModal(){
        this.$emit('close');
        trigger('click')
      }
    }
  }
</script>
<style>
</style>
