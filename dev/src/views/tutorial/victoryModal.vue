<template>
    <div class="mask" v-show="valid">
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
                    <div class="gold"><icon index="0" size="30"/>×{{ isVictory ? 1500 : 0 }}</div>
                </div>
                <div class="otherRewards">
                    <div class="card"><cardFace size=".5" col="0" row="3"/></div>
                    <div class="card"><cardFace size=".5" col="1" row="2"/></div>
                    <div class="card"><cardFace size=".5" col="3" row="0"/></div>
                </div>
                <div class="btnBox">
                    <btn @click="next">{{ isVictory ? 'Next' : 'Try again' }}</btn>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import Cookies  from 'js-cookie'
import { user, game } from '@/stores'
export default {
    name: "victory-modal",
    data(){
        return {
            valid: false,
            isVictory: false
        }
    },
    props: [ 'bus' ],
    methods: {
        next(){
            if(this.isVictory){
                Cookies.set('username', this.username, { expires: 0.01 }) // expires 单位是 day, 0.01 即15分钟
                user.money += 1500
                this.valid = false
                this.$router.push('/')

                let t = setTimeout(()=>{
                    try {
                        game.dispatch("GameManager","SetScene","worldMap")
                    }catch (err){ console.log(err) }
                    clearTimeout(t)
                },100)
            }
           else{
               try{
                   game.dispatch("GameManager","SetScene","Tutorial")
               }catch (err){}
                this.isVictory = false
                this.valid = false
            }
        }
    }
}
</script>

<style scoped lang="scss">
div.mask{
    position: absolute;z-index: 100;
    width: 100vw;height: 100vh;
    display: flex;align-items: center;justify-content: center;
    background-color: rgba(0,0,0,.5);
    backdrop-filter: blur(10px);
    div.victoryModal{
        background: url("@/assets/胜利画面背景.png");
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