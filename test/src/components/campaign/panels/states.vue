<template>
    <div class="crystal_lk513">
        {{ $store.game.currentCrystal }}
    </div>
    <div class="heroName_lk513">
        {{ hero.name }}
    </div>
    <div class="levelNumber_lk513">
        Level {{ hero.level }}
    </div>
    <div class="menuButton_lk513" @click="showHelp">
        <i>HELP</i>
    </div>
</template>

<script>
export default {
    name: "states",
    computed:{
        hero(){
            return this.$store.heroes[this.$store.user.heroIndex]
        }
    },
    methods:{
        showHelp(){
            this.$store.user.showSetting = true
        }
    }
}
</script>

<style lang="scss">
div.crystal_lk513{
    position: absolute;z-index: 10;right: 323px;top: 140px;
    color: white;
    font-size: 36px;
    text-shadow: 1px 1px 2px black, 0 0 2px black, -1px -1px 2px black;
    font-weight: bold;
    text-align: center;
    width: 50px;
}
div.heroName_lk513{
    color: #dbac34;
    position: absolute;z-index: 10;right: 284px;top: 200px;
    width: 126px;height: 16px;line-height: 15px;text-align: center;
    font-size: 12px;
}
div.levelNumber_lk513{
    color: rgba(255,255,255,.7);font-family: "PingFang SC";
    position: absolute;z-index: 10;right: 314px;top: 245px;
    width: 71px;height: 24px;line-height: 23px;text-align: center;
    font-size: 13px;
}
div.menuButton_lk513{
    position: absolute;z-index: 10;right: 312px;top: 281px;
    width: 74px;height: 19.5px;
    background-image: url("@/assets/ui_menu_btn1.jpg");
    background-size: cover;
    pointer-events: auto;
    i{
        display: inline-block;width: 100%;height: 100%;
        transform: scale(.8);
        color: #efefef;text-align: center;letter-spacing: 1.5px;
        line-height: 19px;
        font-size: 12px;
        text-shadow: 0 0 10px black;
    }
    &:active{
        background-image: url("@/assets/ui_menu_btn2.jpg");
        i{ color: #b5b5b5; }
    }
}
</style>