<template>
    <modal title="Warrior of Legends" v-model:valid="showPause" nudgeY="-5" @close="resume">
        <div class="pauseModal"
             style="width: 340px;color: #eae1c2;text-align: center;height: 240px;padding-top: 50px">
            <div style="position:relative;font-size: 90px;margin-bottom: 30px;text-shadow: 0 0 4px black,0 0 4px black">
                Ω<i class="shade_fef31dw">Ω</i>
            </div>
            <div style="font-size: 20px">Game paused</div>
        </div>
        <div style="display: flex;justify-content: center;margin: 0 0 60px 0">
            <btn @click="resume" scale="0.9">Resume</btn>
        </div>
    </modal>
</template>

<script>
export default {
    name: "pauseModal",
    data(){
        return {
            showPause: false
        }
    },
    watch:{
        showPause(val){
            if(this.$store.unity.instance)
                this.$store.unity.instance.SendMessage('GameManager', 'SetGameSpeed', val ? '0' : '1')
        }
    },
    methods:{
        resume(){
            this.showPause = false
        }
    }
}
</script>

<style lang="scss">
i.shade_fef31dw{
    position: absolute;
    left: 135.3px;top: 0;
    opacity: .6;
    transform-origin: center center;
    animation: blink_da4g2 3s ease infinite;
    text-shadow: none;
    @keyframes blink_da4g2 {
        0%{
            opacity: 0.6;
            transform: scale(1);
        }
        100%{
            opacity: 0;
            transform: scale(1.8);
        }
    }
}
</style>
