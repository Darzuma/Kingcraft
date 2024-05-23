<template>
    <modal title="Arena Ladder" nudgeY="3" v-model:valid="$store.user.showLadder" @close="close">
        <div class="arenaLadder">
            <header>
                <div class="title">Bronze</div>
                <div class="num">
                    <icon index="11" class="ico">III</icon>
                </div>
                <div class="title">Warriors</div>
            </header>
            <div class="userList" ref="scrollBox" @wheel="wheel">
                <div class="pendingBox" v-if="pending">
                    <pending/>
                </div>
                <div v-else>
                    <div class="user" v-for="(user, idx) in users" :key="user.name">
                        <div class="index">{{ idx + 1 }}</div>
                        <div class="name" @click="showInfo">{{ user.name }}</div>
                        <div class="rank">
                            <icon index="11" size="20"/>
                            <div class="val">{{ user.rank }}</div>
                        </div>
                        <div class="troop">
                            <icon index="14" size="20"></icon>
                            <div class="val">{{ user.troop }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    name: "arenaLadder",
    data(){
        return {
            pending: true,
            timer: null,
            users:[
                // твой отец
                { name:'MyMajesty', rank:1960, troop:390 },
                { name:'Vano-fcdd', rank:1955, troop:380 },
                { name:'Qungiv', rank:1947, troop:360 },
                { name:'Radjab', rank:1944, troop:360 },
                { name:'KnyaZZ', rank:1938, troop:350 },
                { name:'Fullhardy', rank:1935, troop:350 },
                { name:'Hrusst', rank:1932, troop:340 },
                { name:'Xixaxo', rank:1930, troop:330 },
                { name:'GL4DIATOR', rank:1925, troop:330 },
                { name:'Shaitan', rank:1920, troop:320 },
                { name:'Chinnnn', rank:1902, troop:320 },
                { name:'NAZGUL', rank:1900, troop:320 },
                { name:'神々の王', rank:1892, troop:310 },
                { name:'Rojn', rank:1885, troop:310 },
                { name:'galileo', rank:1885, troop:290 },
                { name:'Orsi', rank:1881, troop:290 },
                { name:'Mbizous', rank:1880, troop:290 },
                { name:'ManOwar', rank:1721, troop:290 },
                { name:'Ackerman96', rank:1590, troop:260 },
                { name:'Alex1989', rank:1550, troop:260 },
                { name:'KenZi', rank:1521, troop:260 },
                { name:'Jackie', rank:1375, troop:250 },
                { name:'Messiah', rank:1371, troop:240 },
                { name:'HookeyF', rank:1370, troop:240 },
                { name:'BucketHead', rank:1369, troop:240 },
                { name:'AlphaFly', rank:1366, troop:220 },
                { name:'Interior', rank:1362, troop:180 },
                { name:'Nobody_xxxxx', rank:1355, troop:180 },
                { name:'iiiiiiiiiiiiiiii', rank:1351, troop:150 },
                { name:'BLACK-T', rank:1112, troop:150 },
                { name:'AAAAAAAAA', rank:500, troop:120 },
                { name:'dwadaw22102', rank:500, troop:120 },
                { name:'fasfewwww', rank:500, troop:120 },
                { name:'fffffffx', rank:500, troop:120 },
                { name:'Faker_D', rank:500, troop:120 },
                { name:'GoliathXII', rank:500, troop:120 },
                { name:'Alin', rank:500, troop:120 },
                { name:'laan35361062', rank:500, troop:120 },
                { name:'CricketAZ', rank:500, troop:120 },
                { name:'Ragnarok', rank:500, troop:120 },
            ]
        }
    },
    watch:{
        '$store.user.showLadder':{
            handler: function(val){
                if(val){
                    let t = (1 + Math.random().toFixed(2) * 5) * 1000
                    this.timer = setTimeout(()=>{
                        this.pending = false
                        this.$nextTick(()=>{
                            let sb = this.$refs.scrollBox
                            sb.scrollTop = sb.scrollHeight
                        })
                        clearTimeout(this.timer)
                    },t)
                }
            },
        }
    },
    methods:{
        wheel(event){
            this.$refs.scrollBox.scrollTop += event.deltaY / 15
        },
        close(){
            this.pending = true
            clearTimeout(this.timer)
            this.$message.valid = false
        },
        showInfo(){
            this.$handle(()=>{
                // console.log('Request error')
            },16)
        }
    }
}
</script>

<style scoped lang="scss">
div.arenaLadder{
    width: 400px;
    height: 750px;
    header{
        color: #d6b88b;
        text-shadow: 0 0 2px black,0 0 4px black, 0 06px black;
        border-bottom: 1px solid rgba(214,184,140,.4);
        padding-bottom: 15px;
        width: 360px;
        margin: 0 auto;
        display: flex;justify-content: center;
        div.num{
            font-size: 34px;
            display: flex;justify-content: center;
            div.ico{
                text-align: center;
                padding-top: 9px;
                margin: 0 5px;
            }
        }
        div.title{
            margin-top: 14px;
            letter-spacing: 1px;
            font-size: 22px;text-align: center;
        }
    }
    div.userList{
        height: 620px;
        overflow: hidden;
        padding: 20px 20px 120px 20px;
        text-shadow: 0 0 2px black,0 0 4px black;
        &::-webkit-scrollbar{
            width: 0;
        }
        div.pendingBox{
            height: 100%;
            display: flex;align-items: center;justify-content: center;
        }
        div.user{
            display: flex;align-items: center;justify-content: space-between;
            height: 32px;
            background-color: rgba(255,255,255,.05);
            padding: 0 20px 0 8px;
            margin-bottom: 6px;
            border-radius: 1px;
            div.index{
                height: 16px;line-height: 15px;padding-left: 1px;
                font-size: 12px;
                width: 20px;
                color: #8e6629;
                border-radius: 50px;
                text-align: center;
            }
            div.name{
                color: #008cff;
                height: 32px;line-height: 30px;
                width: 160px;
                white-space: nowrap;text-overflow: ellipsis;
                &:hover{
                    text-decoration: underline;
                }
            }
            div.rank{
                height: 32px;line-height: 30px;
                display: flex;align-items: center;
                div.val{
                    width: 40px;
                    padding-left: 5px;
                }
            }
            div.troop{
                height: 32px;line-height: 30px;
                display: flex;align-items: center;
                div.val{
                    width: 30px;
                    padding-left: 5px;
                }
            }
        }
    }
}
</style>