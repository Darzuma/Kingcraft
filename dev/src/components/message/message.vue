<template>
    <div class="message">
        <transition name="message">
            <div v-show="message.valid" class="content">
                {{ message.value }}
            </div>
        </transition>
    </div>
</template>

<script>
import { message } from '@/stores'
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
    transition: transform 0.2s ease;
}
.message-enter-from{
    transform: scale(1.1);
}
.message-leave-to {
    transform: scale(1);
}
div.message{
    pointer-events: none;
    position: absolute;left: 0;top: 30vh;width: 100vw;height: 70vh;z-index: 100;
    display: flex;align-items: start;justify-content: center;
    div.content{
        font-size: 20px;
        background-color: rgba(0,0,0,.8);
        color: #efe3d5;
        width: 300px;
        padding: 15px 30px;
        border: 1px solid #f1d1aa;
        border-radius: 10px;
        //transform: translateY(-20vh);
        text-align: center;
        box-shadow: 0 0 0 2px black inset;
        letter-spacing: 2px;text-shadow:  0 0 2px black;
    }

}
</style>