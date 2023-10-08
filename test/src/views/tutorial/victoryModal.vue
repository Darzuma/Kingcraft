<template>
    <transition name="fade">
        <div class="mask" v-if="valid">
            <div class="victoryModal">
                <div class="wrapper">
                    <div class="title">
                        {{ isVictory ? 'VICTORY!' : 'YOU LOOSE' }}
                    </div>
                    <div class="stars" :class="{ isVictory }">
                        <icon index="13" size="42"/>
                        <icon index="13" size="42"/>
                        <icon index="13" size="42"/>
                    </div>
                    <div class="rewards">
                        <div class="name">Your rewards:</div>
                        <div class="gold"><icon index="0" size="30"/>×{{ isVictory ? 500 : 0 }}</div>
                    </div>
                    <div class="otherRewards">
                        <div class="card"><cardFace size=".5" col="0" row="3"/></div>
                        <div class="card"><cardFace size=".5" col="1" row="2"/></div>
                        <div class="card"><cardFace size=".5" col="3" row="0"/></div>
                    </div>
                    <div class="btnBox">
                        <btn @click="next" style="pointer-events: auto">{{ isVictory ? 'Next' : 'Try again' }}</btn>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Cookies  from 'js-cookie'
export default {
    name: "victory-modal",
    data(){
        return {
            valid: false,
            isVictory: true,
            timer: null
        }
    },
    props: [ 'bus' ],
    watch:{
        '$store.game.currentEnemy': function (val){
            if(val <= 0){
                // 胜利
                this.timer = setTimeout(()=>{
                    this.isVictory = true
                    this.valid = true
                }, 3000)

            }
        },
        '$store.game.currentUnits': function (val){
            if(val <= 0){
                // 失败
                this.timer = setTimeout(()=>{
                    this.isVictory = false
                    this.valid = true
                }, 3000)
            }
        },
        '$store.game.currentTroops': function (val){
            if(val < 20){ // 当剩余兵力很少时，再开启失败开关
                this.$store.game.currentUnits -= 1
            }
        },
    },
    methods: {
        next(){
            if(this.isVictory){
                Cookies.set('uid', 'tempUser', { expires: 1 }) // expires 单位是 day, 0.01 是15分钟
                this.$store.user.money += 500
                this.valid = false
                this.$store.loading.reload()
                this.$router.push({ name: 'home' })
            }
            else{
                document.location.replace(location.origin + '/tutorial')
            }
        }
    }
}
</script>

<style scoped lang="scss">
div.mask{
    position: absolute;z-index: 200;
    width: 100vw;height: 100vh;
    display: flex;align-items: center;justify-content: center;
    background-color: rgba(0,0,0,.3);
    backdrop-filter: blur(5px);
    pointer-events: auto;
    div.victoryModal{
        background: url("@/assets/胜利画面背景2.png");
        background-size: cover;
        //width: 2847px; height:  1752px;
        width: 1423.5px; height:  876px;
        display: flex;align-items: center;justify-content: center;
        color: #feeac6;
        transform: translateY(-10vh);
        div.wrapper{
            padding-top: 88px;
            width: 800px;height: 600px;
            display: flex;flex-direction: column;align-items: center;
            div.title{
                width: 100%;
                text-align: center;
                font-size: 54px;letter-spacing: 4px;
                text-shadow: 0 0 5px black;
            }
            div.stars{
                width: 280px;padding: 30px 0;
                display: flex;justify-content: space-around;
                filter: brightness(.4);
                &.isVictory{
                    filter: brightness(1);
                }
                div.icon{
                    transform: scale(1.4);
                    &:nth-child(2){
                        transform: scale(1.8);
                    }
                }
            }
            div.rewards{
                color: #edc184;
                margin-top: 30px;
                width: 520px;height: 50px;
                display: flex;justify-content: space-between;
                padding-right: 2px;
                div.name{
                    font-size: 30px;
                    line-height: 50px;
                }
                div.gold{
                    font-size: 24px;
                    display: flex;align-items: center;
                }
            }
            div.otherRewards{
                width: 520px;margin-top: 30px;
                display: flex;justify-content: space-between;
                div.card{
                    border-radius: 3px;
                    border: 1px solid #F2DAB6;
                    overflow: hidden;
                    width: 154.5px;height: 190px;
                }
            }
            div.btnBox{
                padding: 50px 0 0 0;
            }
        }

    }

}
</style>