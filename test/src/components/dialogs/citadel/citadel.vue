<template>
    <modal title="Citadel Production" v-model:valid="$store.user.showCitadel" @close="close" nudgeY="1">
        <div class="citadel">
            <div class="bg"/>
            <div class="note_da24">
                Completing campaigns will enable resource production.
            </div>
            <div class="amount">
                <div class="group"><i v-for="n in 4">1</i></div>
                <div class="group"><i v-for="n in 4">1</i></div>
                <div class="group"><i v-for="n in 4">0</i></div>
            </div>

            <div class="pluginBtnContainer">
                <div class="pluginBtn" @click="showPlugins" style="left: 68px">+</div>
                <div class="pluginBtn" @click="showPlugins" style="left: 179.5px">+</div>
                <div class="pluginBtn" @click="showPlugins" style="left: 370.5px">+</div>
                <div class="pluginBtn" @click="showPlugins" style="left: 482px">+</div>
                <div class="pluginBtn" @click="showPlugins" style="left: 675px">+</div>
                <div class="pluginBtn" @click="showPlugins" style="left: 786.5px">+</div>
            </div>
            <div class="output" style="top: 378px">
                <i class="val" style="left: 102px">1</i>
                <i class="val" style="left: 214px">1</i>
                <i class="val" style="left: 404px">1</i>
                <i class="val" style="left: 515px">1</i>
                <i class="val" style="left: 709px">1</i>
                <i class="val" style="left: 820px">1</i>
            </div>
            <div class="output" style="top: 437px">
                <i class="val" style="left: 102px">1</i>
                <i class="val" style="left: 214px">1</i>
                <i class="val" style="left: 404px">1</i>
                <i class="val" style="left: 515px">1</i>
                <i class="val" style="left: 709px">1</i>
                <i class="val" style="left: 820px">1</i>
            </div>

            <div class="upgradeBtns">
                <btn class="dege312" scale="0.7" style="left: 75px"  @click="start">
                    Start
                </btn>
                <btn class="dege312" scale="0.7" style="left: 373px" @click="start">Start</btn>
                <btn class="dege312" scale="0.7" style="left: 678px" @click="start">Start</btn>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    name: "citadel",
    data(){
        return {
            timer: null,
            timer2: null
        }
    },
    methods:{
        close(){
            if(this.$message.valid){
                this.$message.value = ""
                this.$message.valid = false
            }
        },
        start(){
            this.$message.value = "Complete the campaign to enable production."
            if(this.timer) return
            this.$message.valid = true
            this.timer = setTimeout(()=>{
                this.$message.value = ""
                this.$message.valid = false
                clearTimeout(this.timer)
                this.timer = null
            },3000)
        },
        showPlugins(){
            this.$message.value = "No plugins"
            if(this.timer2) return
            this.$message.valid = true
            this.timer2 = setTimeout(()=>{
                this.$message.value = ""
                this.$message.valid = false
                clearTimeout(this.timer2)
                this.timer2 = null
            },2000)
        }
    }
}
</script>

<style scoped lang="scss">
div.citadel{
    position: relative;
    width: 900px;height: 880px;
    max-height: 80vh;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        display: none;
    }
    div.bg{
        position: absolute;width: 900px;height: 780px;
        left: 0;top: 20px;
        background: url("@/assets/img/4.2 资源管理2.png") no-repeat;
        background-size: 900px 780px;
    }
    div.note_da24{
        text-align: center;
        color: #00ff55;
    }
    div.upgradeBtns{
        position: absolute;bottom: 90px;
        height: 30px;width: 100%;
        div.dege312{
            position: absolute;top: 0;
            display: flex;justify-content: center;align-items: center;
        }
    }
    div.output{
        position: absolute;
        width: 100%;
        height: 10px;
        font-size: 12px;
        i.val{
            position: absolute;top: 0;
            text-shadow: 0 0 2px black, 0 0 2px black, 0 0 4px black;
        }
    }
    div.pluginBtnContainer{
        position: absolute;top: 232.5px;
        width: 100%;
        height: 10px;
        div.pluginBtn{
            position: absolute;top: 0;
            width: 50px;height: 50px;
            background: url("@/assets/img/菱形按钮1.png") no-repeat;
            background-size: 50px 50px;
            font-size: 21px;text-align: center;line-height: 46px;font-weight: bold;
            text-shadow: 0 0 6px black,0 0 4px black;
            &:active{
                color: #aaaaaa;
                line-height: 48px;
                background: url("@/assets/img/菱形按钮2.png") no-repeat;
                background-size: 50px 50px;
            }
        }
    }
    div.amount{
        color: #efe8c2;
        position: absolute;left: 35px;top:110px;
        width: 830px;height: 36px;
        display: flex;justify-content: space-between;
        div.group{
            width: 240px;
            display: flex;;
            font-size: 15px;
            i{
                position: relative;
                width: 60px;
                text-align: center;
                height: 22px;line-height: 21px;
                &::before{
                    position: absolute;left: 6px;top: 0;content: '';display: block;
                    width: 46px;height: 20px;
                    border: 1px solid #938245;
                    border-radius: 100px;
                    box-shadow: 0 0 2px inset black, 0 0 4px inset black;
                }
            }
        }
    }
}
</style>