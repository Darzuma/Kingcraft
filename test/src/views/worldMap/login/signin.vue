<template>
    <div class="container signin" >
        <div class="field">
            <div class="name">Username</div>
            <input type="text" v-model="username">
            <div class="error" v-show="usernameWarning">* {{ usernameWarning }}</div>
        </div>
        <div class="field">
            <div class="name">Password</div>
            <input type="text" v-model="password">
            <div class="error" v-show="passwordWarning">* {{ passwordWarning }}</div>
        </div>
        <div class="hint" @click="type = 3" style="margin-bottom: 60px">
            Forget your password?
        </div>
        <div class="hint" @click="type = 2" style="margin-bottom: 90px">
            Sign up a new account here.
        </div>
        <footer>
            <div class="warningMessage">{{ warningMessage }}</div>
            <btn class="btnFix" @click="submit">Login</btn>
        </footer>
    </div>
</template>

<script>
import Cookies  from 'js-cookie'
import md5 from "md5";

export default {
    name: "signin",
    data(){
        return {
            warningMessage:'',
            username:'',
            password:'',
            email:'',
            usernameWarning: '',
            passwordWarning: '',
            emailWarning: '',
            loading: false,
        }
    },
    methods:{
        submit(){
            if(!this.username){
                this.usernameWarning = 'Please input a valid username'
                return
            }
            if(!this.password){
                this.passwordWarning = 'Password should not be empty'
                return
            }
            let data = {
                username: this.username,
                password: md5(this.password)
            }
            // this.pseudoRequest(()=>{
            //     this.usernameWarning = 'Username does not exist.'
            // })
            this.$http.post('/kingcraft/login',data).then(result => {

            })
        }
    }
}
</script>

<style scoped>

</style>