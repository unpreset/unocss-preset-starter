import { createGenerator } from 'unocss'
import { expect, test } from 'vitest'
import { presetStarter } from '../src'

test('presetStarter', async () => {
  const uno = createGenerator({
    presets: [presetStarter()],
  })
  const presets = uno.config.presets
  expect(presets).toHaveLength(1)
})
