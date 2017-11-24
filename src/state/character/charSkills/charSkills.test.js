import { fromJS } from 'immutable';
import { createState } from 'state';
import defaultCharacter from 'state/defaultCharacter';
import { editSkill } from './actions';

test('Can edit a skill bonus to add to score', () => {
  const store = createState();
  const mockSkill = {
    name: 'Acrobatics',
    bonus: 10,
    trained: false,
  };

  store.dispatch(editSkill(mockSkill));
  const editedSkill = store
    .getState()
    .character.get('charSkills')
    .find(skills => skills.get('name') === 'Acrobatics');
  expect(editedSkill.get('score')).toEqual(10);
});

test('Can edit a skill to be trained/proficient', () => {
  const store = createState({
    character: fromJS({
      ...defaultCharacter,
      charProficiencyBonus: {
        ...defaultCharacter.charProficiencyBonus,
        score: 2,
      },
    }),
  });

  const mockSkill = {
    name: 'Acrobatics',
    bonus: 10,
    trained: true,
  };

  store.dispatch(editSkill(mockSkill));
  const editedSkill = store
    .getState()
    .character.get('charSkills')
    .find(skills => skills.get('name') === 'Acrobatics');
  expect(editedSkill.get('trained')).toEqual(true);
  expect(editedSkill.get('score')).toEqual(12);
});

test('cannot edit a skill without a known name', () => {
  const store = createState();
  const mockSkill = {
    name: 'Blargrabatics',
    bonus: 10,
    trained: false,
  };

  store.dispatch(editSkill(mockSkill));
  const editedSkill = store
    .getState()
    .character.get('charSkills')
    .find(skills => skills.get('name') === 'Acrobatics');
  expect(editedSkill.get('score')).toEqual(0);
});
