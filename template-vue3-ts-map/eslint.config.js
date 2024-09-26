import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import parserVue from 'vue-eslint-parser';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineFlatConfig } from 'eslint-define-config';
import fs from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const autoImportPath = fileURLToPath(new URL('./.eslintrc-auto-import.json', import.meta.url));
const globalPath = fileURLToPath(new URL('./.eslint.globals.json', import.meta.url));
const importJson = JSON.parse(fs.readFileSync(autoImportPath, 'utf8'));
const globalJson = JSON.parse(fs.readFileSync(globalPath, 'utf8'));

export default defineFlatConfig([
  { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,vue}'] },
  {
    ignores: ['*dist/', 'node_modules/**/**', '*.svg', '**/*.d.ts', '*.min.js', '**/*.cjs'],
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  pluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024,
        ...globals.node,
        ...importJson.globals,
        ...globalJson.globals,
      },
      ecmaVersion: 'latest',
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        parser: tsEslint.parser,
      },
    },
    rules: {
      'no-undefined': 'error',
      'no-restricted-syntax': 'error',
      'no-global-assign': 'error',
      'no-unused-expressions': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/attributes-order': [
        'warn',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
        },
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          ignores: ['router-view', 'router-link', 'scroll-view'],
          registeredComponentsOnly: false,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': ['off'],
      '@typescript-eslint/no-namespace': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true }, parser: tsEslint.parser },
    },
  },
]);
