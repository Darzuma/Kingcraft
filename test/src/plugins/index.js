import ratioBox from "@/components/ratioBox";
import closeBtn from "@/components/gadgets/closeBtn";
import cardFace from '@/components/cardFace'
import btn from "@/components/gadgets/btn";
import icon from "@/components/gadgets/icon";
import icon2 from "@/components/gadgets/icon2";
import resourceIcon from '@/components/gadgets/resourceIcon'
import modal from '@/components/modal'
import pending from '@/components/gadgets/pending'
import { message } from "@/store"
import user from '../store/user'
import http from './http'

export default {
    install: function (app, config){
        app.component('ratioBox', ratioBox)
        app.component('closeBtn', closeBtn)
        app.component('cardFace', cardFace)
        app.component('btn', btn)
        app.component('icon', icon)
        app.component('icon2', icon2)
        app.component('resourceIcon', resourceIcon)
        app.component('modal', modal)
        app.component('pending', pending)

        app.config.globalProperties.$http = http

        // 保存玩家数据
        app.config.globalProperties.$save = function(){

        }
        app.config.globalProperties.$message = message

        app.config.globalProperties.$handle = (cb, extraSeconds= 0) =>{
            return new Promise(resovle => {
                user.showHandling = true
                let t = setTimeout(()=>{
                    cb()
                    resovle()
                    user.showHandling = false
                    clearTimeout(t)
                },(1 + extraSeconds + Math.random().toFixed(2) * 4) * 1000)
            })
        }
    }
}