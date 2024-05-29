<template>
    <modal title="Reward Missions" v-model:valid="valid" @close="close">
        <div class="list_dwad222145">
            <div class="pendingBox" v-if="pending">
                <pending/>
            </div>
            <div v-else>
                <div v-for="(m, idx) in missions" class="missionBox">
                    <div class="left">
                        <icon2 :index="idx"/>
                    </div>
                    <div class="middle">
                        <div class="name">{{ m.name }}</div>
                        <div class="rewards">Rewards : {{ m.rewards }}</div>
                    </div>
                    <div class="right">
                        <btn scale="0.55" @click="getRewards" :valid="false">Get Rewards</btn>
                        <div class="progress_2121">0 / {{ m.amount }}</div>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    name: "rewardMission",
    data(){
        return {
            pending: true,
            valid: false,
            missions: [
                { name:'Complete 10 [Gold Raider] tasks', valid: true, rewards: 2000, amount: 10 },
                { name:'Complete 50 [Gold Raider] tasks', valid: false, rewards: 5000, amount: 50 },
                { name:'Complete 100 [Gold Raider] tasks', valid: false, rewards: 8000, amount: 100 },
                { name:'Upgrade up to 1000 forces', valid: false, rewards: 2000, amount: 1000 },
                { name:'Unlock three new heroes', valid: false, rewards: 2000, amount: 3 },
                { name:'Odysseus up to level 10', valid: false, rewards: 5000, amount: 10 },
                { name:'Recruit 100 soldiers', valid: false, rewards: 2000, amount: 100 },
                { name:'Recruit 300 soldiers', valid: false, rewards: 2000, amount: 300 },
                { name:'Eliminate ten elite enemies', valid: false, rewards: 2000, amount: 10 },
            ],
            timer: null,
        }
    },
    watch:{
        valid(val){
            if(val){
                let t = (3 + Math.random().toFixed(2) * 3) * 1000
                this.timer = setTimeout(()=>{
                    this.pending = false
                    clearTimeout(this.timer)
                },t)
            }
        }
    },
    methods:{
        getRewards(){
            this.$message.value = 'Not accomplished'
            this.$message.valid = true
            this.timer = setTimeout(()=>{
                this.$message.valid = false
                clearTimeout(this.timer)
            },2000)

        },
        close(){
            this.pending = true
            this.$message.valid = false
            clearTimeout(this.timer)
        }
    }
}
</script>

<style scoped lang="scss">
div.list_dwad222145{
    width: 510px;height: 850px;
    max-height: 80vh;
    padding-bottom: 25px;
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    div.pendingBox{
        width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;
    }
    div.missionBox{
        border: 1px solid #938b73;
        min-height: 80px;
        margin-bottom: 10px;
        border-radius: 1px;
        display: flex;justify-content: space-between;
        padding: 15px 10px;
        div.middle{
            margin-left: 15px;
            width: 300px;
            div.name{
                font-size: 18px;
                color: #f7edbe;
                font-weight: bold;
            }
            div.rewards{
                padding-top: 20px;
            }


        }
        div.right{
            height: 100%;
            div.progress_2121{
                padding-top: 11px;
                color: rgba(255,255,255,.7);
                text-align: center;
            }
        }
    }
}
</style>