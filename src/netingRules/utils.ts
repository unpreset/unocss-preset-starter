import { includes, split,trim } from 'string-ts'
/**
 * Description: join Set to make a string used at end of script
 * @param {Set<string>} 'list of Set of class
 * @returns {string} make one string with space all tailwind class
 */
export function lastJoin(x: Set<string>): string {
	return [...x].join(" ");
}

/**
 * generate string final lg-hover:bg-red
 * @param {string[][]} array
 * @returns {string}
 */
export function joinArray(array: string[][]): string {
	if (array.length === 2) {
		const [state, catANDcss] = array as [Before[], [Category, string]];
		const result: [string, `${Category}-${string}`] = [state.join(":"), `${catANDcss[0]}-${catANDcss[1]}`];
		return result.join(":");
	} else if (array.length === 1) {
		return array[0].join("-") as `${Category}-${string}`;
	} else {
		throw new Error("limite 2 arrays joinArray");
	}
}

/**
 * Split inside the lg:[....] throw error if more than 2 elements in Array
 * @param {string} x
 * @returns {string[][]} Array of string or throw an error
 */
export const splitInsideBrakets = (x: string): string[][] | never => {
	if (!["[", "]", "(", ")"].some((e) => includes(x,e))) {
		if ([",", ":"].some((e) => includes(x,e))) {
			const result: string[][] = [];
			const temp: string[] = removeDuplicates(split(x,","));
			for (const e of temp) {
				result.push(removeDuplicates(split(e, ":")));
			}
			return result;
		} else {
			return [[x]];
		}
	} else {
		throw new Error("error in Syntax ':' is missing OR '('  ')' IS NOT ALLOWED ");
	}
};

/**
 * Description first function to use to split by (,)
 * @param {string} arg_splitString
 * @returns {Set<string>}
 */

export const splitString = (arg_splitString: string): Set<string> => {
	const removeSpaceInString = (string: string): string => {
		return trim(string).replace(/,+/g, " ").replace(/\s+/g, ",").replace(/\|/g, ",");
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
			result.add(currentElement.toLowerCase().trim());
			currentElement &&= "";
		} else {
			currentElement += trim(char);
		}
	}
	if (trim(currentElement) !== "") {
		result.add(currentElement.toLowerCase().trim());
	}

	return result;
};

/**
 * Description: Remove duplicates in an array: [hover , hover, red]  = [hover , red]
 * @param {(string|Before)} array
 * @returns {string[]} without duplicate in a string[]
 */
export const removeDuplicates = (array: (string | Before)[]): string[] => {
	const result: string[] = [];
	for (const element of array) {
		if (!result.includes(element)) {
			result.push(element);
		}
	}
	return result;
};

export const regex: Record<string, RegExp> = {
	nestedBrackets: new RegExp("(\\w+):\\[(.+?)\\]|(\\w+)?:?(\\w+):\\[(.+?)\\]"),
	beforeCapture: new RegExp("(?<before>.*):\\[(?<cssInside>.*)\\]"),
};
