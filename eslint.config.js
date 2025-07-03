const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const path = require('path');

const compat = new FlatCompat({
  baseDirectory: path.resolve(__dirname),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  ...compat.config({
    ...require('./.eslintrc.json'),
    rules: {
      ...require('./.eslintrc.json').rules,
      'import/namespace': 'off',
    },
  }),
];
