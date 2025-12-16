import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
// import eslintReact from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
  tseslint.configs.recommended,
  // https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#configuration
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      pluginReact,
      prettier: prettierPlugin,
    },
    extends: ['js/recommended', prettierConfig],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-console': 'off',
      'no-constant-condition': 'warn',
      // not work with prettier
      'no-multiple-empty-lines': ['error', { max: 5 }],
      '@typescript-eslint/no-explicit-any': 'off',
      // custom rules for esLint -> forbidden import.meta.env access
      'no-restricted-syntax': [
        'error',
        {
          selector: '[object.type=MetaProperty][property.name=env]',
          message:
            'Do not use process.env directly. Use the env module instead.',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])
