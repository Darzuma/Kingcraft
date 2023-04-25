<template>
    <transition name="fade">
        <div class="menus" v-show="valid">
            <div class="wrapper">
                <ratioBox width="600" height="698">
                    <div class="menuTitle">Warrior of Legends</div>
                    <ul>
                        <li>
                            <div class="title">Graphic Setting</div>
                            <div class="bar">
                                <i v-for="(val, idx) in graphicSettings" :class="{ current: setting.graphicLevel === idx}"
                                   @click="setting.graphicLevel = idx"
                                >
                                    {{ val }}
                                </i>
                            </div>
                        </li>
                        <li>
                            <div class="title">Language</div>
                            <div class="bar">
                                <i v-for="(val, idx) in languages" :class="{ current: setting.language === val}">
                                    {{ val }}
                                </i>
                            </div>
                        </li>
                        <li>
                            <div class="title">Volume</div>
                            <div class="bar">
                                <input type="range" min="0" max="1" step="0.01" v-model="setting.volume">
                            </div>
                        </li>
                    </ul>
                    <footer>
                        <div class="btn" @click="confirm">Confirm</div>
                        <div class="btn" @click="resetSettings">Reset</div>
                    </footer>
                    <closeBtn class="closeBtn" @click="setting.valid = false"/>
                </ratioBox>
            </div>
        </div>
    </transition>
</template>

<script>
import { setting } from '@/stores'
export default {
    name: "menus",
    data(){
        return {
            setting,
            graphicSettings:[ 'Low', 'Medium', 'High' ],
            languages: [ 'English', 'Española', 'Français' ]
        }
    },
    props:{
        valid:{
            type: Boolean,
            default: true
        }
    },
    methods:{
        confirm(){
            setTimeout(()=>{
                this.setting.valid = false
            }, 200)
        },
        resetSettings(){
            this.setting.graphicLevel = 2
            this.setting.volume = .8
            this.setting.language = 'English'
        },
    }
}
</script>

<style lang="scss" scoped>
div.menus{
    position: absolute;top: 0;left: 0;z-index: 10;
    width: 100vw;height: 100vh;
    display: flex;justify-content: center;
    padding-top: 18vh;
    background-color: rgba(0,0,0,.2);
    backdrop-filter: blur(3px);
    div.wrapper{
        color: #e3ce9e;
        position: relative;
        width:45vh;
        height: 52.35vh;
        &::before{
            position: absolute;right: 0;top: 0;display: block;content: '';z-index: 2;
            background: url("@/assets/界面_弹框0.png");
            background-size: cover;
            width: 22.5vh;
            height: 52.35vh;
            transform-origin: 0% 0%;
            transform: scaleX(1.01);
        }
        &::after{
            position: absolute;left: 0;top: 0;display: block;content: '';z-index: 1;
            background: url("@/assets/界面_弹框0.png");
            background-size: cover;
            width: 22.5vh;
            height: 52.35vh;
            transform: scaleX(-1.01);
        }
        div.menuTitle{
            font-size: 30px;text-align: center;
            height: 124px;line-height: 124px;
            text-shadow: 0 0 10px black, 0 0 4px black;
        }
        ul{
            margin: 0;
            padding: 0 85px;
            li{
                margin-bottom: 15px;
                div.title{
                    display: block;
                    font-size: 22px;height: 32px;line-height: 32px;
                }
                div.bar{
                    font-size: 17px;
                    margin: 15px 0;
                    height: 35px;
                    background-color:rgba(227,206,158,.2);
                    display: flex;justify-content: center;
                    border-radius: 3px;
                    i{
                        color: rgba(227,206,158,.7);
                        width: 33.3%;height: 35px;line-height: 31px;text-align: center;
                        border: 1px solid transparent;
                        border-radius: 3px;
                        &.current{
                            color: rgba(227,206,158,.9);
                            border-color: #e3ce9e;
                            box-shadow: 0 0 0 2px inset black;
                        }
                    }
                    input[type="range"]{
                        width: 100%;
                        appearance: none;
                        cursor: pointer;
                        background-color: transparent;
                        margin: 0 5px;
                        &::-webkit-slider-thumb{
                            -webkit-appearance: none;
                            width: 16px;height: 16px;
                            background-color: #e3ce9e;
                            transform: translateY(-7px);
                            border-radius: 10px;
                            box-shadow: 0 0 5px black;
                        }
                        &::-moz-range-thumb{
                            -webkit-appearance: none;
                            width: 16px;height: 16px;
                            background-color: #e3ce9e;
                            transform: translateY(-7px);
                            border-radius: 10px;
                            box-shadow: 0 0 5px black;
                        }
                        &::-webkit-slider-runnable-track{
                            -webkit-appearance: none;
                            height: 1px;
                            background-color: #e3ce9e;
                        }
                        &::-moz-range-track{
                            -webkit-appearance: none;
                            height: 1px;
                            background-color: #e3ce9e;
                        }
                    }
                }
            }
        }
        footer{
            position: absolute;bottom: 80px;padding: 0 85px;
            width: 100%;
            display: flex;justify-content: space-between;align-items: center;
            div.btn{
                font-size:20px;text-align: center;
                width: 182px;height: 36px;line-height: 34px;
                background: url("@/assets/英雄选择_按钮.jpg");
                background-size: cover;
                &:active{
                    background: url("@/assets/英雄选择_按钮2.jpg");
                    background-size: cover;
                    line-height: 36px;
                    color: #d5ad6c;
                }
            }
        }
        div.closeBtn{
            position: absolute;top: 22px;right:20px;
        }
    }
}
</style>