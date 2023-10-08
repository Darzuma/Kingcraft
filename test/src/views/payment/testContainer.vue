<template>
    <div class="testContainer">
        <h2>Checkout</h2>
        <div>username : {{ $store.order.username }}</div>
        <div>amount : {{ $store.order.amount }}</div>
        <div>remark : {{ $store.order.remark }}</div>
        <div>historyLength : {{ historyLength }}</div>
        <div>referrer : {{ referrer }}</div>
        <div>opener : {{ opener }}</div>
        <div>portal : {{ portal }}</div>
        <div>
            <input type="number" v-model="page"><button @click="go">go</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "testContainer",
    beforeCreate() {
        // document.title = this.$store.order.username + '\'s payment page'

        this.referrer = document.referrer
        this.portal = localStorage.getItem('portal')
    },
    mounted() {
        console.log(history)
        this.historyLength = history.length
        this.opener = window.opener
    },
    data(){
        return {
            historyLength:0,
            referrer:'',
            portal:'',
            opener:'',
            page:-1
        }
    },
    methods:{
        pushHistory(){
            history.pushState(null,"", "https://")
        },
        back(){
            history.go(-1)
        },
        go(){
            history.go(this.page)
        }
    }
}
</script>

<style scoped lang="scss">
div.testContainer{
    color: red;
    text-shadow: 0 0 6px black;
    letter-spacing: 1px;
    padding: 20px;
    //background-color: rgba(255,255,255,.5);
    h2{

    }
    div{
        margin: 10px 0;
        font-size: 22px;
        font-weight: bold;
    }
    button{
        padding: 2px 10px;
        color: white;
        background-color: rgba(0,0,0,.6);
    }
}
</style>