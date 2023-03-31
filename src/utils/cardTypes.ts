/**
 * Provides configuration for card types not supported by `credit-card-types`
 */

export const dankort = {
  niceType: "Dankort",
  type: "dankort",
  patterns: [5019],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: "CVC",
    size: 3,
  },
};

export const laser = {
  niceType: "Laser",
  type: "laser",
  patterns: [6706, 6771, 6709],
  gaps: [4, 8, 12],
  lengths: [16, 19],
  code: {
    name: "CVV",
    size: 3,
  },
};

export const visaElectron = {
  niceType: "Visa Electron",
  type: "visa-electron",
  patterns: [4026, 417500, 4405, 4508, 4844, 49137],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: "CVV",
    size: 3,
  },
};
