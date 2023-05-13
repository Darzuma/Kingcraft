<template>
    <div class="avatar" :style="{ '--index': index, '--scaleX': scaleX }"/>
</template>

<script>
import { user } from "@/stores"
export default {
    name: "avatar",
    computed:{
        index(){
            return user.heroIndex
        },
        scaleX(){
            return this.flip ? -1 : 1
        }
    },
    props:{
        flip:{
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="scss">
div.avatar{
    --index:0;
    width: 240px;height: 260px;
    background: url("@/assets/英雄头像.jpg") no-repeat;
    background-size:2340px 260px;
    background-position-x: calc(var(--index) * -260px);
    box-shadow: 0 0 40px rgba(0,0,0,.6) inset, 0 0 0 3px black;
    animation: heroAvatarGlow 5s infinite;
    @keyframes heroAvatarGlow {
        0%{ transform: scaleX(var(--scaleX)) translateY(.5px) rotateX(2deg) rotateY(2deg); filter: brightness(1) }
        50%{ transform:  scaleX(var(--scaleX)) translateY(-.5px) rotateX(-2deg ) rotateY(-2deg); filter: brightness(1.15) }
        100%{ transform:  scaleX(var(--scaleX)) translateY(.5px) rotateX(2deg) rotateY(2deg); filter: brightness(1) }
    }
}
</style>