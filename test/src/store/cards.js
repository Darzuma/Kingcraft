import {reactive} from "vue";
import unity from './unity'
import game from "./game";
export default reactive([
    // type 0 单位召唤，1 攻击技能，2 辅助技能
    { type:0, level:1, col:0,row:0, heroIndex:0, valid:true, costs:1, name:'Cavalry',
        info:'Recruit 3 heavily armored cavalry, each cavalry has 50 HP and 2 damage.',
        supply:'15',
        cast(){
            return new Promise(resolve => {
                if(unity.instance){
                    unity.instance.SendMessage('UnitManager', 'CreateUnit',JSON.stringify({
                        name:'Knight', amount:3, campIndex: 1, panCamera: true
                    }))
                }
                activeUnits()
                game.currentUnits += 3
                resolve()
            })
        }
    },
    { type:0, level:1, col:0,row:1, heroIndex:0, valid:true, costs:1, name:'Sparta',
        info:'Recruit 12 wielding Spartans, each with 20 HP and 2 damage.',
        supply:'15',
        cast(){
            return new Promise(resolve => {
                if(unity.instance){
                    unity.instance.SendMessage('UnitManager', 'CreateUnit',JSON.stringify({
                        name:'Spearman', amount:9, campIndex: 1, panCamera: true
                    }))
                }
                activeUnits()
                game.currentUnits += 9
                resolve()
            })
        }
    },
    { type:0, level:1, col:0,row:2, heroIndex:1, valid:false, costs:1, name:'Mercenary', requirement:'Level 5 Achilles',

    },
    { type:0, level:1, col:0,row:3, heroIndex:1, valid:false, costs:1, name:'Knight', requirement:'Level 10 Achilles' },
    { type:0, level:1, col:1,row:0, heroIndex:0, valid:false, costs:1, name:'Archer', requirement:'Level 5 Odysseus',      },
    { type:0, level:1, col:1,row:1, heroIndex:0, valid:true, costs:1, name:'Viking warrior',
        info:'Recruit 6 Viking warriors, each Viking warrior has 30 HP and 1 damage.',
        supply:'5',
        cast(){
            return new Promise(resolve => {
                if(unity.instance){
                    unity.instance.SendMessage('UnitManager', 'CreateUnit',JSON.stringify({
                        name:'Viking', amount:5, campIndex: 1, panCamera: true
                    }))
                }
                activeUnits()
                game.currentUnits += 5
                resolve()
            })
        }
    },
    { type:0, level:1, col:1,row:2, heroIndex:1, valid:false, costs:1, name:'Priest',  requirement:'Level 5 Achilles',       },
    { type:0, level:1, col:1,row:3, heroIndex:2, valid:false, costs:1, name:'Red Dragon',   requirement:'Level 5 Apollo',  },
    // 箭雨
    { type:1, level:1, col:2,row:0, valid:true, costs:1, name:'Volley',  castName:'LongBowVolley',
        info:'Shoots a rain of arrows at enemies, deals up to 10 damage in cast area.',
        supply:'15',
        cast(){
            return new Promise(resolve => {
                if(unity.instance){
                    unity.instance.SendMessage('CardManager', 'Cast', 'LongBowVolley')
                }
                resolve()
            })
        }
    },
    // 火雨
    { type:1, level:1, col:2,row:1, valid:true, costs:1, name:'Fire rocks', castName:'HellFire',
        info:'Deal heavy damage to enemies with trebuchets attack, deals up to 30 damage in cast area.',
        supply:'15',
        cast(){
            return new Promise(resolve => {
                if(unity.instance){
                    unity.instance.SendMessage('CardManager', 'Cast', 'HellFire')
                }
                resolve()
            })
        }
    },
    // 急速
    { type:2, level:1, col:2,row:2, valid:true, costs:1, name:'Top speed', castName:'Boost',
        info:'Imbues your warriors with divine power, increasing their movement speed and attack speed for a short time.',
        supply:'10',
        cast(){
            return new Promise(resolve => {
                if(unity.instance){
                    unity.instance.SendMessage('CardManager', 'Cast', 'Boost')
                }
                resolve()
            })
        }
    },
    // 复活
    { type:2, level:1, col:2,row:3, valid:true, costs:1, name:'Revive',castName:'Revive',
        info:'Summons the souls of your fallen warriors, make them stand up and fight again.',
        supply:'10',
        cast(){
            return new Promise(resolve => {
                if(unity.instance){
                    unity.instance.SendMessage('CardManager', 'Cast', 'Revive')
                }
                resolve()
            })
        }
    },
    { type:1, level:1, col:3,row:0, valid:false,costs:1, name:'Blood strike',   },
    { type:1, level:1, col:3,row:1, valid:false,costs:1, name:'Excalibur',      },
    { type:2, level:1, col:3,row:2, valid:false,costs:1, name:'Fire strike',    },
    { type:0, level:1, col:3,row:3, valid:false,costs:5, name:'Fire avalanche', },
    { type:0, level:1, col:4,row:0, costs:3, name:'Purgatory',      },
    { type:1, level:1, col:4,row:1, costs:2, name:'Rain of Fire',   },
    { type:1, level:1, col:4,row:2, costs:2, name:'Fire explosive', },
    { type:1, level:1, col:4,row:3, costs:5, name:'Burn',           },
    { type:1, level:1, col:5,row:0, costs:5, name:'Thunderbolt',    },
    { type:1, level:1, col:5,row:1, costs:5, name:'Wrath of zeus',  },
    { type:2, level:1, col:5,row:2, costs:2, name:'Avatar',         },
    { type:1, level:1, col:5,row:3, costs:5, name:'Soul attack',    },
    { type:0, level:1, col:6,row:0, costs:5, name:'Siren charm',    },
    { type:1, level:1, col:6,row:1, costs:5, name:'Storm',          },
    { type:1, level:1, col:6,row:2, costs:5, name:'Tsunami',        },
    { type:1, level:1, col:6,row:3, costs:5, name:'Frost strike',   },
    { type:1, level:1, col:7,row:0, costs:6, name:'Soul lash' },
    { type:1, level:1, col:7,row:1, costs:6, name:'Soul explosion' },
    { type:1, level:1, col:7,row:2, costs:3, name:'Death and Decay' },
    { type:2, level:1, col:7,row:3, costs:3, name:'The heart of the dead' },
    { type:0, level:1, col:8,row:0, costs:2, name:'Mighty army' },
    { type:2, level:1, col:8,row:1, costs:5, name:'Healing light' },
    { type:1, level:1, col:8,row:2, costs:3, name:'Natural power' },
    { type:1, level:1, col:8,row:3, costs:3, name:'Light of punishment' },
    { type:2, level:1, col:9,row:0, costs:2, name:'Hatred' },
    { type:0, level:1, col:9,row:1, costs:2, name:'Thorns spread' },
    { type:0, level:1, col:9,row:2, costs:3, name:'Spirit of vengeance' },
    { type:0, level:1, col:9,row:3, costs:3, name:'Demon army' },
    { type:1, level:1, col:10,row:0, costs:3, name:'Demons Emblem' },
    { type:1, level:1, col:10,row:1, costs:3, name:'Turn Evil' },
    { type:2, level:1, col:10,row:2, costs:3, name:'Exotic' },
    { type:1, level:1, col:10,row:3, costs:5, name:'Ever disaster' },
])

function activeUnits(){
    let t = setTimeout(()=>{
        if(unity.instance)
            unity.instance.SendMessage('GameManager', 'StartAllUnits')
        clearTimeout(t)
    },1000)
}