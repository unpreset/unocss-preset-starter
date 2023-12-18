import { includes, join, split, toLowerCase, trim } from "string-ts";

/**
 * Description: join Set to make a string used at end of script
 * @param {Set<string>} 'list of Set of class
 * @returns {string} make one string with space all tailwind class
 */
export function lastJoin(x: Set<string>): string {
	return join([...x], " ");
}

/**
 * generate string final lg-hover:bg-red
 * @param {string[][]} array
 * @returns {string}
 */
export function joinArray(array: string[][]): string | never {
	switch (array.length) {
		case 2: {
			const [state, catANDcss] = array as [Before[], [Category, string]];
			const result: [string, `${Category}-${string}`] = [join(state, ":"), `${catANDcss[0]}-${catANDcss[1]}`];
			return join(result, ":");
		}
		case 1: {
			return join(array[0], "-") as `${Category}-${string}`;
		}
		default:
			throw new Error("limite 2 arrays joinArray");
	}
}

/**
 * Split inside the lg:[....] throw error if more than 2 elements in Array
 * @param {string} x
 * @returns {string[][]} Array of string or throw an error
 */
export const splitInsideBrakets = (x: string): string[][] | never => {
	if (!["[", "]", "(", ")"].some((e) => includes(x, e))) {
		if ([",", ":"].some((e) => includes(x, e))) {
			const result: string[][] = [];
			const temp: string[] = removeDuplicates(split(x, ","));
			for (const e of temp) {
				result.push(removeDuplicates(split(e, ":")));
			}
			return result;
		} else {
			return [[x]];
		}
	} else {
		throw new Error("error in Syntax ':[]' is missing OR '('  ')' IS NOT ALLOWED \n no dynamic values please \n\n ");
	}
};

/**
 * Description first function to use to split by (,)
 * @param {string} arg_splitString
 * @returns {Set<string>}
 */

export const splitString = (arg_splitString: string): Set<string> => {
	const removeSpaceInString = (string: string): string => {
		return trim(string)
			.replace(/,+/g, " ")
			.replace(/\|+|\s+/g, ",");
	};
	const result: Set<string> = new Set();
	let parenthesesCount = true;
	let currentElement: currentElement<typeof parenthesesCount> = "";

	for (const char of removeSpaceInString(arg_splitString)) {
		if (char === "[") {
			parenthesesCount = false;
		} else if (char === "]") {
			parenthesesCount = true;
		}
		if (char === "," && parenthesesCount === true) {
			result.add(trim(toLowerCase(currentElement)));
			currentElement &&= "";
		} else {
			currentElement += trim(char);
		}
	}
	if (trim(currentElement) !== "") {
		result.add(trim(toLowerCase(currentElement)));
	}

	return result;
};

/**
 * Description: Remove duplicates in an array: [hover , hover, red]  = [hover , red]
 * @param {(string|Before)} array
 * @returns {string[]} without duplicate in a string[]
 */
export const removeDuplicates = (array: (string | Before)[]): string[] => {
	const result = [...new Set(array)];
	return result;
};

export const regex: Record<string, RegExp> = {
	nestedBrackets: new RegExp("(\\w+):\\[(.+?)\\]|(\\w+)?:?(\\w+):\\[(.+?)\\]"),
	beforeCapture: new RegExp("(?<before>.*):\\[(?<cssInside>.*)\\]"),
	dynamicUnitBracks: new RegExp("(?<!:)\\[(?<cssDynamicUnit>\\d+[a-z]+)\\]"),
};
export const filterRegexOnly = (arrFrom_splitString: Set<string>): string[] => {
	return Array.from(arrFrom_splitString).filter((e) => regex.nestedBrackets.test(e));
};
