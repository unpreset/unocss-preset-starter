import size from "./size";
//import { sizeRegex } from "./regex";
import type { SizeKeys, ReturnDico, IsNumberP, Finish } from "./types";
//import type fraction from "./fraction";

/**
 * "[5/6]", "fit", "[5%]", "auto", "screen", "[56rem]", "569", "[569]"
 * @param {string[]} regexReturn - Array from the return of exec regex numberOrBracket.
 * @returns {string} value+units well process
 */

const predicates = {
	NumberP(x): x is `${number}` {
		return !Number.isNaN(Number(x));
	},
	IncludesP(x): x is SizeKeys {
		return x in size;
	},
} as const satisfies Record<string, (x: string) => boolean>;

function convertToRem(x: `${number}`): `${number}rem` {
	const result = Number(x) / 4;
	return `${result}rem`;
}

export const numberRemOrString = (x: string): string => {
	if (predicates.NumberP(x)) {
		return convertToRem(x);
	} else if (predicates.IncludesP(x)) {
		return size[x];
	}
	return x;
};
