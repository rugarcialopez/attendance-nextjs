// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
};