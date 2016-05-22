'use strict';

let depConfig = {
  charAbilities: [
    'charProficiencyBonus',
    'charAttackBubbles',
    'charSpellBubbles',
    'charSpellSaveDC',
    'charInitiative',
    'charSavingThrows',
    'charSkills',
  ],
  charProficiencyBonus: [
    'charAttackBubbles',
    'charSpellBubbles',
    'charSpellSaveDC',
    'charSavingThrows',
    'charSkills',
  ],
  charSkills: [
    'charPassivePerception',
  ]
}

let reducers = {
  charAbilities(state, action) {},
  charProficiencyBonus(state, action) {},
  charSkills(state, action) {},
  charAttackBubbles(state, action) {},
  charSpellBubbles(state, action) {},
  charSpellSaveDC(state, action) {},
  charInitiative(state, action) {},
  charSavingThrows(state, action) {},
  charPassivePerception(state, action) {},
}

export function createGraph(tree, reducers) {

  let cachedReducers = {};

  function update(attribute, state, action) {
    let deps = [...tree[attribute]];

    let seenAttributes = { [`${attribute}`]: true };
    let attributeReducers = [reducers[attribute]];

    if (attribute in cachedReducers) {
      return cachedReducers[attribute].reduce((currentState, reducer) => {
        return reducer(currentState, action);
      }, state);
    }


    for (let i = 0; i < deps.length; i++) {
      let dep = deps[i];

      if (!seenAttributes[dep]) {
        seenAttributes[dep] = true;
        attributeReducers.push(reducers[dep]);
      }

      // instead of concatting all deps, find only new deps and push those?
      if (tree[dep]) {
        //deps = deps.concat(tree[dep]);
        deps = [
          ...deps.slice(0, i),
          ...tree[dep],
          ...deps.slice(i + 1);
        ]
      }
    }

    cachedReducers[attribute] = attributeReducers;

    return attributeReducers.reduce((currentState, reducer) => {
      return reducer(currentState, action);
    }, state);
  }

  return {
    update,
  }
}