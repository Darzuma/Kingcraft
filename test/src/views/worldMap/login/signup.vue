<template>
    <div class="container signup">
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
        <div class="field">
            <div class="name">Email</div>
            <input type="text" v-model="email">
            <div class="error" v-show="emailWarning">* {{ emailWarning }}</div>
        </div>
        <div class="hint" @click="type = 1" style="margin-bottom: 50px">
            Already have an account? login here.
        </div>
        <footer>
            <div class="warningMessage">{{ warningMessage }}</div>
            <btn class="btnFix" @click="submit">Create account</btn>
        </footer>
    </div>
</template>

<script>
import md5 from "md5";

export default {
    name: "signup",
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
            if(!this.email){
                this.emailWarning = 'Email should not be empty'
                return
            }
            let data = {
                username: this.username,
                password: md5(this.password),
                email: this.email
            }
            this.$http.post('/kingcraft/signup',data).then(result => {

            })
        },
    }
}
</script>

<style scoped>

</style>