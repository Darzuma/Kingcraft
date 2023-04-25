import { createRouter, createWebHistory } from 'vue-router'
import worldMap from '../views/worldMap'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'worldMap',
      component: worldMap,
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/test')
    }
  ]
})

export default router
