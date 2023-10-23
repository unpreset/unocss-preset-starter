## Features
Reduce 30% tailwind syntax
## Usage
```shell
pnpm i -D unocss-preset-starter unocss presetWind
```

```ts
// uno.config.ts
import {	presetWind, defineConfig } from 'unocss'
import { presetStarter } from 'unocss-preset-starter'

export default defineConfig({
  presets: [
    // ...
    presetWind(),
    presetStarter(),
  ],
})
```

```html
px-6-10 = pl-6 pr-10
m-5-6-9-10
p-6-4-8-201
flex-col-6 flex-row-1 flex-row-2 flex-row-6 
text-[red,hover:orange]
bg-[red,lg:[hover:green],md:pink]
flex|10|50|500 = grow-10 shrik-50 basis-500
size-60 = w-60 h-60

```
## License

[MIT](./LICENSE) License © 2023 