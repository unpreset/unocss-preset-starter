## Features

We like the tailwindcss syntax, but it's often too long to read. Today, with unocss and this preset, you can reduce tailwindcss syntax by 30% and improve code readability.
![Reduce 30% tailwind syntax](https://github.com/jojojojojoj5564656465465/unocss-preset-starter/assets/45184918/efb0180e-38f5-4360-89f5-92b646995de1)

### Liste des Shortcuts
- Flexbox
- Pading / margin
- margin-inline / pading-inline
- margin-trim
- Size
- inset-x or inset-y
- flex-grow flex-shrink flex-basis
- Compress tailwind Line 30%

## Usage
```shell
pnpm i -D unocss-preset-starter unocss presetWind
```

```ts
// uno.config.ts
import {presetWind, defineConfig } from 'unocss'
import { presetStarter } from 'unocss-preset-starter'

export default defineConfig({
  presets: [
    // ...
    presetWind(),
    presetStarter(),
  ],
})
```

```md
px-6-10 = pl-6 pr-10
mx-6-10 = ml-6 mr-10
inset-x-6-9 = inset-inline: 6% 9%;
inset-y-6-9 =  inset-block: 6% 9%;
m-5-6-9-10
p-6-4-8-201
p-6-4
p-6-4-8
p-6-4-auto-auto
flex-col-6 flex-row-1 flex-row-2 flex-row-6 
text-[red,hover:orange]
bg-[red,lg:[hover:green-100,green-600],md:pink]
flex|10|50|500 = grow-10 shrik-50 basis-500
size-60 = w-60 h-60
mx-trim | my-trim | mt-trim = margin-trim:block-end etc...
```
## Compress 
### Merge rules for : 
"font" | "text" | "bg" | "border" | "stroke" | "outline" | "underline" | "ring" | "divide";
It reqiuere the ```presetWind()``` to work because it convert to tailwindcss class
#### from:
text-[red,hover:orange,md:hover:[green,blue,first:green]]
#### to:
text-red hover:text-orange md:hover:text-green md:hover:text-blue md:hover:first:text-green


## Flexbox shortcut
![flexbox](https://github.com/jojojojojoj5564656465465/unocss-preset-starter/assets/45184918/f498deac-e3b2-40b0-96f6-a73c37f85553)
Decompose the layout of the divs in a grid from 1 to 9.

```md
flex-row-1 flex-row-2 flex-row-3 flex-row-4 flex-row-5 flex-row-6 flex-row-7 flex-row-8 flex-row-9
flex-col-1 flex-col-2 flex-col-3 flex-col-4 flex-col-5 flex-col-6 flex-col-7 flex-col-8 flex-col-9
```
### unocss to tailwindcss exemple:
```md
flex-col-4 = justify-items-start items-center flex flex-col
```
```html
<div class="flex-col-4">
  <div class="size-20 p-4-2">01</div>
  <div class="size-20 p-4-2">02</div>
  <div class="size-20 p-4-2">03</div>
</div>
```



https://github.com/jojojojojoj5564656465465/unocss-preset-starter/assets/45184918/d43fa35e-5c34-400c-bc0c-110752c96d05



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
