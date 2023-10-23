import { definePreset } from '@unocss/core'


export const presetStarter = definePreset(() => {


  return {
    name: 'unocss-jojo',
 
    rules: [
     [
			/^flex\|([0-9])\|([0-9])\|?([a-z0-9%]{2,})?$/,
			([, grow, shrink, basis]:[
					unknown,
					number,
					number,
					string
				]) => {
				// let [, grow, shrink, basis] = match as [
				// 	unknown,
				// 	number,
				// 	number,
				// 	string
				// ];
				if (Number(basis) && !basis.includes("%")) {
					basis &&= `${Number(basis) / 4}rem`;
				}
				basis ??= "auto";
				return {
					flex: `${grow} ${shrink} ${basis}`,
				};
			},
		],
    ],
    // Customize AutoComplete

  }
})
