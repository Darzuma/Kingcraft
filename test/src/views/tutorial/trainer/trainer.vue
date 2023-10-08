<template>
    <div class="trainer_dwa245">
        <ratioBox width="1920" height="1290">
            <div class="step0-4 mask" v-if="step < 5">
                <div class="AthenaAvatar">
                    <div class="name">Athena</div>
                    <avatar heroIndex="6"/>
                </div>
                <div class="dialogs">
                    <p v-html="currentDialog"></p>
                    <footer >
                        <btn v-if="!timer" class="next" @click="step += 1">NEXT</btn>
                    </footer>
                </div>
            </div>

            <div class="step6" v-if="step === 6">
                <div class="AthenaAvatar">
                    <div class="name">Athena</div>
                    <avatar heroIndex="6"/>
                </div>
                <div class="dialogs" v-if="currentDialog">
                    <p v-html="currentDialog"></p>
                    <footer />
                </div>
                <div class="cardHint" v-if="showPointer"></div>
            </div>

            <div class="step7" v-if="step === 7">
                <div class="AthenaAvatar">
                    <div class="name">Athena</div>
                    <avatar heroIndex="6"/>
                </div>
                <div class="dialogs">
                    <p v-html="currentDialog"></p>
                    <footer/>
                </div>
            </div>

            <div class="step8" v-if="step === 8">
                <div class="AthenaAvatar">
                    <div class="name">Athena</div>
                    <avatar heroIndex="6"/>
                </div>
                <div class="dialogs">
                    <p v-html="currentDialog"></p>
                    <footer >
                        <btn v-if="!timer" class="next" @click="endCurrentTrainer">NEXT</btn>
                    </footer>
                </div>
            </div>
        </ratioBox>

    </div>
</template>

<script>
import avatar from '@/components/avatar'
export default {
    name: "trainer",
    created() {
        if( !this.$store.game.onStart.includes(this.entry)){
            this.$store.game.onStart.push(this.entry)
        }
    },
    components: { avatar },
    data(){
        return {
            currentDialog: '',
            dialogs:[
                `Odyssey the legendary human warrior, you are ready to take charge and lead your troops into battle once again.I'll be assisting you until you can liberate yourself from the gods.`,
                `Press the "W" or "S" key to pan the camera up and down.`,
                `Press the "A" or "D" key to pan the camera left and right.`,
                `Press "Esc" or "Space bar" to toggle the pause state.`,
                `Scroll the mouse wheel to zoom in and out.`,
                '',
                `You've encountered the enemy!Quickly use the cavalry card to summon your troops and defeat them.`,
                `Yes, you made the right choice.Now click on the grid in the puzzle and try to connect all the pipes.`,
                `Excellent, you have acquired proficiency in fundamental command abilities.Let's join the battle now!`
            ],
            timer: null,
            showPointer: false,
            entry: ()=>{ this.texting(this.dialogs[this.step]) },
        }
    },
    watch:{
        '$store.game.currentCard':function(card){
            if(this.step === 6){
                if(card.name === 'Cavalry'){
                    clearTimeout(this.timer)
                    this.currentDialog = ''
                    this.step += 1
                }
                else
                    this.$store.game.currentCard = null
            }else if(this.step === 7)
                this.$store.game.currentCard = this.$store.cards[0]
        },
        '$store.trainer.step': function (val){
            if(val < 5) // 聊天
                this.texting(this.dialogs[val])
            else if(val === 5) // 弹出操作提示框
                this.$store.user.showSetting = true
            else if(val === 6){ // 召唤一批敌兵，然后提示点选卡牌
                this.currentDialog = ''
                if(this.$store.unity.instance)
                    this.$store.unity.instance.SendMessage('UnitManager', 'CreateUnit',JSON.stringify({
                        name:'Bandit', amount:7, campIndex: 2, panCamera: true
                    }))
                this.$store.game.currentEnemy += 7
                this.timer = setTimeout(()=>{
                    clearTimeout(this.timer)
                    this.texting(this.dialogs[6])
                },900)
                let t = setTimeout(()=>{
                    clearTimeout(t)
                    this.showPointer = true
                },4000)
            }
            else if(val === 7){ // 卡牌使用提示对话
                this.texting(this.dialogs[val])
            }
            else if(val === 8){ // 卡牌施放成功，对话
                this.currentDialog = ''
                this.texting(this.dialogs[val])
            }
        }
    },
    computed:{
        step:{
            get(){
                return this.$store.trainer.step
            },
            set(val){
                this.$store.trainer.step = val

            }
        }
    },
    methods:{
        endCurrentTrainer(){
            if(this.$store.unity.instance)
                this.$store.unity.instance.SendMessage('GameManager', 'StartAllUnits')
            let index = 0
            let t = setInterval(()=>{
                // 召唤敌人
                if(this.$store.unity.instance)
                    this.$store.unity.instance.SendMessage('UnitManager', 'CreateUnit',JSON.stringify({
                        name:'Bandit', amount:7, campIndex: 2
                    }))
                // 添加敌兵数
                this.$store.game.currentEnemy += 7
                // 激活战斗
                if(this.$store.unity.instance)
                    this.$store.unity.instance.SendMessage('GameManager', 'StartAllUnits')
                index += 1
                if(index === 5){
                    this.$store.game.currentEnemy -= 1
                    clearInterval(t)
                }
            },8000)
            this.step += 1
        },
        texting(txt){
            let len = txt.length
            let idx = 0
            this.timer = setInterval(()=>{
                if(idx < len){
                    this.currentDialog += txt[idx]
                    if(txt[idx] === '.' || txt[idx] === '!'){
                        this.currentDialog += `<div style="margin-bottom: 20px"></div>`
                    }
                    idx += 1
                }else{
                    clearInterval(this.timer)
                    this.timer = null
                }
            },30)
        }
    }

}
</script>

