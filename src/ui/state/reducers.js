'use strict';

import { fromJS, Map } from 'immutable';

import defaultCharacter from '../data/defaultCharacter';
import defaultPreferences from '../data/defaultPreferences';

const DEFAULT_CHARACTER = fromJS(defaultCharacter);
const DEFAULT_PREFERENCES = fromJS(defaultPreferences);

export function character(state = DEFAULT_CHARACTER, action) {
  switch (action.type) {

    // charInfo
    case 'BASIC_INFO_EDIT':
      return state
        .update('charInfo', charInfo => {
          return charInfo.merge(action.data);
        })
        .update('charHitPoints', charHitPoints => {
          return charHitPoints
            .set('charHitDiceMaximum', action.data.level)
            .set('charHitDiceCurrent', action.data.level);
        });

    // charTraits
    case 'TRAIT_EDIT':
      return state.update('charTraits', charTraits => {
        return charTraits.set(action.data.id, action.data.desc);
      });

    // charOtherProficiencies
    case 'PROFICIENCY_EDIT':
      return state.updateIn(['charOtherProficiencies', 'proficiencies'], proficiencies => {
        let idx = proficinecies.findIndex(prof => prof.get('id') === action.data.id);
        return proficiencies.update(idx, prof => prof.merge(action.data));
      });

    case 'PROFICIENCY_DELETE':
      return state.updateIn(['charOtherProficiencies', 'proficiencies'], proficiencies => {
        return proficiencies.filter(prof => prof.get('id') !== action.data.id);
      });

    case 'PROFICIENCY_CREATE':
      return state.updateIn(['charOtherProficiencies', 'proficiencies'], proficiencies => {
        return proficiencies.push(Map(action.data));
      });

    case 'LANGUAGE_EDIT':
      return state.updateIn(['charOtherProficiencies', 'languages'], languages => {
        let idx = languages.findINdx(lang => lang.get('id') === action.data.id);
        return languages.update(idx, lang => lang.merge(action.data));
      });
      
    case 'LANGUAGE_DELETE':
      return state.updateIn(['charOtherProficiencies', 'languages'], languages => {
        return languages.filter(lang => lang.get('id') !== action.data.id);
      });

    case 'LANGUAGE_CREATE':
      return state.updateIn(['charOtherProficiencies', 'languages'], languages => {
        return languages.push(Map(action.data));
      });

    // features
    case 'FEATURE_CREATE':
      let createsClassCharge = !!action.data.classCharge;

      let partialStateFeat = state.update('charFeatures', charFeatures => {
        return charFeatures.push(Map(action.data.feature));
      });

      return createsClassCharge
        ? partialStateFeat.update('charClassCharges', charClassCharges => {
            return charClassCharges.push(Map(action.data.classCharge));
          })
        : partialStateFeat

    case 'FEATURE_EDIT':
      let createClassCharge = action.data.isNewClassCharge;
      let removeClassCharge = action.data.feature.classChargesId && !action.data.classCharge;
      let editClassCharge = action.data.feature.classChargesId && action.data.classCharge;

      let partialStateFeatEdit = state.update('charFeatures', charFeatures => {
        let idx = charFeatures.findIndex(feat => feat.get('id') === action.data.feature.id);
        return charFeatures.update(idx, feature => {
          if (removeClassCharge) {
            return feature.merge(action.data.feature).delete('classChargesId');
          }

          return feature.merge(action.data.feature);
        });
      });

      return createClassCharge || removeClassCharge || editClassCharge
        ? partialStateFeatEdit.update('charClassCharges', charClassCharges => {
            if (action.data.isNewClassCharge) {
              return charClassCharges.push(Map(action.data.classCharge));
            }

            if (action.data.feature.classChargesId && !action.data.classCharge) {
              return charClassCharges.filter(charge => charge.get('id') !== action.data.feature.classChargesId);
            }

            let idx = charClassCharges.findIndex(charge => charge.get('id') === action.data.classCharge.id);
            return charClassCharges.update(idx, charge => charge.merge(action.data.classCharge));

          })
        : partialStateFeatEdit;

      
    case 'FEATURE_DELETE':
      let hasClassCharge = !!action.data.classChargesId;
      let partialStateFeatDelete = state.update('charFeatures', charFeatures => {
        return charFeatures.filter(feat => feat.get('id') !== action.data.id);
      });

      return hasClassCharge
        ? partialStateFeatDelete.update('charClassCharges', charClassCharges => {
            return charClassCharges.filter(charge => charge.get('id') !== action.data.classChargesId);
          })
        : partialStateFeatDelete;

    // ability
    case 'SKILL_EDIT':
      let partialSkillState = state.update('charSkills', charSkills => {
        let idx = charSkills.findIndex(skill => skill.get('name') === action.data.name);
        return charSkills.update(idx, skill => {
          let newScore = skill.get('bonus') + state.getIn(['charAbilities', skill.get('mod'), 'mod']);

          newScore += action.data.trained 
            ? state.getIn(['charProficiencyBonus', 'score'])
            : 0;

          return skill.set('trained', action.data.trained).set('score', newScore);
        })
      });

      return partialSkillState
        .update('charPassivePerception', charPassivePerception => {
          let perceptionSkill = partialSkillState.get('charSkills').find(itm => itm.get('name') === 'Perception');
          let newScore = charPassivePerception.get('bonus') + perceptionSkill.get('score') + charPassivePerception.get('base');
          return charPassivePerception.set('score', newScore);
        });

    case 'ABILITY_SCORE_EDIT':
      let abilityScoreKeys = Object.keys(action.data).filter(key => key !== 'proficiency');
      let abilityScoreMods = abilityScoreKeys.reduce((obj, key) => {
        obj[key] = Math.floor((action.data[key] - 10) / 2);
        return obj;
      }, {});

      let partialState = state
        .update('charAbilities', charAbilities => {
          return abilityScoreKeys
            .reduce((outAbil, abilKey) => {
              return outAbil
                .setIn([abilKey, 'score'], action.data[abilKey])
                .setIn([abilKey, 'mod'], abilityScoreMods[abilKey]);
            }, charAbilities);
        })
        .update('charProficiencyBonus', charProficiencyBonus => {
          return charProficiencyBonus.set('score', action.data.proficiency);
        })
        .update('charAttackBubbles', charAttackBubbles => {
          return charAttackBubbles.map(bubble => {
            let newScore = abilityScoreMods[bubble.get('abil')] + bubble.get('bonus');

            newScore += bubble.get('prof')
              ? action.data.proficiency
              : 0;

            return bubble.set('score', newScore);
          });
        })
        .update('charSpellBubbles', charSpellBubbles => {
          return charSpellBubbles.map(bubble => {
            let newScore = abilityScoreMods[bubble.get('abil')] + bubble.get('bonus');

            newScore += bubble.get('prof')
              ? action.data.proficiency
              : 0;

            return bubble.set('score', newScore);
          });
        })
        .update('charSpellSaveDC', charSpellSaveDC => {
          let newScore = charSpellSaveDC.get('base')
            + charSpellSaveDC.get('bonus')
            + abilityScoreMods[charSpellSaveDC.get('abil')];

          newScore += charSpellSaveDC.get('prof')
            ? action.data.proficiency 
            : 0;

          return charSpellSaveDC.set('score', newScore);
        })
        .update('charInitiative', charInitiative => {
          let newScore = charInitiative.get('bonus') + abilityScoreMods.dex;
          return charInitiative.set('score', newScore);
        })
        .update('charSavingThrows', charSavingThrows => {
          return abilityScoreKeys
            .reduce((outSavingThrows, abilKey) => {
              let newScore = abilityScoreMods[abilKey];

              newScore += outSavingThrows.getIn([abilKey, 'proficient'])
                ? action.data.proficiency
                : 0;

              return outSavingThrows.setIn([abilKey, 'score'], newScore);
            }, charSavingThrows);
        })
        .update('charSkills', charSkills => {
          return charSkills.map(skill => {
            let newScore = skill.get('bonus') + abilityScoreMods[skill.get('mod')];

            newScore += skill.get('trained')
              ? action.data.proficiency
              : 0;

            return skill.set('score', newScore);
          })
        })

      return partialState
        .update('charPassivePerception', charPassivePerception => {
          let perceptionSkill = partialState.get('charSkills').find(itm => itm.get('name') === 'Perception');
          let newScore = charPassivePerception.get('bonus') + perceptionSkill.get('score') + charPassivePerception.get('base');
          return charPassivePerception.set('score', newScore);
        });

    // defenses
    case 'SAVING_THROW_EDIT':
      return state.updateIn(['charSavingThrows', action.data.ability], savingThrow => {
        let newScore = savingThrow.get('bonus') + state.getIn(['charAbilities', action.data.ability, 'mod']);

        newScore += action.data.proficient
          ? state.getIn(['charProficiencyBonus', 'score'])
          : 0;

        return savingThrow
          .set('proficient', action.data.proficient)
          .set('score', newScore);
      });

    case 'HIT_POINTS_EDIT':
      switch (action.data.type) {
        case 'damage':
          return state.update('charHitPoints', hitPoints => {
            let tempDmg = action.data.value - hitPoints.get('temporary');

            if (tempDmg <= 0) {
              return hitPoints.set('temporary', Math.abs(tempDmg));
            }

            let tmp = hitPoints.set('temporary', 0);
            return tmp.set('current', hitPoints.get('current') - tempDmg);
          });
        case 'heal':
          return state.update('charHitPoints', hitPoints => {
            let isNegative = hitPoints.get('current') < 0;
            let newValue = isNegative
              ? 0 + action.data.value
              : hitPoints.get('current') + action.data.value;

            newValue = newValue > hitPoints.get('maximum')
              ? hitPoints.get('maximum')
              : newValue;

            return isNegative
              ? hitPoints
                  .set('current', newValue)
                  .setIn(['deathSaves', 'successes'], 0)
                  .setIn(['deathSaves', 'failures'], 0)
              : hitPoints.set('current', newValue);
          });
        case 'temporary':
          return state.update('charHitPoints', hitPoints => {
            return hitPoints.set('temporary', hitPoints.get('temporary') + action.data.value);
          });
        default:
          return state;
      }

    case 'DEATH_SAVES_ADD':
      return state.update('charHitPoints', charHitPoints => {
        return charHitPoints.updateIn(['deathSaves', Object.keys(action.data)[0]], save => {
          return save += action.data[Object.keys(action.data)[0]];
        });
      });

    case 'DEFENSES_EDIT':
      return state
        .update('charArmorClass', charArmorClass => {
          return charArmorClass.set('score', action.data.armorClass);
        })
        .update('charInitiative', charInitiative => {
          let newScore = action.data.initiativeBonus + state.getIn(['charAbilities', 'dex', 'mod']);
          return charInitiative.set('score', newScore).set('bonus', action.data.initiativeBonus);
        })
        .update('charSpeed', charSpeed => {
          return charSpeed.set('score', action.data.speed);
        })
        .update('charHitPoints', charHitPoints => {
          return charHitPoints.set('maximum', action.data.maxHp);
        });
      
    case 'RESISTANCES_CREATE':
      return state.update('charResistances', charResistances => {
        return charResistances.push(Map(action.data));
      });

    case 'RESISTANCES_EDIT':
      return state.update('charResistances', charResistances => {
        let idx = charResistances.findIndex(res => res.get('id') === action.data.id);
        return charResistances.update(idx, res => {
          return res.merge(action.data);
        });
      });

    case 'RESISTANCES_DELETE':
      return state.update('charResistances', charResistances => {
        return charResistances.filter(res => res.get('id') !== action.data.id);
      });

    case 'LONG_REST':
      break;
    case 'SHORT_REST':
      break;

    // attacks
    case 'CLASS_CHARGE_DECREMENT':
      return state.update('charClassCharges', charClassCharges => {
        let idx = charClassCharges.findIndex(charge => charge.get('id') === action.data.id);
        return charClassCharges.update(idx, charge => {
          let newCurrent = charge.get('current') - 1;

          newCurrent = newCurrent < 0 ? 0 : newCurrent;

          return charge.set('current', newCurrent);
        });
      })
    case 'CLASS_CHARGE_INCREMENT':
      return state.update('charClassCharges', charClassCharges => {
        let idx = charClassCharges.findIndex(charge => charge.get('id') === action.data.id);
        return charClassCharges.update(idx, charge => {
          let newCurrent = charge.get('current') + 1;

          newCurrent = newCurrent > charge.get('charges')
            ? charge.get('charges')
            : newCurrent;

          return charge.set('current', newCurrent);
        });
      }); 

    case 'ATTACK_EDIT':
      return state.update('charAttacks', charAttacks => {
        let idx = charAttacks.findIndex(atk => atk.get('id') === action.data.id);
        return charAttacks.update(idx, attack => {
          return attack.merge(action.data);
        });
      });

    case 'ATTACK_DELETE':
      return state.update('charAttacks', charAttacks => {
        return charAttacks.filter(attack => attack.get('id') !== action.data.id);
      });

    case 'ATTACK_CREATE':
      return state.update('charAttacks', charAttacks => {
        return charAttacks.push(Map(action.data));
      });

    // spells
    case 'SPELL_SLOTS_EDIT':
      return state.update('charSpells', charSpells => {
        return charSpells.map((spell, idx) => {
          return spell
            .set('slots', action.data.slots[idx].max)
            .set('used', action.data.slots[idx].max - action.data.slots[idx].curr);
        });
      });

    case 'SPELL_DC_EDIT':
      return state.update('charSpellSaveDC', spellSaveDC => {
        let score = state.getIn(['charAbilities', action.data.abil, 'mod'])
          + state.getIn(['charSpellSaveDC', 'base'])
          + action.data.bonus;

        score += action.data.prof
          ? state.getIn(['charProficiencyBonus', 'score'])
          : 0;

        return spellSaveDC.merge(action.data, { score });
      });

    case 'SPELL_EDIT':
      return state.updateIn(['charSpells', action.data.level, 'spells'], spells => {
        let idx = spells.findIndex(spell => spell.get('id') === action.data.spell.id);
        return spells.update(idx, spell => spell.merge(action.data.spell))
      });

    case 'SPELL_DELETE':
      return state.updateIn(['charSpells', action.data.level, 'spells'], spells => {
        return spells.filter(spell => spell.get('id') !== action.data.id);
      });

    case 'SPELL_CREATE':
      return state.updateIn(['charSpells', action.data.level, 'spells'], spells => {
        return spells.push(Map(action.data.spell));
      });

    case 'SPELL_PREPARE':
      return state.updateIn(['charSpells', action.data.level, 'spells'], spells => {
        let idx = spells.findIndex(spell => spell.get('id') === action.data.id);
        return spells.update(idx, spell => {
          return spell.set('prepared', true);
        });
      });

    case 'SPELL_UNPREPARE':
      return state.updateIn(['charSpells', action.data.level, 'spells'], spells => {
        let idx = spells.findIndex(spell => spell.get('id') === action.data.id);
        return spells.update(idx, spell => {
          return spell.set('prepared', false);
        });
      });

    case 'SPELL_CAST':
      return state.updateIn(['charSpells', action.data.levelSelected], level => {
        return level.set('used', level.get('used') + action.data.slotsUsed);
      });

    // equipments
    case 'EQUIPMENT_ITEM_CREATE':
      let createItemPartialState = state
        .updateIn(['charEquipment', 'allItems'], allItems => {
          return allItems.set(action.data.item.id, Map(action.data.item));
        });

      let containerIdx = state
        .getIn(['charEquipment', 'containers'])
        .findIndex(container => container.get('id') === action.data.container.id);

      return createItemPartialState
        .updateIn(['charEquipment', 'containers', containerIdx], container => {
          return container.update('items', items => {
            return items.push(action.data.item.id);
          });
        });

    case 'EQUIPMENT_ITEM_EDIT':
      let editItemPartialState = state
        .updateIn(['charEquipment', 'allItems', action.data.item.id], itm => {
          return itm.merge(action.data.item);
        });

      if (action.data.hasMoved) {
        let containers = editItemPartialState
          .getIn(['charEquipment', 'containers']);

        let fromContainerIdx = containers
          .findIndex(cont => cont.get('id') === action.data.container.originalContainerId);
        let toContainerIdx = containers
          .findIndex(cont => cont.get('id') === action.data.container.id);

        editItemPartialState = editItemPartialState
          .updateIn(['charEquipment', 'containers'], containers => {
            return containers.update(fromContainerIdx, cont => {
              return cont.update('items', itms => {
                return itms.filter(itm => itm !== action.data.item.id);
              });
            });
          })
          .updateIn(['charEquipment', 'containers'], containers => {
            return containers.update(toContainerIdx, cont => {
              return cont.update('items', itms => {
                return itms.push(action.data.item.id);
              });
            });
          });
      }

      return editItemPartialState;

    case 'EQUIPMENT_ITEM_DELETE':
      let containerIdxOfItemToDelete = state
        .getIn(['charEquipment', 'containers'])
        .findIndex(containers => containers.get('id') === action.data.containerId);

      return state.updateIn(['charEquipment', 'containers', containerIdxOfItemToDelete], container => {
        return container.update('items', items => {
          return items.filter(itm => itm !== action.data.id);
        });
      });

    case 'EQUIPMENT_CONTAINER_CREATE':
      break;
    case 'EQUIPMENT_CONTAINER_EDIT':
      break;
    case 'EQUIPMENT_CONTAINER_DELETE':
      break;
    case 'MONEY_EDIT':
      break;

    // attack bonuses
    case 'ATTACK_BONUS_CREATE':
      return state.update('charAttackBubbles', charAttackBubbles => {
        let score = state.getIn(['charAbilities', action.data.abil, 'mod']) + action.data.bonus;

        score += action.data.prof
          ? state.getIn(['charProficiencyBonus', 'score'])
          : 0;

        let newBubble = Map(Object.assign({}, action.data, { score }));
        return charAttackBubbles.push(newBubble);
      });
      
    case 'ATTACK_BONUS_EDIT':
      return state.update('charAttackBubbles', charAttackBubbles => {
        let idx = charAttackBubbles.findIndex(bubble => bubble.get('id') === action.data.id);
        return charAttackBubbles.update(idx, bubble => {
          let score = state.getIn(['charAbilities', action.data.abil, 'mod']) + action.data.bonus;

          score += action.data.prof
            ? state.getIn(['charProficiencyBonus', 'score'])
            : 0;

          return bubble.merge(action.data, { score });
        });
      });
      
    case 'ATTACK_BONUS_DELETE':
      return state.update('charAttackBubbles', charAttackBubbles => {
        return charAttackBubbles.filter(bubble => bubble.get('id') !== action.data.id);
      });

    // spell attack bonuses
    case 'SPELL_ATTACK_BONUS_CREATE':
      return state.update('charSpellBubbles', charSpellBubbles => {
        let score = state.getIn(['charAbilities', action.data.abil, 'mod']) + action.data.bonus;

        score += action.data.prof
          ? state.getIn(['charProficiencyBonus', 'score'])
          : 0;

        let newSpellBubble = Map(Object.assign({}, action.data, { score }));
        return charSpellBubbles.push(newSpellBubble);
      });

    case 'SPELL_ATTACK_BONUS_EDIT':
      return state.update('charSpellBubbles', charSpellBubbles => {
        let idx = charSpellBubbles.findIndex(bubble => bubble.get('id') === action.data.id);
        return charSpellBubbles.update(idx, bubble => {
          let score = state.getIn(['charAbilities', action.data.abil, 'mod']) + action.data.bonus;

          score += action.data.prof
            ? state.getIn(['charProficiencyBonus', 'score'])
            : 0;

          return bubble.merge(action.data, { score });
        });
      });

    case 'SPELL_ATTACK_BONUS_DELETE':
      return state.update('charSpellBubbles', charSpellBubbles => {
        return charSpellBubbles.filter(bubble => bubble.get('id') !== action.data.id);
      });

    default:
      return state;
  }
}

export function preferences(state = DEFAULT_PREFERENCES, action) {
  switch (action.type) {
    case 'TOGGLE_SPELL_DC':
      break;
    default:
      return state;
  }
}