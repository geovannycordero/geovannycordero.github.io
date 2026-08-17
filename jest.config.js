/** @type {import('jest').Config} */
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.claude/',
    '<rootDir>/docs/',
  ],
  collectCoverageFrom: [
    'build/**/*.js',
    'assets/js/**/*.js',
    '!**/node_modules/**',
    // Pure CLI entry points — nothing exported to unit test. Their
    // correctness is proven by `yarn build` actually succeeding (a
    // separate CI step), not by Jest coverage.
    '!build/index.js',
    '!build/serve.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: [
    '<rootDir>/**/__tests__/**/*.js',
    '<rootDir>/**/*.(test|spec).js',
  ],
};
