import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        // @ts-expect-error: import.meta.dirname is valid in ESM
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-console': 'off',
      'no-constant-condition': 'warn',
      // not work with prettier
      'no-multiple-empty-lines': ['error', { max: 5 }],
    },
  },
  tseslint.configs.recommended,
])
