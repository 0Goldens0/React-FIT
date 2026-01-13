module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist', '.next', 'node_modules', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {},
}; 