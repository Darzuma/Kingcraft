<template>
    <div class="payment" :class="{ validated: validated }">
        <!-- $store.unity.src 为空时，$store.user.showHandling 不可用，要单独实现-->
        <div class="processing" v-show="processing">Processing ...</div>

        <div class="wrapper">
            <header>
                Payment Information
            </header>
            <div class="info">
                {{ username }}
                <i class="remark" v-if="remark" >【+{{ remark }} coins】</i>
            </div>
            <div class="total" v-if="!showComplete && !showContinue">
                <i>{{ amount }}</i>
            </div>
            <div class="success" v-else>
                {{ showError ? 'Payment encountered an error.' : 'Payment is complete.' }}
            </div>

            <div class="note">
                This is a one-time purchase. There will be no additional fees incurred after the transaction.
            </div>

            <paypal v-if="!showComplete && !showContinue && !showError" :key="key" :amount="amount" :validated="validated"
                    @approve="approve"
            />
            <div v-if="showError">
                <div class="complete" style="margin-top: 9vw">
                    <div style="color: red">Sorry,we've encountered server errors.</div>
                    <div>
                        Please contact rarenecks@protomail.com.
                    </div>
                    <div>
                        Please contact rarenecks@protomail.com.
                    </div>
                    <div>
                        Please contact rarenecks@protomail.com.
                    </div>
                    <div style="color: red">
                        Please be patient, we will certainly refund your money.
                    </div>
                </div>
            </div>
            <div v-if="!showError && showComplete">
                <div class="complete">
                    <div>Auto close in {{ counter }} seconds.</div>
                </div>
                <div class="closeBtn" v-if="!showContinue" @click="close">CLOSE</div>
            </div>

            <div class="continue" v-if="!showError && showContinue">
                <div class="greenText">Please back to the game page.</div>
                <div class="btnBox"><button @click="goToWorldMap">Continue</button></div>
            </div>

<!--            <footer>-->
<!--                <div class="cards"/>-->
<!--            </footer>-->
        </div>
    </div>
</template>

<script>
// import testContainer from "./testContainer";
import paypal from '@/components/paypal'

export default {
    name: "checkout",
    components: { paypal },
    mounted() {
        // 处理外链付款
        if(this.$store.order.username && this.$store.order.amount){

            this.validated = true
            // 处理页面标题和图标
            document.title = '\u205fPayment with Paypal'
            document.querySelector("link[rel~='icon']").href = '/pay4.png'

            // 防止恶意刷新丢失付款数据
            window.onunload = function(){
                window.close()
            }
        }
        else
            this.validated = false
    },
    created() {
        this.key = Date.now()
        this.username = this.$route.query.username ? this.$route.query.username : this.$store.order.username
        this.amount = this.$route.query.amount ? this.$route.query.amount : this.$store.order.amount
        this.remark = this.$route.query.remark ? this.$route.query.remark : this.$store.order.remark
        this.uid = this.$route.query.uid ? Number(this.$store.user.uid) : Number(this.$store.order.uid)

    },
    data(){
        return {
            uid: 0,
            username: '',
            amount: '',
            remark: '',
            counter: 10,
            validated: false, // 外链开关
            showComplete: false,
            showContinue: false,
            showError: false,
            key:'',
            processing: false,
        }
    },
    methods:{
        async approve(order, details){
            if(this.validated){
                let counter = 0
                let result = null
                while(!result && counter < 3){
                    counter += 1
                    result = await this.addOrder_v1(order, details)
                }
                if(!result){
                    this.showError = true
                    return
                }
                this.showComplete = true
                this.counter = 10
                let t = setInterval(()=>{
                    this.counter -= 1
                    if(this.counter === 0){
                        clearInterval(t)
                        window.close()
                    }
                },1200)
            }
            else{
                await this.addOrder_v2(order, details)
                this.showContinue = true
            }
        },
        // 添加订单
        addOrder_v1(order, details){
            this.processing = true
            return new Promise(resolve => {
                this.$http.post('/v2/addOrder_v1', this.createPayload(order, details))
                    .then(result => {
                        this.processing = false
                        resolve(result.data)
                    })
                    .catch(err => {
                        this.processing = false
                        resolve(false);
                    })
            })
        },
        // 添加马甲订单
        addOrder_v2(order, details){
            this.processing = true
            return new Promise(resolve => {
                this.$http.post('/v2/addOrder_v2', this.createPayload(order, details))
                    .then(result => {
                        this.processing = false
                        resolve(result.data)
                    })
                    .catch(err => {
                        // todo 处理支付成功但数据保存失败的情况
                        alert(`Sorry,we've encountered an error. Please wait and your payment will be returned within 24 hours`)
                        this.showError = true
                        this.processing = false
                        resolve(false)
                    })
            })
        },
        createPayload(order, details){
            return {
                order_id: order.orderID,
                order_time: details.create_time,
                order_amount: this.amount, // 金额
                order_remark: this.remark, // 购买的金币数量
                payer_id: order.payerID,
                payer_uid: this.uid,
                payer_username: this.username,
                payer_email: details.payer.email_address,
                payer_country_code: details.payer.address.country_code,
            }
        },
        goToWorldMap(){
            document.location.replace(location.origin + '/worldMap')
        },
        close(){
            window.close()
        }
    }
}
</script>

