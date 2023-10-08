<template>
    <div class="XButton" @click="click"/>
</template>

<script>
export default {
    name: "closeBtn",
    emits:[ 'click' ],
    data(){
        return {
            timer: null
        }
    },
    props:{
        size:{
            type: [ String, Number ],
            default: ''
        },
        instant:{
            type: Boolean,
            default: false
        },
    },
    mounted() {
        if(this.size)
            this.$el.style.setProperty('--size', this.size + 'px')
    },
    watch:{
        size(val){
            this.$el.style.setProperty('--size', val + 'px')
        }
    },
    methods:{
        click(){
            this.timer = setTimeout(()=>{
                this.$emit('click')
                clearTimeout(this.timer)
            },this.instant ? 50 : 220)
        }
    },
    unmounted() {
        clearTimeout(this.timer)
    }
}
</script>

<style lang="scss" scoped>
div.XButton{
    --size:40px;
    width: var(--size);height: var(--size);
    background: url("@/assets/ui_close_1.jpg");
    background-size: cover;
    &:active{
        background: url("@/assets/ui_close_2.jpg");
        background-size: cover;
    }
}
</style>