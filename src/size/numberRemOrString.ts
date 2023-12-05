import size from "./size";
import { sizeRegex } from "./regex";
import type { SizeKeys } from "./types";

/**
 * "[5/6]", "fit", "[5%]", "auto", "screen", "[56rem]", "569", "[569]"
 * @param {string[]} regexReturn - Array from the return of exec regex numberOrBracket.
 * @returns {string} value+units well process
 */
export function numberRemOrString(y: string): string | SizeKeys {
	if (sizeRegex.fraction.test(y)) return size[y as SizeKeys];
	else if (!Number.isNaN(Number(y))) {
		return `${Number(y) / 4}rem`;
	}
	return size[y as SizeKeys] ?? y;
}
