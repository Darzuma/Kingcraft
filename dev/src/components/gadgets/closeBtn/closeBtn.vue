<template>
    <div class="XButton" @click="click"/>
</template>

<script>
export default {
    name: "closeBtn",
    emits:[ 'click' ],
    props:{
        size:{
            type: [ String, Number ],
            default: ''
        }
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
            setTimeout(()=>{
                this.$emit('click')
            },300)
        }
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