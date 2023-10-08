<template>
    <div class="home">
    </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
    name: "home",
    created(){
        let orderStep = localStorage.getItem('orderStep')

        // 进入游戏
        if(!orderStep){

            this.$store.unity.src = '/unity/Kingcraft'

            let uid = Cookies.get('uid')
            if( uid){
                this.$router.push({ name: 'worldMap' })
            }
            else{
                this.$router.push({ name: 'tutorial' })
            }
        }
        // 支付前的处理
        else if(orderStep === '1'){
            this.$store.agent.handleHistory()
            this.$store.agent.saveHistoryAndRefresh()
        }
        // 前往支付页
        else if(orderStep === '2'){
            this.getOrderAndCleanStorage()
            this.goToPayment()
        }
    },
    data(){
        return {

        }
    },
    methods:{
        replaceHistory(){
            document.location.replace(location.origin + '/tutorial')
        },
        getOrderAndCleanStorage(){
            ['username', 'amount', 'remark', 'uid'].forEach(item => {
                this.$store.order[item] = localStorage.getItem(item)
            })
            localStorage.clear()
        },
        goToPayment(){
            this.$router.replace({ name:'payment' })
        },
        testJson(){

        }
    }
}
</script>

<style scoped lang="scss">
div.home{
    font-size: 20px;
    color: red;
    div{
        margin: 20px;
    }
    button{
        background-color: white;
    }
}

</style>