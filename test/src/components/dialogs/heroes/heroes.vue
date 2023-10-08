<template>
    <teleport to="body">
        <transition name="fade" v-if="$store.user.showHeroes">
            <div class="heroes_oe512">
                <ratioBox width="1800" height="1290">
                    <div class="container_ky621">
                        <div class="heroBox">
                            <section class="brief">
                                <div class="name">{{ hero.name }}</div>
                                <div class="info">{{ hero.info }}</div>

                                <ul  class="features" v-show="!pending">
                                    <li v-for="(feature, idx) in hero.features">
                                        <i class="icon" :style="{ '--col': index, '--row': idx }"></i>
                                        <i class="name">{{ feature.name }}</i>
                                        <i class="detail">{{ feature.detail }}</i>
                                    </li>
                                </ul>

                            </section>

                            <section class="graph" :class="[ tink ]"
                                     :style="{ '--index': index }">
                                <i class="price">
                                    <i class="icon"></i>
                                    <i>{{ hero.valid ? upgradePrice : hero.price }}</i>
                                </i>
                                <i class="confirmBtn green" v-if="hero.valid && user.heroIndex !== index" @click="select">
                                    SELECT
                                </i>
                                <i class="confirmBtn blue" v-else-if="hero.valid && user.heroIndex === index" @click="upgrade">
                                    UPGRADE
                                </i>
                                <i class="confirmBtn" v-else @click="unlock">
                                    UNLOCK
                                </i>
                                <closeBtn class="closeBtn" size="45" @click="close"/>
                                <div class="level" v-show="hero.valid"><i>Lv.{{ hero.level }}</i></div>
                            </section>
                            <section class="cards">
                                <div class="title">{{ hero.name }}{{ hero.valid ? "'s level will enhance" : " will enable"}} the following cards :</div>

                                <div class="showcase" v-show="!pending">
                                    <div class="card" v-for="card in cardsInShowCase">
                                        <cardFace size=".55" :col="card.col" :row="card.row"/>
                                    </div>
                                </div>

                            </section>
                        </div>

                        <div class="heroList">
                            <div class="hero" v-for="(hero, i) in $store.heroes"
                                 :style="{'--i': i}"
                                 @click="index = i"
                            >
                                <i class="levelNumber" >{{ hero.level }}</i>
                            </div>
                        </div>

                    </div>
                </ratioBox>
            </div>
        </transition>
    </teleport>
</template>

<script>
export default {
    name: "heroes",
    created() {
        this.$store.user.heroesDialogVM = this
    },
    data(){
        return {
            tink: '', // 用于选择英雄后的发光特效
            timer: null,
            index:0,
            pending: false,
            handling: false
        }
    },
    computed:{
        hero(){
            return this.$store.heroes[this.index]
        },
        cardsInShowCase(){
            let index = (this.index + 2) * 4
            return this.$store.cards.slice(index, index + 4)
        },
        user(){
            return this.$store.user
        },
        upgradePrice(){
            return (this.hero.price / 2 + 100) * this.hero.level + 100
        }
    },
    watch:{
        index(){
            this.$message.valid = false
            this.pending = true
            this.timer = setTimeout(()=>{
                this.pending = false
                clearTimeout(this.timer)
            }, 200)
        },
    },
    methods:{
        close(){
            this.$handle(()=>{
                this.$message.valid = false
                this.$store.user.showHeroes = false
            })
        },
        checkValid(){
            if(this.$route.name !== 'worldMap'){
                this.$message.value = "Not available in battling."
                this.$message.valid = true
                this.timer = setTimeout(()=>{
                    this.$message.valid = false
                    clearTimeout(this.timer)
                },2000)
                return false
            }
            return true
        },
        select(){
            this.$handle(()=>{
                if(!this.checkValid()) return
                this.user.heroIndex = this.index
                this.tink = this.tink === 'foo' ? 'bar' : 'foo'
                this.$save();
            })
        },
        unlock(){
            this.$handle(()=>{
                if(!this.checkValid()) return
                if(this.user.money > this.hero.price){
                    this.user.money -= this.hero.price
                    this.hero.valid = true
                    this.user.heroIndex = this.index
                    let start = (this.index + 2) * 4
                    let end = start + 4
                    for(let i = start; i< end; i++){
                        this.$store.cards[i].valid = true
                    }
                    this.tink = this.tink === 'foo' ? 'bar' : 'foo'
                    this.$save();
                }
                else {
                    this.$message.value = "Not enough gold"
                    this.$message.valid = true
                }
            })

        },
        upgrade(){
            this.$handle(()=>{
                if(!this.checkValid()) return
                if(this.user.money >= this.upgradePrice){
                    this.user.money -= this.upgradePrice
                    this.hero.level += 1
                    this.$save();
                    this.tink = this.tink === 'foo' ? 'bar' : 'foo'
                }
                else{
                    this.$message.value = "Not enough gold"
                    this.$message.valid = true
                }
            })

        },
        // handle(cb){
        //     this.handling = true
        //     this.timer = setTimeout(()=>{
        //         cb()
        //         this.handling = false
        //         clearTimeout(this.timer)
        //     },(2 + Math.random().toFixed(2) * 3) * 1000)
        // },
    },
    beforeUnmount() {
        if(this.timer)
            clearTimeout(this.timer)
    }
}
</script>

<style scoped lang="scss">
@import "heroes.scss";
</style>