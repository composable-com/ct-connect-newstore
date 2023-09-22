// @ts-check
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  displayName: 'Tests Event Application',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ["./tests/setup.ts"],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  coveragePathIgnorePatterns: ["node_modules", "test"],
};
