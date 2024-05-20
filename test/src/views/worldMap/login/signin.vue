<template>
    <div class="container signin" >
        <div class="field">
            <div class="name">Username</div>
            <input type="text" v-model="username" @change="usernameWarning=''">
            <div class="error" v-show="usernameWarning">* {{ usernameWarning }}</div>
        </div>
        <div class="field">
            <div class="name">Password</div>
            <input type="text" v-model="password" @change="passwordWarning=''">
            <div class="error" v-show="passwordWarning">* {{ passwordWarning }}</div>
        </div>
        <div class="hint"  style="margin-bottom: 60px">
            <div class="text" @click="bus.type = 3">
                Forget your password?
            </div>
        </div>
        <div class="hint" style="margin-bottom: 90px">
            <div class="text" @click="bus.type = 2">
                Sign up a new account.
            </div>
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
            let { money, troops, forces, rubies, zircons, mageBoxes, rank, maxCampaignLevel} = this.$store.user
            let data = {
                username: this.username,
                password: md5(this.password),
                state: {
                    money, troops, forces, rubies, zircons, mageBoxes, rank, maxCampaignLevel
                }
            }
            this.bus.loading = true
            this.$http.post('/kingcraft/signIn', data)
                .then(result => {
                    if(result.data === 'invalid:username'){
                        this.usernameWarning = 'Username doest not exits.'
                    }else if(result.data === 'invalid:password'){
                        this.passwordWarning = 'Password is incorrect.'
                    }
                    else{
                        this.$store.user.username = result.data.username
                        this.$store.user.password = result.data.password
                        this.$store.user.email = result.data.email
                        this.$store.user.uid = data.uid = result.data.uid
                        Cookies.set('username', data.username,{ expires:30 })
                        Cookies.set('password', data.password,{ expires:30 })
                        localStorage.setItem('userState', JSON.stringify(data))
                        this.$store.user.showLogin = false
                        this.$message.value = 'Archon "' + result.data.username + '" has has logged in.'
                        this.$message.valid = true
                        let t = setTimeout(()=>{
                            this.$message.valid = false
                            this.$message.value = ''
                            clearTimeout(t)
                        }, 2000)
                    }
                    this.bus.loading = false
                })
                .catch(err => { console.log(err);this.bus.loading = false })
        }
    },
    props: ['bus']
}
</script>

<style scoped>

</style>