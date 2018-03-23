<template>
  <ul class="user-list">
    <li v-for="(following,index) in followingList">
      <a href="" class="avatar"></a>
      <div class="info">
        <a href="" class="name">{{following.username}}</a>
        <div class="meta">
          <span>关注 {{following.follows.length}}</span>
          <span>粉丝 {{following.fans.length}}</span>
          <span>文章 {{following.articleNums}}</span>
        </div>
        <div class="meta">
          写了 53698 字，获得了 52 个喜欢
        </div>
      </div>
      <a @click="togglefollow(index)" href="javascript:;" class="btn"
         :class="{'btn-success':!isFollowed[index].a,'btn-default':isFollowed[index].a,'following':isFollowed[index].a,'follow':!isFollowed[index].a}">
        <i class="fa" :class="{'fa-plus':!isFollowed[index].a,'fa-check':isFollowed[index].a}"></i>
        {{isFollowed[index].a ? '已关注' : '关注'}}</a>
    </li>
  </ul>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        followingList: [],
        isFollowed: [],
        api:this.$store.state.api,
      }
    },
    methods: {
      getFollowingList() {
        let userId = this.$route.params.userId;
        axios.get(this.api+'/user/getFollowingList', {
          params: {'userId': userId}
        }).then(response => {
          let res = response.data;
          if (res.status === '0') {
            this.followingList = res.result;
            for (let i = 0; i < this.followingList.length; i++) {
              this.isFollowed.push({a:true})
            }
          }
        })
      },
      togglefollow(index) {
        this.test = !this.test;
        axios.post(this.api+'/user/toggleFollow', {
          userId: this.$store.state.userId,
          authorId: this.followingList[index]._id
        }).then(response => {
          let res = response.data;
          if (res.status === '0') {
            this.$set(this.isFollowed[index],'a',!this.isFollowed[index].a)
          }
        })
      }
    },
    mounted() {
      this.getFollowingList()
    },
    computed: {}
  }
</script>
<style lang="stylus" type="text/stylus">
  .user-list
    clear both
    li
      &:first-child
        padding-top 0 !important
      padding-bottom 20px
      margin-bottom 20px
      border-bottom 1px solid #f0f0f0
      line-height normal
      .avatar
        width 52px
        height 52px
        margin-right 8px
        vertical-align middle
        display inline-block
        border-radius 50%
        border 1px solid #ddd
      .info
        vertical-align middle
        display inline-block
      .following
        float right
        margin-top 8px
        padding 8px 0
        width 100px
        font-size 15px
      .follow
        float right
        margin-top 8px
        padding 8px
        width 100px
        font-size 15px
</style>
