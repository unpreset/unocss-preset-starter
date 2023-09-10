import { defineConfig } from 'unocss'
import { presetStarter } from './src'

// Just for Vscode Extension

export default defineConfig({
  presets: [
    presetStarter(),
  ],
})
