<template>
    <div class="btn" :class="{ valid: valid }" :style="{ '--scale': scale }" @click="click">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "btn",
    emits:[ 'click' ],
    data(){
        return {
            timer: null
        }
    },
    methods:{
        click(){
            this.timer = setTimeout(()=>{
                this.$emit('click')
                clearTimeout(this.timer)
            },100)
        }
    },
    unmounted() {
        clearTimeout(this.timer)
    },
    props:{
        valid:{
            type: Boolean,
            default: true
        },
        scale:{
            type: [String, Number],
            default: 1
        }
    }
}
</script>

<style scoped lang="scss">
div.btn{
    --scale:1;
    width: calc(220px * var(--scale));
    height: calc(44px * var(--scale));
    line-height:  calc(42px * var(--scale));text-align: center;
    background: url("@/assets/英雄选择_按钮.jpg");
    background-size: cover;
    color: #ffd082;
    font-size: calc(20px * var(--scale));letter-spacing: 2px;
    text-shadow: 0 0 20px black, 0 0 10px black, 0 0 4px black;
    font-weight: bold;
    &.valid{
        &:active{
            background: url("@/assets/英雄选择_按钮2.jpg");
            background-size: cover;
            line-height: calc(44px * var(--scale));
            color: #d5ad6c;
        }
    }
}
</style>