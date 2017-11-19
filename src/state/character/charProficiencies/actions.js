export const PROFICIENCY_CREATE = 'PROFICIENCY_CREATE';
export const createProficiency = data => ({
  type: PROFICIENCY_CREATE,
  data,
});

export const PROFICIENCY_EDIT = 'PROFICIENCY_EDIT';
export const editProficiency = data => ({
  type: PROFICIENCY_EDIT,
  data,
});

export const PROFICIENCY_DELETE = 'PROFICIENCY_DELETE';
export const deleteProficiency = id => ({
  type: PROFICIENCY_DELETE,
  data: { id },
});
