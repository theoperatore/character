'use strict';

module.exports = {
  preference: {
    // currently not used, but preferences should be for displaying, hiding, 
    // customizing the views... like showing/hiding spell DC
    spellDC : { 
      display: true 
    },
  },
  character: Object.assign({}, {
    "charId": 'test-char-0',
    "charName": 'Ralf McBeardsly',
    "charInfo" : {
      "class" : "Bard",
      "level" : 20,
      "background" : "Wizard?",
      "race" : "Gnome",
      "alignment" : "Chaotic Good",
      "xp" : 999999,
      "deity" : "The Trees",
      "weight": 87,
      "height" : "3'10\"",
      "description" : "whatever crazy time-traveling gnome-wizards look like"
    },
    "charTraits" : {
      "personalityTraits" : "Quirky",
      "ideals" : "Help those in need whatever the cost",
      "bonds" : "The world's needs keep me bound to this plane",
      "flaws" : "Beard not long enough..."
    },

    // each object needs:
    //  id: used to link class charges to feature
    //  charges: number of charges
    //  used: number of used charges
    //  name: display name of charges
    "charClassCharges" : [
      {
        id: 'ralf-class-charge-0',
        charges: 20,
        current: 12,
        name: 'Beard Whips'
      },
      // {
      //   id: 'ralf-class-charge-1',
      //   charges: 1,
      //   current: 1,
      //   name: 'Class Charge Test 1'
      // },
      // {
      //   id: 'ralf-class-charge-2',
      //   charges: 7,
      //   current: 5,
      //   name: 'Class Charge Test 2'
      // },
      // {
      //   id: 'ralf-class-charge-3',
      //   charges: 2,
      //   current: 1,
      //   name: 'Class Charge Test 3'
      // },
      // {
      //   id: 'ralf-class-charge-4',
      //   charges: 2,
      //   current: 2,
      //   name: 'Class Charge Test 4'
      // }
    ],

    "charAttackBubbles": [
      {
        abil : "str",
        prof : false,
        name : "Attack Bonus",
        id: 'ralf-atkBubble-1',
        bonus: 0,
        score: 2
      },
      {
        abil : "cha",
        prof : true,
        name : "+1 Wand of Beard",
        id: 'ralf-atkBubble-3',
        bonus: 1,
        score: 10
      }
    ],
    "charSpellBubbles": [
      {
        abil : "cha",
        prof : false,
        name : "Spell Attack Bonus",
        id: 'ralf-spellBubble-1',
        bonus: 0,
        score: 5,
      }
    ],

    "charSpellSaveDC": {
      abil : "wis",
      prof : true,
      name : "Spell Save DC",
      id: 'spell-save-dc',
      score: 15, // 8 + wis + prof
      base: 8,
      bonus: 0,
    },

    // each spell should be of the form:
    // {
    //   id,
    //   name,
    //   desc,
    //   cast,
    //   range,
    //   cmp,
    //   dur,
    //   prepared
    // }
    "charSpells" : [
      {
        "name" : "Cantrips",
        "slots" : 0,
        "used" : 0,
        "spells" : [
          {
            id: 'ralf-cantrip-0',
            name: "Chill Touch",
            desc: "4d8 necro damage (ranged). Target can't heal until start of my next turn. Undead have DIS on Atk rolls until end of my next turn.",
            cast: "1 action",
            range: "120 ft/ 24 sq",
            cmp: "V,S",
            dur: "Instant",
            prepared: false
          },
          {
            "id": "ralf-cantrip-1",
            "name": "Fire Bolt",
            "desc": "4d10 fire damage (ranged). Ignites non-held/worn flammable items.",
            "cast": "1 action",
            "range": "120 ft/24 sq",
            "dur": "Instant",
            "cmp": "VS",
            "prepared": false
          }
        ]
      },
      {
        "name" : "1st",
        "slots" : 1,
        "used" : 0,
        "spells" : []
      },
      {
        "name" : "2nd",
        "slots" : 5,
        "used" : 0,
        "spells" : [
          {
            "id": 'ralf-spell-level-2-0',
            "name": "Mirror Image",
            "desc": "Makes 3 illusions w/ AC of 10 + [Dex] mod, can use Action to dismiss illusions.  Switch places with an illusion when being attacked, need to roll 6/8/11 or higher to switch w/ an illusion (3/2/1 illusions remaining). An illusion is destroyed when hit by an attack, ignores all other damage/effects.  Spell has no effect on blindsight/truesight creatures.",
            "cast": "1 action",
            "range": "Self",
            "cmp": "V,S",
            "dur": "1 minute",
            "prepared": false
          }
        ]
      },
      {
        "name" : "3rd",
        "slots" : 3,
        "used" : 0,
        "spells" : [
          {
            "id": 'ralf-spell-level-3-0',
            "name": "Fireball",
            "desc": "8d6 fire damage vs Dex save for half dmg. Ignites non-held/worn flammable objects.Fire spreads around corners.",
            "cast": "1 action",
            "range": "150 ft/30 sq, 20 ft/4 sq radius sphere",
            "cmp": "V,S,M (bat guano, sulfur)",
            "dur": "Instant",
            "prepared": true
          },
          {
            "id": 'ralf-spell-level-3-1',
            "name": "Fly",
            "desc": "Fly speed of 60",
            "cast": "Instant",
            "range": "Touch",
            "dur": "10 minutes (concentration)",
            "cmp": "V, S, M (wing feather)",
            "prepared": false
          }
        ]
      },
      {
        "name" : "4th",
        "slots" : 0,
        "used" : 0,
        "spells" : []
      },
      {
        "name" : "5th",
        "slots" : 0,
        "used" : 0,
        "spells" : []
      },
      {
        "name" : "6th",
        "slots" : 0,
        "used" : 0,
        "spells" : []
      },
      {
        "name" : "7th",
        "slots" : 0,
        "used" : 0,
        "spells" : []
      },
      {
        "name" : "8th",
        "slots" : 0,
        "used" : 0,
        "spells" : []
      },
      {
        "name" : "9th",
        "slots" : 1,
        "used" : 0,
        "spells" : [
          {
            id: 'ralf-spell-level-9-0',
            name: 'Beard',
            desc: 'Call upon the mighty Beard gods for any beard-ly good or favor',
            cast: '1 action',
            range: 'self',
            cmp: 'Have a really cool beard equiped',
            dur: 'Instant',
            prepared: true
          }
        ]
      }
    ],
    "charAbilities" : {
      "str" : {
        "score" : 14,
        "mod" : 2
      },
      "dex" : {
        "score" : 20,
        "mod" : 5
      },
      "con" : {
        "score" : 16,
        "mod" : 3
      },
      "int" : {
        "score" : 18,
        "mod" : 4
      },
      "wis" : {
        "score" : 16,
        "mod" : 3
      },
      "cha" : {
        "score" : 20,
        "mod" : 5
      }
    },
    "charSavingThrows" : {
      "str" : {
        "score" : 2,
        "bonus" : 0,
        "proficient" : false,
        "derivatives" : []
      },
      "dex" : {
        "score" : 5,
        "bonus" : 0,
        "proficient" : false,
        "derivatives" : []
      },
      "con" : {
        "score" : 3,
        "bonus" : 0,
        "proficient" : false,
        "derivatives" : []
      },
      "int" : {
        "score" : 8,
        "bonus" : 0,
        "proficient" : true,
        "derivatives" : []
      },
      "wis" : {
        "score" : 3,
        "bonus" : 0,
        "proficient" : false,
        "derivatives" : []
      },
      "cha" : {
        "score" : 9,
        "bonus" : 0,
        "proficient" : true,
        "derivatives" : []
      }
    },
    "charProficiencyBonus" : {
      "score" : 4,
      "derivatives" : []
    },
    "charPassivePerception" : {
      "score" : 13,
      "bonus": 0,
      "base": 10,
      "derivatives" : []
    },
    "charArmorClass" : {
      "score" : 22,
      "derivatives" : []
    },
    "charInitiative" : {
      "score" : 5, // dex mod
      "bonus": 0,
      "derivatives" : []
    },
    "charSpeed" : {
      "score" : '20ft',
      "derivatives" : []
    },
    "charHitPoints" : {
      "current" : 26,
      "maximum" : 26,
      "temporary" : 0,
      "hitDice": [
        'ralf-hit-dice-0',
        'ralf-hit-dice-1',
      ],
      "hitDiceDefinitions": {
        'ralf-hit-dice-0': {
          id: 'ralf-hit-dice-0',
          type: 'd8',
          maximum: 12,
          current: 1,
        },
        'ralf-hit-dice-1': {
          id: 'ralf-hit-dice-1',
          type: 'd6',
          maximum: 8,
          current: 7,
        },
      },
      "deathSaves" : {
        "successes" : 0,
        "failures" : 0
      },
      "derivatives" : []
    },
    "charAttacks" : [
      {
        id: 'attack-1',
        name: 'Beard Attack',
        desc: '2d8 + STR mod for whacking with a prehensile beard'
      },
      {
        id: 'attack-2',
        name: 'Special Attack 2',
        desc: 'A simple testing attack 2'
      },
      {
        id: 'attack-3',
        name: 'Special Attack 3',
        desc: 'A simple testing attack 3'
      },
      {
        id: 'attack-4',
        name: 'Special Attack 4',
        desc: 'A simple testing attack 4'
      },
      {
        id: 'attack-5',
        name: 'Special Attack 5',
        desc: 'A simple testing attack 5'
      }
    ],
    "charEquipment" : {
      "money" : {
        "cp" : 200,
        "sp" : 300,
        "ep" : 400,
        "gp" : 500,
        "pp" : 600
      },
      "containers": [
        {
          id: 'ralf-container-1',
          name: 'Backpack',
          items: [
            'ralf-equipment-3',
            'ralf-equipment-1',
            'ralf-equipment-2',
          ],
          default: true,
        },
        {
          id: 'ralf-container-2',
          name: 'Belt Pouch',
          items: [
            'ralf-equipment-4',
          ],
        },
      ],
      "allItems" : {
        'ralf-equipment-1': {
          name: 'Prehensile Beard',
          desc: 'Can be used to grab onto things and is basically just another hand',
          id: 'ralf-equipment-1',
        },
        'ralf-equipment-2': {
          name: 'Lute',
          desc: 'For the most awesomest of beard-ly songs',
          id: 'ralf-equipment-2',
        },
        'ralf-equipment-3': {
          name: 'Wand of Fiery Poops',
          desc: 'For exactly that.',
          id: 'ralf-equipment-3',
        },
        'ralf-equipment-4': {
          name: 'Yoshi Doll',
          desc: 'Won from a crane game',
          id: 'ralf-equipment-4'
        },
      }
    },
    "charOtherProficiencies" : {
      "languages" : [
        {
          name: 'Common',
          desc: 'Everyone knows common...',
          id: 'ralf-language-1'
        },
        {
          name: 'Gnomish',
          desc: 'Cause I\'m a gnome!',
          id: 'ralf-language-2'
        },
        {
          name: 'The Universe',
          desc: 'Can talk to the universe becase I be that cool...',
          id: 'ralf-language-3'
        }
      ],
      "proficiencies" : [
        {
          name: 'Walking',
          desc: 'Really good at walking in a straight line',
          id: 'ralf-proficiency-1'
        }
      ]
    },
    "charResistances" : [
      {
        name: 'Resistance 1',
        desc: 'A simple resistance 1',
        id: 'res1'
      },
      {
        name: 'Resistance 2',
        desc: 'A simple resistance 2',
        id: 'res2'
      },
      {
        name: 'Resistance 3',
        desc: 'A simple resistance 3',
        id: 'res3'
      },
      {
        name: 'Resistance 4',
        desc: 'A simple resistance 4',
        id: 'res4'
      },
      {
        name: 'Resistance 5',
        desc: 'A simple resistance 5',
        id: 'res5'
      },
      {
        name: 'Resistance 6',
        desc: 'A simple resistance 6',
        id: 'res6'
      }
    ],
    "charSkills" : [
      {
        "mod" : "dex",
        "trained" : false,
        "bonus" : 0,
        "score" : 5,
        "name" : "Acrobatics",
        "derivatives" : []
      },
      {
        "mod" : "wis",
        "trained" : false,
        "bonus" : 0,
        "score" : 3,
        "name" : "Animal Handling",
        "derivatives" : []
      },
      {
        "mod" : "int",
        "trained" : true,
        "bonus" : 0,
        "score" : 8,
        "name" : "Arcana",
        "derivatives" : []
      },
      {
        "mod" : "str",
        "trained" : false,
        "bonus" : 0,
        "score" : 2,
        "name" : "Athletics",
        "derivatives" : []
      },
      {
        "mod" : "cha",
        "trained" : false,
        "bonus" : 0,
        "score" : 5,
        "name" : "Deception",
        "derivatives" : []
      },
      {
        "mod" : "int",
        "trained" : true,
        "bonus" : 0,
        "score" : 8,
        "name" : "History",
        "derivatives" : []
      },
      {
        "mod" : "wis",
        "trained" : false,
        "bonus" : 0,
        "score" : 3,
        "name" : "Insight",
        "derivatives" : []
      },
      {
        "mod" : "cha",
        "trained" : false,
        "bonus" : 0,
        "score" : 5,
        "name" : "Intimidation",
        "derivatives" : []
      },
      {
        "mod" : "int",
        "trained" : false,
        "bonus" : 0,
        "score" : 4,
        "name" : "Investigation",
        "derivatives" : []
      },
      {
        "mod" : "wis",
        "trained" : false,
        "bonus" : 0,
        "score" : 3,
        "name" : "Medicine",
        "derivatives" : []
      },
      {
        "mod" : "int",
        "trained" : true,
        "bonus" : 0,
        "score" : 8,
        "name" : "Nature",
        "derivatives" : []
      },
      {
        "mod" : "wis",
        "trained" : false,
        "bonus" : 0,
        "score" : 3,
        "name" : "Perception",
        "derivatives" : []
      },
      {
        "mod" : "cha",
        "trained" : false,
        "bonus" : 0,
        "score" : 5,
        "name" : "Performance",
        "derivatives" : []
      },
      {
        "mod" : "cha",
        "trained" : true,
        "bonus" : 0,
        "score" : 9,
        "name" : "Persuasion",
        "derivatives" : []
      },
      {
        "mod" : "int",
        "trained" : true,
        "bonus" : 0,
        "score" : 8,
        "name" : "Religion",
        "derivatives" : []
      },
      {
        "mod" : "dex",
        "trained" : false,
        "bonus" : 0,
        "score" : 5,
        "name" : "Sleight of Hand",
        "derivatives" : []
      },
      {
        "mod" : "dex",
        "trained" : false,
        "bonus" : 0,
        "score" : 5,
        "name" : "Stealth",
        "derivatives" : []
      },
      {
        "mod" : "wis",
        "trained" : false,
        "bonus" : 0,
        "score" : 3,
        "name" : "Survival",
        "derivatives" : []
      }
    ],

    // each object needs:
    //  name: display name of feature
    //  desc: a description
    //  cid: classCharge Id (only if gives charges)
    //  type: glyph type to show next to name; PASSIVE, ATTACK, SPELL
    //  id: some identifier for this feature
    "charFeatures" : [
      {
        name: 'Crazy Wise Gnome',
        desc: 'Am I crazy? Or am I wise? That\'s up to you to find out and for me to know forever.',
        type: 'PASSIVE',
        id: 'ralf-feature-1'
      },
      {
        name: 'Conjure Wand',
        desc: 'The ability to produce a wand of fiery poops from Beard.',
        type: 'SPELL',
        id: 'ralf-feature-2'
      },
      {
        name: 'Cane Thwak!',
        desc: 'Produce a cane from Beard and use it to THWAK something',
        type: 'ATTACK',
        id: 'ralf-feature-3'
      },
      {
        name: 'Beard Shield',
        desc: '+2 to AC because a Beard that is prehensile can help stop any sort of attack.',
        type: 'DEFENSE',
        id: 'ralf-feature-4'
      },
      {
        name: 'Prehensile Beard',
        desc: 'Gains ability to grab things with beard. Also allows to use Beard Whips class charges. Number of Charges = character level',
        type: 'ATTACK',
        id: 'ralf-feature-5',
        classChargesId: 'ralf-class-charge-0'
      }
    ]
  })
}