import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:tailwindcss/recommended',
    'standard',
    'prettier',
  ),
  {
    rules: {
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      'no-extra-semi': 'off',
      'no-undef': 'off',
      semi: ['error', 'never'],
      'react/jsx-curly-brace-presence': [
        'error',
        { children: 'never', propElementValues: 'always' },
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Built-in types are first
            'external', // External libraries
            'internal', // Internal modules
            ['parent', 'sibling'], // Parent and sibling types can be mingled together
            'index', // Then the index file
            'object', // Object imports
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@app/**',
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]
