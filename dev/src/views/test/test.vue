<template>
    <div>
        TEST TEST TEST TEST
    </div>
</template>

<script>
export default {
    name: "test",
    mounted() {
        console.log('test mounted')
    },
    deactivated() {
        console.log('test deactivated')
        // console.log(this.num)
    },
    activated() {
        console.log('test activated')
    },
}
</script>

<style scoped>

</style>