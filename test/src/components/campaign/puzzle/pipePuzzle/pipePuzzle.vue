<template>
    <!--'square','hexagonal','octagonal'-->
    <!-- // ?gridTypeName=square&size=3通过路径查询参数控制谜题类型 -->
    <div class="pipePuzzle">
        <iframe ref="puzzle"
                :src=src
                frameborder="0"
                @load="init"
        >
        </iframe>
    </div>
</template>

<script>
export default {
    name: "pipePuzzle",
    mounted() {

    },
    emits:['solved'],
    data(){
        return {
            queries:[
                ['square', 4], ['hexagonal', 3], ['octagonal', 3]
            ],
        }
    },
    computed:{
        src(){
            let index = parseInt(this.cardType)
            return `puzzle/index.html?gridTypeName=${this.queries[index][0]}&size=${this.queries[index][1] + this.hardness}`
        },
    },
    watch:{
        '$store.game.currentCard': function(val){
            if(val){
                let query = this.queries[val.type]
                this.$refs.puzzle.contentWindow.generate(query[0], query[1] + this.hardness)
            }
        }
    },
    methods:{
        autoSolve(callback){
            let autoSolve = this.$refs.puzzle.contentWindow.autoSolve
            if(autoSolve)
                autoSolve().then(()=>{
                    if(callback) callback()
            })
        },
        init(){
            this.$refs.puzzle.contentWindow.parent = this
        }
    },
    props:{
        cardType:{
            type:[Number, String],
            default: '0'
        },
        hardness:{
            type:[Number, String],
            default: 0
        }
    }
}
</script>

<style scoped lang="scss">
div.pipePuzzle{
    width:  510px;
    height: 510px;
    background: url("@/assets/解密背景.jpg");
    background-size: cover;
    display: flex;align-items: center;justify-content: center;
    iframe{
        width:  490px;
        height: 490px;
    }
}

</style>