<template>
    <div class="emoji" :style="{'--index': index, '--size': size + 'px'}">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "emoji",
    props:{
        index:{
            type: [String, Number],
            default : 0
        },
        size:{
            type: [String, Number],
            default : 30
        }
    }
}
</script>

<style scoped lang="scss">
div.emoji{
    position: relative;
    width: var(--size);height:  var(--size);
    background: url("@/assets/img/emoji.png");
    background-size: cover;
    background-position-x: calc(var(--size) * var(--index) * 1);
}
</style>