<template>
    <div id="container-e5ds905"/>
</template>

<script>
import { loadScript } from "@paypal/paypal-js";

const clientId = "AV85s9cgmiD1XlwuoqMYOQDFN350ZONOvtoFAA05pTrCgkbHwYsf-BX1UupSy8ru2Fj8W85bc5UzK6S-"
const style = { layout:'vertical', color: 'blue', height: 44 } // label: 'paypal' 'checkout' 'buynow' 'pay' 这仨都很丑，默认就可以; shape:'rect' 'pill'; height: 25~55 默认是55

export default {
    name: "paypal",
    emits: ['approve'],
    mounted() {
        let self = this
        loadScript({ clientId }).then(paypal => {
            paypal.Buttons({
                createOrder(data, actions){
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD", // 币种 String
                                    value: self.amount.toString(), // 金额 String
                                },
                            },
                        ],
                    }).then(orderId => {
                        // console.log(orderId)
                        // Your code here after create the order
                        return orderId;
                    });
                },
                onApprove(data, actions){
                    // actions.order.capture 这一步的执行非常重要，否则用户的钱不会到账
                    return actions.order.capture().then(details => {
                        self.$emit('approve', data, details)
                    })
                },
                onCancel(data){
                    // console.log(data) // {orderID: '6Y4323254F865305W'}
                },
                onInit(data, actions){
                    // Disable the buttons
                    if(!self.validated && !self.$store.user.uid)
                        actions.disable()
                },
                onClick()  { // onClick is called when the button is clicked
                    if(!self.validated && !self.$store.user.uid){
                        if(confirm("Please login to continue")){
                            self.$store.user.showLogin = true
                            self.$router.push({ name:'worldMap' })
                        }
                    }
                },
                style
            }).render("#container-e5ds905").catch((error) => { console.error("failed to render the PayPal Buttons", error) });
        }).catch((error) => {
            alert("Sorry! PayPal failed to load. Please try refreshing the page and attempting again.")
        });
    },
    props:{
        amount:{
            type:[ String, Number ],
            default: ''
        },
        validated:{
            type: Boolean,
            default: true
        }
    }
}
</script>

<style scoped lang="scss">
div#container-e5ds905{
    margin-top: 45px;
    padding-top: 30px;
    position: relative;
    border-top: 1px solid #383840;
    min-height: 227px;
    &::before{
        text-align: center;
        position: absolute;left: 75px;top: -20px;
        width: 200px;height: 30px;
        content: 'Payment method';font-size: 20px;color: #85868a;line-height: 30px;
        font-weight: bold;
        background-color: #14171e;
        letter-spacing: .5px;
    }
}
</style>