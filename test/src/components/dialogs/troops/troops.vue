<template>
    <modal title="Barracks" v-model:valid="$store.user.showTroops" nudgeY="3">
        <div class="barracks">
            <div class="bg"/>

            <div class="troopAmount_daw5" style="left: 6px;">
                <icon index="14" size="50" style="margin-right: 12px;"/>
                <div>
                    <div class="title">
                        Current Troops : {{ $store.user.troops }}
                    </div>
                    <div class="note">
                        Points can increase the troop maxium.
                    </div>
                </div>
            </div>

            <div class="pointAmount_fe65" style="right: 6px;text-align: right">
                <div>
                    <div class="title">
                        Available points : 0
                    </div>
                    <div class="note">
                        Points can be reset and reuse.
                    </div>
                </div>
                <icon index="10" size="50" style="margin-left: 10px;" @click="showMarket"/>
            </div>

            <talentBox style="left: 35px;top: 220px"/>
            <talentBox style="left: 248px;top: 220px"/>
            <talentBox style="left: 384px;top: 220px"/>
            <talentBox style="left: 604px;top: 220px"/>

            <talentBox style="left: 35px;top: 445px"/>
            <talentBox style="left: 248px;top: 445px"/>
            <talentBox style="left: 384px;top: 445px"/>
            <talentBox style="left: 604px;top: 445px"/>
            <div class="placeHolder"></div>
            <footer class="bottom"><btn @click="showMarket">More supplies</btn></footer>

        </div>
    </modal>
</template>

<script>
import talentBox from './talentBox'
export default {
name: "troops",
    components:{ talentBox },
    methods:{
        showMarket(){
            this.$store.user.showTroops = false
            this.$store.user.showMarket = true
        }
    }
}
</script>

<style scoped lang="scss">
div.barracks{
    position: relative;
    width: 800px;
    height: 920px;
    max-height: 84vh;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        display: none;
    }
    div.bg{
        width: 800px;
        height: 800px;
        position: absolute;left: 0;top: 0;
        background: url("@/assets/img/4.1 部队升级2.png");
        background-size: 800px 800px;
    }

    div.troopAmount_daw5, div.pointAmount_fe65{
        position: absolute;top: 15px;
        display: flex;align-items: center;
        div.icon{
            width: 50px;height: 50px;
        }
        div.title{
            color: #fff6dd;
            font-size: 24px;font-weight: bold;
            text-shadow: 0 0 2px black, 0 0 4px black;
            margin-bottom: 8px;
        }
        div.note{
            padding-left: 1px;
            font-size: 12px;
            color: #00ff1d;
        }
    }
    div.placeHolder{
        height: 770px;
    }
    footer.bottom{
        //position: absolute;bottom: 0;
        height:170px;width: 100%;
        display: flex;align-items: center;justify-content: center;
    }
}
</style>