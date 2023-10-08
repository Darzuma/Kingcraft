<template>
    <div class="container retrieve" v-if="type === 3">
        <div>Please enter the email address you used when registering.</div>
        <div class="field">
            <div class="name">Email</div>
            <input type="text" v-model="email">
            <div class="error" v-show="emailWarning">* {{ emailWarning }}</div>
        </div>
        <footer>
            <div class="warningMessage">{{ warningMessage }}</div>
            <btn class="btnFix" @click="submit">Submit</btn>
        </footer>
    </div>
</template>

<script>
export default {
    name: "retrieve",
    data(){
        return {
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
    methods:{
        submit(){

        }
    }
}
</script>

<style scoped>

</style>