## Features
Reduce 30% tailwind syntax
Nous aimons la syntaxe tailwind mais cest souvent trop long à lire, aujourd'hui vous pouvez avec unocss et ce preset reduire de 30% la syntaxe tailwind et améliorer la lisibilité du code.

### Liste des Shortcuts
- Flexbox
- Pading / margin
- margin-inline / pading-inline
- margin-trim
- Size
- flex-grow flex-shrink flex-basis
- Compress tailwind Line 35%

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
![flexbox](https://github.com/jojojojojoj5564656465465/unocss-preset-starter/assets/45184918/f498deac-e3b2-40b0-96f6-a73c37f85553)




```html
px-6-10 = pl-6 pr-10
mx-6-10 = ml-6 mr-10
m-5-6-9-10
p-6-4-8-201
p-6-4
p-6-4-8
p-6-4-auto-auto
flex-col-6 flex-row-1 flex-row-2 flex-row-6 
text-[red,hover:orange]
bg-[red,lg:[hover:green],md:pink]
flex|10|50|500 = grow-10 shrik-50 basis-500
size-60 = w-60 h-60
mx-trim | my-trim | mt-trim = margin-trim:block-end etc...

```
## flexbox shortcut
Decomposer dans une grille de 1 à 9 la disposition des div 

```html
flex-row-1 flex-row-2 flex-row-3 flex-row-4 flex-row-5 flex-row-6 flex-row-7 flex-row-8 flex-row-9
flex-col-1 flex-col-2 flex-col-3 flex-col-4 flex-col-5 flex-col-6 flex-col-7 flex-col-8 flex-col-9
```

```css
.flex-row-2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
}
.flex-col-4 {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.flex-col-7 {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
}
```

## License

[MIT](./LICENSE) License © 2023 
