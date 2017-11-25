import { fromJS, Map, List } from 'immutable';
import uuid from 'uuid/v1';
import charInfoReducer from './charInfo/reducer';
import charTraitsReducer from './charTraits/reducer';
import charProficienciesReducer from './charProficiencies/reducer';
import charLanguagesReducer from './charLanguages/reducer';
import charFeaturesReducer from './charFeatures/reducer';
import charSkillsReducer from './charSkills/reducer';
import charAbilityScoresReducer from './charAbilityScores/reducer';
import charPassivePerceptionReducer from './charPassivePerception/reducer';
import charProficiencyBonusReducer from './charProficiencyBonus/reducer';
import charSavingThrowsReducer from './charSavingThrows/reducer';

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
    // and class charges CRUD
    case 'FEATURE_CREATE':
    case 'FEATURE_EDIT':
    case 'FEATURE_DELETE':
      return charFeaturesReducer(state, action);

    // ability
    case 'SKILL_EDIT':
      return charSkillsReducer(state, action);

    case 'ABILITY_SCORE_EDIT':
      return charAbilityScoresReducer(state, action);

    case 'PASSIVE_PERCEPTION_EDIT':
      return charPassivePerceptionReducer(state, action);

    case 'PROFICIENCY_BONUS_EDIT':
      return charProficiencyBonusReducer(state, action);

    // defenses
    case 'SAVING_THROW_EDIT':
      return charSavingThrowsReducer(state, action);

    case 'HIT_POINTS_HEAL':
      return state.update('charHitPoints', hitPoints => {
        const isNegative = hitPoints.get('current') < 0;

        // always start healing at 0; even if negative
        let newValue = isNegative
          ? 0 + action.data.value
          : hitPoints.get('current') + action.data.value;

        // cap at max value;
        newValue =
          newValue > hitPoints.get('maximum')
            ? hitPoints.get('maximum')
            : newValue;

        // whenever you heal, always reset deathsaves
        return hitPoints
          .set('current', newValue)
          .setIn(['deathSaves', 'successes'], 0)
          .setIn(['deathSaves', 'failures'], 0);
      });

    case 'HIT_POINTS_DAMAGE':
      return state.update('charHitPoints', hitPoints => {
        const tempDmg = action.data.value - hitPoints.get('temporary');

        // if temp hp is negative, then there were more temp hp than
        // damage received, so set temporary to remaining value
        // and return
        if (tempDmg <= 0) {
          return hitPoints.set('temporary', Math.abs(tempDmg));
        }

        // otherwise, reset temporary to 0 and subtract the remaining
        // damage from current hp.
        const tmp = hitPoints.set('temporary', 0);
        return tmp.set('current', hitPoints.get('current') - tempDmg);
      });

    case 'HIT_POINTS_TEMP':
      return state.update('charHitPoints', hitPoints =>
        hitPoints.set(
          'temporary',
          hitPoints.get('temporary') + action.data.value
        )
      );

    case 'DEATH_SAVES_SUCCESS_ADD':
      return state.updateIn(
        ['charHitPoints', 'deathSaves', 'successes'],
        0,
        successes => successes + 1
      );
    case 'DEATH_SAVES_FAILURE_ADD':
      return state.updateIn(
        ['charHitPoints', 'deathSaves', 'failures'],
        0,
        failures => failures + 1
      );

    // TODO: This should probably be split up into separate
    // actions and cases...
    case 'DEFENSES_EDIT':
      return state
        .update('charArmorClass', charArmorClass =>
          charArmorClass.set('score', action.data.armorClass)
        )
        .update('charInitiative', charInitiative => {
          const newScore =
            action.data.initiativeBonus +
            state.getIn(['charAbilities', 'dex', 'mod']);
          return charInitiative
            .set('score', newScore)
            .set('bonus', action.data.initiativeBonus);
        })
        .update('charSpeed', charSpeed =>
          charSpeed.set('score', action.data.speed)
        )
        .update('charHitPoints', charHitPoints =>
          charHitPoints
            .set('maximum', action.data.maxHp)
            .set('current', action.data.maxHp)
        );

    case 'RESISTANCES_CREATE':
      return state.update('charResistances', List(), charResistances =>
        charResistances.push(Map(action.data))
      );

    case 'RESISTANCES_EDIT':
      return state.update('charResistances', charResistances => {
        const idx = charResistances.findIndex(
          res => res.get('id') === action.data.id
        );

        if (idx === -1) return charResistances;

        return charResistances.update(idx, res => {
          return res.merge(action.data);
        });
      });

    case 'RESISTANCES_DELETE':
      return state.update('charResistances', charResistances =>
        charResistances.filter(res => res.get('id') !== action.data.id)
      );

    // hit dice
    case 'HIT_DICE_EDIT':
      return state.updateIn(
        ['charHitPoints', 'hitDiceDefinitions', action.data.id],
        Map(),
        def => def.merge(action.data)
      );

    case 'HIT_DICE_DELETE':
      return state
        .updateIn(['charHitPoints', 'hitDice'], List(), hitDice =>
          hitDice.filter(die => die !== action.data.id)
        )
        .updateIn(
          ['charHitPoints', 'hitDiceDefinitions', action.data.id],
          () => undefined
        );

    case 'HIT_DICE_CREATE':
      const newHitDieId = `hit-die-${uuid()}`;
      return state
        .updateIn(['charHitPoints', 'hitDice'], List(), hitDice =>
          hitDice.push(newHitDieId)
        )
        .updateIn(['charHitPoints', 'hitDiceDefinitions'], Map(), defs =>
          defs.set(
            newHitDieId,
            Map({
              id: newHitDieId,
              type: 'd4',
              current: 1,
              maximum: 1,
            })
          )
        );

    case 'LONG_REST':
      return state
        .update('charHitPoints', charHitPoints => {
          return charHitPoints
            .set('current', charHitPoints.get('maximum'))
            .set('temporary', 0)
            .setIn(['deathSaves', 'successes'], 0)
            .setIn(['deathSaves', 'failures'], 0)
            .updateIn(['hitDiceDefinitions', action.data.hitDiceId], def => {
              const halfMax = Math.floor(def.get('maximum') / 2);
              const newCurrent = Math.min(
                def.get('current') + halfMax,
                def.get('maximum')
              );
              return def.set('current', newCurrent);
            });

          // TODO: these are multiclass rules.
          // I'm going to make this simpler so that each long rest
          // assumes you are not multiclassing for now.
          // Later, when multiclassing is a thing, this should possibly be split
          // out into a separate action to recover specific hit dice because
          // of multiclass rules, ex: LONG_REST_MULTICLASS...
          // return Object.keys(action.data).reduce((reducedState, hitDiceId) => {
          //   return reducedState.updateIn(
          //     ['hitDiceDefinitions', hitDiceId],
          //     hdDef => {
          //       let newValue =
          //         hdDef.get('current') < 0 ? 0 : hdDef.get('current');
          //
          //       newValue += action.data[hitDiceId].valueToAdd;
          //
          //       newValue =
          //         newValue > hdDef.get('maximum')
          //           ? hdDef.get('maximum')
          //           : newValue;
          //
          //       return hdDef.set('current', newValue);
          //     }
          //   );
          // }, partialState);
        })
        .update('charClassCharges', List(), charClassCharges =>
          charClassCharges.map(charge =>
            charge.set('current', charge.get('charges'))
          )
        )
        .update('charSpells', spells =>
          spells.map(spellLevel => spellLevel.set('used', 0))
        );

    case 'SHORT_REST':
      return state.update('charHitPoints', charHitPoints => {
        // hp regaining always starts at 0;
        let newHitPoints = Math.max(0, charHitPoints.get('current'));

        newHitPoints += action.data.hpRegained;
        newHitPoints = Math.min(newHitPoints, charHitPoints.get('maximum'));

        return charHitPoints
          .set('current', newHitPoints)
          .updateIn(['hitDiceDefinitions', action.data.hitDiceId], def => {
            let newCurrent = def.get('current') - action.data.numHitDiceUsed;
            newCurrent = Math.max(0, newCurrent);
            return def.set('current', newCurrent);
          });

        // TODO: these are multiclass rules.
        // this should be simpler for the time being.
        // when multiclass becomes a thing, then this action should become
        // more sophisticated and possibly a new action; SHORT_REST_MULTICLASS
        // return Object.keys(action.data.diceUsed).reduce(
        //   (reducedState, hitDiceId) => {
        //     return reducedState.updateIn(
        //       ['hitDiceDefinitions', hitDiceId],
        //       hdDef => {
        //         const newValue =
        //           hdDef.get('current') - action.data.diceUsed[hitDiceId].num;
        //
        //         return hdDef.set('current', newValue);
        //       }
        //     );
        //   },
        //   partialState
        // );
      });

    // attacks
    case 'CLASS_CHARGE_DECREMENT':
      return state.update('charClassCharges', charClassCharges => {
        const idx = charClassCharges.findIndex(
          charge => charge.get('id') === action.data.id
        );
        if (idx === -1) return charClassCharges;
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
        if (idx === -1) return charClassCharges;
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
        if (idx === -1) return charAttacks;
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
      return state.update('charAttacks', List(), charAttacks =>
        charAttacks.push(Map(action.data))
      );

    // spells
    case 'SPELL_SLOTS_EDIT':
      return state.update('charSpells', charSpells =>
        charSpells.map((spell, idx) =>
          spell
            .set('slots', action.data.slots[idx].max)
            .set(
              'used',
              action.data.slots[idx].max - action.data.slots[idx].curr
            )
        )
      );

    case 'SPELL_DC_EDIT':
      return state.update('charSpellSaveDC', spellSaveDC => {
        const score =
          state.getIn(['charAbilities', action.data.abil, 'mod']) +
          action.data.base +
          action.data.bonus +
          state.getIn(['charProficiencyBonus', 'score']);

        return spellSaveDC.merge(action.data, { score });
      });

    case 'SPELL_EDIT':
      return state.updateIn(
        ['charSpells', action.data.level, 'spells'],
        spells => {
          const idx = spells.findIndex(
            spell => spell.get('id') === action.data.spell.id
          );
          if (idx === -1) return spells;
          return spells.update(idx, spell => spell.merge(action.data.spell));
        }
      );

    case 'SPELL_DELETE':
      return state.updateIn(
        ['charSpells', action.data.level, 'spells'],
        spells =>
          spells.filter(spell => spell.get('id') !== action.data.spell.id)
      );

    case 'SPELL_CREATE':
      return state.updateIn(
        ['charSpells', action.data.level, 'spells'],
        List(),
        spells => spells.push(Map(action.data.spell))
      );

    case 'SPELL_PREPARE':
      return state.updateIn(
        ['charSpells', action.data.level, 'spells'],
        spells => {
          const idx = spells.findIndex(
            spell => spell.get('id') === action.data.spell.id
          );
          if (idx === -1) return spells;
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
            spell => spell.get('id') === action.data.spell.id
          );
          if (idx === -1) return spells;
          return spells.update(idx, spell => {
            return spell.set('prepared', false);
          });
        }
      );

    case 'SPELL_CAST':
      return state.updateIn(['charSpells', action.data.level], level =>
        level.set('used', level.get('used') + Number(action.data.slotsUsed))
      );

    // equipments
    case 'EQUIPMENT_ITEM_CREATE':
      const containerIdx = state
        .getIn(['charEquipment', 'containers'])
        .findIndex(
          container => container.get('id') === action.data.container.id
        );

      if (containerIdx === -1) return state;

      const createItemPartialState = state.updateIn(
        ['charEquipment', 'allItems'],
        Map(),
        allItems => allItems.set(action.data.item.id, Map(action.data.item))
      );

      return createItemPartialState.updateIn(
        ['charEquipment', 'containers', containerIdx],
        container =>
          container.update('items', List(), items =>
            items.push(action.data.item.id)
          )
      );

    case 'EQUIPMENT_ITEM_EDIT':
      return state.updateIn(
        ['charEquipment', 'allItems', action.data.item.id],
        Map(),
        itm => itm.merge(action.data.item)
      );

    case 'EQUIPMENT_ITEM_MOVE': {
      const containers = state.getIn(['charEquipment', 'containers']);

      const toContainerIdx = containers.findIndex(
        cont => cont.get('id') === action.data.container.id
      );
      const fromContainerIdx = containers.findIndex(
        cont => cont.get('id') === action.data.fromContainer.id
      );

      if (toContainerIdx === -1) return state;
      if (fromContainerIdx === -1) return state;

      return state
        .updateIn(
          ['charEquipment', 'containers', fromContainerIdx, 'items'],
          itms => itms.filter(itm => itm !== action.data.item.id)
        )
        .updateIn(
          ['charEquipment', 'containers', toContainerIdx, 'items'],
          itms => itms.push(action.data.item.id)
        );
    } // end item move case

    case 'EQUIPMENT_ITEM_DELETE':
      const containerIdxOfItemToDelete = state
        .getIn(['charEquipment', 'containers'])
        .findIndex(
          containers => containers.get('id') === action.data.container.id
        );

      if (containerIdxOfItemToDelete === -1) return state;

      return state.updateIn(
        ['charEquipment', 'containers', containerIdxOfItemToDelete],
        container =>
          container.update('items', items =>
            items.filter(itm => itm !== action.data.item.id)
          )
      );

    case 'EQUIPMENT_CONTAINER_CREATE':
      return state.updateIn(['charEquipment', 'containers'], containers =>
        containers.push(
          Map(Object.assign({}, action.data, { items: List([]) }))
        )
      );

    case 'EQUIPMENT_CONTAINER_EDIT':
      const editContainerIdx = state
        .getIn(['charEquipment', 'containers'])
        .findIndex(container => container.get('id') === action.data.id);

      if (editContainerIdx === -1) return state;

      return state.updateIn(
        ['charEquipment', 'containers', editContainerIdx],
        container => container.merge(action.data)
      );

    case 'EQUIPMENT_CONTAINER_DELETE':
      const editContainers = state.getIn(['charEquipment', 'containers']);

      const fromContainerIdx = editContainers.findIndex(
        containers => containers.get('id') === action.data.id
      );

      if (fromContainerIdx === -1) return state;

      let toContainerIdx = editContainers.findIndex(
        containers => Boolean(containers.get('default')) === true
      );

      // cannot delete default container
      if (fromContainerIdx === toContainerIdx) return state;

      // cache deleted items in order to transfer them to the default
      // container
      const deletedItems = editContainers.getIn([fromContainerIdx, 'items']);

      // actually delete the container
      const deletedContainersPartialState = state.updateIn(
        ['charEquipment', 'containers'],
        containers =>
          containers.filter(container => container.get('id') !== action.data.id)
      );

      // get the default id again because it could be different
      // after deleting the id
      toContainerIdx = deletedContainersPartialState
        .getIn(['charEquipment', 'containers'])
        .findIndex(containers => Boolean(containers.get('default')) === true);

      return deletedContainersPartialState.updateIn(
        ['charEquipment', 'containers', toContainerIdx, 'items'],
        items => items.concat(deletedItems)
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
      return state.update('charAttackBubbles', List(), charAttackBubbles => {
        let score =
          state.getIn(['charAbilities', action.data.abil, 'mod']) +
          action.data.bonus;

        score += action.data.prof
          ? state.getIn(['charProficiencyBonus', 'score'])
          : 0;

        const newBubble = Map(Object.assign({}, action.data, { score }));
        return charAttackBubbles.push(newBubble);
      });

    case 'ATTACK_BONUS_EDIT':
      return state.update('charAttackBubbles', charAttackBubbles => {
        const idx = charAttackBubbles.findIndex(
          bubble => bubble.get('id') === action.data.id
        );
        if (idx === -1) return charAttackBubbles;
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
      return state.update('charAttackBubbles', charAttackBubbles =>
        charAttackBubbles.filter(bubble => bubble.get('id') !== action.data.id)
      );

    // spell attack bonuses
    case 'SPELL_ATTACK_BONUS_CREATE':
      return state.update('charSpellBubbles', List(), charSpellBubbles => {
        let score =
          state.getIn(['charAbilities', action.data.abil, 'mod']) +
          action.data.bonus;

        score += action.data.prof
          ? state.getIn(['charProficiencyBonus', 'score'])
          : 0;

        return charSpellBubbles.push(
          Map({
            ...action.data,
            score,
          })
        );
      });

    case 'SPELL_ATTACK_BONUS_EDIT':
      return state.update('charSpellBubbles', charSpellBubbles => {
        const idx = charSpellBubbles.findIndex(
          bubble => bubble.get('id') === action.data.id
        );
        if (idx === -1) return charSpellBubbles;
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
      return state.update('charSpellBubbles', charSpellBubbles =>
        charSpellBubbles.filter(bubble => bubble.get('id') !== action.data.id)
      );

    default:
      return state;
  }
}
