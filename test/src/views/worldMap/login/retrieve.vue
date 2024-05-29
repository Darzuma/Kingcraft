<template>
    <div class="container retrieve">
        <div v-if="step === 1">
            <div class="dwa4">Enter the email address when registering.</div>
            <div class="field" style="margin-top: 50px">
                <input type="text" v-model="email">
                <div class="error" v-show="emailWarning">* {{ emailWarning }}</div>
            </div>
            <div class="hint" @click="bus.type = 1" style="margin-bottom: 60px;text-align: left;">
                <div class="text">Back to log in.</div>
            </div>
            <footer>
                <div class="warningMessage" v-if="warningMessage">* {{ warningMessage }}</div>
                <btn class="btnFix" @click="submit">Next</btn>
            </footer>
        </div>
        <div v-if="step === 2">
            <div class="dwa4">Reset password for "{{ username }}"</div>
            <div class="field" style="margin-top: 50px">
                <input type="text" v-model="password">
            </div>
            <div class="field" style="margin-top: 50px">
                <input type="text" v-model="confirmPassword">
                <div class="error" v-show="passwordWarning">* {{ passwordWarning }}</div>
            </div>
            <footer>
                <btn class="btnFix" @click="submit">Next</btn>
            </footer>
        </div>
        <div v-if="step === 3">
            <div class="dwa4" style="margin: 20px 0 50px 0;text-align: center">The password has been reset</div>
            <div class="dwa4" style="margin: 20px 0 50px 0;text-align: center">please log in again.</div>
            <footer>
                <btn class="btnFix" style="margin:0 auto;transform: translateY(50px)" @click="submit">Next</btn>
            </footer>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import md5 from "md5";

export default {
    name: "retrieve",
    data(){
        return {
            step:1,
            username:'',
            password:'',
            passwordWarning: '',
            confirmPassword: '',
            email:'',
            emailWarning: '',
            warningMessage: '',
        }
    },
    methods:{
        submit(){
            if(this.step < 3){
                this.bus.loading = true
                if(this.step === 1)
                    this.$http.post(`/v2/getUsernameByEmail`, { email: this.email })
                        .then(result => {
                            console.log(result.data)
                            switch (result.data){
                                case 'invalid:email':
                                    this.emailWarning = 'The email address does not exists !'
                                    break
                                case 'error:backend':
                                    this.emailWarning = 'We are working hard to fix the website. Please try again later.'
                                    break
                                default:
                                    this.step += 1
                                    let str = ''
                                    for(let i=0; i<result.data.length - 2; i++)
                                        str += '*'
                                    this.username = result.data[0] + str + result.data.substr(-1)
                            }
                            this.bus.loading = false
                        })
                        .catch(err => { console.log(err);this.bus.loading = false })

                if(this.step === 2){
                    if(this.password !== this.confirmPassword){
                        this.passwordWarning = 'Passwords didn’t match. Please retry.'
                    }
                    else{
                        this.$http.post(`/v2/alterPassword`,{ password:md5(this.password), email:this.email })
                            .then(result =>{
                                if(result.data){
                                    this.step += 1
                                    this.$store.user.username = ''
                                    this.$store.user.password = ''
                                    this.$store.user.email = ''
                                    this.$store.user.uid = 0
                                    Cookies.remove('username')
                                    Cookies.remove('password')
                                    localStorage.removeItem('userState')
                                }
                                this.bus.loading = false
                            })
                            .catch(err => { console.log(err);this.bus.loading = false })
                    }

                }
            }
            else{
                this.bus.type = this.step = 1
            }
        }
    },
    props: ['bus']
}
</script>
