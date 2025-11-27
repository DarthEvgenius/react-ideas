import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
// import eslintReact from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

// /**@type {import('eslint').Linter.FlatConfig} */
// export default [
//   {
//     plugins: {
//       react: pluginReact,
//       prettier: prettierPlugin
//     }
//   },
//   {
//     ignores: ['node_modules', 'dist']
//   },
//   js.configs.recommended,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.browser,
//         ...globals.es2022
//       },
//       parserOptions: eslintReact.configs.recommended.parserOptions
//     }
//   },
//   {
//     files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
//     rules: {
//       ...prettierConfig.rules,
//       // 'prefer-const': 'warn'
//     }
//   }
// ]

export default defineConfig([
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
    },
  },
  tseslint.configs.recommended,
  // https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#configuration
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
])
