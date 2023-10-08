import router from './router'
// 路由守卫
import game from '../store/game'

let isPayment = false

// localhost:3000/?paypal=2.9&username=aaa&amount=2.9&remark=222
router.beforeEach((to, from, next) => {
    // 最后移到文件里
    game.clearDelegates()

    isPayment = Boolean(to.query.method)
    if(isPayment){
        // 获取支付数据
        localStorage.setItem('username', to.query.username)
        localStorage.setItem('amount', to.query.amount)
        localStorage.setItem('remark', to.query.remark)
        localStorage.setItem('uid', to.query.uid)
        localStorage.setItem('orderStep', '1')

        next({ name:'home' })
    }
    else{
        // if(to.name === 'campaign' && to.query.level)
        //     game.currentLevel = levels[to.query.level - 1]
        // else
        //     game.currentLevel = null

        next()
    }
})

router.afterEach((to,from)=>{

})

export default router