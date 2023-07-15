<template>
    <div class="tutorial">
        <ratioBox width="1920" height="1290" bottom>
            <puzzle ref="puzzle" :bus="this"/>
            <panels ref="panels" :bus="this"/>
        </ratioBox>
        <victoryModal ref="victoryModal" :bus="this"/>
    </div>
</template>

<script>
import panels from './panels'
import puzzle from './puzzle'
import victoryModal from "./victoryModal";
export default {
    name: "tutorial",
    components: { panels, puzzle, victoryModal },
    mounted() {

    },
    data(){
        return {
            currentStep: 0,
        }
    },
    methods:{
        // 接收 unity 事件和消息
        messages(name, args){
            this[name](args)
        },
        showVictory(args){
            this.$refs.victoryModal.isVictory = true
            this.$refs.victoryModal.valid = true
        },
        showLoose(args){
            this.$refs.victoryModal.isVictory = false
            this.$refs.victoryModal.valid = true
        },
        tutorial_startStep(step){
            
        }
    }
}
</script>

<style scoped lang="scss">
div.tutorial{
    position: relative;z-index: 1;
    width: 100vw;height: 100vh;
}
</style>