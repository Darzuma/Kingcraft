<template>
    <div @click="$router.push({ name: portal })">
        <div>
            Market
        </div>
        <div>
            <button @click="goToPayment">
                goToPayment
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "market",
    created() {
        // if(localStorage.getItem('orderStep') === '2'){
        //     this.goToPayment()
        // }
    },
    mounted() {

    },
    methods:{
        goToPayment(){
            this.$store.order.uid = localStorage.getItem('uid')
            this.$store.order.username = localStorage.getItem('username')
            this.$store.order.amount = localStorage.getItem('amount')
            this.$store.order.remark = localStorage.getItem('remark')
            localStorage.clear()
            this.$router.replace({ name:'payment' })
        }
    }
}
</script>

<style scoped lang="scss">

</style>