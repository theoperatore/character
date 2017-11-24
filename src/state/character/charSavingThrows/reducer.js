export default function charSavingThrowsReducer(state, action) {
  return state.updateIn(
    ['charSavingThrows', action.data.ability],
    savingThrow => {
      let newScore =
        action.data.bonus +
        state.getIn(['charAbilities', action.data.ability, 'mod']);

      newScore += action.data.proficient
        ? state.getIn(['charProficiencyBonus', 'score'])
        : 0;

      return savingThrow
        .set('proficient', action.data.proficient)
        .set('bonus', action.data.bonus)
        .set('score', newScore);
    }
  );
}
