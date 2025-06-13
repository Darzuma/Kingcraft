<template>
    <div class="victoryModal">
        <modal title="Beyond Mortal : Relics of Kings" v-model:valid="showSuccess" noclose nudgeY="-1">
            <div class="success">
                <div style="display: flex;justify-content: center;margin-top: 30px">
                    <img :src="victoryIcon" :style="{width:'160px'}">
                </div>
                <div class="text" style="margin: 20px 0 60px 0;color: #ffe8aa;font-size: 20px;letter-spacing: 1px;text-align: center;">
                    <div style="margin-bottom: 20px;">Congratulations!</div>
                    <div>Your troops have won the battle!</div>
                </div>
                <div class="btns" style="display: flex;margin-bottom: 40px">
                    <btn scale=".75" style="margin-right: 10px" @click="backToWorldMap">Back to world</btn>
                    <btn scale=".75" @click="nextLevel">Continue</btn>
                </div>
            </div>
        </modal>
        <modal title="Task Failed" v-model:valid="showFailed" noclose nudgeY="-150">
            <div class="failed">
                <div class="text" style="margin: 40px 0 80px 0;color: #fff6e0;font-size: 20px;letter-spacing: 1px;text-align: center;">
                    <div>Your troops are exhausted.</div>
                </div>
                <div class="btns" style="display: flex;margin-bottom: 40px">
                    <btn scale=".75" style="margin-right: 10px" @click="backToWorldMap">Back to world</btn>
                    <btn scale=".75" @click="tryAgain">Try again</btn>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import Cookies  from 'js-cookie'
import victoryIcon from "@/assets/img/victory_icon.png"
export default {
    name: "victoryModal",
    data(){
        return {
            victoryIcon
        }
    },
    computed:{
        showSuccess(){
            return this.$store.game.currentState === 'success'
        },
        showFailed(){
            return this.$store.game.currentState === 'failed'
        }
    },
    watch:{
        '$store.game.currentTroops': function (val){
            if(val < 15){ // 当剩余兵力很少时，开启失败检测开关
                // 如果施法前已经没有单位了，则延迟检查，如果仍然没有单位，并且敌人单位数不为1，则失败
                if(this.$store.game.currentUnits === 1){
                    let t = setTimeout(()=>{
                        if(this.$store.game.currentUnits === 1 && this.$store.game.currentEnemy > 1)
                            this.$store.game.currentState = 'failed'
                        else
                            this.$store.game.currentUnits -= 1
                        clearTimeout(t)
                    }, 3000)
                }
                else
                    this.$store.game.currentUnits -= 1
            }
        },
        '$store.game.currentUnits': function (val){
            // 任务失败
            if(val === 0){
                this.$store.game.currentCard = null
                this.$store.game.currentState = 'failed'
            }
        },
        '$store.game.currentEnemy': function (val){
            if(val === 0){
                this.$store.game.currentCard = null
                this.$store.game.currentState = 'success'
            }
        },
    },
    methods:{
        backToWorldMap(){
            if(this.showSuccess){
                let nextLevel = Number(this.$route.query.level) + 1
                if(nextLevel < 6){
                    let maxLevel = nextLevel > this.$store.user.maxCampaignLevel ? nextLevel : this.$store.user.maxCampaignLevel
                    localStorage.setItem('maxCampaignLevel', maxLevel)
                }
            }
            this.$router.push({ name:'worldMap' })
        },
        nextLevel(){
            if(this.$route.name === 'tutorial'){
                this.$store.game.currentState = ''
                Cookies.set('uid', 'tempUser', { expires: 1 }) // expires 单位是 day, 0.01 是15分钟
                this.$store.loading.reload()
                this.$handle(()=>{this.$router.push({ name:'worldMap' })})
                return
            }
            let nextLevel = Number(this.$route.query.level) + 1
            if( nextLevel > 5){
                this.$handle(()=>{this.$router.push({ name:'worldMap' })}, 15)
            }
            else{
                let maxLevel = nextLevel > this.$store.user.maxCampaignLevel ? nextLevel : this.$store.user.maxCampaignLevel
                localStorage.setItem('maxCampaignLevel', maxLevel)
                location.href = location.origin + '/campaign?level=' + maxLevel
            }
        },
        tryAgain(){
            location.replace(location.href)
        },
    }
}
</script>
