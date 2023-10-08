<template>
    <modal title="Message Board" v-model:valid="$store.user.showChatroom" @close="close">

        <div class="msgboard_d5wa41">

            <div class="msgContainer" :class="{ loading: loadingMsg }" ref="scrollBox" @wheel="wheel">
                <div class="pendingBox" v-if="pending">
                    <pending/>
                </div>
                <div v-else>
                   <div class="loadingBox">
                       <pending/>
                   </div>
                   <div class="log" v-for="msg in msgs">
                       <div class="avatarBox">
                           <avatar :heroIndex="msg.heroIndex" scale="0.25" noglow/>
                       </div>
                       <div class="msgBox">
                           <header>
                               <div class="username">{{ msg.name }}</div>
                               <div class="level">L{{ msg.lv }}</div>
                           </header>
                           <main>
                               <text>{{ msg.text }}</text>
                               <emoji v-if="msg.emojiIndex !== -1" :index="msg.emojiIndex" size="20"/>
                               <div class="time">{{ msg.time }}</div>
                           </main>
                       </div>
                   </div>
               </div>
            </div>

            <div class="txtBox">
                <textarea name="" id="" cols="55" rows="10"
                    v-model="textarea"
                />
                <div class="btnBox" style="margin-left: 15px">
                    <btn scale="0.7" @click="send">SEND</btn>
                    <emojiList @emojiClick="addEmoji"/>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import avatar from '@/components/avatar'
import emoji from '@/components/gadgets/emoji'
import emojiList from './emojiList'
import msgs from './msgs'
export default {
    name: "message",
    components: { emoji, emojiList, avatar },
    mounted() {

    },
    data(){
        return {
            pending: true,
            textarea:``,
            loadingMsg:true,
            msgs,
            timer: null,
            timer2: null,
        }
    },
    watch:{
        '$store.user.showChatroom':{
            handler: function(val){
                if(val){
                    let t = (3 + Math.random().toFixed(2) * 3) * 1000
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
            this.$refs.scrollBox.scrollTop += event.deltaY / 10;
        },
        addEmoji(n){
            this.textarea += `[EMO:${n}]`
        },
        send(){
            if(this.$store.user.vip < 1){
                this.$message.value= 'Level 1 VIP is needed to send a message.'
                this.$message.valid = true
                let t = setTimeout(()=>{
                    this.$message.valid = false
                    clearTimeout(t)
                }, 4000)
            }
        },
        close(){
            clearTimeout(this.timer)
            this.pending = true
            this.$message.valid = false
        }
    }
}
</script>

<style scoped lang="scss">
@import "chatroom.scss";
</style>