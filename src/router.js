import Vue from 'vue'
import Router from 'vue-router'
import UserList from './views/UserList.vue'
import UserGrid from './views/UserGrid.vue'
import UserShow from './views/UserShow.vue'
import NProgress from 'nprogress'
import store from '@/store/store'
import NotFound from './views/NotFound.vue'
import NetworkIssue from './views/NetworkIssue.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'user-list',
      component: UserList,
      props: true
    },
    {
      path: '/user/grid',
      name: 'user-grid',
      component: UserGrid,
      props: true
    },


    {
      path: '/user/:id',
      name: 'user-show',
      component: UserShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('user/fetchUser', routeTo.params.id)
          .then(user => {
            routeTo.params.user = user
            next()
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({ name: '404', params: { resource: 'user' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
