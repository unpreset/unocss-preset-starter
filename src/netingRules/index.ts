import nestedElement from "./nestedElement";

import generateSetOfStrings from "./generateSetOfStrings";
import { splitString, lastJoin } from "./utils";

/**
 * Description Return a long string with all the tailwinds class seperate by a space
 * @param {Category} category from regex "font" | "text" | "bg" | "border" | "stroke" | "outline" | "underline" | "ring" | "divide"
 * @param {string} css what is inside the brakets []
 * @returns {String} long string
 */
export default function Tailwind(category: Category, css: string): string {
	const splitStringCSS = splitString(css);
	const finalSet: Set<string> = new Set();
	for (const a of splitStringCSS) {
		const nestedElementA = nestedElement(a);
			const generateSetOfStringsA = generateSetOfStrings(category, nestedElementA);
		finalSet.add(lastJoin(generateSetOfStringsA));
	}
	return lastJoin(finalSet);
}
