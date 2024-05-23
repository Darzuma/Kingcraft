<template>
    <modal title="Warrior of Legends" :valid="$store.user.showLogin" @close="$store.user.showLogin = false"
           nudgeY="-1">

        <div class="login_ff68qe6t">
            <div v-if="!$store.user.username">
                <signin ref="sigin"  v-if="type===1" :bus="this"/>
                <signup   v-if="type===2" :bus="this"/>
                <retrieve v-if="type===3" :bus="this"/>
            </div>
            <div v-else class="signOut">
                <div class="content">
                    Do you want to exit from current account?
                </div>
                <div class="btns">
                    <btn scale=".8" @click="logOut">Log out</btn>
                    <btn scale=".8" @click="$store.user.showLogin = false">Return</btn>
                </div>
            </div>
            <div class="pendingBox" v-if="loading">
                <pending/>
            </div>
        </div>
    </modal>
</template>

<script>
import signin from "./signin";
import signup from "./signup";
import retrieve from "./retrieve";
import Cookies from "js-cookie";
export default {
    name: "login",
    components: { signin, signup, retrieve },
    mounted() {
        let data = JSON.parse(localStorage.getItem('userState'))
        if(data){
            this.loading = true
            this.$http.post('/kingcraft/signIn', data)
                .then(result => {
                    if(result.data === 'invalid:username'){
                    }else if(result.data === 'invalid:password'){
                    }
                    else{
                        this.$store.user.username = result.data.username
                        this.$store.user.password = result.data.password
                        this.$store.user.email = result.data.email
                        this.$store.user.uid = result.data.uid
                    }
                    this.loading = false
                })
                .catch(err => { console.log(err); this.bus.loading = false })
        }
    },
    data(){
        return {
            type: 1,
            loading: false,
        }
    },
    watch:{
        '$store.user.showLogin':function (val){
            if(!val)
                this.type = 1
            // 处理输入控制开关
            if(this.$store.unity.instance)
                this.$store.unity.instance.SendMessage('GameManager', 'CaptureAllKeyboardInput', val ? "false" : "true")
        }
    },
    methods:{
        pseudoRequest(callback){
            this.loading = true
            setTimeout(()=>{
                callback()
                this.loading = false
            }, 1000 + Math.random() * 3000)
        },
        logOut(){
            this.$store.user.username = ''
            this.$store.user.password = ''
            this.$store.user.email = ''
            this.$store.user.uid = 0
            Cookies.remove('username')
            Cookies.remove('password')
            localStorage.removeItem('userState')
            this.$store.user.showLogin = false
            // this.username = this.password = this.email = ''
            // this.usernameWarning = ''
            // this.passwordWarning = ''
            // this.emailWarning = ''
            // this.signupWarning = ''
            // this.user.showLogin = false
            // this.loading = false
        }
    }
}
</script>

<style lang="scss">
@import "login.scss";
</style>