module.exports = {
  testEnvironment: "jsdom",
  transform: {
    ".*": "babel-jest",
  },
  moduleFileExtensions: ["js", "json", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src", __dirname],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "<rootDir>/test/__setup__/styleMock.js",
    "^.+\\.(jpe?g|png|gif|ttf|eot|svg|md)$":
      "<rootDir>/test/__setup__/fileMock.js",
  },
  setupFiles: [
    "<rootDir>/test/__setup__/shim.js",
    "<rootDir>/test/__setup__/index.js",
  ],
  testRegex: "/test/.*?\\.(test|spec)\\.js$",
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{js,jsx}", "src/**/*.{ts,tsx}"],
  coverageReporters: ["json", "lcovonly", "text", "clover"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 84,
      lines: 90,
      statements: 90,
    },
  },
  verbose: true,
};
