module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(date-fns|@mui|react-router-dom)/)'
    ],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
};
