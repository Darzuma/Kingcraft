<template>
    <div class="hint_pom913" v-if="viewingCard" :style="{ '--index': viewingCard.slotIndex }">
        <i class="tips">Click to dispatch</i>
        <i class="info">{{ viewingCard.name }}</i>
        <i class="info">{{ viewingCard.info }}</i>
        <footer>
            <icon index="14" size="28"/>
            <i class="cost">{{ viewingCard.supply }}</i>
        </footer>
    </div>
</template>

<script>
export default {
    name: "hint_pom913",
    computed:{
        viewingCard(){
            return this.$store.game.viewingCard
        }
    }
}
</script>

<style scoped lang="scss">
div.hint_pom913{
    --index:100;
    position: absolute;left:calc(var(--index) * 150px + 422px);z-index: 20;
    bottom:215px;
    min-width: 480px;
    min-height: 93px;line-height: 1.5;
    text-shadow: 0 0 2px black;
    background: rgba(0,0,0,.7);
    border: 1px solid #867456;
    border-radius: 5px;
    padding: 9px 18px 20px 18px;
    i.info{
        display: block;
        color: #f1d1aa;font-size: 18px;
    }
    i.tips{
        display: block;min-height: 35px;
        color: lawngreen;text-shadow: 0 0 2px black;font-size: 18px;
    }
    footer{
        margin-top: 5px;
        display: flex;
        height: 30px;
        align-items: end;
        margin-left: -5px;
        i.cost{
            font-size: 20px;
            color: rgba(255,255,255,.8);
            margin:0 50px 0 5px;
        }
        i.tips{
            color: lawngreen;text-shadow: 0 0 2px black;font-size: 18px;
            i.x{
                display: inline-block;width: 16px;height: 16px;
                text-align: center;line-height: 15px;
                background: rgba(55,255,0,.2);
            }
        }
    }
}
</style>