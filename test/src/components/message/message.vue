<template>
    <div class="message" >
        <transition name="message">
            <div class="content" v-if="message.valid">
                {{ message.value }}
            </div>
        </transition>
    </div>
</template>

<script>
import { message } from '@/store'
export default {
name: "message",
    data(){
        return {
            message,
        }
    },
}
</script>

<style lang="scss">
.message-enter-active,
.message-leave-active {
    transition: transform 0.3s cubic-bezier(0.84, -1.13, 0.16, 3);
}
.message-enter-from{
    transform: scale(0.94);
}
.message-leave-to {
    transform: scale(1);
}
div.message{
    pointer-events: none;
    position: absolute;left: 0;top: 30vh;width: 100vw;height: 70vh;z-index: 1005;
    display: flex;align-items: start;justify-content: center;
    div.content{
        position: relative;
        font-size: 20px;
        background:linear-gradient(90deg,transparent 0%, rgba(0,0,0,.5) 15%, rgba(0,0,0,.75) 30%, rgba(0,0,0,.75) 70%, rgba(0,0,0,.5) 85%, transparent 100%);
        color: #efe3d5;
        min-width: 300px;max-width: 600px;
        padding: 20px 55px;line-height: 1.5;
        text-align: center;
        letter-spacing: .5px;
        text-shadow:  0 0 2px black, 0 0 4px black;
        &::before{
            position: absolute;left: 0;top: 0;
            display: block;content: '';width: 100%;height: 1.5px;
            background: linear-gradient(90deg,rgba(240,210,170,.1) 0%,#f1d1aa 30%,#f1d1aa 70%,rgba(240,210,170,.1) 100%);
        }
        &::after{
            position: absolute;left: 0;bottom: 0;
            display: block;content: '';width: 100%;height: 1.5px;
            background: linear-gradient(90deg,rgba(240,210,170,.1) 0%,#f1d1aa 30%,#f1d1aa 70%,rgba(240,210,170,.1) 100%);
        }
    }

}
</style>