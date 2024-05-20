<template>
    <div class="containerw4ad1w">

        <div class="account">
            <div class="username_dwa54">
                <icon index="11" size="22" style="transform: translateY(1px)"/>
                <i class="text" @click="showLogin">{{ user.username ? user.username : 'Novice Archon' }}</i>
            </div>
            <div class="troops_fda5">
                <icon index="14" size="26"/>
                <div class="troopsNum" @click="showTroops">{{ $store.user.troops }}</div>
            </div>
        </div>

        <div class="btn ranking" @click="$store.user.showLadder = true">
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

        <div class="btn map" @click="$emit('btn1')">
            <icon index="4" size="54"/>
        </div>
        <div class="btn msg" @click="$emit('btn2')">
            <icon index="8" size="54"/>
        </div>
        <div class="btn flag" @click="$emit('btn3')">
            <icon index="9" size="54"/>
        </div>
        <div class="btn task" @click="$emit('btn4')">
            <icon index="7" size="56"/>
            <i class="badge">9</i>
        </div>
        <div class="btn treasure" @click="$emit('btn5')">
            <icon index="6" size="56"/>
            <i class="badge">2</i>
        </div>
        <div class="btn help" @click="$emit('btn6')">
            <icon index="3" size="54"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "btns",
    emits: ['btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6'],
    computed:{
        user(){
            return this.$store.user
        },
    },
    methods:{
        showTroops(){
            this.$store.user.showTroops = true
        },
        showLogin(){
            if(this.$route.name === 'worldMap')
                this.user.showLogin = true
            else if(confirm("Would you like to exit the current game and return to the login page?")){
                this.user.showLogin = true
                this.$router.push({ name: 'worldMap' })
            }
        }
    }
}
</script>

<style scoped lang="scss">
div.containerw4ad1w{
    width: 1920px;height: 80px;
    color: #fff3c9;font-size: 20px;letter-spacing:1px;
    text-shadow: 0 0 2px black, 0 0 4px black;
    pointer-events: auto;
    font-style: italic;
    div.account{
        position: absolute;left: 10px;top:16px;
        background: rgba(0,0,0,.3);
        box-shadow: 0 0 7px inset rgba(0,0,0,.4), 0 0 2px inset black;
        border-radius: 100px;
        width: 290px;
        height: 34px;
        display: flex;align-items: center;
        font-size: 18px;
        div.username_dwa54{
            position: relative;
            width: 180px;height: 100%;
            padding: 0 6px;
            display: flex;align-items: center;
            &::after{
                position: absolute;right: 0;top: 8px;content: '';
                width: 1px;height: 18px;
                background-color: #fff3c9;
            }
            &:hover{
                i.text{
                    text-decoration: underline;
                }
            }
            div.icon{
                width: 26px;
            }
            i.text{
                margin:0 7px;
                font-style: normal;
                width: 180px;height:15px;
                overflow: hidden;
                white-space: nowrap;text-overflow: ellipsis;
            }
        }
        div.troops_fda5{
            margin-left: 10px;
            display: flex;align-items: center;
            div.troopsNum{
                margin-left: 8px;
            }
        }
    }
    div.item{
        height: 34px;
        display: flex;align-items: center;justify-content: space-between;
        background: rgba(0,0,0,.2);
        border-radius: 100px;
        box-shadow: 0 0 7px inset rgba(0,0,0,.4), 0 0 2px inset black;
        margin-right: 20px;
        min-width: 88px;
        &.resources{
            position: absolute;left: 300px;top: 15px;
            width: 360px;
        }
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

    }
    div.container{
        position: absolute;top: 16px;right: 500px;
        display: flex;align-items: center;
    }
    div.btn{
        position: absolute;
        transform: scale(1);
        transition: .4s cubic-bezier(0.84, -1.13, 0.16, 3);
        &.ranking{
            top: 14px;left: 320px;
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


}
</style>