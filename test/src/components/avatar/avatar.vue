<template>
    <div class="avatar" :class="{ glow: !noglow }" :style="{ '--index': index, '--flipX': flipX, '--scale': scale }"/>
</template>

<script>
export default {
    name: "avatar",
    computed:{
        index(){
            return this.heroIndex !== 0 ? Number(this.heroIndex) : this.$store.user.heroIndex
        },
        flipX(){
            return this.flip ? -1 : 1
        }
    },
    props:{
        flip:{
            type: Boolean,
            default: false
        },
        heroIndex:{
            type: [String, Number],
            default: 0
        },
        noglow:{
            type: Boolean,
            default: false
        },
        scale:{
            type: [String, Number],
            default: 1
        }
    }
}
</script>

<style scoped lang="scss">
div.avatar{
    --index:0;
    //width: calc(240px * var(--scale));height:  calc(260px * var(--scale));
    width: 240px;height: 260px;
    background: url("@/assets/英雄头像.jpg") no-repeat;
    background-size:2340px 260px;
    background-position-x: calc(var(--index) * -260px);
    box-shadow: 0 0 40px rgba(0,0,0,.6) inset, 0 0 0 3px black;
    transform: scale(var(--scale));
    transform-origin:  0 0;
    &.glow{
        transform-origin: 50% 50%;
        animation: heroAvatarGlow 5s infinite;
    }
    @keyframes heroAvatarGlow {
        0%{ transform: scaleX(var(--flipX)) translateY(.5px) rotateX(2deg) rotateY(2deg); filter: brightness(1) }
        50%{ transform:  scaleX(var(--flipX)) translateY(-.5px) rotateX(-2deg ) rotateY(-2deg); filter: brightness(1.15) }
        100%{ transform:  scaleX(var(--flipX)) translateY(.5px) rotateX(2deg) rotateY(2deg); filter: brightness(1) }
    }
}
</style>