module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/state-in-constructor": ["error", 'never'],
    "react/jsx-fragments": ["error", 'element'],
    "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
    'no-unused-expressions': ["error", { "allowTernary": true }],
    "react/destructuring-assignment": ["error", "always", { "ignoreClassFields": true }]
  },
};
