import { rmSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'

/**
 * Local checkouts may still hold Solar System Scope
 * public/textures/. Vite copies public/ into dist/
 * build would otherwise ship hundreds of MB that th
 * 【entity-GitHub¦canonical_name=GitHub】 deploys never see those dirs (.gitignore);
 */

const TEXTURE_ARCHIVES = ['full8k', 'raw8k', 'hd8k']

export default defineConfig({
  base: '/Earth-Dragon-589-Cosmic-Atlas/',
  plugins: [
    {
      name: 'omit-texture-archives',
      closeBundle() {
        for (const dir of TEXTURE_ARCHIVES) {
          rmSync(join('dist', 'textures', dir), { recursive: true, force: true })
        }
      },
    },
  ],
})
