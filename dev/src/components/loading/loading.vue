<template>
    <transition name="fade">
        <div class="loading" v-if="progress < 1 || clickToStart" @click="click">
            <fit style="width: 100%;height: 100%">
                <img :src="img">
            </fit>
            <div class="container">
                <div class="titleBox">
                    <div class="titleImg"></div>
                </div>
                <div class="progressBox">
                    <div class="state" :class="{ waiting: isWaiting }">{{ isLoading ? 'Loading' : 'Click to start' }}</div>
                    <div class="progress">
                        <div class="border"></div>
                        <div class="bar" :style="{ width: width }"></div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import img from '@/assets/loadingBG.jpg'
import { progress, clickToStart } from "@/stores";
// 只需将 progress 设为小于1，就可以显示载入界面
export default {
    name: "view-loading",
    created() {
        window.loading = this
    },
    data(){
        return {
            clickToStart,
            progress,
            img,
        }
    },
    computed:{
        width(){
            // return this.progress * (this.progress < 0.3 ? 300 : 100) + '%'
            return this.progress * 100 + '%'
        },
        isLoading(){
            return this.progress < 1
        },
        isWaiting(){
            return this.progress === 1 && this.clickToStart
        },
    },
    emits: ['clickToStart'],
    methods:{
        click(){
            if(this.progress === 1 && this.clickToStart){
                this.$emit('clickToStart')
                this.clickToStart = false
            }
        }
    },

}
</script>

<style scoped lang="scss">
div.loading{
    position: absolute;left: 0;top: 0;width: 100vw;height: 100vh;z-index: 1000;
    background-color: #141414;
    user-select: none;
    div.container{
        position: absolute;top: 0;left: 0;;width: 100vw;height: 100vh;
        div.titleBox{
            background-color: rgba(0,0,0,.5);
            background: linear-gradient(90deg,rgba(0,0,0,.2) 0%,rgba(0,0,0,.5) 50%, rgba(0,0,0,.2) 100%);
            width: 100vw;height: 240px;
            margin-top: 90px;
            display: flex;justify-content: center;align-items: center;
            div.titleImg{
                height: 144.5px;width: 767px;
                background-image: url("@/assets/loadingTitle.png");
                background-size: cover;
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