<template>
    <div class="puzzle" :class="{ valid: valid }">
        <closeBtn class="closeBtn" instant
                  v-show="!solving"
                  @click="game.currentCard = null"
        />
        <pipePuzzle ref="pipePuzzle" @solved="solved"/>
        <div class="interaction">
            <div class="cost" v-show="!solving">
                <icon index="1" size="42"/>
                <div class="text">× {{ costs }}</div>
            </div>
            <btn class="solveBtn" v-show="!solving"
                 @click="solvePuzzle"
                 :valid="secs === 0"
            >
                {{ secs > 0 ? `Unlock in ${ secs }s` : 'Autocast' }}
            </btn>
            <div class="text" v-show="solving">{{ text }}</div>
        </div>
    </div>
</template>

<script>
import pipePuzzle from "@/components/pipePuzzle/pipePuzzle";
import { user, game } from "@/stores"
export default {
    name: "puzzle",
    components: { pipePuzzle },
    data(){
        return {
            game,
            secs: 7,
            timer: null,
            countDown: null,
            solving: false,
            text: 'Solving ...',
        }
    },
    watch:{
        'game.currentCard': function(val){
            if(val){
                if(this.countDown)
                    clearInterval(this.countDown)
                this.secs = 7
                this.solving = false

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
        }
    },
    computed:{
        valid(){
            // return true
            return this.game.currentCard && !this.game.currentCard.solved
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
        }
    },
    methods:{
        solved(){
            this.text = 'Ready to cast !'
            this.solving = true
            this.timer = setTimeout(()=>{
                if(game.currentCard){
                    game.currentCard.solved = true
                    if(game.dispatch)
                        game.dispatch('CardManager', 'Cast', game.currentCard.castName)
                    console.log('"' + game.currentCard.name + '" dispatched')
                }
            },2200)
        },
        solvePuzzle(){
            if(this.secs === 0){
                this.solving = true
                this.text = 'Solving ...'
                this.$refs.pipePuzzle.autoSolve()
            }
        }
    }
}
</script>

<style scoped lang="scss">
div.puzzle{
    width: 510px;height: 100%;
    position: relative;
    margin: 0 auto;
    pointer-events: none;
    opacity: 0;
    &.valid{
        pointer-events: auto;
        opacity: 1;
    }
    div.pipePuzzle{
        position: absolute;top: 200px;
    }
    div.closeBtn{
        position: absolute;top: 204px;right: 3px;z-index: 10;transform: scale(.84);filter: brightness(1.3)
    }
    div.interaction{
        width: 340px;height: 180px;
        position: absolute;top: 760px;left: 85px;
        background-color: rgba(0,0,0,.6);
        border-radius: 10px;
        border: 1px solid #EED6BA;
        box-shadow: 0 0 0 2px black inset;
        display: flex;align-items: center;justify-content: center;
        flex-direction: column;
        div.cost{
            //position: absolute;top: 30px;
            width: 100%;
            display: flex;
            justify-content: center;align-items: center;
        }
        div.text{
            color: #fff3e0;
            font-size: 26px;
            padding:0 0 3px 8px;
            text-shadow: 0 0 2px black, 0 0 4px black;
            letter-spacing: 2px;
        }
        div.solveBtn{
            //position: absolute;top: 90px;left:42px;z-index: 10;
            margin-top: 15px;
            box-shadow: 0 0 5px black;
        }
    }

}
</style>