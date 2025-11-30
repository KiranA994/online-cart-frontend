// eslint.config.mjs
import { createConfigForNuxt } from '@nuxt/eslint-config';
import js from '@eslint/js';

export default createConfigForNuxt({
  // optionally pass config options here
}).append(
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': [
        'error',
        { allow: ['warn', 'error', 'group', 'groupEnd'] }
      ],
      'arrow-body-style': ['error', 'always'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'any',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ]
    }
  }
);
