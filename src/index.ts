import { type Preset, definePreset } from 'unocss'

export interface StarterOptions {

}

export function presetStarter(_options: StarterOptions = {}): Preset {
  return definePreset({
    name: 'unocss-preset-starter',
    rules: [
      ['custom-rule', { color: 'red' }],
    ],
    // Customize your preset here
  })
}
