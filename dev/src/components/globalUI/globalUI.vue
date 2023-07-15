<template>
    <ratioBox width="1920" height="1290" top style="pointer-events:none;">
        <div class="globalUI">
            <div class="item account">
                <icon index="11" size="30" style="transform: translateY(1px)"/>
                <i class="text" @click="showLogin">Hi, visitor ...</i>
            </div>
            <div class="btn ranking" @click="showLogin">
                <icon index="12" size="34"/>
            </div>
            <div class="container">
                <div class="item money">
                    <icon index="0" size="32"/>
                    <i class="text">{{ user.money }}</i>
                </div>
                <div class="item zircon">
                    <icon index="5" size="38" style="transform: translateY(-1px)"/>
                    <i class="text">{{ user.zircons }}</i>
                </div>
                <div class="item mageBox">
                    <icon index="2" size="28" style="transform: translateY(1px)"/>
                    <i class="text">{{ user.mageBoxes }}</i>
                </div>
            </div>
            <div class="btn map" @click="showLogin">
                <icon index="4" size="53"/>
            </div>
            <div class="btn msg" @click="showLogin">
                <icon index="8" size="53"/>
            </div>
            <div class="btn flag" @click="showLogin">
                <icon index="9" size="53"/>
            </div>
            <div class="btn task" @click="showLogin">
                <icon index="7" size="56"/>
                <i class="badge">2</i>
            </div>
            <div class="btn treasure" @click="showLogin">
                <icon index="6" size="56"/>
                <i class="badge">1</i>
            </div>
            <div class="btn help" @click="showLogin">
                <icon index="3" size="53"/>
            </div>

        </div>
    </ratioBox>
</template>

<script>
import { user } from '@/stores'
export default {
    name: "headbarIcons",
    props:[ 'bus' ],
    data(){
        return {
            user
        }
    },
    methods:{
        showLogin(){
            this.user.showLogin = true
        }
    }
}
</script>

<style scoped lang="scss">
div.globalUI{
    position: absolute;top: 0;left: 0;z-index: 1;
    width: 100%;height: 80px;
    color: #fff3c9;font-size: 20px;letter-spacing:1px;
    text-shadow: 0 0 2px black;
    pointer-events: auto;
    div.item{
        height: 34px;
        display: flex;align-items: center;justify-content: space-between;
        background: rgba(0,0,0,.2);
        border-radius: 100px;
        box-shadow: 0 0 7px inset rgba(0,0,0,.4);
        margin-right: 30px;
        min-width: 88px;
        &.money{
            padding: 1px 16px 0 3px;
        }
        &.zircon{
            padding: 0 16px 2px 4px;
        }
        &.mageBox{
            padding: 0 16px 2px 7px;
        }
        i.text{
            margin-left: 3px;
            font-style: italic;
        }
        &.account{
            min-width: 150px;
            position: absolute;
            top: 15px;left: 125px;
            padding: 2px 16px 0 2px;
            justify-content: left;
            &:hover{
                i.text{
                    text-decoration: underline;
                }
            }
            i.text{
                margin-left: 5px;
                font-style: normal;
            }
        }
    }
    div.btn{
        position: absolute;
        transform: scale(1);
        transition: .4s cubic-bezier(0.84, -1.13, 0.16, 3);
        &.ranking{
            top: 13px;left: 325px;
        }
        &.map{
            top: 7px;right: 425px;
        }
        &.msg{
            top: 7px;right: 360px;
        }
        &.flag{
            top: 7px;right: 295px;
        }
        &.task{
            top: 4px;right: 230px;
        }
        &.treasure{
            top: 4px;right: 165px;
        }
        &.help{
            top: 7px;right: 100px;
        }

        &:hover{
            transform: scale(1.1);
        }
        i.badge{
            position: absolute;bottom: 10px;right: 5px;
            font-size: 12px;text-align: center;line-height: 15px;
            width: 14px;height: 14px;border-radius: 100px;
            background: #b70000;
            box-shadow: 0 .5px 2px black;
        }
    }
    div.container{
        position: absolute;top: 15px;right: 475px;
        display: flex;align-items: center;
    }

}
</style>