<template>
    <div class="icon2" :style="{'--row': row, '--col': col}"></div>
</template>

<script>
export default {
    name: "icon2",
    computed:{
        row(){
            return Math.floor(this.index / 9)
        },
        col(){
            return this.index < 10 ? this.index : (this.index % 9) - 1
        },
    },
    props:{
        index:{
            type: [String, Number],
            default: 0
        }
    }
}
</script>

<style scoped lang="scss">
div.icon2{
    --row:0;--col:0;
    position: relative;
    width: 50px;height: 50px;
    background: url("@/assets/天赋图标.jpg");
    background-size: 450px 150px;
    background-position: calc(var(--col) * -50px) calc(var(--row) * 50px);
    box-shadow: 0 0 6px black, 0 0 4px black, 0 0 13px black inset, 0 0 11px black inset;
    &::before{
        position: absolute;left: -3px;top: -3px;display: block;content: '';width: calc(100% + 6px);height: calc(100% + 6px);
        background: url("@/assets/天赋边框.png");
        background-size: cover;
    }
}
</style>