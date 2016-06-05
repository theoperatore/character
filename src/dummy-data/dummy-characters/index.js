'use strict';

import ralf from './ralf';
import defaultCharacter from '../../data/defaultCharacter';
import defaultPreferences from '../../data/defaultPreferences';

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