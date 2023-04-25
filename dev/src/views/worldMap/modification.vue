<template>
    <div class="modification" v-show="valid">
        <div class="heroBox">
            <section class="brief">
                <div class="name">{{ hero.name }}</div>
                <div class="info">{{ hero.info }}</div>
                <ul  class="features" v-show="!pending">
                    <li v-for="(feature, idx) in hero.features">
                        <i class="icon" :style="{ '--col': index, '--row': idx }"></i>
                        <i class="name">{{ feature.name }}</i>
                        <i class="detail">{{ feature.detail }}</i>
                    </li>
                </ul>
            </section>

            <section class="graph" :class="[ tink ]"
                     :style="{ '--index': index }">
                <i class="price">
                    <i class="icon"></i>
                    <i>{{ hero.valid ? hero.price / 2 : hero.price }}</i>
                </i>
                <i class="confirmBtn green" v-if="hero.valid && user.heroIndex !== index" @click="select">
                    SELECT
                </i>
                <i class="confirmBtn blue" v-else-if="hero.valid && user.heroIndex === index" @click="upgrade">
                    UPGRADE
                </i>
                <i class="confirmBtn" v-else @click="unlock">
                    UNLOCK
                </i>
                <closeBtn class="closeBtn" size="45" @click="valid = false"/>
                <div class="level" v-show="hero.valid"><i>Lv.{{ hero.level }}</i></div>
            </section>
            <section class="cards">
                <div class="title">{{ hero.name }}{{ hero.valid ? "'s level will enhance" : " will enable"}} the following cards :</div>
                <div class="showcase" v-show="!pending">
                    <div class="card" v-for="card in cardsInShowCase">
                        <cardFace size=".55" :col="card.col" :row="card.row"/>
                    </div>
                </div>
            </section>
        </div>
        <div class="heroList">
            <div class="hero" v-for="(hero, i) in heroes"
                 :style="{'--i': i}"
                 @click="index = i"
            >
                <i class="levelNumber" >{{ hero.level }}</i>
            </div>
        </div>
    </div>
</template>

<script>
import { user, heroes, cards } from "@/stores"
export default {
    name: "modification",
    props:['bus'],
    mounted() {
    },
    data(){
        return {
            user, heroes, cards,
            tink: '', // 用于选择英雄后的发光特效
            valid: false,
            timer: null,
            index:0,
            pending: false,
        }
    },
    computed:{
        hero(){
            return this.heroes[this.index]
        },
        cardsInShowCase(){
            let index = (this.index + 2) * 4
            return this.cards.slice(index, index + 4)
        }
    },
    watch:{
        index(){
            this.$message.valid = false
            this.pending = true
            this.timer = setTimeout(()=>{
                this.pending = false
                clearTimeout(this.timer)
            }, 200)
        },
        valid:{
            immediate: true,
            handler:function (val){
                if(val){
                    this.tink = ''
                    this.bus.$nextTick(()=>{
                        if(this.bus.$el)
                            this.bus.$el.classList.add('mask')
                    })
                }
                else{
                    this.index = this.user.heroIndex
                    if(this.bus.$el)
                        this.bus.$el.classList.remove('mask')
                }
            }
        }
    },
    methods:{
        select(){
            this.user.heroIndex = this.index
            this.tink = this.tink === 'foo' ? 'bar' : 'foo'
            this.$save();
        },
        unlock(){
            if(this.user.money > this.hero.price){
                this.user.money -= this.hero.price
                this.hero.valid = true
                this.user.heroIndex = this.index
                let start = (this.index + 2) * 4
                let end = start + 4
                for(let i = start; i< end; i++){
                    this.cards[i].valid = true
                }
                this.tink = this.tink === 'foo' ? 'bar' : 'foo'
                this.$save();
            }
            else {
                this.$message.value = "Not enough gold"
                this.$message.valid = true
            }
        },
        upgrade(){
            let price = this.hero.price / 2
            if(this.user.money > price){
                this.user.money -= price
                this.hero.level += 1
                this.$save();
                this.tink = this.tink === 'foo' ? 'bar' : 'foo'
            }
            else{
                this.$message.value = "Not enough gold"
                this.$message.valid = true
            }
        }
    },
    beforeUnmount() {
        if(this.timer)
            clearTimeout(this.timer)
    }
}
</script>

