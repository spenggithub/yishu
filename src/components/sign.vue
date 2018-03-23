<template>
  <div class="sign">
    <div class="logo">
      <a href="">
        <img src="../assets/image/logo.png" alt="Logo">
      </a>
    </div>
    <div class="main">
      <h4 class="title">
          <slot name="title"></slot>
      </h4>
      <slot name="sign"></slot>
    </div>
  </div>
</template>
<script>
    export default {}
</script>
<style lang="stylus" type="text/stylus">
  @import "../assets/stylus/variable.styl"
  body
    padding-top 0
  .sign
    height 100%
    min-height 750px
    font-size $font-size-medium
    background $color-background
    text-align center
    .tooltip
      width 230px
      left 300px
      top 7px
    .tooltip-error
      font-size 14px
      line-height 25px
      white-space nowrap
      background none
      &.right
        .tooltip-arrow-bg
          left 2px
          border-right-color #ffffff
        .tooltip-arrow-border
          border-right-color: #ea6f5a
      .tooltip-inner
        max-width 280px
        color #333
        border 1px solid #ea6f5a
        background-color #ffffff
        i
          position static
          margin-right 5px
          font-size 20px
          color #ea6f5a
          vertical-align middle
        span
          vertical-align middle
          display inline-block
          white-space normal
          max-width 230px
    .tooltip-success
      font-size 14px
      line-height 25px
      white-space nowrap
      background none
      &.right
        .tooltip-arrow-bg
          left 2px
          border-right-color #fff
        .tooltip-arrow-border
          border-right-color #3c763d
      .tooltip-inner
        border 1px solid #3c763d
        max-width 280px
        color #333
        background-color #ffffff
        i
          position static
          margin-right 5px
          font-size 20px
          color #3c763d
          vertical-align middle
        span
          vertical-align middle
          display inline-block
          white-space normal
          max-width 230px
    form
      margin-bottom 30px
      .sign-in-button
        background #3194d0
        width: 100%
        padding: 9px 18px
        font-size: 18px
        border: none
        border-radius: 25px
        color: #fff
        cursor: pointer
        outline: none
        display: block
        clear: both
        transition-duration 0.2s
      .sign-up-button
        width: 100%;
        padding: 9px 18px
        font-size: 18px
        border: none
        border-radius: 25px
        color: #fff
        background: #42c02e
        cursor: pointer
        outline: none
        display: block
        clear: both
        transition-duration 0.2s
        &:hover
          background #13c024
      .remember-btn
        float left
        margin 15px 0
        span
          margin-left 5px
          font-size 15px
          color #969696
          vertical-align middle
      .restyle
        margin-bottom 0
        input
          border-bottom none
          border-radius 4px 4px 0 0
      .input-prepend
        position relative
        width 100%
        i
          position absolute
          top 16px
          left 10px
          font-size 18px
          color #969696
        input
          width 100%
          height 50px
          margin-bottom 0
          padding 4px 12px 4px 35px
          border 1px solid #c8c8c8
          background-color: hsla(0,0%,71%,.1)
          vertical-align: middle
        img
          float right
    &:before
      content: ""
      display: inline-block
      height: 85%
      vertical-align: middle
      box-sizing border-box
    .logo
      position absolute
      top 56px
      margin-left 50px
    .main
      width 400px
      margin 60px auto 0
      padding 50px 50px 30px
      background $color-background-w
      border-radius 4px
      box-shadow: 0 0 8px rgba(0,0,0,.1)
      vertical-align middle
      display inline-block
      h4
      .title
        margin: 0 auto 50px
        padding: 10px
        font-weight: 400
        color: #969696
        a
          padding 10px
        & .active
          font-weight 700
          color $color-sub-theme
          border-bottom 2px solid $color-sub-theme
        b
          padding 10px
          font-weight 700

</style>
