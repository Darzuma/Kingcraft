<template>
    <div class="puzzle" :class="{ valid: valid }" @contextmenu="contextMenu">
        <div class="puzzleBox">
            <pipePuzzle ref="pipePuzzle" :hardness="hardness" @solved="solved"/>
            <closeBtn class="closeBtn" instant v-if="!noclose" style="z-index: 15" v-show="!solving"
                      @click="close"
            />
        </div>

        <div class="interaction">
            <div class="cost" v-show="!solving">
                <icon index="1" size="50">
                    <i class="amount">{{ costs }}</i>
                </icon>
            </div>
            <btn class="solveBtn" v-show="!solving"
                 @click="autoSolve"
                 :valid="autoCastText !== 'Not enough crystal' && secs === 0"
            >
                {{ secs > 0 ? `Unlock in ${ secs }s` : autoCastText }}
            </btn>
            <div class="text" v-show="solving">{{ text }}</div>
        </div>
    </div>
</template>

<script>
import pipePuzzle from "./pipePuzzle";
export default {
    name: "puzzle",
    components: { pipePuzzle },
    emits: ['solved'],
    data(){
        return {
            secs: 1,
            timer: null,
            countDown: null,
            solving: false,
            text: 'Solving ...',
            autoCastText: 'Autocast'
        }
    },
    watch:{
        'game.currentCard': {
            handler: function(val){
                if(this.$store.unity.instance){
                    this.$store.unity.instance.SendMessage('GameManager', 'CaptureAllKeyboardInput', (!Boolean(val)).toString())
                    this.$store.unity.instance.SendMessage('GameManager', 'SetGameSpeed', val ? '0.2' : '1')
                }
                if(val){
                    if(this.countDown)
                        clearInterval(this.countDown)
                    this.secs = 1
                    this.solving = false
                    this.autoCastText = 'Autocast'

                    this.countDown = setInterval(()=>{
                        if(this.secs > 0)
                            this.secs -= 1
                        else{
                            clearInterval(this.countDown)
                            this.countDown = null
                        }
                    },1000)


                }
                else{
                    clearInterval(this.countDown)
                    this.countDown = null
                }
            },
            immediate: true
        }
    },
    computed:{
        game(){
            return this.$store.game
        },
        valid(){
            // return true
            return this.game.currentCard
        },
        costs(){
            return this.game.currentCard ? this.game.currentCard.costs : 1
        }
    },
    props:{
        bus:{
            type: Object,
            default(){
                return null
            }
        },
        hardness:{
            type:[Number, String],
            default: 0
        },
        noclose:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        solved(){
            this.$emit('solved')
            if(this.$store.unity.instance){
                this.$store.unity.instance.SendMessage('GameManager', 'CaptureAllKeyboardInput', 'true')
                // this.$store.unity.instance.SendMessage('GameManager', 'StartAllUnits')
            }

            this.solving = true
            let card = this.game.currentCard
            this.text = ['Your troops have arrived!', 'Ready to attack!', 'Ready to cast!'][card.type]

            if(this.$store.unity.instance)
                this.timer = setTimeout(()=>{
                    if( card && card.cast){
                        card.cast().then(result =>{
                                this.game.currentTroops -= Number(card.supply)
                                this.game.currentCard = null
                            }
                        )
                    }
                },2200)

            this.$message.valid = false

        },
        autoSolve(){
            if(this.secs === 0){
                if(this.game.currentCrystal >= this.game.currentCard.costs){
                    this.game.currentCrystal -= this.game.currentCard.costs
                    this.solving = true
                    this.text = 'Solving ...'
                    this.$refs.pipePuzzle.autoSolve()
                }
                else{
                    this.$message.value = 'Not enough crystal! You have to solve it manually'
                    this.$message.valid = true
                    this.autoCastText = 'Not enough crystal'
                    if(!this.timer){
                        this.timer = setTimeout(()=>{
                            this.$message.valid = false
                            clearTimeout(this.timer)
                            this.timer = null
                        },1000)
                    }
                }
            }
        },
        contextMenu(e){
            e.preventDefault()
            return false
        },
        close(){
            // this.$store.unity.instance.SendMessage('GameManager', 'StartAllUnits')
            this.$message.valid = false
            this.game.currentCard = null
        }
    }
}
</script>

<style scoped lang="scss">
div.puzzle{
    width: 100%;height: 100%;
    position: absolute;
    margin: 0 auto;
    pointer-events: none;
    opacity: 0;
    display: flex;align-items: center;justify-content: start;flex-direction: column;
    &.valid{
        pointer-events: auto;
        opacity: 1;
    }
    div.puzzleBox{
        position: relative;z-index: 5;margin-top: 220px;
        div.pipePuzzle{

        }
        div.closeBtn{
            position: absolute;top: 5px;right: 3px;z-index: 10;transform: scale(.84);filter: brightness(1.3)
        }
    }

    div.interaction{
        position: relative;
        min-width: 340px;min-height: 150px;z-index: 1;
        background-color: rgba(0,0,0,.6);
        border-radius: 0 0 10px 10px;
        border: 1px solid #EED6BA;
        box-shadow: 0 0 0 2px black inset;
        display: flex;align-items: center;justify-content: center;
        flex-direction: column;
        margin-top: -2px;
        padding: 20px 20px 30px 20px;
        div.cost{
            position: relative;
            margin-bottom: 10px;
            width: 100%;
            display: flex;
            justify-content: center;align-items: center;
            div.icon{
                i.amount{
                    font-family: "Object Sans", Helvetica, Arial, sans-serif;font-weight: bold;
                    width: 50px;height: 50px;line-height: 52px;text-align: center;
                    font-size: 26px;color: white;

                    text-shadow: 0 0 2px black, 0 0 4px black, 0 0 10px black;
                }
            }

        }
        div.solveBtn{
            margin-top: 5px;
            box-shadow: 0 0 5px black;
        }
        div.text{
            text-align: center;
            color: #fff3e0;
            font-size: 26px;
            text-shadow: 0 0 2px black, 0 0 4px black;
            letter-spacing: 1px;
        }
    }

}
</style>