<style lang="scss" scoped>
div.modification{
    --i:0;
    --index:0;
    position: absolute;left:60px;top: 0;
    width: 1800px;height: 980px;
    pointer-events: auto;
    div.heroBox{
        position: relative;
        height: 740px;
        section.cards{
            position: absolute;bottom: 60px;right: 0;
            height:545px;width: 580px;
            div.title{
                font-size: 22px;letter-spacing: 1px;text-shadow: 0 0 4px black, 0 0 15px black;
                color: #f1d1aa;
                line-height: 40px;
                margin: -10px 0 0 49px;
            }
            div.showcase{
                position: absolute;left: 50px;top: 84px;
                width: 390px;height: 500px;
                display: flex;flex-wrap: wrap;justify-content: space-between;
                div.card{
                    width: 171px;height: 210px;
                    overflow: hidden;
                    position: relative;
                    border-radius: 3px;
                    box-shadow: 0 0 0 1px #867456;
                }
            }
        }
        section.brief{
            position: absolute;left: 110px;bottom: 60px;
            height:545px;
            width: 535px;
            div.name{
                font-size: 75px;letter-spacing: 3px;text-shadow: 0 0 4px black, 0 0 15px black;
                color: #f1d1aa;
                transform: scaleY(.9);
            }
            div.info{
                margin: 40px 0 0 5px;
                font-size: 22px;letter-spacing: 1px;text-shadow: 0 0 4px black, 0 0 8px black;
                color: #f9efe3;line-height: 35px;
                word-break:keep-all;
            }
            ul.features{
                margin-top: 30px;
                padding: 0 0 0 70px;
                li{
                    position: relative;
                    padding: 0;height: 110px;
                    font-size: 18px;line-height: 24px;text-shadow: 0 0 2px black, 0 0 6px black;
                    color: #efe3d5;
                    i{
                        display: block;
                        &.icon{
                            --row:0;
                            position: absolute;left: -65px;top: 4px;
                            width: 50px;height: 50px;
                            background: red;
                            background: url("@/assets/天赋图标.jpg");
                            background-size: 450px 150px;
                            background-position: calc(var(--col) * -50px) calc(var(--row) * 50px);
                            box-shadow: 0 0 6px black, 0 0 4px black, 0 0 13px black inset, 0 0 11px black inset;
                            &::before{
                                position: absolute;left: -3px;top: -3px;display: block;content: '';width: calc(100% + 6px);height: calc(100% + 6px);
                                background: url("@/assets/天赋边框.png");
                                background-size: cover;
                            }
                        }
                        &.name{
                            font-size: 20px;
                            margin-bottom: 7px;
                            color: #f1d1aa;
                        }
                    }
                }
            }
        }
        section.graph{
            position: absolute;bottom: 60px;left: 675px;
            height:571px;width: 450px;
            @mixin tinkGlow{
                0%{ box-shadow: 0 0 0px #e3ce9e, 0 0 0px #c4ad7d, 0 0 0px #9ec8ff;}
                30%{ box-shadow: 0 0 40px #e3ce9e, -5px 0 60px #c4ad7d, 5px 0 60px #9ec8ff;}
                100%{ box-shadow: 0 0 40px transparent, -5px 0 60px transparent, 5px 0 60px transparent;}
            }
            @keyframes foo { @include tinkGlow() }
            @keyframes bar { @include tinkGlow() }
            &.foo::after{
                animation: foo 1.4s;
            }
            &.bar::after{
                animation: bar 1.4s;
            }
            &::after{
                //animation: foo 1.4s infinite;
                position: absolute;left: 0;top: 0;content: "";display: block;
                width: 100%;height: 100%;
                background: url("@/assets/英雄选择_相框.png");
                background-size: cover;
                border-radius: 218px 218px 0 0;

            }
            &::before{
                position: absolute;left: 2px;top: 2px;content: "";display: block;
                width: calc(100% - 4px);height: calc(100% - 4px);
                background: url("@/assets/英雄头像.jpg");
                background-size: cover;
                overflow: hidden;
                border-radius: 230px 230px 0 0;
                background-position-x: calc(-56px - var(--index) * 567px);
                transition: background-position-x .2s;
                box-shadow: 0 0 60px black inset,0 0 60px black inset,0 0 60px black inset;
                animation: glow 5s infinite;
                @keyframes glow {
                    0%{ transform: translateY(1px) rotateX(4deg) rotateY(4deg); filter: brightness(1) }
                    50%{ transform: translateY(-1px) rotateX(-4deg ) rotateY(-4deg); filter: brightness(1.15) }
                    100%{ transform: translateY(1px) rotateX(4deg) rotateY(4deg); filter: brightness(1) }
                }
            }
            i.price{
                position: absolute;bottom: 105px;left:100px;z-index: 9;
                width: 260px;height: 50px;line-height: 50px;text-align: center;
                font-size: 25px;letter-spacing: 2px;font-weight: bold;
                display: flex;align-items: center;justify-content: center;
                color: #f1d1aa;
                text-shadow: 0 0 4px black;
                background-color: rgba(0,0,0,.5);
                i.icon{
                    background: url("@/assets/金币.png");
                    background-size: cover;
                    width:20px;height: 22px;
                    transform: translateX(-10px);
                }
            }
            i.confirmBtn{
                position: absolute;bottom: 44px;left:100px;display: block;z-index: 10;
                width: 260px;height: 52.1px;
                line-height: 49px;text-align: center;
                background: url("@/assets/英雄选择_按钮.jpg");
                background-size: cover;
                color: #ffd082;
                font-size: 18px;letter-spacing: 2px;
                text-shadow: 0 0 20px black, 0 0 10px black, 0 0 4px black;
                &:active{
                    background: url("@/assets/英雄选择_按钮2.jpg");
                    background-size: cover;
                    line-height: 50px;
                    color: #d5ad6c;
                }
            }
            div.level{
                position: absolute;top: 50px;left:20px;display: block;z-index: 10;
                height: 28px;width: 90px;text-align: center;
                &::before{
                    position: absolute;display: block;content: "";
                    left: -2px;top: -2px;
                    width: calc(100% + 4px);height: calc(100% + 4px);border-radius: 7px;
                    background-image: linear-gradient(0deg,#735f4c, #d3cdbc, #735f4c);
                }
                i{
                    position: relative;display: block;
                    color: white;font-size: 20px;line-height: 28px;
                    width: 100%;height: 100%;
                    background: #1B1C1C;border-radius: 5px;
                }
            }
            div.closeBtn{
                position: absolute;top: -10px;right:-48px;display: block;
            }
        }
    }
    div.heroList{
        height: 240px;
        display: flex;justify-content: space-between;align-items: center;
        div.hero{
            position: relative;
            width: 160px;height: 160px;
            &:hover{
                transition: filter .4s ease;
                filter: brightness(1.2);
                &::before{
                    transition: transform .4s ease;
                    transform: rotate(-60deg);
                }
                i.levelNumber{
                    transition: box-shadow .4s ease;
                    box-shadow: 0 0 0 2px #b6a084;
                }
            }
            &::before{
                position: absolute;display: block;content: "";
                left: -6px;top: -6px;
                width: calc(100% + 12px);height: calc(100% + 12px);border-radius: 200px;
                background-image: linear-gradient(0deg,#735f4c, #d3cdbc, #735f4c);
            }
            &::after{
                position: absolute;display: block;content: "";
                width: 100%;height: 100%;border-radius: 200px;
                background: url("@/assets/英雄头像.jpg");
                background-size: cover!important;
                background-position-x:calc(var(--i) * -160px);
                box-shadow: 0 0 0 3px black;
            }
            i.levelNumber{
                position: absolute;display: block;content: "";z-index: 1;
                left: 69px;bottom: -16px;
                width: 22px;height: 22px;line-height: 22px;text-align: center;text-shadow: 0 0 2px black;
                background-color: #231c15;
                color: white;
                padding-left: 1px;
                border-radius: 4px;
                box-shadow: 0 0 0 2px #785e43;
            }
        }
    }
}
</style>