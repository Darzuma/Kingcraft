import { ref, reactive } from 'vue'
export let progress = ref(0) // 载入进度，只要载入进度小于1就显示载入画面
export let clickToStart = ref(true) // 载入100%后是否停留在载入画面
export let setting = reactive({
    valid: false,
    graphicLevel:2,
    volume:.8,
    language:'English'
})
export let user = reactive({
    username: '',
    password: '',
    email: '',
    phone: '',
    money: 1000,
    rubies: 10,
    zircons: 100,
    mageBoxes: '10',
    tasks: '2',
    treasures: '2',
    level: 7,
    heroIndex: 0,
    playedTimes: 0,
    ladderRanking: 0,
    slots:[ 0, 1, 5, 8, 9, 10, 11 ],
    bakSlots:[0, 1, 5, 8, 9, 10, 11],
    showLogin: false,
})

export let message = reactive({
    value:'',
    valid: false
})
import heroes from './heroes'
export {heroes}

import cards from './cards'
cards.forEach((card, index) => {
    card.id = index
})
export { cards }

import game from './game'
export { game }