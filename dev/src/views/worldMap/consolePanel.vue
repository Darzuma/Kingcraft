<template>
    <div class="consolePanel">
        <div class="background"/>
        <avatar style="position: absolute;z-index: 1;left: 43px;bottom:14px;"/>
        <div class="modify" @click="bus.$refs.modification.valid = !bus.$refs.modification.valid"/>
        <div class="crystal">
            {{ 2 + hero.level * 1 }}
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
            <div class="tips" v-if="currentSlotCard" :style="{ '--index': currentSlotIndex }">
                <i class="name">{{ currentSlotCard.name  }}</i>
                <i class="info">{{ currentSlotCard.info  }}</i>
                <footer>
                    <icon index="14" size="28"/>
                    <i class="cost">{{ currentSlotCard.supply }}</i>
                    <i class="tips">Click <i class="x">×</i> to unequip</i>
                </footer>
            </div>
            <div class="card" :class="[ getType(card) ]" v-for="(card, index) in slots"
                 @mousemove="currentSlotCard = card; currentSlotIndex = index"
                 @mouseleave="currentSlotCard = null; currentSlotIndex = null"
            >
                <closeBtn instant class="closeBtnFix" size="30" v-show="currentSlotIndex === index"
                          @click="unequip(card, index)"
                />
                <i class="name" :class="{ fix: card.type === 0 }">{{ card.type === 0 ? 'UNITS' : card.type === 1 ? 'ATTACK' : 'SALVATION' }}</i>
<!--                <i class="level">{{ card.level }}</i>-->
                <cardFace class="positionFix" size=".415" :col="card.col" :row="card.row"/>
            </div>
        </div>
        <!--中间卡槽-END -->
        
        <div class="title">
            Card Repository
        </div>
        <div class="pagination">
            <div class="circle" @click="currentPage -= currentPage > 1 ? 1 : 0">
                <i class="arrow left interactive"></i>
            </div>
            <div class="pageNum">{{ currentPage }}/6</div>
            <div class="circle" @click="currentPage += currentPage < 6 ? 1 : 0">
                <i class="arrow right interactive"></i>
            </div>
        </div>

        <div class="repositoryTips" v-show="currentRepoCard">
            <i class="tips">{{ currentRepoCard ?
                (currentRepoCard.valid ? currentRepoCard.equiped ? 'Click to unequip' : 'Click to equip' : `Unlock [${currentRepoCard.requirement ? currentRepoCard.requirement : heroes[currentRepoCard.col - 2].name}] to to get this card`) : '' }}</i>
            <i class="info">{{ currentRepoCard ? currentRepoCard.name : '' }}</i>
        </div>

        <div class="repository">
            <div class="tray" :style="{ '--transX': currentPage - 1 }">
                <div class="card" :class="{ lock: !card.valid }" v-for="(card, index) in cards"
                     @mouseenter="currentRepoCard = card"
                     @mouseleave="currentRepoCard = null"
                     @click="toggle(card, index)"
                >
                    <i class="equiped" v-show="card.equiped">√</i>
                    <div class="ribbon" v-if="!card.valid"/>
                    <cardFace size=".244" :col="card.col" :row="card.row"/>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import { user, heroes, setting, cards } from "@/stores"
