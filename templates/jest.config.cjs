// jest.config.cjs
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Ensure this line is present
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Add this line to specify ts-jest for TypeScript files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)', // Ensure this line is present
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Add this line if you want to ignore CSS imports
  },
};