import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/index.vue'
import User from '../views/user.vue'
import Write from '../views/write.vue'
import UserArticle from '../components/UserArticle.vue'
import Article from '../views/article.vue'
import Register from '../views/Register.vue'
import Following from '../views/following.vue'
import Follow from '../components/following.vue'
import Fans from '../components/fans.vue'
import BookMarks from '../views/bookmarks.vue'
import Settings from '../views/settings.vue'
import Profile from '../components/profile.vue'
import Basic from '../components/basic.vue'
import Edit from '../views/edit'
import NotFound from '../components/404'
Vue.use(Router);

export default new Router({
  routes: [
    //主页
    {
      path: '/',
      name: 'index',
      component: Index
    },
    //登录
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    //用户主页
    {
      path:'/user/:userId',
      name:'User',
      component:User,
      children:[
        //默认文章列表页
        {
          path:'',
          name:'ArticleList',
          component:UserArticle
        }
      ]
    },
    //关注用户页
    {
      path:'/user/:userId/following',
      name:'Following',
      component:Following,
      children:[
        {
          path:'',
          name:'Follow',
          component:Follow
        },
        //粉丝
        {
          path:'/user/:userId/fans',
          name:'Fans',
          component:Fans
        }
      ]
    },
    //发表文章页面
    {
      path:'/write',
      name:'Write',
      component:Write
    },
    //文章详情页
    {
      path:'/article/:articleId',
      name:'Article',
      component:Article
    },
    //文章编辑页
    {
      path:'/edit/:articleId',
      name:'Edit',
      component:Edit
    },
    //注册页面
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/bookmarks',
      name:'BookMarks',
      component:BookMarks
    },
    {
      path:'/settings',
      name:'Settings',
      component:Settings,
      children:[
        {
          path:'/settings/profile',
          name:'Profile',
          component:Profile
        },
        {
          path:'/settings/basic',
          name:'Basic',
          component:Basic
        }
      ]
    },
  //  404页面
    {
      path:'*',
      name:'NotFound',
      meta:{
        title:'您要找的页面不存在 - 简书'
      },
      component:NotFound
    }
  ]
})
