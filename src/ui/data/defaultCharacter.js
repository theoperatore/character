export default {
  "charName" : "",
  "charInfo" : {
    "class" : "",
    "level" : 1,
    "background" : "",
    "race" : "",
    "alignment" : "",
    "xp" : 0,
    "deity" : "",
    "weight": 0,
    "height" : "",
    "description" : ""
  },
  "charTraits" : {
    "personalityTraits" : "",
    "ideals" : "",
    "bonds" : "",
    "flaws" : ""
  },

  "charSpellSaveDC": {
    abil : "wis",
    prof : true,
    name : "Spell Save DC",
    id: 'spell-save-dc',
    score: 8, // 8 + ABIL_MOD + PROF
    base: 8,
    bonus: 0,
  },

  "charAttackBubbles": [],
  "charSpellBubbles": [],

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
    "base": 10,
    "derivatives" : []
  },
  "charArmorClass" : {
    "score" : 0,
    "derivatives" : []
  },
  "charInitiative" : {
    "score" : 0,
    "bonus": 0,
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
    "hitDiceType" : "d4",
    "hitDiceMaximum": 0,
    "hitDiceCurrent" : 0,
    "deathSaves" : {
      "successes" : 0,
      "failures" : 0
    },
    "derivatives" : []
  },
  "charAttacks" : [],
  "charEquipment" : {
    "money" : {
      "cp" : 0,
      "sp" : 0,
      "ep" : 0,
      "gp" : 0,
      "pp" : 0
    },
    "items" : []
  },
  "charOtherProficiencies" : {
    "languages" : [],
    "proficiencies" : []
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
  //  type: glyph type to show next to name
  "charFeatures" : []
};
