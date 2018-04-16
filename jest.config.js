module.exports = {
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testRegex: '(/tests/.*|(\\.|/)test)\\.ts$',
    moduleFileExtensions: [
        'js',
        'ts',
    ],
    modulePaths: [
        '<rootDir>/src',
    ],
    moduleNameMapper: {
        'three/.*': '<rootDir>/node_modules/three/build/three.js',
    },
};
