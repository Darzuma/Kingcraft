<template>
    <div class="btn" :class="{ valid: valid }" @click="click">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "btn",
    emits:[ 'click' ],
    data(){
        return {
            timer: null
        }
    },
    methods:{
        click(){
            this.timer = setTimeout(()=>{
                this.$emit('click')
                clearTimeout(this.timer)
            },100)
        }
    },
    unmounted() {
        clearTimeout(this.timer)
    },
    props:{
        valid:{
            type: Boolean,
            default: true
        }
    }
}
</script>

<style scoped lang="scss">
div.btn{
    width: 220px;height: 44px;
    line-height: 42px;text-align: center;
    background: url("@/assets/英雄选择_按钮.jpg");
    background-size: cover;
    color: #ffd082;
    font-size: 20px;letter-spacing: 2px;
    text-shadow: 0 0 20px black, 0 0 10px black, 0 0 4px black;
    font-weight: bold;
    &.valid:active{
        background: url("@/assets/英雄选择_按钮2.jpg");
        background-size: cover;
        line-height: 44px;
        color: #d5ad6c;
    }
}
</style>