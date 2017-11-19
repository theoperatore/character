export const LANGUAGE_CREATE = 'LANGUAGE_CREATE';
export const createLanguage = data => ({
  type: LANGUAGE_CREATE,
  data,
});

export const LANGUAGE_EDIT = 'LANGUAGE_EDIT';
export const editLanguage = data => ({
  type: LANGUAGE_EDIT,
  data,
});

export const LANGUAGE_DELETE = 'LANGUAGE_DELETE';
export const deleteLanguage = id => ({
  type: LANGUAGE_DELETE,
  data: { id },
});
