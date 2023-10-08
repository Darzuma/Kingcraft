import { reactive } from 'vue'
export let setting = reactive({
    valid: false,
    graphicLevel:2,
    volume:.8,
    language:'English'
})

export let message = reactive({
    value:'',
    valid: false
})
import heroes from './heroes'

import cards from './cards'
cards.forEach((card, index) => {
    card.id = index
})
export { cards }

import loading from "./loading";
import trainer from "./trainer";
import unity from './unity'
import order from './order'
import agent from './agent'
import user from './user'
import game from './game'

export default {
    install: function (app, config){
        app.config.globalProperties.$store = {
            setting,
            loading,
            trainer,
            heroes,
            unity,
            order,
            agent,
            cards,
            user,
            game
        }
    }
}