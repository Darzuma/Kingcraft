<template>
    <div class="gameContainer" v-if="$store.unity.src">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "gameContainer"
}
</script>

<style scoped lang="scss">
div.gameContainer{
    position: absolute;left: 0;top: 0;
    width: 100vw;
    height: 100vh;
}
</style>