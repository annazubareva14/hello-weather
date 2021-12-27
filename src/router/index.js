import Vue from 'vue'
import VueRouter from 'vue-router'
import CurrentForecast from 'Pages/CurrentForecast.vue'
import WeekForecast from 'Pages/WeekForecast.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/current-forecast',
      name: 'CurrentForecast',
      component: CurrentForecast
    },
    {
      path: '/week-forecast',
      name: 'WeekForecast',
      component: WeekForecast
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
})

export default router
