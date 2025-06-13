<template>
    <div class="loading" v-if="$store.loading.valid" @click="click">
        <div class="container">
            <div class="titleBox">
                <div class="titleImg"></div>
            </div>
            <div class="progressBox">
                <div class="state" :class="{ waiting: isWaiting }">{{ isWaiting ? 'Click to start' : 'Loading' }}</div>
                <div class="progress">
                    <div class="border"></div>
                    <div class="bar" :style="{ width: width }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "view-loading",
    created() {
        window.loading = this
    },
    data(){
        return {
            width:''
        }
    },
    watch:{
        progress(val){
            if(val < 1)
                this.width = Math.ceil(val * 95) + '%'
            else {
                let t = setTimeout(()=>{
                    this.width = '100%'
                    clearTimeout(t)
                },1600)
            }
        }
    },
    computed:{
        progress(){
            return this.$store.loading.progress
        },
        isPassive(){
            return this.$store.loading.passive
        },
        isWaiting(){
            return this.width === '100%' && this.isPassive
        },
    },
    emits: ['clickToStart'],
    methods:{
        click(){
            if(this.isWaiting){
                this.$store.loading.valid = false
                this.$store.game.commit('onStart')
            }
        },
    },

}
</script>

<style scoped lang="scss">
div.loading{
    position: absolute;left: 0;top: 0;width: 100vw;height: 100vh;z-index: 1000;
    background-color: #141414;
    user-select: none;
    background: url("@/assets/img/loadingBG.jpg");
    background-size: 100vw 100vh;
    div.container{
        position: absolute;top: 0;left: 0;;width: 100vw;height: 100vh;
        div.titleBox{
            background: linear-gradient(90deg,rgba(0,0,0,.04) 0%,rgba(0,0,0,.6) 40%,rgba(0,0,0,.6) 60%, rgba(0,0,0,.104) 100%);
            width: 100vw;height: 12vw;
            margin-top: 120px;
            display: flex;justify-content: center;align-items: center;
            div.titleImg{
                //height: 200px;width: 1500px;
                height: 8vw;width:27.56vw;
                background-image: url("@/assets/loadingTitle_2.png");
                background-size: cover;
                transform: translateY(-.5vw);
            }
        }
        div.progressBox{
            position: absolute;bottom: 0;left: 0;
            height: 200px;width: 100vw;
            display: flex;flex-direction: column;justify-content: center;align-items: center;
            div.state{
                color: #d4b57c;
                font-size: 28px;letter-spacing: 1px;
                &.waiting{
                    font-size: 32px;
                    animation: flash 1.4s infinite;
                }
            }
            div.progress{
                position: relative;
                overflow: hidden;
                margin-top: 25px;
                width: 90vw;
                height: 20px;
                border-radius: 30px;
                background-color: rgba(0,0,0,.6);

                div.border{
                    border: 1px solid #b18e66;
                    width: 100%;height: 100%;
                    position: relative;z-index: 10;
                    border-radius: 30px;
                    box-shadow: 0 0 0 3px inset black;
                }
                div.bar{
                    position: absolute;left: 0;top: 0;
                    //width: 50%;
                    height: 100%;
                    background: linear-gradient(90deg, #d5b67d 0%, #a37d4e 95%, #896037 100%);
                }
            }
        }
    }
}
</style>