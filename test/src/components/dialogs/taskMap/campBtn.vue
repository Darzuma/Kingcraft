<template>
    <div class="campaignBtn" :class="[type]" :style="{ '--left': x + 'px', '--top': y + 'px'}" @click="$emit('click')">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "campBtn",
    computed:{
        type(){
            return 'type_' + this.index
        }
    },
    emits: [ 'click' ],
    props:{
        x:{
            type:[String, Number],
            default: '0',
        },
        y:{
            type:[String, Number],
            default: '0',
        },
        index:{
            type:[String, Number],
            default: '0',
        }
    }
}
</script>

<style scoped lang="scss">
div.campaignBtn{
    --left:0px;
    --top:0px;
    position: absolute;left: var(--left);top: var(--top);
    width: 40px;height: 40px;
    text-align:center;line-height: 38px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    padding-left: 2px;
    text-shadow: 0 0 2px black, 0 0 4px black;
    &:hover{
        filter: brightness(1.1);
    }
    &.type_0{
        background: url("@/assets/img/camBtn_0.png");
        background-size: cover;
    }
    &.type_1{
        background: url("@/assets/img/camBtn_1.png");
        background-size: cover;
    }
    &.type_2{
        background: url("@/assets/img/camBtn_2.png");
        background-size: cover;
        color: rgba(255,255,255,.85);
        padding-left: 0;

    }
    &.type_3{
        width: 32px;height: 32px;
        background: url("@/assets/img/camBtn_3.png");
        background-size: cover;
        line-height: 32px;
        font-size: 16px;
        color: rgba(150,50,10,1);
    }

}
</style>