<style scoped lang="scss">
@import "validated.scss";
div.payment{
    // 加粗字体 "Object Sans", Helvetica, Arial, sans-serif
    // 普通字体 "Noto Sans", Helvetica, Arial, sans-serif
    font-family: "Object Sans", Helvetica, Arial, sans-serif;
    cursor: default;
    position: absolute;top: 0;left: 0;z-index: 10;
    background-color: #14171e;
    //background: white;
    width: 100%;
    height: 100%;
    overflow: hidden;
    div.processing{
        position: absolute;left: 0;top: 0;width: 100vw;height: 100vh;z-index: 5000;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;align-items: center;justify-content: center;
        color: #b6cfed;
        font-size:20px;
        letter-spacing: 2px;
        animation: akst infinite ease 1s;
        @keyframes akst {
            0%{ color: #b6cfed }
            50%{ color: #7f9fc4 }
            100%{ color: #b6cfed }
        }
    }
    div.wrapper{
        color: #ededed;
        width: 400px;
        padding: 0 25px;
        min-height:600px;
        margin: 0 auto;
        z-index: 1;

        header{
            //font-size: 5.6vw;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            padding: 70px 0 20px 0;
        }
        div.info{
            //margin: 10px 0 40px 0;
            margin-bottom: 50px;
            line-height: 2;
            color: #dae3ed;
            display: flex;justify-content: center;
            i.remark{
                font-size:4.2rem;font-weight: normal;
                line-height: 2.95;
                color: rgba(255,255,255,.8);
            }
        }
        div.total,div.success{
            font-family: "Object Sans", Helvetica, Arial, sans-serif;
            font-size: 22px;
            display: flex;justify-content: center;
            font-weight: bold;
            height: 136px;padding: 40px 8px 0 0;
            position: relative;
            border-top: 1px solid #383840;
            color: #3fb2ff;
            text-shadow: 2px 2px 4px black, 0 0 6px black;
            //color: white;
            &::before{
                text-align: center;
                position: absolute;left: 125px;top: -16px;
                width: 100px;height: 30px;
                content: 'TOTAL';font-size: 20px;color: #85868a;line-height: 30px;
                text-shadow: none;
                background-color: #14171e;
                letter-spacing: 1px;
            }
        }
        div.total{
            font-size: 45px;
            i{
                position: relative;
                &::before{
                    position: absolute;display: block;content: "$";left: -22px;top: 2px;
                    font-size: 34px;
                    text-shadow: none;
                }
            }
        }
        div.note{
            letter-spacing: 0;
            line-height: 1.8;
            text-align: center;
            //color: #b7b9b6;
            color: #bcdeff;
        }
        div.complete{
            margin-top: 30px;
            min-height: 120px;
            line-height: 1.8;
            text-align: center;
            font-size: 18px;
            //font-size: 22px;font-weight: bold;
            color: #bcdeff;
            //color: #2eff00;
            text-shadow: 0 0 4px black;
            div.counter{
                height: 100px;line-height: 80px;
                font-size: 28px;
            }
        }
        div.closeBtn{
            color: #bcdeff;
            //color: #2eff00;
            width: 110px;height: 42px;line-height: 42px;text-align: center;
            border: 1px solid #bcdeff;
            border-radius: 3px;
            margin: 0 auto 80px auto;
            cursor: pointer;
            &:hover{
                filter:brightness(1.2);
            }
        }
        footer{
            //margin-top: 40px;
            //display: flex;justify-content: space-between;
            //div.card{
            //    --x:0;
            //    --width:50px;
            //    width: var(--width);
            //    height: 33.33px; // 72 48
            //    background: url("@/assets/payment_icons.png");
            //    background-position-x: calc(var(--x) * var(--width) * -1);
            //    background-position-y:0;
            //    background-size: cover;
            //}
        }
        div.continue{
            div.greenText{
                text-align: center;
                font-size: 22px;font-weight: bold;
                color: #2eff00;text-shadow: 0 0 4px black;
                margin:50px 0 70px 0;
            }
            div.btnBox{
                min-height: 70px;
                text-align: center;
                button{
                    height: 50px;width: 140px;
                    color: #2eff00;
                    border: 1px solid #2eff00;
                    border-radius: 3px;
                    font-size: 18px;
                }
            }
        }

    }

}
</style>