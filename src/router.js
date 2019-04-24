import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('./pages/main')
    }, {
      path: '/view',
      name: 'view',
      component: () => import('./pages/view/deep-wrap')
    }
  ]
})
