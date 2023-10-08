<template>
    <modal title="Message Board" v-model:valid="valid">
        <div class="msgboard_d5wa41">

        </div>
    </modal>
</template>

<script>
export default {
    name: "message",
    data(){
        return {
            loading: false,
            valid: false
        }
    }
}
</script>

<style scoped lang="scss">
div.msgboard_d5wa41{
    width: 500px;
    height: 700px;
}
</style>