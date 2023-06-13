import { createRouter, createWebHashHistory } from 'vue-router'
import IndexView from '@/view/index'
import MainView from '@/view/user/mainPage'
import WriteView from '@/view/user/writePage'
import ArticleView from '@/view/user/articlePage'
import RewriteView from '@/view/user/rewritePage'
import AllView from '@/view/user/allarticlePage'
import DetailView from '@/view/user/detailPage'
import SetView from '@/view/user/setPage'
import LoginView from '@/view/login'
import RegisterView from '@/view/register'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { // 前台首页
      path: '/',
      name: 'IndexView',
      component: IndexView
    },
    { // 后台主页面
      path: '/main',
      component: MainView,
      children: [
        { path: '/write', component: WriteView },
        { path: '/article', component: ArticleView },
        { path: '/rewrite', component: RewriteView },
        { path: '/set', component: SetView },
        { path: '/all', component: AllView },
        { path: '/detail', component: DetailView }
      ]
    },
    { // 登录页
      path: '/login',
      component: LoginView
    },
    { // 注册页
      path: '/Register',
      component: RegisterView
    }
  ]
})

export default router
