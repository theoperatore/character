export default function charPassivePerceptionReducer(state, action) {
  return state
    .updateIn(['charPassivePerception', 'bonus'], bonus => action.data.bonus)
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
}
