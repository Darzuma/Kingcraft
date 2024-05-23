<template>
    <modal title="Oriental Market" v-model:valid="$store.user.showMarket" @close="close">
        <div class="gameMarket">
            <header class="vipContainer">
                <div class="Mark_dwa5">
                    <div>0</div>
                    <div>VIP</div>
                </div>
                <div class="progress_dwa61">
                    <div class="text_fdas4">
                        <div>Get daily rewards to level up VIP</div>
                        <div>20 / 150</div>
                    </div>
                    <div class="bar_fad354">
                        <div class="not_da24">You need to log in to claim daily rewards</div>
                    </div>
                </div>
            </header>
            <div class="border_dwa24"></div>
            <main class="itemContainer" ref="scrollBox" @wheel="wheel">

                <div class="item">
                    <icon class="discount" index="13"/>
                    <div class="bdr">
                        <div class="left">
                            <resourceIcon index="13" size="76"><div class="iconText">300×8</div></resourceIcon>
                            <resourceIcon index="14" size="76"><div class="iconText"></div></resourceIcon>
                        </div>
                        <div class="right">
                            <div class="name">
                                Elite Supply Pack
                            </div>
                            <div class="info">
                                300 all all 8 resources and 1 speed gear
                            </div>
                            <div class="btnBox">
                                <btn class="dwaok2" scale="0.6" @click="buyWithGold(0)">
                                    Buy with 25000 <icon size="15" />
                                </btn>
                                <btn scale="0.6" @click="goToPayment(19.9, 'Elite Supply Pack')">Buy with $19.9</btn>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <icon class="discount" index="13"/>
                    <div class="bdr">
                        <div class="left">
                            <resourceIcon index="12" size="76"><div class="iconText">20,000</div></resourceIcon>
                            <resourceIcon index="15" size="76"><div class="iconText"></div></resourceIcon>
                        </div>
                        <div class="right">
                            <div class="name">
                                Elite Gold Pack
                            </div>
                            <div class="info">
                                20,000 gold coins and 1 resource timer
                            </div>
                            <div class="btnBox">
                                <div style="width: 152px;"> </div>
                                <btn scale="0.6" @click="goToPayment(19.9, 'Elite Gold Pack')">Buy with $19.9</btn>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <div class="bdr">
                        <div class="left">
                            <resourceIcon index="0" size="76"><div class="iconText">50</div></resourceIcon>
                            <resourceIcon index="1" size="76"><div class="iconText">100</div></resourceIcon>
                        </div>
                        <div class="right">
                            <div class="name">
                                Small Food Pack
                            </div>
                            <div class="info">
                                50 bread and 100 cheese
                            </div>
                            <div class="btnBox">
                                <btn class="dwaok2" scale="0.6" @click="buyWithGold(2)">
                                    Buy with 2000 <icon size="15" />
                                </btn>
                                <btn scale="0.6" @click="goToPayment(2.9, 'Small Food Pack')">Buy with $2.9</btn>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <div class="bdr">
                        <div class="left">
                            <resourceIcon index="2" size="76"><div class="iconText">50</div></resourceIcon>
                            <resourceIcon index="3" size="76"><div class="iconText">100</div></resourceIcon>
                        </div>
                        <div class="right">
                            <div class="name">
                                Small Brewing Pack
                            </div>
                            <div class="info">
                                50 bacon and 100 beers
                            </div>
                            <div class="btnBox">
                                <btn class="dwaok2" scale="0.6" @click="buyWithGold(3)">
                                    Buy with 2000 <icon size="15" />
                                </btn>
                                <btn scale="0.6" @click="goToPayment(2.9, 'Small Brewing Pack')">Buy with $2.9</btn>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <div class="bdr">
                        <div class="left">
                            <resourceIcon index="4" size="76"><div class="iconText">100</div></resourceIcon>
                            <resourceIcon index="5" size="76"><div class="iconText">80</div></resourceIcon>
                        </div>
                        <div class="right">
                            <div class="name">
                                Small Forge Pack
                            </div>
                            <div class="info">
                                100 woods and 80 ingots
                            </div>
                            <div class="btnBox">
                                <btn class="dwaok2" scale="0.6" @click="buyWithGold(4)">
                                    Buy with 3000 <icon size="15" />
                                </btn>
                                <btn scale="0.6" @click="goToPayment(2.9, 'Small Forge Pack')">Buy with $2.9</btn>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <div class="bdr">
                        <div class="left">
                            <resourceIcon index="6" size="76"><div class="iconText">100</div></resourceIcon>
                            <resourceIcon index="7" size="76"><div class="iconText">80</div></resourceIcon>
                        </div>
                        <div class="right">
                            <div class="name">
                                Small Alchemy Pack
                            </div>
                            <div class="info">
                                100 kerosene and 80 powder
                            </div>
                            <div class="btnBox">
                                <btn class="dwaok2" scale="0.6" @click="buyWithGold(5)">
                                    Buy with 3000 <icon size="15" />
                                </btn>
                                <btn scale="0.6" @click="goToPayment(2.9, 'Small Alchemy Pack')">Buy with $2.9</btn>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <div class="bdr">
                        <div class="left">
                            <resourceIcon index="10" size="76"><div class="iconText">120</div></resourceIcon>
                            <resourceIcon index="11" size="76"><div class="iconText">120</div></resourceIcon>
                        </div>
                        <div class="right">
                            <div class="name">
                                Small Academy Pack
                            </div>
                            <div class="info">
                                120 kerosene and 120 powder
                            </div>
                            <div class="btnBox">
                                <btn class="dwaok2" scale="0.6" @click="buyWithGold(6)">
                                    Buy with 5000 <icon size="15" />
                                </btn>
                                <btn scale="0.6" @click="goToPayment(2.9, 'Small Academy Pack')">Buy with $2.9</btn>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <div class="bdr">
                        <div class="left">
                            <resourceIcon index="8" size="76"><div class="iconText">120</div></resourceIcon>
                            <resourceIcon index="9" size="76"><div class="iconText">120</div></resourceIcon>
                        </div>
                        <div class="right">
                            <div class="name">
                                Small Armament Pack
                            </div>
                            <div class="info">
                                120 kerosene and 120 powder
                            </div>
                            <div class="btnBox">
                                <btn class="dwaok2" scale="0.6" @click="buyWithGold(7)">
                                    Buy with 5000 <icon size="15" />
                                </btn>
                                <btn scale="0.6" @click="goToPayment(2.9, 'Small Armament Pack')">Buy with $2.9</btn>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    </modal>
    <modal title="Oriental Market" v-model:valid = showConfirm>
        <div style="text-align: center;font-size: 18px;margin: 60px 0 90px 0">Go to payment now ?</div>
        <div style="display: flex;justify-content: center;margin-bottom: 50px">
            <btn scale="0.8" @click="go">Continue</btn>
        </div>
    </modal>
