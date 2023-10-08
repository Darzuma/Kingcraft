<template>
    <div class="resourceIcon" :style="{'--index': index, '--size': size + 'px'}">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "resourceIcon",
    props:{
        index:{
            type: [String, Number],
            default : 0
        },
        size:{
            type: [String, Number],
            default : 60
        }
    }
}
</script>

<style scoped lang="scss">
div.resourceIcon{
    position: relative;
    width: var(--size);height:  var(--size);
    background: url("@/assets/img/资源图标.png");
    background-size: cover;
    background-position-x: calc(var(--size) * var(--index) * -1);
}
</style>