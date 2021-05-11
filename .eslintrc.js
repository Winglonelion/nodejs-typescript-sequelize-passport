module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    //
    'prettier',
    'standard',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'comma-dangle': 'off',
    camelcase: 'off',
    'linebreak-style': ['error', 'unix'],
    'eol-last': ['error', 'always'],
    semi: ['error', 'always'],
    'space-before-function-paren': 'off',
  },
};