import avatar from '@/components/avatar'
export default {
    name: "consolePanel",
    props:['bus'],
    components: { avatar },
    data(){
        return {
            currentRepoCard: null,
            currentSlotCard: null,
            currentSlotIndex: 0,
            currentPage: 1,
            cardInfo:'',
            cards, heroes
        }
    },
    computed:{
        hero(){
            return heroes[user.heroIndex]
        },
        index(){
            return user.heroIndex
        },
        slots(){
            let arr = []
            user.slots.sort((a,b)=> a - b)
            user.slots.forEach(index => {
                if(typeof index === 'number'){
                    cards[index].equiped = true
                    arr.push(cards[index])
                }
            })
            return arr
        }
    },
    methods:{
        showSetting(){
            setting.valid = true
        },
        toggle(card, index){
            if(card.equiped)
                this.unequip(card)
            else
                this.equip(card)
        },
        equip(card, index){
            if(!card.valid){
                let mod = this.bus.$refs.modification
                mod.index = card.heroIndex || typeof card.heroIndex === 'number' ? card.heroIndex : card.col - 2
                mod.valid = true
            }
            else{
                if(user.slots.includes(card.id))
                    return
                if(user.slots.length > 6){
                    if(user.slots[0]===card.id)
                        user.slots.pop()
                    else
                        user.slots.shift()
                }

                user.slots.push(card.id)
            }
        },
        unequip(card, index){
            card.equiped = false
            user.slots.splice(user.slots.indexOf(card.id), 1)
            this.currentSlotCard = null
        },
        getType(card){
            return card.type === 0 ? 'type_0' : (card.type === 1 ? 'type_1' : 'type_2')
        },
    }
}
</script>

