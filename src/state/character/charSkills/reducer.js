export default function charSkillsReducer(state, action) {
  const partial = state.update('charSkills', skills => {
    const idx = skills.findIndex(
      skill => skill.get('name') === action.data.name
    );

    if (idx === -1) return skills;

    return skills.update(idx, skill => {
      const bonus = action.data.bonus;
      const trained = action.data.trained;
      const newScore = trained
        ? state.getIn(['charProficiencyBonus', 'score']) +
          state.getIn(['charAbilities', skill.get('mod'), 'mod']) +
          bonus
        : state.getIn(['charAbilities', skill.get('mod'), 'mod']) + bonus;
      return skill
        .set('trained', trained)
        .set('bonus', bonus)
        .set('score', newScore);
    });
  });

  return partial.update('charPassivePerception', pp => {
    const perception = partial
      .get('charSkills')
      .find(s => s.get('name') === 'Perception');
    const newScore = pp.get('base') + pp.get('bonus') + perception.get('score');
    return pp.set('score', newScore);
  });
}
