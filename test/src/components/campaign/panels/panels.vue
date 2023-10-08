<template>
    <div class="panels">
        <!--英雄头像-->
        <avatar/>
        <!--英雄名、水晶数量、HELP 按钮-->
        <states/>
        <!--小地图兵力数据等-->
        <status/>
        <!--卡牌描述信息-->
        <hints/>
        <!--中间卡槽-BEGIN -->
        <div class="cardSlot_dwa135">
            <div v-for="(card, index) in slots"
                 class="card" :class="[ getType(card) ]"
                 @mousemove="game.viewingCard = card"
                 @mouseleave="game.viewingCard = null"
                 @click="pick(card, index)"
            >
                <i class="name" :class="{ fix: card.type === 0 }">{{ card.type === 0 ? 'UNITS' : card.type === 1 ? 'ATTACK' : 'SALVATION' }}</i>
                <cardFace class="positionFix" size=".415" :col="card.col" :row="card.row"/>
            </div>
        </div>
        <!--中间卡槽-END -->

    </div>
</template>

<script>
import avatar from './avatar'
import status from "./status";
import states from "./states"
import hints from './hints'
export default {
    name: "panels",
    props: [ 'bus' ],
    components: { status, states, avatar, hints },
    emits: [ 'pick' ],
    created() {
        this.game.currentCrystal = this.hero.level + 4
        this.game.currentTroops = this.totalTroops
        this.minimapIndex = this.bus.mapTypeIndex
    },
    data(){
        return {
            viewingCard: null,
            currentSlotIndex: 0,

            minimapIndex: 0,
            minimapNames: [ 'Battle on the Plain', 'Battle by the River', 'Fighting in the Desert' ],

            timer: null
        }
    },
    computed:{
        game(){ return this.$store.game },
        user(){ return this.$store.user },
        hero(){
            return this.$store.heroes[this.user.heroIndex]
        },
        slots(){
            let arr = []
            this.user.slots.sort((a,b)=> a - b)
            this.user.slots.forEach((index, n) => {
                if(typeof index === 'number'){
                    let card = this.$store.cards[index]
                    card.slotIndex = n
                    arr.push(card)
                }
            })
            return arr
        },
        totalTroops(){
            return Number(this.$store.user.troops)
        }
    },
    methods: {
        showSetting(){
            this.$store.setting.valid = true
        },
        getType(card){
            return card.type === 0 ? 'type_0' : (card.type === 1 ? 'type_1' : 'type_2')
        },
        pick(card, index){
            if(this.timer){
                this.$message.valid = false
                clearTimeout(this.timer)
            }
            if(this.game.currentTroops >= Number(card.supply)){
                this.game.currentCard = card
                this.$emit('pick', card, index)
            }
            else{
                let msg1 = 'You have depleted all of your troops!'
                let msg2 = 'Insufficient troops to carry out the card!'
                this.$message.value = this.game.currentTroops === 0 ? msg1 : msg2
                this.$message.valid = true
                this.timer = setTimeout(()=>{
                    this.$message.valid = false
                    clearTimeout(this.timer)
                },4000)

            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "panels";
</style>