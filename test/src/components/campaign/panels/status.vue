<template>
    <div class="title_dwak1212">
        {{ $store.game.levelName }}
    </div>
    <div class="status_56215wa">
        <div class="as6612546">Available Troops</div>
        <div class="wd3535132">
            <icon class="troopIcon_da2fe2" index="14" size="30"></icon>
            <div class="nums512">{{ currentTroops }} / {{ totalTroops }}</div>
            <div class="bars915">
                <div class="bar current" :style="{ width: (currentTroops / totalTroops).toFixed(1) * 100 + '%' }"></div>
                <div class="bar background" ></div>
            </div>
        </div>
        <div class="minimap" :style="{ '--x': mapTypeIndex }">
            <div class="txt_dwa2">- {{ mapName }} -</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "status",
    created() {
        this.mapName = [ 'Battle on the Plain', 'Battle by the River', 'Fighting in the Desert' ][this.mapTypeIndex]
    },
    data(){
        return {
            mapName: '',
        }
    },
    computed:{
        currentTroops(){
            return this.$store.game.currentTroops
        },
        totalTroops(){
            return this.$store.user.troops
        },
        mapTypeIndex(){
            return this.$store.game.mapTypeIndex
        }
    }
}
</script>

<style scoped lang="scss">
div.title_dwak1212{
    position: absolute;left: 82px;top: 35px;z-index: 10;
    width: 280px;height: 40px;line-height: 39px;
    font-size: 21px;font-weight: bold;color: #d1c9bc;letter-spacing: 1px;
    text-align: center;
    text-shadow: 0 0 10px black;
}
div.status_56215wa{
    position: absolute;left:82px;bottom: 0;z-index: 6;
    width: 280px;height: 205px;
    div.troopIcon_da2fe2{
        position: absolute;z-index: 100;
        left: 43px;top:7px;
    }
    div.as6612546{
        text-align: center;font-weight: bold;letter-spacing: 1px;
        font-size: 20px;color: #af9e77;
    }
    div.wd3535132{
        position: relative;
        text-align: center;
        color: white;
        font-size: 30px;margin-top: 5px;text-shadow: 0 0 5px black;
        height: 45px;
        line-height: 45px;
        div.nums512{
            position: relative;z-index: 20;
        }
        div.bars915{
            position: absolute;bottom: 0;left: 0;
            height: 20px;width: 100%;

            div.bar{
                position: absolute;bottom: 0;left: 0;
                height: 100%;
                border-radius: 2px;
                &.current{
                    position: relative;z-index: 10;
                    //background: rgba(125,100,70,.8);
                    background: linear-gradient(90deg,rgba(125,100,70,.8) 0%, rgba(180,150,110,.8) 50%, rgba(125,100,70,.8) 100%);
                }
                &.background{
                    width: 100%;
                    background: rgba(255,255,255,.3);
                    box-shadow: 0 0 0 1px black, 0 0 0 2px rgba(215,190,120,.6);
                }
            }
        }
    }
    div.minimap{
        position: relative;
        margin-top: 16px;
        --x:0;
        width: 100%;height: 105px;
        background: url("@/assets/img/minimap.jpg");
        background-size: 1290px 105px;
        background-position-x: calc(var(--x) * -430px);
        border-radius: 2px;
        text-align: center;padding-top: 10px;font-size: 18px;color: white;
        text-shadow: 0 0 3px black, 0 0 10px black,0 0 20px black,0 0 30px black,0 0 30px black;
        div.txt_dwa2{
            position: relative;z-index: 2;
        }
        &::before{
            position: absolute;display: block;content: '';width: 100%;height: 100%;left: 0;top: 0;z-index: 1;
            background-color: rgba(0,0,0,.3);
        }
    }

}
</style>