import {reactive} from "vue";
let game = reactive({
    currentLevel: null,
    currentState: '', // '' 'success' 'failed'
    currentCard: null, // 点击选择的卡牌
    viewingCard: null, // 当前鼠标 hover 的卡槽

    currentCrystal: 0, // 当前可用水晶数
    currentTroops: 0, // 当前可用部队数
    currentUnits: 1, // 当前场上的友方单位数量, 开局要单位数为1，避免开局就失败，当 currentTroops 少于 20 时再减掉 1
    currentEnemy: 1, // 当前场上的敌方单位数量, 开局要单位数为1，避免开局就胜利，等敌人都召唤结束再把 1 减掉
    mapTypeIndex: 0, // 小地图图片索引 0 草原  1 河边  2 荒漠

    help: false,

    levelName:'Training Ground',
    modeName:'',

    // 游戏声明周期内的代理执行一次就会被移出
    onStart: [], // loading 完成时的 click 触发
    onLose: [], // 战斗关卡失败时触发
    onWin: [],  // 战斗关卡胜利时触发

    onUnitFallen: [],
    onWorldBtnEnter: [],
    onWorldBtnExit: [],
    onWorldBtnDown: [],
    onPlaySound: [],

    onUnitsRevived(num){
        console.log('onUnitsRevived : ' + num)
        this.currentUnits += Number(num)
    },

    commit(name, args){
        if(this[name]){
            this[name].forEach(func =>{
                func(args)
            })
        }
    },
    clearDelegates(){
        console.log('clearDelegates');
        ['onStart', 'onLose', 'onWin', 'onUnitFallen', 'onWorldBtnEnter', 'onWorldBtnExit', 'onWorldBtnDown', 'onPlaySound'].forEach(key=>{
            this[key] = []
        })
    },
})
export default game