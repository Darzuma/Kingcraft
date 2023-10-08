<template>
    <div class="campaign">
        <ratioBox width="1920" height="1290" bottom>
            <puzzle ref="puzzle" :bus="this" @solved="solved"/>
            <panels ref="panels" :bus="this"/>
            <exitBtn/>
        </ratioBox>
        <pauseModal ref="pauseModal"/>
        <victoryModal/>
    </div>
</template>

<script>
import panels from '@/components/campaign/panels'
import puzzle from '@/components/campaign/puzzle'
import victoryModal from '@/components/campaign/victoryModal'
import pauseModal from "@/components/campaign/pauseModal";
import exitBtn from './exitBtn'
import levels from './levels'
export default {
    name: "campaign",
    components: { panels, puzzle, exitBtn, victoryModal, pauseModal },
    created() {
        if(!this.$store.unity.src)
            this.$store.unity.src = '/unity/Kingcraft'

        let level = this.level = levels[this.$route.query.level - 1]
        // 处理关卡单位数据
        level.troop.forEach(wave => wave.forEach(unit => unit.campIndex = 1))
        level.enemy.forEach(wave => wave.forEach(unit => unit.campIndex = 2))

        this.$store.game.currentUnits = 1
        this.$store.game.currentEnemy = 1

        // 检查关卡参数，如果关卡号大于已解锁的关卡数目，则返回首页
        if( level.id > this.$store.user.maxCampaignLevel){
            this.$router.push({ name: 'home' })
        }
        // 加载场景，创建初始单位
        this.$store.game.onStart.push(()=>{
            document.title = 'Warrior of Legends'
            document.querySelector("link[rel~='icon']").href = '/fav_icon.ico'

            this.$store.unity.instance.SendMessage('GameManager', 'LoadScene', level.map)
            this.createStartUnits()
        })
        // 处理单位倒下
        this.$store.game.onUnitFallen.push((unit)=>{
            this.$store.game[['currentUnits', 'currentEnemy'][unit[0] - 1]] -= 1
        })

        this.timer = setInterval(()=>{
            if(this.$store.unity.instance)
                this.$store.unity.instance.SendMessage('GameManager', 'StartAllUnits')
        }, 5000)
        document.addEventListener('keydown',this.keydown)
    },
    beforeRouteLeave(){
        document.removeEventListener('keydown',this.keydown)
        if(this.timer) clearInterval(this.timer)
    },
    data(){
        return {
            level: null,
            index: 0,
            timer: null
        }
    },
    watch:{
        '$store.game.currentEnemy': function (val){
            if(val === 1){
                if(this.index < this.level.enemy.length - 1)
                    this.createWaveUnits()
                else
                    this.$store.game.currentEnemy -= 1
            }
        },
    },
    methods:{
        create(units){
            this.$store.unity.instance.SendMessage('GameManager', 'CaptureAllKeyboardInput', 'false')
            let idx = 0
            let itv = setInterval(()=>{
                let unit = units[idx]
                this.$store.unity.instance.SendMessage('UnitManager', 'CreateUnit',
                    JSON.stringify({name:unit.name, amount:unit.amount, campIndex: unit.campIndex, panCamera: true})
                )
                // 处理单位数量统计
                this.$store.game[['currentUnits', 'currentEnemy'][unit.campIndex - 1]] += unit.amount

                idx += 1
                if(idx === units.length){
                    // 召唤完成
                    this.$store.unity.instance.SendMessage('GameManager', 'CaptureAllKeyboardInput', 'true')
                    let t = setTimeout(()=>{
                        this.$store.unity.instance.SendMessage('GameManager', 'StartAllUnits')
                        console.log('StartAllUnits')
                        clearTimeout(t)
                    },2000)
                    clearInterval(itv)
                }
            },1800)
        },
        createStartUnits(){
            this.create([...this.level.enemy[0], ...this.level.troop[0]])
        },
        createWaveUnits(){
            this.create(this.level.enemy[++ this.index])
        },
        keydown(e){
            if(e.code === "Escape" || e.code === "Space")
                this.$refs.pauseModal.showPause = !this.$refs.pauseModal.showPause
        },
        solved(){

        },
    },
}
</script>

<style scoped lang="scss">
div.campaign{
    position: relative;z-index: 1;
    width: 100vw;height: 100vh;
    pointer-events: none;
}
</style>