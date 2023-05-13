import ratioBox from "@/components/ratioBox";
import closeBtn from "@/components/gadgets/closeBtn";
import cardFace from '@/components/cardFace'
import fit from '@/components/fit'
import btn from "@/components/gadgets/btn";
import icon from "@/components/gadgets/icon";
import modal from '@/components/modal'
import { message } from "@/stores"

import http from './http'

export default {
    install: function (app, config){
        app.component('ratioBox', ratioBox)
        app.component('closeBtn', closeBtn)
        app.component('cardFace', cardFace)
        app.component('fit', fit)
        app.component('btn', btn)
        app.component('icon', icon)
        app.component('modal', modal)

        app.config.globalProperties.$http = http

        app.config.globalProperties.$save = function(){

        }
        app.config.globalProperties.$message = message
    }
}