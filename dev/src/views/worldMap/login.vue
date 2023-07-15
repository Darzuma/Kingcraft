<template>
    <modal title="Warrior of Legends" :valid="user.showLogin" @close="close">

        <div class="loading" v-if="loading">
            <div class="lds-ripple"><div></div><div></div></div>
        </div>

        <div class="container" v-else-if="signupWarning">
            <div class="signupMessage">
                {{ signupWarning }}
            </div>
            <footer>
                <btn class="btnFix" @click="signup">Resend</btn>
            </footer>
        </div>

        <div class="container login" v-else-if="isLogin">
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
            <div class="hint" @click="retrieve">
                Forget your password?
            </div>
            <div class="hint" @click="isLogin = !isLogin">
                Sign up a new account here.
            </div>
            <footer>
                <div class="warningMessage">{{ warningMessage }}</div>
                <btn class="btnFix" @click="login">Login</btn>
            </footer>
        </div>

        <div class="container signup" v-else>
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
            <div class="hint" @click="isLogin = !isLogin">
                Already have an account? login here.
            </div>
            <footer>
                <div class="warningMessage">{{ warningMessage }}</div>
                <btn class="btnFix" @click="signup">Create account</btn>
            </footer>
        </div>

    </modal>
</template>

<script>
import { user } from '@/stores'
import md5 from 'md5'
export default {
    name: "login",
    data(){
        return {
            user,
            isLogin: true,
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
    mounted() {

    },
    methods:{
        change(){
            console.log(this.username)
        },
        retrieve(){
            this.loading = true
            this.$http.post('/retrieve').then(result => {

            })
            setTimeout(()=>{
                callback()
                this.loading = false
            }, 1000 + Math.random() * 3000)

        },
        login(){
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
            this.pseudoRequest(()=>{
                this.usernameWarning = 'Username does not exist.'
            })
            this.$http.post('/login',data).then(result => {

            })
        },
        signup(){
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
            this.pseudoRequest(()=>{
                this.signupWarning = 'Please check your email for a confirmation link …'
            })
            this.$http.post('/signup',data).then(result => {

            })
        },
        pseudoRequest(callback){
            this.loading = true
            setTimeout(()=>{
                callback()
                this.loading = false
            }, 1000 + Math.random() * 3000)
        },
        close(){
            this.isLogin = true
            this.username = this.password = this.email = ''
            this.usernameWarning = ''
            this.passwordWarning = ''
            this.emailWarning = ''
            this.signupWarning = ''
            this.user.showLogin = false
            this.loading = false
        }
    }
}
</script>

<style scoped lang="scss">
div.loading{
    width: 100%;height: 480px;
    padding-bottom: 50px;
    display: flex;align-items: center;justify-content: center;
    .lds-ripple {
        display: inline-block;
        position: relative;
        width: 100px;
        height: 100px;
    }
    .lds-ripple div {
        position: absolute;
        border: 4px solid #fffae2;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
        0% {
            top: 50px;
            left: 50px;
            width: 0;
            height: 0;
            opacity: 0;
        }
        4.9% {
            top: 50px;
            left: 50px;
            width: 0;
            height: 0;
            opacity: 0;
        }
        5% {
            top: 50px;
            left: 50px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
}
div.container{
    position: absolute;z-index: 100;
    //background: rgba(255,0,0,.2);
    width: 100%;height: 480px;
    display: flex;flex-direction: column;justify-content: space-between;
    align-items: center;
    padding-top: 30px;
    div.hint{
        text-align: right;
        font-size: 17px;
        width: 380px;
        &:hover{
            text-decoration: underline;
        }
    }
    div.signupMessage{
        margin-top: 100px;
        font-size: 20px;
    }
    div.field{
        position: relative;
        width: 64%;
        div.name{
            font-size: 20px;
            margin-bottom: 13px;
        }
        input{
            display: block;
            width: 100%;
            height: 40px;font-size: 18px;padding: 0 10px;
            background-color: black;
            color: white;
            border-radius: 5px;
            letter-spacing: .5px;
        }
        div.error{
            position: absolute;
            left: 0;top: 80px;
            color: red;
            height: 20px;
        }
    }
}

</style>