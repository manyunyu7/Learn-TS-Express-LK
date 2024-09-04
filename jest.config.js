module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  };