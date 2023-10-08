import { reactive } from 'vue'
let maxCampaignLevel = localStorage.getItem('maxCampaignLevel')
    maxCampaignLevel = maxCampaignLevel ? maxCampaignLevel : 1
export default reactive({
    uid: 0,

    username:'',
    password:'',
    email: '',
    vip:0,

    money: 500,
    troops:'120',
    forces: '300',
    rubies: 0,
    zircons: 0,
    mageBoxes: 0,

    rank: 0,
    maxCampaignLevel,

    heroIndex: 0,
    heroLevels:[1, 1, 1, 1, 1, 1, 1, 1, 1],
    slots:[ 0, 1, 5, 8, 9, 10, 11 ],

    showLogin: false,
    showLadder: false,
    showMarket: false,
    showHeroes: false, heroesDialogVM: null,
    showTroops: false,
    showCitadel: false,
    showSetting: false,
    showTaskMap: false,
    showChatroom: false,
    showHandling: false,
})