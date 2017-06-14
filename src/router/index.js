import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import search from '@/components/search'
import test from '@/components/Hello'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/backup',
      name: 'test',
      component: test
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    }
  ]
})
