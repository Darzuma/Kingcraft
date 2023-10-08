<template>
    <div class="emojibox_g4fs5">
        <div class="emoji_dwa54" v-for="n in 12" @click="$emit('emojiClick', n)">
            <emoji :index="n"></emoji>
        </div>
    </div>
</template>

<script>
import emoji from '@/components/gadgets/emoji'
export default {
name: "emojiList",
    emits: [ 'emojiClick' ],
    components: { emoji },
}
</script>

<style scoped lang="scss">
div.emojibox_g4fs5{
    margin-top: 15px;
    display: flex;width: 160px;flex-wrap: wrap;
    div.emoji_dwa54{
        width: 38px;height: 38px;
        border: 1px solid #68624b;
        display: flex;align-items: center;justify-content: center;
        padding-left: 2px;
        &:hover{
            border-color: #b7a45f;
        }
    }
}
</style>