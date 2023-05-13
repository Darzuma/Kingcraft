<template>
    <div class="panels">
        <div class="background"/>
        <avatar flip style="position: absolute;z-index: 1;right: 43px;bottom:14px;"/>
        <div class="crystal">
            {{ game.currentCrystal }}
        </div>
        <div class="heroName">
            {{ hero.name }}
        </div>
        <div class="levelNumber">
            Level {{ hero.level }}
        </div>
        <div class="menuButton" @click="showSetting">
            <i>MENU</i>
        </div>

        <!--中间卡槽-BEGIN -->
        <div class="slot">
            <div class="tips" v-show="viewingCard" :style="{ '--index': currentSlotIndex }">
                <i class="tips">Click to dispatch</i>
                <i class="info">{{ viewingCard ? viewingCard.name : '' }}</i>
            </div>
            <div v-for="(card, index) in slots"
                 class="card" :class="[ getType(card) ]"
                 @mousemove="viewingCard = card; currentSlotIndex = index"
                 @mouseleave="viewingCard = null"
                 @click="dispatch(card, index)"
            >
                <i class="name" :class="{ fix: card.type === 0 }">{{ card.type === 0 ? 'UNITS' : card.type === 1 ? 'ATTACK' : 'SALVATION' }}</i>
                <!--                <i class="level">{{ card.level }}</i>-->
                <cardFace class="positionFix" size=".415" :col="card.col" :row="card.row"/>
            </div>
        </div>
        <!--中间卡槽-END -->

        <div class="title">
            {{ game.levelName }}
        </div>
    </div>
</template>

<script>
import avatar from '@/components/avatar'
import { user, heroes, setting, cards, game } from "@/stores"
export default {
    name: "panels",
    props: [ 'bus' ],
    components: { avatar },
    mounted() {
        game.currentCrystal = this.hero.level * 3
    },
    data(){
        return {
            viewingCard: null,
            currentSlotIndex: 0,
            game,
        }
    },
    computed:{
        hero(){
            return heroes[user.heroIndex]
        },
        slots(){
            let arr = []
            user.slots.sort((a,b)=> a - b)
            user.slots.forEach(index => {
                if(typeof index === 'number')
                    arr.push(cards[index])
            })
            return arr
        }
    },
    methods: {
        showSetting(){
            setting.valid = true
        },
        getType(card){
            return card.type === 0 ? 'type_0' : (card.type === 1 ? 'type_1' : 'type_2')
        },
        dispatch(card, index){
            game.currentCard = card
        }
    }
}
</script>

<style scoped lang="scss">
div.panels{
    position: absolute;bottom: 0;left: 0;z-index: 1;
    width: 1920px;height: 310px;
    div.background{
        height: 100%;
        z-index: 5;
        position: relative;
        background-image: url("@/assets/ui_console_frame.png");
        background-size: cover;
    }
    div.crystal{
        position: absolute;z-index: 10;right: 323px;top: 140px;
        color: white;
        font-size: 36px;
        text-shadow: 1px 1px 2px black, 0 0 2px black, -1px -1px 2px black;
        font-weight: bold;
        text-align: center;
        width: 50px;
    }
    div.heroName{
        color: #dbac34;
        position: absolute;z-index: 10;right: 284px;top: 200px;
        width: 126px;height: 16px;line-height: 15px;text-align: center;
        font-size: 12px;
    }
    div.levelNumber{
        color: rgba(255,255,255,.7);font-family: "PingFang SC";
        position: absolute;z-index: 10;right: 314px;top: 245px;
        width: 71px;height: 24px;line-height: 23px;text-align: center;
        font-size: 13px;
    }
    div.menuButton{
        position: absolute;z-index: 10;right: 312px;top: 281px;
        width: 74px;height: 19.5px;
        background-image: url("@/assets/ui_menu_btn1.jpg");
        background-size: cover;
        pointer-events: auto;
        i{
            display: inline-block;width: 100%;height: 100%;
            transform: scale(.8);
            color: #efefef;text-align: center;letter-spacing: 1px;
            line-height: 19px;
            font-size: 12px;
            text-shadow: 0 0 10px black;
        }
        &:active{
            background-image: url("@/assets/ui_menu_btn2.jpg");
            i{ color: #b5b5b5; }
        }
    }
    div.slot{
        position: absolute;bottom: 10px;right: 436px;z-index: 10;
        width: 1070px;height: 190px;
        display: flex;align-items: center;justify-content: center;
        div.card{
            width: 150px;height: 187.27px;
            position: relative;margin: 0 2px;
            transition: .4s cubic-bezier(0.84, -1.13, 0.16, 3);
            i.name{
                position: absolute;left: 0;top: 9px;display: block;
                z-index: 6;
                width: 100%;text-align: center;
                font-size: 12px;letter-spacing: 1px;
                color: #fff4d8;
                text-shadow: 0 0 2px black, 0 0 8px black;
                transform: scale(.7);
                &.fix{
                    padding-left: 18px;
                }
            }
            &:hover{
                transform: translateY(-2px);
            }
            &::after{
                position: absolute;left: 0;top: 0;display: block;content: "";z-index: 5;
                width: 100%;height: 100%;
            }
            &.type_0::after{
                background: url("@/assets/卡牌边框0.png");background-size: cover;
            }
            &.type_1::after{
                background: url("@/assets/卡牌边框1.png");background-size: cover;
            }
            &.type_2::after{
                background: url("@/assets/卡牌边框2.png");background-size: cover;
            }
            div.positionFix{
                position: absolute;left:11px;top: 22px;
                box-shadow: 0 0 30px black inset;
            }
        }
        div.tips{
            --index:0;
            position: absolute;top: -120px;left:calc(var(--index) * 150px);z-index: 1;
            min-width: 350px;
            min-height: 93px;line-height: 1.5;
            text-shadow: 0 0 2px black;
            background: rgba(0,0,0,.7);
            border: 1px solid #867456;
            border-radius: 5px;
            padding: 9px 18px 20px 18px;
            i.info{
                display: block;
                color: #f1d1aa;font-size: 18px;
            }
            i.tips{
                display: block;min-height: 35px;
                color: lawngreen;text-shadow: 0 0 2px black;font-size: 18px;
            }
        }
    }
    div.title{
        position: absolute;left: 82px;top: 35px;z-index: 10;
        width: 280px;height: 40px;line-height: 39px;
        font-size: 21px;font-weight: bold;color: #d1c9bc;letter-spacing: 1px;
        text-align: center;
        text-shadow: 0 0 10px black;
    }
}
</style>