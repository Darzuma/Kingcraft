<template>
    <teleport to="body">
        <div class="handling_dwad56" v-if="$store.user.showHandling">
            <pending/>
        </div>
    </teleport>
</template>

<script>
export default {
    name: "handling",

}
</script>

<style scoped lang="scss">
div.handling_dwad56{
    position: absolute;left: 0;top: 0;display: flex;align-items: center;justify-content: center;
    z-index: 9999;
    width: 100vw;height: 100vh;
    backdrop-filter: blur(3px);
    background-color: rgba(0,0,0,.3);
}
</style>