const globals = require('globals');

const parser = require.resolve('@typescript-eslint/parser');
const parserInstance = require(parser);

const eslintPluginPrettier = require.resolve('eslint-plugin-prettier');
const pluginPrettier = require(eslintPluginPrettier);

const eslintConfigPrettier = require.resolve('eslint-config-prettier');
const configPrettier = require(eslintConfigPrettier);

module.exports = [
  {
    files: ['**/*.ts', '**/*.js'],
    ignores: ['**/dist/**', '**/node_modules/**'],
    languageOptions: {
      parser: parserInstance,
      globals: {
        ...globals.commonjs,
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      }
    },
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      // prettier
      indent: ['error', 'space'],
      'prettier/prettier': [2, { useTabs: false }],
      'prettier/prettier': [
        'warn',
        // LF and CRLF
        {
          endOfLine: 'auto',
          useTabs: false
        }
      ],
      semi: 'error',
      'no-unused-vars': 'warn',
      'prefer-const': 'error'
    }
  }
];
