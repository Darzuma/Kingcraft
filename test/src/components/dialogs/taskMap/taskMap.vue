<template>
    <transition name="fade">
        <div class="taskMap" v-if="$store.user.showTaskMap">
            <ratioBox width="1400" height="1100">
                <div class="container_dadw2aw32">
                    <div class="campaignMap">
                        <closeBtn @click="$store.user.showTaskMap = false"/>
                        <btn class="continueBtn_dwa24" v-if="!invalid" @click="goToLevel(Number($store.user.maxCampaignLevel) + 1)">CONTINUE</btn>
                        <div class="campaignBtns">

                            <campBtn x="96" y="310" index="0" @click="goToLevel(1)">1</campBtn>
                            <campBtn x="160" y="271" :index="maxCampaignLevel > 1 ? 0 : 1" @click="goToLevel(2)">{{ maxCampaignLevel > 1 ? '2' : '' }}</campBtn>
                            <campBtn x="150" y="208" :index="maxCampaignLevel > 2 ? 0 : 1" @click="goToLevel(3)">{{ maxCampaignLevel > 2 ? '3' : '' }}</campBtn>
                            <campBtn x="125" y="140" :index="maxCampaignLevel > 3 ? 0 : 1" @click="goToLevel(4)">{{ maxCampaignLevel > 3 ? '4' : '' }}</campBtn>
                            <campBtn x="205" y="134" :index="maxCampaignLevel > 4 ? 0 : 1" @click="goToLevel(5)">{{ maxCampaignLevel > 4 ? '5' : '' }}</campBtn>
                            <campBtn x="212" y="206" index="1"></campBtn>
                            <campBtn x="214" y="305" index="1"></campBtn>

                            <campBtn x="268" y="385" index="2" @click="goToLevel(15)">10</campBtn>
                            <campBtn x="318" y="426" index="3">Ω</campBtn>

                            <campBtn x="274" y="193" index="2" @click="goToLevel(15)">6</campBtn>
                            <campBtn x="294" y="261" index="3">Φ</campBtn>
                            <campBtn x="328" y="166" index="3">Ψ</campBtn>

                            <campBtn x="511" y="599" index="2" @click="goToLevel(25)">25</campBtn>
                            <campBtn x="455" y="592" index="3">Ω</campBtn>
                            <campBtn x="580" y="601" index="3">Ω</campBtn>

                            <campBtn x="790" y="408" index="2" @click="goToLevel(25)">25</campBtn>
                            <campBtn x="794" y="355" index="3">Ψ</campBtn>
                            <campBtn x="758" y="455" index="3">Φ</campBtn>
                            <campBtn x="844" y="446" index="3">Ω</campBtn>
                        </div>

                    </div>
                </div>
            </ratioBox>
        </div>
    </transition>

</template>

<script>
import campBtn from './campBtn'
export default {
    name: "taskMap",
    components:{ campBtn },
    created() {
        let maxLevel = Number(localStorage.getItem('maxCampaignLevel'))
        maxLevel = maxLevel === 0 ? 1 : maxLevel
        this.$store.user.maxCampaignLevel = maxLevel
    },
    computed:{
        maxCampaignLevel(){
            return this.$store.user.maxCampaignLevel
        },
        invalid(){
            return this.$route.name !== 'worldMap'
        }
    },
    methods:{
        goToLevel(num){
            console.log(num)
            console.log(this.$store.user.maxCampaignLevel)
            if(this.invalid){
                this.$message.value = 'Not valid in a battle.'
                if(!this.$message.valid){
                    this.$message.valid = true
                    let t = setTimeout(()=>{
                        this.$message.valid = false
                        clearTimeout(t)
                    },2000)
                }
                return
            }
            else if(num <= this.maxCampaignLevel){
                // this.$store.loading.reload()
                // this.$store.user.showTaskMap = false
                // this.$router.push({ name:'campaign', query:{ level: num } })
                location = location.origin + '/campaign?level=' + num
            }
            else{
                this.$message.value = 'Not enough hero level to start this task.'
                if(!this.$message.valid){
                    this.$message.valid = true
                    let t = setTimeout(()=>{
                        this.$message.valid = false
                        clearTimeout(t)
                    },2000)
                }

            }
        }
    }
}
</script>

<style scoped lang="scss">
div.taskMap{
    position: absolute;left: 0;top: 0;z-index: 100;
    width: 100vw;height: 100vh;
    background: rgba(0,0,0,.3);
    display: flex;align-items: center;justify-content: center;
    div.container_dadw2aw32{
        position: relative;
        height: 100%;width: 100%;
        display: flex;align-items: center;justify-content: center;
        padding-bottom: 150px;
        div.campaignMap{
            position: relative;
            width: 1050px;height: 825px;
            background: url("@/assets/img/campaignMap.png");
            background-size: cover;
            div.XButton{
                position: absolute;right: 70px;top: 30px;
            }
            div.continueBtn_dwa24{
                position: absolute;left: 420px;bottom: 60px;
            }
        }
    }
}
</style>