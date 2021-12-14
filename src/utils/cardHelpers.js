import creditCardType, { types as cardTypes } from 'credit-card-type';
import luhn from 'luhn';

import { dankort, laser, visaElectron } from './cardTypes';

/**
 * Check if a credit card number is valid using the Luhn algorithm
 * @returns {boolean}
 */
export const validateLuhn = luhn.validate;

/**
 * Given a credit card number in the format (XXXX XXXX XXXX...) return it as a string without any spaces
 * @param {*} number
 * @returns {string} number
 */
export const sanitizeNumber = (number) => number.toString().trim().replace(' ', '');

/**
 * Return the issuer of a given credit card number or `unknown` if the issuer can't be identified
 * @param {string|number} cardNumber
 * @returns {string} cardType
 */
export const getCardType = (cardNumber) => {
  const potentialCardTypes = creditCardType(sanitizeNumber(cardNumber));

  if (potentialCardTypes.length === 1) {
    const firstResult = potentialCardTypes.shift();

    return firstResult.type;
  }

  return 'unknown';
};

/**
 * Configure the credit card types supported and return an array of valid types
 * @returns {string[]} validCardTypes
 */
export const setInitialValidCardTypes = () => {
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

/**
 * Provides a map of patterns to match for some card types
 */
export const cardTypesMap = {
  amex: ['amex', 'americanexpress', 'american-express'],
  dinersclub: ['diners', 'dinersclub', 'diners-club'],
  visaelectron: ['visaelectron', 'visa-electron'],
};
