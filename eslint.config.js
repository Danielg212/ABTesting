module.exports = {
  rules: {
    complexity: ['warn', { max: 5 }],
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'max-lines': ['error', { max: 1000, skipComments: true, skipBlankLines: true }],
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
