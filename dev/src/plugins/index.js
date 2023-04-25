import ratioBox from "@/components/ratioBox";
import closeBtn from "@/components/gadgets/closeBtn";
import cardFace from '@/components/cardFace'
import fit from '@/components/fit'
import { message } from "@/stores"

export default {
    install: function (app, config){
        app.component('ratioBox', ratioBox)
        app.component('closeBtn', closeBtn)
        app.component('cardFace', cardFace)
        app.component('fit', fit)
        app.config.globalProperties.$save = function(){

        }
        app.config.globalProperties.$message = message
    }
}