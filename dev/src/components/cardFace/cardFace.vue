<template>
    <div class="cardFace" :style="{ '--x': col, '--y': row, '--size': size}"/>
</template>

<script>
export default {
    name: "cardFace",
    props:{
        col:{
            type:[String, Number],
            default:0
        },
        row:{
            type:[String, Number],
            default:0
        },
        size:{
            type:[String, Number],
            default:1
        }
    }
}
</script>

<style lang="scss">
div.cardFace{
    --x:0;
    --y:0;
    width:310px;height:380px;
    background-size: 3410px 1520px;
    background: url("@/assets/卡牌.jpg");
    background-position-x: calc(var(--x) * -310px);
    background-position-y: calc(var(--y) * -380px);
    transform-origin: top left;
    transform: scale(var(--size));
    float: left;
    box-shadow: 0 0 30px rgba(0,0,0,.6) inset, 0 0 5px black inset;
}
</style>