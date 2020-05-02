import creditCardType, { types as cardTypes } from 'credit-card-type';

import { dankort, laser, visaElectron } from './cardTypes';

/**
 * Configure credit cards and return an array of valid types
 */
export const configure = () => {
  creditCardType.updateCard(cardTypes.MAESTRO, {
    patterns: [
      493698,
      [5000, 5018],
      [502000, 506698],
      [506779, 508999],
      [56, 59],
      63,
      67,
      6,
    ],
  });

  creditCardType.updateCard(cardTypes.HIPERCARD, {
    patterns: [
      384100,
      384140,
      384160,
      606282,
      637095,
      637568,
    ],
  });

  creditCardType.addCard(dankort);
  creditCardType.addCard(laser);
  creditCardType.addCard(visaElectron);

  return Object.values(cardTypes).concat(['dankort', 'laser', 'visa-electron']);
};
