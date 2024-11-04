module.exports = {
    coverageDirectory: '../../coverage/apps/amer-shop',
    setupFilesAfterEnv: ['/setup-jest.ts'], // Add this line to include the setup file
    snapshotSerializers: [
      'jest-preset-angular/build/serializers/no-ng-attributes',
      'jest-preset-angular/build/serializers/ng-snapshot',
      'jest-preset-angular/build/serializers/html-comment',
    ],
    globals: {
      'ts-jest': {
        tsconfig: '/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    },
    displayName: 'amer-shop',
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest',
    },
  };
  
  