<style lang="scss" scoped>
div.consolePanel{
    position: absolute;bottom: 0;left: 0;
    width: 1920px;height: 310px;
    div.slot{
        position: absolute;bottom: 10px;left: 430px;z-index: 3;
        width: 1070px;height: 190px;
        display: flex;align-items: center;justify-content: center;
        div.card{
            width: 150px;height: 187.27px;
            position: relative;margin: 0 2px;
            transition: .4s cubic-bezier(0.84, -1.13, 0.16, 3);
            div.closeBtnFix{
                position: absolute;right: 1px;top: 1px;z-index: 15;
            }
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
            --index:100;
            position: absolute;bottom: calc(100% + 5px);left:calc(var(--index) * 150px);z-index: 1;
            min-width: 480px;
            min-height: 93px;line-height: 1.5;
            text-shadow: 0 0 2px black;
            background: rgba(0,0,0,.7);
            border: 1px solid #867456;
            border-radius: 5px;
            padding: 9px 18px 20px 18px;
            i.name{
                display: block;
                color: #f1d1aa;font-size: 24px;
            }

            i.info{
                margin-top: 15px;
                display: block;font-size: 20px;
                color: #f2e4d5;
            }
            footer{
                margin-top: 15px;
                display: flex;
                height: 40px;
                align-items: end;
                i.cost{
                    font-size: 20px;
                    color: rgba(255,255,255,.8);
                    margin:0 50px 0 5px;
                }
                i.tips{
                    color: lawngreen;text-shadow: 0 0 2px black;font-size: 18px;
                    i.x{
                        display: inline-block;width: 16px;height: 16px;
                        text-align: center;line-height: 15px;
                        background: rgba(55,255,0,.2);
                    }
                }
            }

        }
    }
    div.repositoryTips{
        position: absolute;bottom: 300px;right: 44px;z-index: 1;
        width: 350px;
        min-height: 60px;line-height: 1.5;
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
    div.repository{
        --transX:0;
        position: absolute;bottom: 7px;right: 64px;z-index: 4;
        width: 316px;height: 190px;
        overflow: hidden;
        div.tray{
            width: 1900px;height: 190px;
            display: flex;flex-wrap: wrap;
            padding: 2px;
            transform: translateX(calc(var(--transX) * -316px));
            transition: transform .2s ease;
            div.card{
                position: relative;
                width: 75px;height: 91px;margin: 0 4px 4px 0;
                overflow: hidden;
                border-radius: 3px;
                box-shadow: 0 0 0 1px #867456;
                &:hover{
                    filter: brightness(1.1);
                }
                &.lock{
                    filter: saturate(0);
                }
                i.equiped{
                    position: absolute; bottom: 5px; left: 8px;font-size: 15px;z-index: 10;
                    color: #34e000;text-shadow: 0 0 2px black, 0 0 2px black;
                    //color: lawngreen;
                    transform: scaleX(1.5);
                }
                div.ribbon{
                    position: absolute;z-index: 1;
                    bottom: 20px;left: 0;
                    height: 20px;width: 100%;
                    background: rgba(255,237,188,.4);
                    &::before{
                        position: absolute;content: "";display: block;
                        left: 34.5px;top: 4px;
                        width: 6px;height: 6px;
                        border-radius: 10px;
                        background: black;
                    }
                    &::after{
                        position: absolute;content: "";display: block;
                        left: 33.5px;top: 3px;
                        width: 0;height: 0;
                        border-top: 3px solid transparent;
                        border-right: 4px solid transparent;
                        border-bottom: 10px solid black;
                        border-left: 4px solid transparent;
                    }
                }
            }
        }
    }
    div.background{
        height: 100%;
        z-index: 2;
        position: relative;
        background-image: url("@/assets/ui_console_frame.png");
        background-size: cover;
        transform: scaleX(-1);
    }
    div.modify{
        z-index: 2;
        position: absolute;top: 33px;left: 54px;
        width: 225px;height: 276px;
        pointer-events: auto;
        &:hover{
            backdrop-filter: brightness(1.14);
        }
        &:before{
            position: absolute;top: -2px;left: -6px;z-index: 2;content: "Modify";display: block;
            color: #d9d2c3;
            background-color: black;
            box-shadow: 0 0 0 2px #4b4134 inset;
            width: 68px;height: 19px;line-height: 18px;text-align: center;
            font-size: 12px;letter-spacing: 1px;
            border-radius: 50px;
            user-select: none;
            padding-left: 2px;
        }
        &::after{
            position: absolute;top: -3px;left: -7px;content: '';z-index: 1;display: block;
            width: 72px;height: 21px;border-radius: 10px;
            background-image: linear-gradient(-10deg,#8e856d,#d3cdbc, #8e856d);
        }
    }
    div.crystal{
        position: absolute;z-index: 2;left: 323px;top: 140px;
        color: white;
        font-size: 36px;
        text-shadow: 1px 1px 2px black, 0 0 2px black, -1px -1px 2px black;
        font-weight: bold;
        text-align: center;
        width: 50px;
    }
    div.heroName{
        color: #dbac34;
        position: absolute;z-index: 2;left: 284px;top: 200px;
        width: 126px;height: 16px;line-height: 15px;text-align: center;
        font-size: 12px;
    }
    div.levelNumber{
        color: rgba(255,255,255,.7);font-family: "PingFang SC";
        position: absolute;z-index: 2;left: 314px;top: 245px;
        width: 71px;height: 24px;line-height: 23px;text-align: center;
        font-size: 13px;
    }
    div.menuButton{
        position: absolute;z-index: 2;left: 312px;top: 281px;
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
    div.title{
        position: absolute;right: 118px;top: 35px;z-index: 2;
        width: 210px;height: 40px;line-height: 39px;
        font-size: 21px;font-weight: bold;color: #d1c9bc;letter-spacing: 1px;
        text-align: center;
        text-shadow: 0 0 10px black;
    }
    div.pagination{
        position: absolute;right: 59px;top: 78px;z-index: 5;
        width: 325px;height: 40px;
        display: flex;justify-content: space-between;align-items: center;
        div.pageNum{
            font-size: 16px;letter-spacing: 10px;
            color: #d1cab8;
            padding-top: 5px;
        }
        div.circle{
            position: relative;display: flex;align-items: center;justify-content: center;
            width: 40px;height: 40px;
            border-radius: 30px;
            background-color: red;
            background-image: linear-gradient(-40deg,#8e856d,#d3cdbc, #8e856d);
            &::before{
                position: absolute;content: '';display: block;z-index: 1;
                width: 38px;height: 38px;border-radius:30px;
                left: 1px;top: 1px;
                background-color: black;
                box-shadow: 0 0 0 2px #4b4134 inset;
            }
            &:active{
                i.arrow{
                    transform: translateX(-2.5px);
                    &.right{
                        transform: translateX(3.5px) scaleX(-1);
                    }
                }
            }
            i.arrow{
                position: relative;z-index: 2;
                width: 23px;height: 29.5px;
                background-image: url("@/assets/ui_arrow.png");
                background-size: cover;
                transform: translateX(-1.5px);
                &.right{
                    transform: translateX(3px) scaleX(-1);
                }
            }
        }
    }
}
</style>