import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import search from '@/components/search'
import admin from '@/components/admin'
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
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    }
  ]
})
