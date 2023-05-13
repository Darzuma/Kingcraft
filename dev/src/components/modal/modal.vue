<template>
    <transition name="fade">
        <div class="modal" v-show="valid">
            <div class="wrapper">
                <ratioBox width="600" height="698">
                    <div class="title">{{ title }}</div>
                    <slot/>
                    <closeBtn class="closeBtn" @click="$emit('close')"/>
                </ratioBox>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "modal",
    props:{
        valid:{
            type: Boolean,
            default: false
        },
        title:{
            type: String,
            default: "Default Title"
        }
    }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
div.modal{
    position: absolute;top: 0;left: 0;z-index: 2000;
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
        div.title{
            font-size: 30px;text-align: center;
            height: 124px;line-height: 124px;
            text-shadow: 0 0 10px black, 0 0 4px black;
        }
        div.closeBtn{
            position: absolute;top: 22px;right:20px;
        }
    }
}
</style>