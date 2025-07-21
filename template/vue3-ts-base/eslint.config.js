import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import parserVue from 'vue-eslint-parser';
import { configs as tsConfigs, parser as tsParser } from 'typescript-eslint';
import eslintPluginImportX, { flatConfigs as importXFlatConfigs } from 'eslint-plugin-import-x';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import importJson from './.eslintrc-auto-import.json' with { type: 'json' };
import globalJson from './.eslint.globals.json' with { type: 'json' };
const typeScriptExtensions = ['.ts', '.tsx', '.cts', '.mts'];

const allExtensions = [...typeScriptExtensions, '.js', '.jsx', '.cjs', '.mjs'];
export default [
  pluginJs.configs.recommended,
  importXFlatConfigs.recommended,
  importXFlatConfigs.typescript,
  ...tsConfigs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    plugins: {
      import: eslintPluginImportX
    }
  },
  pluginPrettierRecommended,
  { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,vue}'] },
  {
    ignores: ['*dist/', 'node_modules/**/**', '*.svg', '**/*.d.ts', '*.min.js', '**/*.cjs']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024,
        ...globals.node,
        ...importJson.globals,
        ...globalJson.globals
      },
      ecmaVersion: 'latest',
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        parser: tsParser
      }
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
        'vue-eslint-parser': ['.vue']
      },
      'import-x/extensions': allExtensions,
      'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
      'import-x/parsers': {
        '@typescript-eslint/parser': [...typeScriptExtensions]
      },
      'import-x/resolver': {
        alias: {
          map: [
            ['@', './src'],
            ['@base-components', './src/components/base-components'],
            ['@business-components', './src/components/business-components']
          ],
          extensions: allExtensions
        },
        typescript: true
      }
    },
    rules: {
      'no-debugger': 'off',
      'no-restricted-syntax': 'error',
      'no-global-assign': 'error',
      'comma-dangle': 'off',
      'no-with': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': ['off'],
      '@typescript-eslint/no-namespace': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off', // 允许非空断言运算符(!)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': false,
          'ts-expect-error': 'allow-with-description'
        }
      ],
      'prefer-const': [
        'warn',
        {
          destructuring: 'all', // 仅当所有变量都可以const化时才提示
          ignoreReadBeforeAssign: true // 忽略在声明前被读取的变量
        }
      ],
      'import-x/no-unresolved': [
        'error',
        {
          ignore: ['^virtual:.*', 'virtual:uno.css']
        }
      ]
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          ignores: ['router-view', 'router-link', 'scroll-view', '/^a-/'],
          registeredComponentsOnly: false
        }
      ]
    }
  }
];
