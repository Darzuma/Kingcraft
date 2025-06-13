<template>
    <teleport to="body">
        <transition name="fade" v-if="valid">
            <div class="mask">
                <div class="modal" :style="{'--nudgeY': nudgeY}">
                    <closeBtn size="36" instant v-if="!noclose" @click="close"/>
                    <div class="title_fw45q2" v-html="title"/>
                    <slot></slot>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>

export default {
    name: "modal",
    emits: ['close', 'update:valid'],
    props:{
        valid:{
            type: Boolean,
            default: true
        },
        title:{
            type: String,
            default: "Default Title"
        },
        nudgeY:{
            type: [String, Number],
            default: 0
        },
        noclose:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        close(){
            this.$emit('update:valid', false)
            this.$emit('close')
        }
    }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
div.mask{
    position: absolute;z-index: 9999;
    top: 0;left: 0;width: 100vw;height: 100vh;
    display: flex;align-items: center;justify-content: center;
    background-color: rgba(0,0,0,.4);
    div.modal{
        --nudgeY: 0;
        transform: translateY(calc(var(--nudgeY) * 1vh));
        pointer-events: auto;
        position: relative;
        min-height: 180px;
        min-width: 300px;
        border-image-source: url("@/assets/img/bdsrc.png");
        border-image-slice: 240 120 120 120;
        border-image-width: 80px 40px 40px 40px;
        border-image-outset: 70px 20px 20px 20px;
        border-image-repeat: stretch round;
        background: url("@/assets/img/modalbg.jpg") no-repeat;
        background-size: 100% 100%;
        box-shadow: 0 0 40px black, 0 0 300px black;
        color: white;
        padding: 0 20px;
        div.XButton{
            position: absolute;right: -50px;top: -61px;
        }
        div.title_fw45q2{
            position: absolute;top: -59px;left: 0;
            height: 40px;line-height: 38px;
            width: 100%;
            text-align: center;padding-left: 5px;
            font-size: 21px;font-weight: bold;color: #d1c9bc;letter-spacing: 1px;
        }
    }
}

</style>