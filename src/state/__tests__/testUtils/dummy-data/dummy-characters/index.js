import defaultCharacter from 'state/defaultCharacter';
import defaultPreferences from 'state/defaultPreferences';
import ralf from './ralf';

export const characters = {
  ralf: {
    character_data: ralf.character,
    preference_data: ralf.preference
  },
  blank: {
    character_data: defaultCharacter,
    preference_data: defaultPreferences,
  }
}
