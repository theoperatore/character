'use strict';

module.exports = {
  preference: {
    atkBubbles : [
      {
        abil : "str",
        prof : false,
        desc : "Attack Bonus",
        id: 'ralf-atkBubble-1'
      }
    ],
    spellBubbles : [
      {
        abil : "wis",
        prof : false,
        desc : "Spell Attack Bonus",
        id: 'ralf-spellBubble-1'
      }
    ],
    spellDC : {
      abil : "wis",
      prof : true,
      desc : "Spell Save DC"
    }
  },
  character: Object.assign({}, {
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
    "charClassCharges" : [],
    "charSpells" : [
      {
        "name" : "Cantrips",
        "slots" : 0,
        "used" : 0,
        "spells" : []
      },
      {
        "name" : "1st",
        "slots" : 0,
        "used" : 0,
        "spells" : []
      },
      {
        "name" : "2nd",
        "slots" : 0,
        "used" : 0,
        "spells" : []
      },
      {
        "name" : "3rd",
        "slots" : 0,
        "used" : 0,
        "spells" : []
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
        "slots" : 0,
        "used" : 0,
        "spells" : []
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
      "derivatives" : []
    },
    "charArmorClass" : {
      "score" : 22,
      "derivatives" : []
    },
    "charInitiative" : {
      "score" : 5,
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
      "hitDiceType" : "d8",
      "hitDiceMaximum": 20,
      "hitDiceCurrent" : 20,
      "deathSaves" : {
        "successes" : 0,
        "failures" : 0
      },
      "derivatives" : []
    },
    "charAttacks" : [],
    "charEquipment" : {
      "money" : {
        "cp" : 200,
        "sp" : 300,
        "ep" : 400,
        "gp" : 500,
        "pp" : 600
      },
      "items" : [
        {
          name: 'Prehensile Beard',
          desc: 'Can be used to grab onto things and is basically just another hand',
          id: 'ralf-equipment-1'
        }
      ]
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
    ]
  })
}