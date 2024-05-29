<template>
    <div class="exitBtn_dwa64" @click="valid = true">

        <modal title="Warrior of Legends" nudgeY="-5" v-model:valid="valid">
            <div style="padding-bottom: 40px">
                <div style="font-size: 24px;height: 150px;line-height: 100px;text-align: center">
                    Quit the battle now ?
                </div>
                <div style="display: flex;justify-content: space-between">
                    <btn scale=".75" @click="valid = false" style="margin-right: 10px">Resume</btn>
                    <btn scale=".75" @click="quit">Quit</btn>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    name: "exitBtn",
    data(){
        return {
            valid: false
        }
    },
    methods:{
        quit(){
            this.$store.loading.reload()
            this.$router.push({ name:'worldMap' })
            // location = location.origin + '/worldMap'
        }
    }
}
</script>
<style lang="scss">
div.exitBtn_dwa64{
    position: absolute;left:90px;bottom: 20px;z-index: 1;
    width: 87.5px;height: 70px;
    background: url("@/assets/img/exit.png");
    background-size: cover;
    pointer-events: auto;
    &:hover{
        filter: brightness(1.2);
    }
}
</style>