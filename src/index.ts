import type { Preset } from '@unocss/core'
import { definePreset } from '@unocss/core'

export interface StarterOptions {
  maxSpan?: number
}

export const presetStarter = definePreset((_options: StarterOptions = {}): Preset => {
  const maxSpan = _options.maxSpan || 12

  return {
    name: 'unocss-preset-starter',
    rules: [
      ['custom-rule', { color: 'red' }],
      [
        /col-(\d+)/,
        ([_, span]) => ({
          width: `calc(${span} / ${maxSpan} * 100%)`,
        }),
        {
          autocomplete: 'col-<span>',
        },
      ],
    ],
    autocomplete: {
      // custom shorthand
      shorthands: {
        span: Array.from({ length: maxSpan }, (_, i) => `${i + 1}`),
      },
    },

    // Customize your preset here
  }
})
