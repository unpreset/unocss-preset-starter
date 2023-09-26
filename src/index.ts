import { definePreset } from '@unocss/core'

export interface StarterOptions {
  span?: number
}

export const presetStarter = definePreset((_options: StarterOptions = {}) => {
  const span = _options.span || 12

  return {
    name: 'unocss-preset-starter',
    // Customize your preset here
    rules: [
      ['custom-rule', { color: 'red' }],
      [
        /col-(\d+)/,
        ([_, s]) => ({ width: `calc(${s} / ${span} * 100%)` }),
        { autocomplete: 'col-<span>' },
      ],
    ],
    // Customize AutoComplete
    autocomplete: {
      shorthands: {
        span: Array.from({ length: span }, (_, i) => `${i + 1}`),
      },
    },
  }
})
