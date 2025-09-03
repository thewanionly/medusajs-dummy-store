const storefrontJestConfig = {
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'package.json',
    'package-lock.json',
  ],
  testPathIgnorePatterns: ['<rootDir>/packages'],
};

const nodeJestConfig = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'package.json',
    'package-lock.json',
  ],
  testPathIgnorePatterns: ['<rootDir>/packages'],
};

module.exports = { storefrontJestConfig, nodeJestConfig };
