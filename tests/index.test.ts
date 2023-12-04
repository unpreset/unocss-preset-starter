import { createGenerator } from 'unocss'
import { expect, it } from 'vitest'
import { presetStarter } from '../src'

it('presetStarter', async () => {
  const uno = createGenerator({
    presets: [presetStarter()],
  })
  const presets = uno.config.presets
  expect(presets).toHaveLength(1)

  const { css } = await uno.generate('col-1')

  expect(css).toMatchInlineSnapshot(`
    "/* layer: default */
    .col-1{width:calc(1 / 12 * 100%);}"
  `)
})
