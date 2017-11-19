export default function charTraitsReducer(state, action) {
  return state.update('charTraits', charTraits =>
    charTraits.set(action.data.id, action.data.desc)
  );
}
