<template>
    <router-view v-slot={Component}>
        <keep-alive include="game">
            <component :is="Component"/>
        </keep-alive>
    </router-view>
    <!--src="/unity/Kingcraft"-->
<!--    <unity ref="unity" src="/unity/Kingcraft" style="background-color: rgba(0,0,0,.5)"-->
<!--           @progress="progress"-->
<!--           @messages="messages"-->
<!--    />-->
    <menus :valid="setting.valid"/>
    <message/>
<!--    <loading @contextmenu="contextmenu" @clickToStart="clickToStart"/>-->
</template>
<script>
import menus from '@/components/menus'
import unity from '@/components/unity'
import loading from '@/components/loading'
import message from "@/components/message/message";
import { setting } from '@/stores'
export default {
    components:{ menus, unity, loading, message },
    mounted() {

    },
    data(){
        return {
            setting
        }
    },
    watch:{

    },
    methods:{
        progress(progress){
            // window.loading.progress = progress
        },
        messages(name, args){
            console.log(name)
            console.log(args)
        },
    }
}
</script>




