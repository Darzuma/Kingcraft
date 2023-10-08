<template>
    <div class="keyBtn">
        <i class="kb_name">{{ name }}</i>
        <slot/>
    </div>
</template>

<script>
export default {
    name: "keyBtn",
    props:{
        name:{
            type:String,
            default:''
        },
        size:{
            type:[String, Number],
            default: 30
        }
    }
}
</script>

<style scoped lang="scss">
    div.keyBtn{
        position: relative;
        --size:50;
        width: calc(var(--size) * 1px);height: calc(var(--size) * 1px);
        background: url("@/assets/img/keyboard_key.png") no-repeat;
        background-size: 100% 100%;
        i.kb_name{
            position: absolute;left: 16%;top: 9%;
            color: black;
            font-size: calc(var(--size) / 4 * 1.7px);
        }
    }
</style>