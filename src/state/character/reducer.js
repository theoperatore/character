import { fromJS, Map, List } from 'immutable';
import uuid from 'uuid/v1';
import charInfoReducer from './charInfo/reducer';
import charTraitsReducer from './charTraits/reducer';
import charProficienciesReducer from './charProficiencies/reducer';
import charLanguagesReducer from './charLanguages/reducer';
import charFeaturesReducer from './charFeatures/reducer';

const ABILITY_SCORE_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
const defaultState = Map();

export function character(state = defaultState, action) {
  switch (action.type) {
    // loaded character from BE
    case 'CHARACTER_LOADED':
      return fromJS(action.data.character);

    // charInfo
    case 'BASIC_INFO_EDIT':
      return charInfoReducer(state, action);

    // charTraits
    case 'TRAIT_EDIT':
      return charTraitsReducer(state, action);

    // charOtherProficiencies
    case 'PROFICIENCY_EDIT':
    case 'PROFICIENCY_DELETE':
    case 'PROFICIENCY_CREATE':
      return charProficienciesReducer(state, action);

    case 'LANGUAGE_EDIT':
    case 'LANGUAGE_DELETE':
    case 'LANGUAGE_CREATE':
      return charLanguagesReducer(state, action);

    // features
    case 'FEATURE_CREATE':
    case 'FEATURE_EDIT':
    case 'FEATURE_DELETE':
      return charFeaturesReducer(state, action);

    // ability
    case 'SKILL_EDIT':
      const partialSkillState = state.update('charSkills', charSkills => {
        const idx = charSkills.findIndex(
          skill => skill.get('name') === action.data.name
        );
        return charSkills.update(idx, skill => {
          let newScore =
            skill.get('bonus') +
            state.getIn(['charAbilities', skill.get('mod'), 'mod']);

          newScore += action.data.trained
            ? state.getIn(['charProficiencyBonus', 'score'])
            : 0;

          return skill
            .set('trained', action.data.trained)
            .set('score', newScore);
        });
      });

      return partialSkillState.update(
        'charPassivePerception',
        charPassivePerception => {
          const perceptionSkill = partialSkillState
            .get('charSkills')
            .find(itm => itm.get('name') === 'Perception');
          const newScore =
            charPassivePerception.get('bonus') +
            perceptionSkill.get('score') +
            charPassivePerception.get('base');
          return charPassivePerception.set('score', newScore);
        }
      );

    case 'ABILITY_SCORE_EDIT':
      const proficiencyBonus = state.getIn(['charProficiencyBonus', 'score']);
      const abilityScoreKeys = Object.keys(action.data);
      const abilityScoreMods = abilityScoreKeys.reduce((obj, key) => {
        obj[key] = Math.floor((action.data[key] - 10) / 2);
        return obj;
      }, {});

      const partialState = state
        .update('charAbilities', charAbilities => {
          return abilityScoreKeys.reduce((outAbil, abilKey) => {
            return outAbil
              .setIn([abilKey, 'score'], action.data[abilKey])
              .setIn([abilKey, 'mod'], abilityScoreMods[abilKey]);
          }, charAbilities);
        })
        .update('charAttackBubbles', charAttackBubbles => {
          if (!charAttackBubbles) {
            return List([]);
          }

          return charAttackBubbles.map(bubble => {
            let newScore =
              abilityScoreMods[bubble.get('abil')] + bubble.get('bonus');

            newScore += bubble.get('prof') ? proficiencyBonus : 0;

            return bubble.set('score', newScore);
          });
        })
        .update('charSpellBubbles', charSpellBubbles => {
          if (!charSpellBubbles) {
            return List([]);
          }

          return charSpellBubbles.map(bubble => {
            let newScore =
              abilityScoreMods[bubble.get('abil')] + bubble.get('bonus');

            newScore += bubble.get('prof') ? proficiencyBonus : 0;

            return bubble.set('score', newScore);
          });
        })
        .update('charSpellSaveDC', charSpellSaveDC => {
          let newScore =
            charSpellSaveDC.get('base') +
            charSpellSaveDC.get('bonus') +
            abilityScoreMods[charSpellSaveDC.get('abil')];

          newScore += charSpellSaveDC.get('prof') ? proficiencyBonus : 0;

          return charSpellSaveDC.set('score', newScore);
        })
        .update('charInitiative', charInitiative => {
          const newScore = charInitiative.get('bonus') + abilityScoreMods.dex;
          return charInitiative.set('score', newScore);
        })
        .update('charSavingThrows', charSavingThrows => {
          return abilityScoreKeys.reduce((outSavingThrows, abilKey) => {
            let newScore = abilityScoreMods[abilKey];

            newScore += outSavingThrows.getIn([abilKey, 'proficient'])
              ? proficiencyBonus
              : 0;

            return outSavingThrows.setIn([abilKey, 'score'], newScore);
          }, charSavingThrows);
        })
        .update('charSkills', charSkills => {
          return charSkills.map(skill => {
            let newScore =
              skill.get('bonus') + abilityScoreMods[skill.get('mod')];

            newScore += skill.get('trained') ? proficiencyBonus : 0;

            return skill.set('score', newScore);
          });
        });

      return partialState.update(
        'charPassivePerception',
        charPassivePerception => {
          const perceptionSkill = partialState
            .get('charSkills')
            .find(itm => itm.get('name') === 'Perception');
          const newScore =
            charPassivePerception.get('bonus') +
            perceptionSkill.get('score') +
            charPassivePerception.get('base');
          return charPassivePerception.set('score', newScore);
        }
      );

    case 'PASSIVE_PERCEPTION_EDIT':
      return state
        .updateIn(['charPassivePerception', 'bonus'], bonus => {
          return action.data.bonus;
        })
        .update('charPassivePerception', passivePerception => {
          const perceptionSkill = state
            .get('charSkills')
            .find(itm => itm.get('name') === 'Perception');
          const newScore =
            passivePerception.get('base') +
            passivePerception.get('bonus') +
            perceptionSkill.get('score');

          return passivePerception.set('score', newScore);
        });

    case 'PROFICIENCY_BONUS_EDIT':
      const newProficiencyBonus = action.data.base + action.data.bonus;

      // proficiency
      const pbPartialState = state
        .update('charProficiencyBonus', bonus => {
          return bonus
            .set('base', action.data.base)
            .set('bonus', action.data.bonus)
            .set('score', action.data.base + action.data.bonus);
        })
        // skills
        .update('charSkills', charSkills => {
          return charSkills.map(skill => {
            let newScore =
              skill.get('bonus') +
              state.getIn(['charAbilities', skill.get('mod'), 'mod']);

            newScore += skill.get('trained') ? newProficiencyBonus : 0;

            return skill.set('score', newScore);
          });
        })
        // saving throws
        .update('charSavingThrows', charSavingThrows => {
          return ABILITY_SCORE_KEYS.reduce((outSavingThrows, abilKey) => {
            let newScore = state.getIn(['charAbilities', abilKey, 'mod']);

            newScore += outSavingThrows.getIn([abilKey, 'proficient'])
              ? newProficiencyBonus
              : 0;

            return outSavingThrows.setIn([abilKey, 'score'], newScore);
          }, charSavingThrows);
        })
        // attack bubbles
        .update('charAttackBubbles', charAttackBubbles => {
          if (!charAttackBubbles) {
            return List([]);
          }

          return charAttackBubbles.map(bubble => {
            let newScore =
              state.getIn(['charAbilities', bubble.get('abil'), 'mod']) +
              bubble.get('bonus');

            newScore += bubble.get('prof') ? newProficiencyBonus : 0;

            return bubble.set('score', newScore);
          });
        })
        // spell bubbles
        .update('charSpellBubbles', charSpellBubbles => {
          if (!charSpellBubbles) {
            return List([]);
          }

          return charSpellBubbles.map(bubble => {
            let newScore =
              state.getIn(['charAbilities', bubble.get('abil'), 'mod']) +
              bubble.get('bonus');

            newScore += bubble.get('prof') ? newProficiencyBonus : 0;

            return bubble.set('score', newScore);
          });
        })
        // spell save dc
        .update('charSpellSaveDC', spellSaveDC => {
          let score =
            state.getIn(['charAbilities', spellSaveDC.get('abil'), 'mod']) +
            spellSaveDC.get('base') +
            spellSaveDC.get('bonus');

          score += spellSaveDC.get('prof') ? newProficiencyBonus : 0;

          return spellSaveDC.set('score', score);
        });

      // passive perception
      return pbPartialState.updateIn(['charPassivePerception'], pp => {
        const perceptionSkill = pbPartialState
          .get('charSkills')
          .find(itm => itm.get('name') === 'Perception');
        const newScore =
          pp.get('base') + pp.get('bonus') + perceptionSkill.get('score');

        return pp.set('score', newScore);
      });

    // defenses
    case 'SAVING_THROW_EDIT':
      return state.updateIn(
        ['charSavingThrows', action.data.ability],
        savingThrow => {
          let newScore =
            savingThrow.get('bonus') +
            state.getIn(['charAbilities', action.data.ability, 'mod']);

          newScore += action.data.proficient
            ? state.getIn(['charProficiencyBonus', 'score'])
            : 0;

          return savingThrow
            .set('proficient', action.data.proficient)
            .set('score', newScore);
        }
      );

    case 'HIT_POINTS_EDIT':
      switch (action.data.type) {
        case 'damage':
          return state.update('charHitPoints', hitPoints => {
            const tempDmg = action.data.value - hitPoints.get('temporary');

            if (tempDmg <= 0) {
              return hitPoints.set('temporary', Math.abs(tempDmg));
            }

            const tmp = hitPoints.set('temporary', 0);
            return tmp.set('current', hitPoints.get('current') - tempDmg);
          });
        case 'heal':
          return state.update('charHitPoints', hitPoints => {
            const isNegative = hitPoints.get('current') < 0;
            let newValue = isNegative
              ? 0 + action.data.value
              : hitPoints.get('current') + action.data.value;

            newValue =
              newValue > hitPoints.get('maximum')
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
            return hitPoints.set(
              'temporary',
              hitPoints.get('temporary') + action.data.value
            );
          });
        default:
          return state;
      }

    case 'DEATH_SAVES_ADD':
      return state.update('charHitPoints', charHitPoints => {
        return charHitPoints.updateIn(
          ['deathSaves', Object.keys(action.data)[0]],
          save => save + action.data[Object.keys(action.data)[0]]
        );
      });

    case 'DEFENSES_EDIT':
      return state
        .update('charArmorClass', charArmorClass => {
          return charArmorClass.set('score', action.data.armorClass);
        })
        .update('charInitiative', charInitiative => {
          const newScore =
            action.data.initiativeBonus +
            state.getIn(['charAbilities', 'dex', 'mod']);
          return charInitiative
            .set('score', newScore)
            .set('bonus', action.data.initiativeBonus);
        })
        .update('charSpeed', charSpeed => {
          return charSpeed.set('score', action.data.speed);
        })
        .update('charHitPoints', charHitPoints => {
          return charHitPoints
            .set('maximum', action.data.maxHp)
            .set('current', action.data.maxHp);
        });

    case 'RESISTANCES_CREATE':
      return state.update('charResistances', charResistances => {
        return charResistances
          ? charResistances.push(Map(action.data))
          : List([Map(action.data)]);
      });

    case 'RESISTANCES_EDIT':
      return state.update('charResistances', charResistances => {
        const idx = charResistances.findIndex(
          res => res.get('id') === action.data.id
        );
        return charResistances.update(idx, res => {
          return res.merge(action.data);
        });
      });

    case 'RESISTANCES_DELETE':
      return state.update('charResistances', charResistances => {
        return charResistances.filter(res => res.get('id') !== action.data.id);
      });

    // hit dice
    case 'HIT_DICE_EDIT':
      return state.updateIn(
        ['charHitPoints', 'hitDiceDefinitions', action.data.id],
        def => {
          return def.merge(action.data);
        }
      );

    case 'HIT_DICE_DELETE':
      return state.updateIn(['charHitPoints', 'hitDice'], hitDice => {
        return hitDice.filter(die => die !== action.data.id);
      });

    case 'HIT_DICE_CREATE':
      const newHitDieId = `hit-die-${uuid()}`;
      return state
        .updateIn(['charHitPoints', 'hitDice'], hitDice => {
          return hitDice ? hitDice.push(newHitDieId) : List([newHitDieId]);
        })
        .updateIn(['charHitPoints', 'hitDiceDefinitions'], defs => {
          return defs
            ? defs.set(
                newHitDieId,
                Map({
                  id: newHitDieId,
                  type: 'd4',
                  current: 1,
                  maximum: 1,
                })
              )
            : Map({
                [`${newHitDieId}`]: Map({
                  id: newHitDieId,
                  type: 'd4',
                  current: 1,
                  maximum: 1,
                }),
              });
        });

    case 'LONG_REST':
      return state
        .update('charHitPoints', charHitPoints => {
          const partialState = charHitPoints
            .set('current', charHitPoints.get('maximum'))
            .set('temporary', 0);

          return Object.keys(action.data).reduce((state, hitDiceId) => {
            return state.updateIn(['hitDiceDefinitions', hitDiceId], hdDef => {
              let newValue =
                hdDef.get('current') < 0 ? 0 : hdDef.get('current');

              newValue += action.data[hitDiceId].valueToAdd;

              newValue =
                newValue > hdDef.get('maximum')
                  ? hdDef.get('maximum')
                  : newValue;

              return hdDef.set('current', newValue);
            });
          }, partialState);
        })
        .update('charClassCharges', charClassCharges => {
          if (!charClassCharges) {
            return List([]);
          }

          return charClassCharges.map(charge => {
            return charge.set('current', charge.get('charges'));
          });
        })
        .update('charSpells', spells => {
          return spells.map(spellLevel => {
            return spellLevel.set('used', 0);
          });
        });

    case 'SHORT_REST':
      return state.update('charHitPoints', charHitPoints => {
        let newHitPoints =
          charHitPoints.get('current') < 0 ? 0 : charHitPoints.get('current');

        newHitPoints += action.data.hpRegained;

        newHitPoints =
          newHitPoints > charHitPoints.get('maximum')
            ? charHitPoints.get('maximum')
            : newHitPoints;

        const partialState = charHitPoints.set('current', newHitPoints);

        return Object.keys(action.data.diceUsed).reduce((state, hitDiceId) => {
          return state.updateIn(['hitDiceDefinitions', hitDiceId], hdDef => {
            const newValue =
              hdDef.get('current') - action.data.diceUsed[hitDiceId].num;

            return hdDef.set('current', newValue);
          });
        }, partialState);
      });

    // attacks
    case 'CLASS_CHARGE_DECREMENT':
      return state.update('charClassCharges', charClassCharges => {
        const idx = charClassCharges.findIndex(
          charge => charge.get('id') === action.data.id
        );
        return charClassCharges.update(idx, charge => {
          let newCurrent = charge.get('current') - 1;

          newCurrent = newCurrent < 0 ? 0 : newCurrent;

          return charge.set('current', newCurrent);
        });
      });
    case 'CLASS_CHARGE_INCREMENT':
      return state.update('charClassCharges', charClassCharges => {
        const idx = charClassCharges.findIndex(
          charge => charge.get('id') === action.data.id
        );
        return charClassCharges.update(idx, charge => {
          let newCurrent = charge.get('current') + 1;

          newCurrent =
            newCurrent > charge.get('charges')
              ? charge.get('charges')
              : newCurrent;

          return charge.set('current', newCurrent);
        });
      });

    case 'ATTACK_EDIT':
      return state.update('charAttacks', charAttacks => {
        const idx = charAttacks.findIndex(
          atk => atk.get('id') === action.data.id
        );
        return charAttacks.update(idx, attack => {
          return attack.merge(action.data);
        });
      });

    case 'ATTACK_DELETE':
      return state.update('charAttacks', charAttacks => {
        return charAttacks.filter(
          attack => attack.get('id') !== action.data.id
        );
      });

    case 'ATTACK_CREATE':
      return state.update('charAttacks', charAttacks => {
        return charAttacks
          ? charAttacks.push(Map(action.data))
          : List([Map(action.data)]);
      });

    // spells
    case 'SPELL_SLOTS_EDIT':
      return state.update('charSpells', charSpells => {
        return charSpells.map((spell, idx) => {
          return spell
            .set('slots', action.data.slots[idx].max)
            .set(
              'used',
              action.data.slots[idx].max - action.data.slots[idx].curr
            );
        });
      });

    case 'SPELL_DC_EDIT':
      return state.update('charSpellSaveDC', spellSaveDC => {
        let score =
          state.getIn(['charAbilities', action.data.abil, 'mod']) +
          state.getIn(['charSpellSaveDC', 'base']) +
          action.data.bonus;

        score += action.data.prof
          ? state.getIn(['charProficiencyBonus', 'score'])
          : 0;

        return spellSaveDC.merge(action.data, { score });
      });

    case 'SPELL_EDIT':
      return state.updateIn(
        ['charSpells', action.data.level, 'spells'],
        spells => {
          const idx = spells.findIndex(
            spell => spell.get('id') === action.data.spell.id
          );
          return spells.update(idx, spell => spell.merge(action.data.spell));
        }
      );

    case 'SPELL_DELETE':
      return state.updateIn(
        ['charSpells', action.data.level, 'spells'],
        spells => {
          return spells.filter(spell => spell.get('id') !== action.data.id);
        }
      );

    case 'SPELL_CREATE':
      return state.updateIn(
        ['charSpells', action.data.level, 'spells'],
        spells => {
          return spells
            ? spells.push(Map(action.data.spell))
            : List([Map(action.data.spell)]);
        }
      );

    case 'SPELL_PREPARE':
      return state.updateIn(
        ['charSpells', action.data.level, 'spells'],
        spells => {
          const idx = spells.findIndex(
            spell => spell.get('id') === action.data.id
          );
          return spells.update(idx, spell => {
            return spell.set('prepared', true);
          });
        }
      );

    case 'SPELL_UNPREPARE':
      return state.updateIn(
        ['charSpells', action.data.level, 'spells'],
        spells => {
          const idx = spells.findIndex(
            spell => spell.get('id') === action.data.id
          );
          return spells.update(idx, spell => {
            return spell.set('prepared', false);
          });
        }
      );

    case 'SPELL_CAST':
      return state.updateIn(
        ['charSpells', action.data.levelSelected],
        level => {
          return level.set('used', level.get('used') + action.data.slotsUsed);
        }
      );

    // equipments
    case 'EQUIPMENT_ITEM_CREATE':
      const createItemPartialState = state.updateIn(
        ['charEquipment', 'allItems'],
        allItems => {
          return allItems
            ? allItems.set(action.data.item.id, Map(action.data.item))
            : Map({
                [`${action.data.item.id}`]: Map(action.data.item),
              });
        }
      );

      const containerIdx = state
        .getIn(['charEquipment', 'containers'])
        .findIndex(
          container => container.get('id') === action.data.container.id
        );

      return createItemPartialState.updateIn(
        ['charEquipment', 'containers', containerIdx],
        container => {
          return container.update('items', items => {
            return items
              ? items.push(action.data.item.id)
              : List([action.data.item.id]);
          });
        }
      );

    case 'EQUIPMENT_ITEM_EDIT':
      let editItemPartialState = state.updateIn(
        ['charEquipment', 'allItems', action.data.item.id],
        itm => {
          return itm.merge(action.data.item);
        }
      );

      if (action.data.hasMoved) {
        const containers = editItemPartialState.getIn([
          'charEquipment',
          'containers',
        ]);

        const fromContainerIdx = containers.findIndex(
          cont => cont.get('id') === action.data.container.originalContainerId
        );
        const toContainerIdx = containers.findIndex(
          cont => cont.get('id') === action.data.container.id
        );

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
      const containerIdxOfItemToDelete = state
        .getIn(['charEquipment', 'containers'])
        .findIndex(
          containers => containers.get('id') === action.data.containerId
        );

      return state.updateIn(
        ['charEquipment', 'containers', containerIdxOfItemToDelete],
        container => {
          return container.update('items', items => {
            return items.filter(itm => itm !== action.data.id);
          });
        }
      );

    case 'EQUIPMENT_CONTAINER_CREATE':
      return state.updateIn(['charEquipment', 'containers'], containers => {
        return containers.push(
          Map(Object.assign({}, action.data, { items: List([]) }))
        );
      });

    case 'EQUIPMENT_CONTAINER_EDIT':
      const editContainerIdx = state
        .getIn(['charEquipment', 'containers'])
        .findIndex(container => container.get('id') === action.data.id);

      return state.updateIn(
        ['charEquipment', 'containers', editContainerIdx],
        container => {
          return container.merge(action.data);
        }
      );

    case 'EQUIPMENT_CONTAINER_DELETE':
      const editContainers = state.getIn(['charEquipment', 'containers']);

      const fromContainerIdx = editContainers.findIndex(
        containers => containers.get('id') === action.data.id
      );

      let toContainerIdx = editContainers.findIndex(
        containers => !!containers.get('default') === true
      );

      // cannot delete default container
      if (fromContainerIdx === toContainerIdx) return state;

      const deletedItems = editContainers.getIn([fromContainerIdx, 'items']);

      const deletedContainersPartialState = state.updateIn(
        ['charEquipment', 'containers'],
        containers => {
          return containers.filter(
            container => container.get('id') !== action.data.id
          );
        }
      );

      // get the default id again because it could be different
      // after deleting the id
      toContainerIdx = deletedContainersPartialState
        .getIn(['charEquipment', 'containers'])
        .findIndex(containers => !!containers.get('default') === true);

      return deletedContainersPartialState.updateIn(
        ['charEquipment', 'containers', toContainerIdx, 'items'],
        items => {
          return items.concat(deletedItems);
        }
      );

    case 'WEALTH_EDIT':
      return state.updateIn(
        ['charEquipment', 'money', action.data.wealthType],
        type => {
          switch (action.data.actionType) {
            case 'add':
              return type + action.data.value;
            case 'subtract':
              return type - action.data.value;
            default:
              return type;
          }
        }
      );

    // attack bonuses
    case 'ATTACK_BONUS_CREATE':
      return state.update('charAttackBubbles', charAttackBubbles => {
        let score =
          state.getIn(['charAbilities', action.data.abil, 'mod']) +
          action.data.bonus;

        score += action.data.prof
          ? state.getIn(['charProficiencyBonus', 'score'])
          : 0;

        const newBubble = Map(Object.assign({}, action.data, { score }));
        return charAttackBubbles
          ? charAttackBubbles.push(newBubble)
          : List([newBubble]);
      });

    case 'ATTACK_BONUS_EDIT':
      return state.update('charAttackBubbles', charAttackBubbles => {
        const idx = charAttackBubbles.findIndex(
          bubble => bubble.get('id') === action.data.id
        );
        return charAttackBubbles.update(idx, bubble => {
          let score =
            state.getIn(['charAbilities', action.data.abil, 'mod']) +
            action.data.bonus;

          score += action.data.prof
            ? state.getIn(['charProficiencyBonus', 'score'])
            : 0;

          return bubble.merge(action.data, { score });
        });
      });

    case 'ATTACK_BONUS_DELETE':
      return state.update('charAttackBubbles', charAttackBubbles => {
        return charAttackBubbles.filter(
          bubble => bubble.get('id') !== action.data.id
        );
      });

    // spell attack bonuses
    case 'SPELL_ATTACK_BONUS_CREATE':
      return state.update('charSpellBubbles', charSpellBubbles => {
        let score =
          state.getIn(['charAbilities', action.data.abil, 'mod']) +
          action.data.bonus;

        score += action.data.prof
          ? state.getIn(['charProficiencyBonus', 'score'])
          : 0;

        const newSpellBubble = Map(Object.assign({}, action.data, { score }));
        return charSpellBubbles
          ? charSpellBubbles.push(newSpellBubble)
          : List([newSpellBubble]);
      });

    case 'SPELL_ATTACK_BONUS_EDIT':
      return state.update('charSpellBubbles', charSpellBubbles => {
        const idx = charSpellBubbles.findIndex(
          bubble => bubble.get('id') === action.data.id
        );
        return charSpellBubbles.update(idx, bubble => {
          let score =
            state.getIn(['charAbilities', action.data.abil, 'mod']) +
            action.data.bonus;

          score += action.data.prof
            ? state.getIn(['charProficiencyBonus', 'score'])
            : 0;

          return bubble.merge(action.data, { score });
        });
      });

    case 'SPELL_ATTACK_BONUS_DELETE':
      return state.update('charSpellBubbles', charSpellBubbles => {
        return charSpellBubbles.filter(
          bubble => bubble.get('id') !== action.data.id
        );
      });

    default:
      return state;
  }
}
