<template>
    <div class="worldMap">
        <main class="container">
            <ratioBox width="1920" height="1290" bottom>
                <modification ref="modification" :bus="this"/>
                <consolePanel ref="consolePanel" :bus="this"/>
            </ratioBox>
        </main>
    </div>
</template>

<script>
import { user, heroes, setting } from "@/stores"
import modification from "./modification";
import consolePanel from "./consolePanel";
export default {
    name: 'worldMap',
    components:{
        modification, consolePanel
    },
    mounted() {

    },
    data(){
        return {

        }
    },
    watch:{
        clickToStart(val){

        },
    },
    methods:{
        showObjectInfo(objectId, objectName){
            console.log(parseInt(objectId))
        },
        pickObject(objectId, objectName){
            console.log(parseInt(objectId))
        },

    },
    deactivated() {
        console.log('worldMap deactivated')
    },
    activated() {
        console.log('worldMap activated')
    },

}
</script>

<style lang="scss">
div.worldMap{
    height: 100vh;width: 100vw;
    position: absolute;top: 0;z-index: 1;
    display: flex;align-items: end;justify-content: center;
    &.mask{
        background: linear-gradient(180deg, rgba(0,0,0,.6) 0%,rgba(0,0,0,.5) 80%, rgba(0,0,0,0) 100%);
    }
    main.container{
        width: 100vw;height: 100vh;
    }
    div.test{
        position: absolute;top: 0;right: 0;
        width: 900px;
        height: 800px;
        background: url("@/assets/卡牌.jpg");
        background-size: cover;
    }
}
</style>