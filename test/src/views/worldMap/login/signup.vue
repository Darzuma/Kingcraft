<template>
    <div class="container signup">
        <div class="field">
            <div class="name">Username</div>
            <input type="text" v-model="username" @change="usernameWarning = ''">
            <div class="error" v-show="usernameWarning">* {{ usernameWarning }}</div>
        </div>
        <div class="field">
            <div class="name">Password</div>
            <input type="text" v-model="password" @change="passwordWarning = ''">
            <div class="error" v-show="passwordWarning">* {{ passwordWarning }}</div>
        </div>
        <div class="field">
            <div class="name">Email</div>
            <input type="text" v-model="email" @change="emailWarning = ''">
            <div class="error" v-show="emailWarning">* {{ emailWarning }}</div>
        </div>
        <div class="hint" @click="bus.type = 1" style="margin-bottom: 50px">
            Already have an account? login here.
        </div>
        <footer>
            <div class="warningMessage">{{ warningMessage }}</div>
            <btn class="btnFix" @click="submit">Join KingCraft</btn>
        </footer>
    </div>
</template>

<script>
import md5 from "md5";
import Cookies from 'js-cookie'
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
            let { money, troops, forces, rubies, zircons, mageBoxes, rank, maxCampaignLevel} = this.$store.user
            let data = {
                username: this.username,
                password: md5(this.password),
                email: this.email,
                state: {
                    money, troops, forces, rubies, zircons, mageBoxes, rank, maxCampaignLevel
                }
            }
            this.bus.loading = true
            this.$http.post('/kingcraft/signup',data).then(result => {
                if(result.data === 'success'){
                    Cookies.set('username', data.username,{ expires:30 })
                    Cookies.set('password', data.password,{ expires:30 })
                    localStorage.setItem('userState', JSON.stringify(data))
                    this.$store.user.username = data.username
                    this.$store.user.email = data.email
                    this.$store.user.showLogin = false
                }
                else if(result.data === 'invalid:username'){
                    this.usernameWarning = 'Username already exists. Please try another one.'
                }
                else if(result.data === 'invalid:email'){
                    this.emailWarning = 'The email has been registered.  Please try another one.'
                }
                this.bus.loading = false
            }).catch(err=>{ console.log(err);this.bus.loading = false })
        },
    },
    props: ['bus']
}
</script>

<style scoped>

</style>