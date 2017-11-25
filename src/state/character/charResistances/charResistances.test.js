import { createState } from 'state';
import { createResistance, editResistance, deleteResistance } from './actions';

let store;
beforeEach(() => {
  store = createState();
});

test('can create resistance', () => {
  const mockResistance = {
    id: 'some-res',
    name: 'Poison Resistance',
    desc: 'You take no damage from poison attacks',
  };
  store.dispatch(createResistance(mockResistance));
  const res = store.getState().character.get('charResistances');
  expect(res.size).toEqual(1);
  expect(res.get(0).toJS()).toEqual(mockResistance);
});

test('can edit resistance', () => {
  const mockResistance = {
    id: 'some-res',
    name: 'Poison Resistance',
    desc: 'You take no damage from poison attacks',
  };
  const editedResistance = {
    ...mockResistance,
    name: 'Noise Resistance',
  };

  store.dispatch(createResistance(mockResistance));
  store.dispatch(editResistance(editedResistance));
  const res = store.getState().character.get('charResistances');
  expect(res.size).toEqual(1);
  expect(res.get(0).toJS()).toEqual(editedResistance);
});

test('cannot edit unknown resistance', () => {
  const mockResistance = {
    id: 'some-res',
    name: 'Poison Resistance',
    desc: 'You take no damage from poison attacks',
  };
  const unknownResistance = {
    ...mockResistance,
    name: 'Noise Resistance',
    id: 'some-other-resistance-that-is-fake',
  };

  store.dispatch(createResistance(mockResistance));
  store.dispatch(editResistance(unknownResistance));
  const res = store.getState().character.get('charResistances');
  expect(res.size).toEqual(1);
  expect(res.get(0).toJS()).toEqual(mockResistance);
});

test('can delete resistance', () => {
  const mockResistance = {
    id: 'some-res',
    name: 'Poison Resistance',
    desc: 'You take no damage from poison attacks',
  };
  store.dispatch(createResistance(mockResistance));
  store.dispatch(deleteResistance(mockResistance));
  const res = store.getState().character.get('charResistances');
  expect(res.size).toEqual(0);
});
