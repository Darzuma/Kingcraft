import home from "../views/home/home";
import market from "../views/market";
import payment from '../views/payment'
export default [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/tutorial',
        name: 'tutorial',
        component: () => import('../views/tutorial')
    },
    {
        path: '/worldMap',
        name: 'worldMap',
        component: () => import('../views/worldMap')
    },
    {
        path: '/campaign',
        name: 'campaign',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/campaign')
    },
    {
        path: '/market',
        name: 'market',
        component: () => import('../views/market')
    },
    {
        path: '/payment',
        name: 'payment',
        component: payment
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: home
    },
]