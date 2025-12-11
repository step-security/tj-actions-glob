import globals from 'globals'

import prettierConfig from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import loveConfig from 'eslint-config-love'

export default [
  { languageOptions: { globals: globals.browser }},
  {
    ignores: [
      'dist/**',
      'lib/**',
      'node_modules/**',
      'jest.config.js',
      'coverage/**'
    ]
  },
  {
    ...loveConfig,
    files: ["**/*.tsx", "**/*.ts"],
    rules: {
      ...loveConfig.rules,
      "@typescript-eslint/semi": ["error", "always"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/prefer-ts-expect-error": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/init-declarations": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
      "@typescript-eslint/no-import-type-side-effects": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "complexity": "off",
      "no-param-reassign": "off",
      "no-negated-condition": "off",
      "no-await-in-loop": "off",
      "logical-assignment-operators": "off",
      "import/enforce-node-protocol-usage": "off",
      "eslint-comments/require-description": "off",
      "no-import-assign": "off",
    },
  },
  prettierConfig, // Turns off all ESLint rules that have the potential to interfere with Prettier rules.
  eslintPluginPrettierRecommended,
]
