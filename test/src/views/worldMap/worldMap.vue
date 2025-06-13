<template>
    <div class="worldMap" :class="{ activated: activated }"
         @mousemove="mousemove" @click="click" @wheel="wheel"
    >
        <!--底部UI面板-->
        <ratioBox width="1920" height="1290" bottom>
            <consolePanel ref="consolePanel" :bus="this"/>
        </ratioBox>
<!--        btnIndex !== -1-->
        <!--鼠标移动到世界地图图标上时，显示的提示信息-->
        <div class="gameInfo" v-show="btnIndex !== -1" :style="{ '--left': left, '--top': top }">
            <div class="cover" :style="{ '--coverIndex': btnIndex }">
                <div class="alphabet"><i>{{ alphabets[btnIndex] }}</i></div>
            </div>
            <div class="text">
                <i class="name">{{ btnName }}</i>
                <i class="info">{{ gameModeInfos[btnIndex] }}</i>
            </div>
        </div>
        <login/>
    </div>
</template>

<script>
import consolePanel from "./consolePanel";

import login from './login'
import Cookies  from 'js-cookie'
export default {
    name: 'worldMap',
    components:{
        consolePanel, login
    },
    created() {
        if(!this.$store.unity.src)
            this.$store.unity.src = 'https://res.bmwistrek.com/Kingcraft'
        this.$store.game.onStart.push(()=>{
            // document.title = 'Warrior of Legends'
            document.querySelector("link[rel~='icon']").href = '/fav_icon.ico'

            this.$store.unity.instance.SendMessage('GameManager', 'LoadScene', 'WorldMap')
            if(this.$store.user.maxCampaignLevel < 4){
                let t = setTimeout(()=>{
                    this.$store.unity.instance.SendMessage('GameManager', 'ShowCampaignHintArrow')
                    clearTimeout(t)
                }, 3000)
            }
        })
        this.$store.game.onWorldBtnEnter.push((args)=>{
            this.worldBtnEnter(args)
        })
        this.$store.game.onWorldBtnExit.push((args)=>{
            this.worldBtnExit(args)
        })

        if(this.$store.loading.progress === 1)
            this.$store.game.commit('onStart')
    },
    mounted() {
       let t= setTimeout(()=>{
           this.activated = true
           clearTimeout(t)
       }, 500)
    },
    data(){
        return {
            n:1,
            btnIndex: -1,
            btnName : '',
            gameModeInfos: [
                'Solo campaign, get gold rewards by completing different stories, you can also choose to challenge a completed level.',
                "View your achievements, regional rankings, you can also challenge another player's card combination." ,
                "Randomly explore different cards and enemies, familiarize yourself with various game modes in advance.",
                "Create a custom room, join other player's room, or watch a skirmish game as an observer.",
                "Challenge an infinite level, the difficulty of the level will be gradually increased, this mode is for upgrading heroes, or master the tactics proficiently!",
                "Challenge random events, special bosses and special enemies, complete the challenge to gain magic boxes.",
                "Check the game store, discounts are different every day, and becoming a member can directly unlock all content.",
            ],
            left:'660px',
            top:' 500px',
            alphabets: ['Ω', 'Φ', 'Ψ', 'Π', 'Γ', 'Λ', 'Μ'],
            activated: false,
            btnAvailable: true,
            timer: null,
        }
    },
    watch:{
        dialogs(val){
            this.btnAvailable = true
            for(let key in val){
                if(val[key]){
                    this.btnAvailable = false
                    return
                }
            }
        },
        btnAvailable(val){
            if(!this.$store.unity.instance)
                return
            if(val){
                if(this.timer)
                    clearTimeout(this.timer)
                this.timer  = setTimeout(()=>{
                    this.$store.unity.instance.SendMessage('GameManager', 'UnfreezeWorldCamera')
                    clearTimeout(this.timer)
                    this.timer = null
                }, 400)
            }
            else
                this.$store.unity.instance.SendMessage('GameManager', 'FreezeWorldCamera')
        }
    },
    computed:{
        dialogs(){
            const {showLogin,showLadder,showMarket,showHeroes,showSetting,showTaskMap,showChatroom,showHandling,showTroops,showCitadel} = this.$store.user
            return {showLogin,showLadder,showMarket,showHeroes,showSetting,showTaskMap,showChatroom,showHandling,showTroops,showCitadel}
        }
    },
    methods:{
        click(){
            if( this.btnIndex > -1){
                switch (this.btnIndex){
                    case '0':
                        this.$store.user.showTaskMap = true
                        // this.$store.unity.instance.SendMessage('GameManager', 'HideCampaignHintArrow')
                        break
                    case '1':
                        this.$store.user.showTroops = true
                        break
                    case '2':
                        this.$store.user.showCitadel = true
                        break
                    case '6':
                        this.$store.user.showMarket = true
                        break
                   default:
                }
            }
        },
        worldBtnEnter(args){
            if(this.btnAvailable)
                [ this.btnIndex, this.btnName ] = args
        },
        worldBtnExit(){
            [ this.btnIndex, this.btnName ] = [ -1, '' ]
        },
        mousemove(e){
            [this.left, this.top] = [ e.screenX + 'px', e.screenY + 'px' ]
        },
        wheel(e){
            if(this.$store.unity.instance)
                this.$store.unity.instance.SendMessage('GameManager', 'UpdateZoomSize', e.deltaY > 0 ? "0.1" : "-0.1")

        }
    },
    deactivated() {
        this.activated = false
    },
    activated() {
        let t= setTimeout(()=>{
            this.activated = true
            clearTimeout(t)
        }, 300)
    },
}
</script>

