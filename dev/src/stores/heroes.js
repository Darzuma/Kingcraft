import {reactive} from "vue";

export default reactive([
    {
        name:'Odysseus',
        level:1,
        valid: true, price: 200,
        info:'A legendary human warrior, a brave and powerful Greek leader.',
        features:[
            {
                name: "Legend of courage",
                detail: "Units conscripted by Odysseus will gain extra health",
            },
            {
                name: "Fight with brave",
                detail: "Every time Odysseus release a card, all battling units' attack power will be increased",
            },
            {
                name: "Forever the leader",
                detail: "Card released by Odysseus can recall seduced units within cast area",
            },
        ],
    },
    {
        name:'Achilles',
        level:1,
        valid: false, price: 2000,
        info:'Legend warrior of the army of Agamemnon, born with strength to resist all.',
        features:[
            {
                name: "Invulnerable",
                detail: "Units recruited by Achilles will be invulnerable before they deal any damage",
            },
            {
                name: "Eternal morale",
                detail: "Achilles gains a power crystal on enemy unit down",
            },
            {
                name: "Blood imprinting",
                detail: "Achilles' unit will restore it's health after killing an enemy",
            },
        ]
    },
    {
        name:'Apollo',
        level:1,
        valid: false, price: 2000,
        info:'The vibrant fearless leader of Troy, no one were able to escape from his endless power.',
        features:[
            {
                name: "Trembling light",
                detail: "Every time Apollo release a card, enemy units' within cast area will be blind until get hit",
            },
            {
                name: "Flaming hell",
                detail: "All fire cards have increased damage effects",
            },
            {
                name: "Raging heat",
                detail: "When Apollo's unit is down, it deals damage to nearby enemies",
            },
        ]
    },
    {
        name:'Zeus',
        level:1,
        valid: false, price: 2000,
        info:'The ruler of the Titans, who put dominion over his foes and kindness to his allies.',
        features:[
            {
                name: "Thunder and lightning",
                detail: "Every time Zeus release a card, a lightning will deal damage to random enemies",
            },
            {
                name: "Power incentive",
                detail: "Allied units gain the health of enemies they knock down",
            },
            {
                name: "Power withdraw",
                detail: "Whenever the enemy releases a card, Zeus will get the same card",
            },
        ]
    },
    {
        name:'Poseidon',
        level:1,
        valid: false, price: 2000,
        info:'The absolute lord of the Aegean Sea, his sirens can bewitch people, and his wrath can flood the world.',
        features:[
            {
                name: "Kraken",
                detail: "Every time Poseidon release a card, an additional Kraken will be summon to fight",
            },
            {
                name: "Bewitched",
                detail: "Kraken's attack has a chance to make the enemy surrender",
            },
            {
                name: "Undead",
                detail: "Poseidon's units take 50% less fire damage",
            },
        ]
    },
    {
        name:'Hades',
        level:1,
        valid: false, price: 2000,
        info: 'The dark lord of the undead, souls will tremble and decay beneath his feet.',
        features:[
            {
                name: "Soul drainer",
                detail: "Every time Hades releases a card, Hades will steal the equal number of power crystals from opposing hero",
            },
            {
                name: "Soul burst",
                detail: "When an enemy fall down, nearby allies' attack power and health will be increased",
            },
            {
                name: "Fire immunity",
                detail: "When Hades' unit is down, it will turn into undead and continue to fight",
            },
        ]
    },
    {
        name:'Athena',
        level:1,
        valid: false, price: 2000,
        info:'The guardian of mankind, endowing people with wisdom and courage.',
        features:[
            {
                name: "Light of hope",
                detail: "Athena's healing cards are twice as effective",
            },
            {
                name: "Light of faith",
                detail: "Athena's attack cards deal double damage",
            },
            {
                name: "Light of courage",
                detail: "Athena's unit card can be used three times in one row",
            },
        ]
    },
    {
        name:'Hera',
        level:1,
        valid: false, price: 2000,
        info:'The queen of living life, the commander of air and lightening.',
        features:[
            {
                name: "Turbulent blast",
                detail: "Hera's units take less fire damage and have increased attack speed when struck by fire",
            },
            {
                name: "Hurricane raider",
                detail: "Units take less physical damage and increase attack speed when receiving physical attacks",
            },
            {
                name: "Thunder guardian",
                detail: "Hera's units take less lightning damage and have increased attack speed when struck by lightning",
            },
        ]
    },
    {
        name:'Artemis',
        level:1,
        valid: false, price: 2000,
        info:'The patron saint of life, nature obeys her law, and human beings follow her will.',
        features:[
            {
                name: "Dryad",
                detail: "When Artemis' unit is down, it will turn into dryad and continue to fight",
            },
            {
                name: "Protected by nature",
                detail: "Every time Artemis releases a card, dryads within cast area will be strengthened",
            },
            {
                name: "Nature's call",
                detail: "Every five dryads will merge with each other and evolve into a forest giant",
            },
        ]
    },
])