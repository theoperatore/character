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
      "class" : "McBeardsly",
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
        "score" : 0,
        "mod" : 0
      },
      "dex" : {
        "score" : 0,
        "mod" : 0
      },
      "con" : {
        "score" : 0,
        "mod" : 0
      },
      "int" : {
        "score" : 0,
        "mod" : 0
      },
      "wis" : {
        "score" : 0,
        "mod" : 0
      },
      "cha" : {
        "score" : 0,
        "mod" : 0
      }
    },
    "charSavingThrows" : {
      "str" : {
        "score" : 0,
        "bonus" : 0,
        "proficient" : false,
        "derivatives" : []
      },
      "dex" : {
        "score" : 0,
        "bonus" : 0,
        "proficient" : false,
        "derivatives" : []
      },
      "con" : {
        "score" : 0,
        "bonus" : 0,
        "proficient" : false,
        "derivatives" : []
      },
      "int" : {
        "score" : 0,
        "bonus" : 0,
        "proficient" : false,
        "derivatives" : []
      },
      "wis" : {
        "score" : 0,
        "bonus" : 0,
        "proficient" : false,
        "derivatives" : []
      },
      "cha" : {
        "score" : 0,
        "bonus" : 0,
        "proficient" : false,
        "derivatives" : []
      }
    },
    "charProficiencyBonus" : {
      "score" : 0,
      "derivatives" : []
    },
    "charPassivePerception" : {
      "score" : 0,
      "bonus": 0,
      "derivatives" : []
    },
    "charArmorClass" : {
      "score" : 0,
      "derivatives" : []
    },
    "charInitiative" : {
      "score" : 0,
      "derivatives" : []
    },
    "charSpeed" : {
      "score" : "0",
      "derivatives" : []
    },
    "charHitPoints" : {
      "current" : 0,
      "maximum" : 0,
      "temporary" : 0,
      "hitDiceTotal" : "0",
      "hitDiceCurrent" : 1,
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
        "pp" : 6000
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
    "charResistances" : [],
    "charSkills" : [
      {
        "mod" : "dex",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Acrobatics",
        "derivatives" : []
      },
      {
        "mod" : "wis",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Animal Handling",
        "derivatives" : []
      },
      {
        "mod" : "int",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Arcana",
        "derivatives" : []
      },
      {
        "mod" : "str",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Athletics",
        "derivatives" : []
      },
      {
        "mod" : "cha",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Deception",
        "derivatives" : []
      },
      {
        "mod" : "int",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "History",
        "derivatives" : []
      },
      {
        "mod" : "wis",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Insight",
        "derivatives" : []
      },
      {
        "mod" : "cha",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Intimidation",
        "derivatives" : []
      },
      {
        "mod" : "int",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Investigation",
        "derivatives" : []
      },
      {
        "mod" : "wis",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Medicine",
        "derivatives" : []
      },
      {
        "mod" : "int",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Nature",
        "derivatives" : []
      },
      {
        "mod" : "wis",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Perception",
        "derivatives" : []
      },
      {
        "mod" : "cha",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Performance",
        "derivatives" : []
      },
      {
        "mod" : "cha",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Persuasion",
        "derivatives" : []
      },
      {
        "mod" : "int",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Religion",
        "derivatives" : []
      },
      {
        "mod" : "dex",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Sleight of Hand",
        "derivatives" : []
      },
      {
        "mod" : "dex",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
        "name" : "Stealth",
        "derivatives" : []
      },
      {
        "mod" : "wis",
        "trained" : false,
        "bonus" : 0,
        "score" : 0,
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
      }
    ]
  })
}