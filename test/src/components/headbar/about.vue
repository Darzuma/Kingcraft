<template>
    <modal title="Warrior of Legends" v-model:valid="valid">
        <div class="about_dwad24">
            <div style="color: #cec9af;font-weight: bold;font-size: 20px;">© Red Play Game 2023.</div>
            <div style="margin-top: 20px">All rights reserved.</div>
            <div class="terms" style="margin-top: 20px">
                By purchasing in-game Virtual Currency, you are bound by and agree to the third-party payment providers’ terms and conditions. In no way shall Virtual Currency or Virtual Items be exchanged with us or anyone else for real money, goods, other items, or services of monetary value.
            </div>
            <div class="warning" style="margin-top: 20px;color: #0090d3">
                You will not be contacted or asked to make any payment by the game's operator.
            </div>
            <div class="contacts" style="margin-top: 40px;font-size: 18px;color: #cec9af">
                Contact mail : bmwistrek36@gmail.com
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    name: "about",
    data(){
        return {
            valid: false
        }
    }
}
</script>

<style scoped lang="scss">
div.about_dwad24{
    text-align: center;
    width: 360px;
    height: 500px;
    padding: 20px 15px;
    line-height: 1.6;
    font-size: 16px;
    div.terms{
        color: rgba(255,255,255,.8);
    }
}
</style>