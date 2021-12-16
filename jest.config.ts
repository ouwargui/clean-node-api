export default {
  roots: ['<rootDir>/src'],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/data/usecases/add-account/db-add-account-protocols.ts',
    '!<rootDir>/src/presentation/controller/signup/signup-protocols.ts',
    '!<rootDir>/src/presentation/protocols/*.ts'
  ],
  coverageDirectory: 'coverage',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
};
