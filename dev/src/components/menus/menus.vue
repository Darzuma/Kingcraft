<template>
    <modal title="Warrior of Legends" :valid="valid" @close="setting.valid = false">
        <div class="menus">
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
        </div>
    </modal>
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
}
</style>