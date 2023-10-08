<template>
    <div class="headbar">
        <ratioBox width="1920" height="1290" top>
            <rewardMission ref="rewardMission"/>
            <about ref="about"/>
            <btns
                @btn1="user.showTaskMap = true"
                @btn2="user.showChatroom = true"
                @btn3="user.showHeroes = true"
                @btn4="$refs.rewardMission.valid = true"
                @btn5="user.showMarket = true"
                @btn6="$refs.about.valid = true"
            />
        </ratioBox>
    </div>
</template>

<script>
import btns from './btns'
import messageBoard from './messageBoard'
import rewardMission from "./rewardMission";
import about from "./about";
export default {
    name: "headbar",
    props:[ 'bus' ],
    components:  { btns, messageBoard, rewardMission, about },
    created(){
    },
    data(){
        return {

        }
    },
    computed:{
        user(){
            return this.$store.user
        }
    },
    methods:{


    }
}
</script>

<style scoped lang="scss">
div.headbar{
    position: absolute;left: 0;top: 0;
    height: 100%;width: 100%;
    pointer-events: none;

}

</style>