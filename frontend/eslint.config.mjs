import nextPlugin from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  ...tseslint.configs.recommended,

  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...nextPlugin.configs.recommended.rules
    }
  },

  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': ['error', {
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        printWidth: 100,
        trailingComma: 'es5',
        arrowParens: 'avoid',
        endOfLine: 'auto'
      }]
    }
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
];