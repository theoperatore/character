export const TRAIT_EDIT = 'TRAIT_EDIT';
export const editTraits = (trait, desc) => ({
  type: TRAIT_EDIT,
  data: {
    id: trait,
    desc,
  },
});
