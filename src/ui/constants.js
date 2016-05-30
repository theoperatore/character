'use strict';

export const AbilityScores = {
  'str': {
    display: 'Strength',
    short: 'str'
  },
  'dex': {
    display: 'Dexterity',
    short: 'dex'
  },
  'con': {
    display: 'Constitution',
    short: 'con'
  },
  'wis': {
    display: 'Wisdom',
    short: 'wis'
  },
  'int': {
    display: 'Intelligence',
    short: 'int'
  },
  'cha': {
    display: 'Charisma',
    short: 'cha'
  }
}

export const dieTypes = [
  { display: 'd3', numberValue: 3, stringValue: 'd3' },
  { display: 'd4', numberValue: 4, stringValue: 'd4' },
  { display: 'd5', numberValue: 5, stringValue: 'd5' },
  { display: 'd6', numberValue: 6, stringValue: 'd6' },
  { display: 'd8', numberValue: 8, stringValue: 'd8' },
  { display: 'd10', numberValue: 10, stringValue: 'd10' },
  { display: 'd12', numberValue: 12, stringValue: 'd12' },
  { display: 'd16', numberValue: 16, stringValue: 'd16' },
  { display: 'd20', numberValue: 20, stringValue: 'd20' },
  { display: 'd24', numberValue: 24, stringValue: 'd24' },
  { display: 'd100', numberValue: 100, stringValue: 'd100' },
];

export const dieTypeToInt = {
  'd3': 3,
  'd4': 4,
  'd5': 5,
  'd6': 6,
  'd8': 8,
  'd10': 10,
  'd12': 12,
  'd16': 16,
  'd20': 20,
  'd24': 24,
  'd100': 100,
}