<template>
    <div class="icon" :style="{'--index': index, '--size': size + 'px'}">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "icon",
    props:{
        index:{
            type: [String, Number],
            default : 0
        },
        size:{
            type: [String, Number],
            default : 50
        }
    }
}
</script>

<style scoped lang="scss">
    div.icon{
        position: relative;
        width: var(--size);height:  var(--size);
        background: url("@/assets/图标.png");
        background-size: cover;
        background-position-x: calc(var(--size) * var(--index) * -1);
    }
</style>