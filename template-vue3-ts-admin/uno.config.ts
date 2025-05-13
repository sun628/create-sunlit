// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
    }
  },

  presets: [presetUno(), presetAttributify()],
  // transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    // ...custom rules
    ['pointer', { cursor: 'pointer' }],
    ['flex-center', { display: 'flex', 'justify-content': 'center', 'align-items': 'center' }],
    ['flex-column', { display: 'flex', 'flex-direction': 'column' }],
    [
      'flex-between',
      { display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }
    ],
    ['flex-1', { flex: 1 }],
    ['bg-cover', { 'background-size': '100% 100%', 'background-repeat': 'no-repeat' }],
    ['disabled', { cursor: 'not-allowed', color: 'rgba(0, 0, 0, 0.25)' }]
  ]
});
