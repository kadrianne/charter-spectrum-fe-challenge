module.exports = {
    env: {
      es6: true,
      browser: true,
      es2021: true,
    },
    extends: ['prettier'],
    parser: "babel-eslint",
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error',
    },
    plugins: ['prettier'],
  };