<template>
    <div class="tutorial">
        <ratioBox width="1920" height="1290" bottom>
            <puzzle ref="puzzle" :bus="this" :noclose="$store.trainer.step === 7" @solved="solved"/>
            <panels ref="panels" :bus="this"/>
        </ratioBox>
        <trainer ref="trainer"/>
        <victoryModal/>
        <pauseModal ref="pauseModal"/>
    </div>
</template>

<script>
import trainer from './trainer'
import panels from '@/components/campaign/panels'
import puzzle from '@/components/campaign/puzzle'
import victoryModal from '@/components/campaign/victoryModal'
import pauseModal from "@/components/campaign/pauseModal";
export default {
    name: "tutorial",
    components: { trainer, panels, puzzle, victoryModal, pauseModal },
    created() {
        if(!this.$store.unity.src)
            this.$store.unity.src = '/unity/Kingcraft'
        this.$store.game.onUnitFallen.push((args)=>{
            if(Number(args[0]) === 2)
                this.$store.game.currentEnemy -= 1
            else
                this.$store.game.currentUnits -= 1
        })
        this.$store.game.onStart.push(()=>{
            this.$store.unity.instance.SendMessage('GameManager','LoadScene','Level_1')
            this.troops = Number(this.$store.user.troops)
            document.title = 'Warrior of Legends'
            document.querySelector("link[rel~='icon']").href = '/fav_icon.ico'
        })

        document.addEventListener('keydown',this.keydown)
    },
    beforeRouteLeave(){
        document.removeEventListener('keydown',this.keydown)
    },
    data(){
        return {
            mapTypeIndex: 0
        }
    },
    watch:{

    },
    methods:{
        solved(){
            if(this.$store.trainer.step === 7)
                this.$store.trainer.step += 1
        },
        keydown(e){
            if(e.code === "Escape" || e.code === "Space")
                this.$refs.pauseModal.showPause = !this.$refs.pauseModal.showPause
        },
    }
}
</script>

<style lang="scss" scoped>
    div.tutorial{
        height: 100%;
        pointer-events: none;
        button.test{
            pointer-events: auto;
            margin: 100px;
            padding: 5px 2px;
            font-size: 20px;
            color: red;
        }
    }
</style>