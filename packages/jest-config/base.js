export const jestConfig = {
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'package.json',
    'package-lock.json',
  ],
  testPathIgnorePatterns: ['<rootDir>/packages'],
};
