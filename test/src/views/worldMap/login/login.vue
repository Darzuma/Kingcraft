<template>
    <modal title="Warrior of Legends" :valid="$store.user.showLogin" @close="close" nudgeY="-70">
        <div class="login_ff68qe6t">
            <signin :bus="this"/>
            <signup :bus="this"/>
            <retrieve :bus="this"/>
        </div>
    </modal>
</template>

<script>
import signin from "./signin";
import signup from "./signup";
import retrieve from "./retrieve";
import md5 from 'md5'
export default {
    name: "login",
    components: { signin, signup, retrieve },
    data(){
        return {
            type: 1,
            retrieveStep:1,
            warningMessage:'',
            username:'',
            password:'',
            email:'',
            usernameWarning: '',
            passwordWarning: '',
            emailWarning: '',
            signupWarning: '',
            loading: false,
        }
    },
    watch:{
        '$store.user.showLogin':function (val){
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
        close(){
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