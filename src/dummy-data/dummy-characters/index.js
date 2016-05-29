'use strict';

import ralf from './ralf';
import defaultCharacter from '../../ui/data/defaultCharacter';
import defaultPreferences from '../../ui/data/defaultPreferences';

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