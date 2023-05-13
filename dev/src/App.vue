<template>
    <router-view v-slot={Component}>
        <keep-alive include="worldMap">
            <component ref="view" :is="Component"/>
        </keep-alive>
    </router-view>
    <!--src="/unity/Kingcraft"-->
    <unity ref="unity" src="/unity/Kingcraft"
           @progress="progress"
           @messages="messages"
           @instance="instance"
    />
    <globalUI/>
    <menus :valid="setting.valid"/>
    <message/>
    <loading @contextmenu="contextmenu" @clickToStart="clickToStart"/>
</template>
<script>
import menus from '@/components/menus'
import unity from '@/components/unity'
import loading from '@/components/loading'
import message from "@/components/message/message";
import globalUI from "@/components/globalUI";
import { setting, game } from '@/stores'
import Cookies from "js-cookie";
export default {
    components:{ menus, unity, loading, message, globalUI },
    mounted() {

    },
    data(){
        return {
            setting
        }
    },
    methods:{
        progress(progress){
            try{
                window.loading.progress = progress
            }catch (err){}
        },
        messages(name, args){
            this.$refs.view.messages(name, args)
        },
        instance(unityInstance){
            game.dispatch = unityInstance.SendMessage
            if(!Cookies.get('username')){
                game.dispatch("GameManager","SetScene","Tutorial")
                this.$router.push('/tutorial')
            }
        }
    }
}
</script>




