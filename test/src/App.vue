<template>
    <router-view ref="view"/>
    <game-container>
        <!--天梯排名-->
        <arenaLadder/>
        <!--卡顿模拟器-->
        <handling/>
        <!--消息弹框-->
        <message/>
        <!--顶部按钮-->
        <headbar/>
        <!--帮助面板-->
        <setting/>
        <!--单人关卡面板-->
        <taskMap/>
        <!--留言板-->
        <chatroom/>
        <!--资源管理界面-->
        <citadel/>
        <!--部队升级界面-->
        <troops/>
        <!--英雄选择面板-->
        <heroes/>
        <!--商店面板-->
        <market/>
        <!--载入进度条-->
        <loading/>
        <unity ref="unity" :src="$store.unity.src"
               @progress="progress"
               @messages="messages"
               @instance="instance"
        />
    </game-container>
</template>

<script>
import unity from '@/components/unity'
import arenaLadder from '@/components/dialogs/arenaLadder'
import loading from '@/components/loading'
import message from "@/components/message";
import headbar from "@/components/headbar";
import options from "@/components/options";
import setting from "@/components/dialogs/setting";
import Cookies from "js-cookie";
import gameContainer from "@/components/gameContainer";
import chatroom from '@/components/dialogs/chatroom'
import taskMap from '@/components/dialogs/taskMap'
import heroes from '@/components/dialogs/heroes'
import citadel from '@/components/dialogs/citadel'
import troops from '@/components/dialogs/troops'
import market from '@/components/dialogs/market'
import handling from '@/components/dialogs/handling'
export default {
    components:{
        unity, loading, message, headbar, chatroom, arenaLadder,
        options, setting, gameContainer, taskMap, heroes, citadel, troops, market, handling
    },
    data(){
        return {

        }
    },
    methods:{
        progress(progress){
            try{
                this.$store.loading.progress = progress
            }catch (err){}
        },
        messages(name, args){
            let eventName = ''
            switch (name){
                case 'unitFallen':
                    eventName = 'onUnitFallen'
                    break
                case 'worldMap_btn_mouseEnter':
                    eventName = 'onWorldBtnEnter'
                    break
                case 'worldMap_btn_mouseExit':
                    eventName = 'onWorldBtnExit'
                    break
                case 'worldMap_btn_mouseDown': // 该接口由于元素遮挡而无法触发
                    eventName = 'onWorldBtnDown'
                    break
                case 'unitsRevived':
                    eventName = 'onUnitsRevived'
                default:
                    eventName = 'onPlaySound'
                    break
            }
            this.$store.game.commit(eventName, args)
        },
        instance(instance){
            this.$store.unity.instance = instance
        },
    },
    computed:{

    }
}
</script>

<style scoped lang="scss">

</style>
