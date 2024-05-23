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
        // action 格式 [ itemHash, username, uid ]
        // itemHash: ['C4C6A7591124362675F0A231FAAC2153IKJLDW675F0A231FAAC2', '0162EBAFA8E90B4AEB6ECF22AD76E3D9DJKQUWD675F0A231FAC2']
        const arr = JSON.parse(to.query.p)
        const info = {
            'C4C6A7591124362675F0A231FAAC2153IKJLDW675F0A231FAAC2':{ amount:2.9, remark:20 },
            '0162EBAFA8E90B4AEB6ECF22AD76E3D9DJKQUWD675F0A231FAC2':{ amount:19.9, remark:200 }
        }[arr[0]]
        localStorage.setItem('username', arr[1])
        localStorage.setItem('amount', info.amount)
        localStorage.setItem('remark', info.remark)
        localStorage.setItem('uid', arr[2])
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