</template>

<script>
export default {
    name: "market",
    data(){
        return {
            timer: null,
            showConfirm: false,
            amount:'',
            remark:''
        }
    },
    methods:{
        wheel(event){
            this.$refs.scrollBox.scrollTop += event.deltaY / 8;
        },
        close(){
            clearTimeout(this.timer)
            this.pending = true
            this.$message.valid = false
        },
        buyWithGold(itemIndex){
            this.$handle(()=>{
                this.$message.value = "Not enough gold"
                this.$message.valid = true
                this.timer = setTimeout(()=>{
                    this.$message.valid = false
                    clearTimeout(this.timer)
                },3000)
            })
        },
        goToPayment(amount, remark){
            // [this.amount, this.remark] = [amount, remark]
            [this.amount, this.remark] = [amount, '']
            this.showConfirm = true
        },
        go(){
            this.$handle(()=>{
                let username = this.$store.user.username
                this.showConfirm = false
                this.$store.user.showMarket = false
                this.$router.push({ name:'payment', query:{ username, amount: this.amount, remark: this.remark } })
            },5)
        },
    }
}
</script>

<style scoped lang="scss">
div.gameMarket{
    padding-top: 30px;
    width: 540px;
    height: 900px;
    max-height: 80vh;
    display: flex;flex-direction: column;align-items: center;justify-content: start;
    header.vipContainer{
        position: relative;z-index: 5;
        height: 120px;
        display: flex;justify-content: center;
        margin-top: -10px;
        div.Mark_dwa5{
            width: 120px;height: 120px;
            background: url("@/assets/img/印花.png");
            background-size: cover;
            display: flex;flex-direction: column;justify-content: center;align-items: center;
            padding-top: 5px;
            div{
                width: 30px;text-align: center;
                color: black;
            }
            div:first-child{
                font-size: 40px;
            }
            div:last-child{
                font-size: 12px;font-weight: bold;
                margin-top: 1px;
            }
        }
        div.progress_dwa61{
            width: 380px;
            display: flex;flex-direction: column;justify-content: center;
            padding-left: 20px;
            div.text_fdas4{
                width: 360px;
                display: flex;justify-content: space-between;
                font-size: 18px;
                margin-bottom: 12px;
                margin-top: -15px;
            }
            div.bar_fad354{
                position: relative;
                height: 15px;
                width: 360px;
                div.not_da24{
                    position: absolute;bottom: -36px;right: 2px;
                    color: #1997ff;
                }
                &::after{
                    display: block;position: absolute;left: 0;top: 0;content: '';
                    width: 100%;height: 100%;
                    background: url("@/assets/img/VIP进度条.png");
                    background-size: cover;
                    z-index: 10;
                }
                &::before{
                    border-radius: 30px 0 0 30px;
                    display: block;position: absolute;left: 0;top: 0;content: '';
                    height: 100%;
                    width: 55px;
                    //background-color: #00ff19;
                    background: linear-gradient(0deg, #008c0b, #1eff31, #008c0b);
                    box-shadow: 0 0 3px black inset;
                }
            }
        }
    }
    div.border_dwa24{
        margin: 30px 0 0 0;
        height: 2px;
        width: calc(100% + 30px);
        background: #ada485;
        position: relative;z-index: 1;
        &::before{
            display: block;content: '';
            position: absolute;left: 0;bottom: .5px;
            width: 100%;height: 194px;
            background: #211c13
        }
    }
    main.itemContainer{
        height: 710px;
        width: 100%;
        overflow-y: hidden;
        padding: 20px 20px;
        div.item{
            position: relative;
            height: 100px;
            border-radius: 5px;
            background: linear-gradient(0deg,#a59276, #cebea5);
            padding: 4px;
            margin-bottom: 12px;
            box-shadow: 0 2px 4px black, 0 2px 2px black;
            div.discount{
                position: absolute;right: 0;top: -10px;
                transform: rotate(10deg);
            }
            div.bdr{
                height: 100%;
                border: 3px solid #937f67;
                border-radius: 4px;
                display: flex;
                div.left{
                    display: flex;align-items: center;justify-content: space-evenly;
                    width: 180px;
                    div.resourceIcon{
                        border-radius: 3px;
                        //border: 2px solid #937f67;
                        //box-sizing: content-box;
                        box-shadow: 0 0 0 1px #937f67;
                    }
                    div.iconText{
                        width: 100%;
                        height: 100%;
                        font-size: 16px;
                        text-shadow: 0 0 2px black, 0 0 4px black, 0 0 4px black;
                        text-align: center;line-height: 125px;

                    }
                }
                div.right{
                    display: flex;flex-direction: column;justify-content: center;
                    color: black;
                    width: calc(100% - 180px);
                    padding-left: 5px;
                    font-weight: bold;

                    div.name{
                        font-size: 20px;
                        margin-bottom: 8px;
                    }
                    div.info{
                        margin-bottom: 12px;
                        color: rgba(0,0,0,.5);
                    }
                    div.btnBox{
                        display: flex;
                        div.btn{
                            letter-spacing: 1px;
                            div.icon{
                                margin-left: 1px;
                            }
                        }
                        div.dwaok2{
                            display: flex;align-items: center;justify-content: center;
                            margin-right: 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>