<style lang="scss">
div.worldMap{
    //pointer-events: none;
    height: 100vh;width: 100vw;
    position: absolute;top: 0;z-index: 1;
    display: flex;align-items: end;justify-content: center;
    --transColor: rgba(0,0,0,1);
    &.mask{
        background: linear-gradient(180deg, rgba(0,0,0,.6) 0%,rgba(0,0,0,.5) 80%, rgba(0,0,0,0) 100%);
    }
    &::before{
        background-color: rgba(0,0,0,1);
        position: absolute;display:block;width: 100%;height: 100%;content: '';
        z-index: 200;
        pointer-events: none;
        transition: background-color 1s;
    }
    &.activated::before{
        background-color: rgba(0,0,0,0);
    }
    div.gameInfo{
        --left:'660px';
        --top:'500px';
        position: absolute;z-index:150;
        left: var(--left);top:var(--top);
        max-width: 580px;height: 220px;
        background-color: rgba(0,0,0,.8);
        border: 1px solid #d7cba5;
        border-radius: 4px;
        overflow: hidden;
        padding: 15px;
        word-break: keep-all;word-wrap: normal;
        display: flex;justify-content: center;align-items: start;
        &::before{
            position: absolute;left: 0;top: 0;box-sizing: border-box;
            display: block;content: '';
            width: 100%;height: 100%;
            border: 5px solid #594d32;
            border-radius: 6px;
            box-shadow: 0 0 10px inset black, 0 0 0 10px #594d32;
        }
        div.cover{
            --coverIndex: 0;
            //width: 271px;height: 398px;
            min-width: 129.4px;height: 190px;
            max-width: 129.4px;
            background: url("@/assets/游戏模式封面.jpg");
            background-size: cover;
            background-position-x: calc(var(--coverIndex) * -129.4px);
            border-radius: 1px;overflow: hidden;
            display: flex;justify-content: center;align-items: center;
            div.alphabet{
                position: relative;
                width: 45px;height: 45px;
                //transform: translateY(50px);
                &::before{
                    position: absolute;content: '';left: 2px;top: 2px;
                    width: calc(100% - 4px);height: calc(100% - 4px);z-index: 1;

                    background-color: rgba(0,0,0,.7);
                }
                &::after{
                    position: absolute;content: '';width: 100%;height: 100%;z-index: 10;
                    background: url("@/assets/天赋边框.png");
                    background-size: cover;
                }
                i{
                    position: absolute;left: 11px;top: 12px;z-index: 2;
                    color: #dd2c00;
                    font-size: 30px;
                    text-shadow: 0 0 5px black;
                }
            }
        }
        div.text{
            margin-left: 15px;
            i.name{
                color: #ffe5a5;line-height: 1.2;
                margin-bottom: 10px;
                font-size: 28px;letter-spacing: 1.5px;
            }
            i.info{
                color: #f3e6be;line-height: 1.7;font-size: 19px;letter-spacing: 1px;
            }
        }

    }
}
</style>