<style lang="scss">
div.trainer_dwa245{
    position: absolute;z-index: 109;top: 0;left: 0;width: 100vw;height: 100vh;
    div.step0-4{
        position: absolute;top: 0;left: 0;width: 100%;height: 100%;
        display: flex;align-items: center;justify-content: center;
        pointer-events: auto;

    }
    div.step6{
        position: absolute;z-index: 1;top: 0;left: 0;width: 100%;height: 100%;
        div.cardHint{
            position: absolute;bottom: 15px;left: 424px;width: 135px;height: 185px;z-index: 10;
            &::before{
                position: absolute;top: -90px;right: -90px;width: 100px;height: 100px;content: '';display: block;
                background: url("@/assets/img/redarrow.png");
                background-size: cover;
                opacity: .9;
                animation: .6s point infinite ease;
                @keyframes point {
                    0%{ transform: translateX(0) translateY(0) }
                    40%{ transform: translateX(-20px) translateY(20px) }
                    100%{ transform: translateX(0) translateY(0) }
                }
            }
        }
    }
    div.step7{
        position: absolute;top: 0;left: 0;width: 100%;height: 100%;
        div.AthenaAvatar{
            left: 420px;top: 284px;
        }
        div.dialogs{
            left: 1230px;top: 221px;width: 460px;
        }
    }
    div.step8{
        pointer-events: auto;
    }
    //div.mask{
        //&::before{ // mask
        //    position: absolute;left: -80vw;top: 0;content: '';display: block;
        //    width: 300vw;height: 100vh;
        //    background-color: rgba(0,0,0,.4);
        //    pointer-events: auto;
        //}
    //}
    div.AthenaAvatar{
        position: absolute;left: 500px;top: 250px;
        padding: 8px;
        display: inline-block;
        border-image-source: url("@/assets/img/bdsrc.png");
        border-image-slice: 240 120 120 120;
        border-image-width: 80px 40px 40px 40px;
        border-image-outset: 70px 20px 20px 20px;
        div.name{
            position: absolute;top: -50px;z-index: 10;width: 100%;padding-right: 3px;
            text-align: center;
            font-size: 21px;font-weight: bold;color: #d1c9bc;letter-spacing: 1px;
        }
    }
    div.dialogs{
        position: absolute;left: 800px;top: 185px;
        font-size: 20px;
        background-color: rgba(0,0,0,.7);
        color: #efe3d5;
        width: 680px;
        padding: 20px 20px 5px 20px;line-height: 1.5;
        border: 1px solid #f1d1aa;
        border-radius: 4px;
        box-shadow: 0 0 0 2px black inset;
        letter-spacing: .5px;text-shadow:  0 0 2px black;
        p{
            letter-spacing: .5px;
        }
        footer{
            margin-top: 20px;
            height: 100px;display: flex;align-items: center;justify-content: center;
            div.next{

            }
        }

    }


}
</style>