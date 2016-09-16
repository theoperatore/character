'use strict';

const adjectives = [
  'Argent',
  'Luctrative',
  'Ancient',
  'Aged',
  'Mean',
  'Angry',
  'Candid',
  'Far-flung',
  'Icky',
  'Jaunty',
  'Massive',
  'Plain',
  'Ragged',
  'Testy',
  'Uneven',
  'Velvety',
  'Zany',
  'Zealous',
  'Wrathful',
  'Spicy',
  'Slimy',
  'Saucy',
  'Sneaky',
];

const nouns = [
  'Octopus',
  'Elbow',
  'Slime',
  'Beard',
  'Mouse',
  'Ocelot',
  'Marten',
  'Eagle',
  'Cat',
  'Dog',
  'Dolphin',
  'Snake',
];

export function generateRandomName() {
  let adj = Math.round(Math.random() * (adjectives.length - 1));
  let noun = Math.round(Math.random() * (nouns.length - 1));

  return `${adjectives[adj]} ${nouns[noun]}`;
}