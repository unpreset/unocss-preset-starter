import { includes, join, split, toLowerCase, trim } from "string-ts";

/**
 * @description join Set to make a string used at end of script
 * @param {Set<string>} 'list of Set of class
 * @returns {string} make one string with space all tailwind class
 */
export function lastJoin(x: Set<string>): string {
	return join([...x], " ");
}

/**
 * @description generate string final lg-hover:bg-red
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
 * @description Split inside the lg:[....] throw error if more than 2 elements in Array
 * @param {string} x
 * @returns {string[][]} Array of string or throw an error
 */

export const splitInsideBrakets = (x: string): string[][] => {
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
export const splitString = (arg_splitString: string | undefined): Set<string> => {
	eliminerUndefined<string>(arg_splitString, "splitString is undefined");
	const removeSpaceInString = (string: string): string => {
		return trim(string)
			.replace(/,+/g, " ")
			.replace(/\|+|\s+/g, ",");
	};
	let countBrackets = 0;
//                     ^?
	const result = new Set<string>();
	let currentElement: currentElement<typeof countBrackets> = "";
//                                                             ^?


	for (const char of removeSpaceInString(arg_splitString)) {
		if (char === "[") {
			countBrackets++;
		} else if (char === "]") {
			countBrackets--;
		}
		if (char === "," && countBrackets === 0) {
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
	return [...new Set(array)];
};

// Array.prototype.removeDuplicates = function () {
// 	return [...new Set(this)];
// };

export const regex: Record<string, RegExp> = {
	isRegexTest: new RegExp(":\\["),
	nestedBrackets: new RegExp("(\\w+):\\[(.+?)\\]|(\\w+)?:?(\\w+):\\[(.+?)\\]"),
	beforeCapture: new RegExp("(?<before>.*):\\[(?<cssInside>.*)\\]"),
	dynamicUnitBracks: new RegExp("(?<!:)\\[(?<cssDynamicUnit>\\d+[a-z]+)\\]"),
};
export function PredicatRegex(input: string): input is Regex {
	return regex.isRegexTest.test(input);
}
/**
 * @description temporary map to store regex and no regex
 */
export const TempMap = new Map<"isRegex" | "noRegex", Set<string>>([
	["isRegex", new Set()],
	["noRegex", new Set()]
]);


/**
 * 
 * projet de class a faire !!
 * ! test
 */
 class TempMapClass {
	yesOrNoRegex: "isRegex" | "noRegex";

	constructor(yesOrNoRegex: "isRegex" | "noRegex") {
		this.yesOrNoRegex = yesOrNoRegex;

	}
	TempMap = new Map<"isRegex" | "noRegex", Set<string>>([
		["isRegex", new Set()],
		["noRegex", new Set()]
	])
	mapGet<T extends Set<string>>( msg?: string): T {
		if (this.TempMap.get(this.yesOrNoRegex) instanceof Set && this.TempMap.has(this.yesOrNoRegex)) {
			const result = this.TempMap.has(this.yesOrNoRegex) && this.TempMap.get(this.yesOrNoRegex);
			eliminerUndefined<T>(result, msg);
			return result
		} else {
			throw new Error(`this.TempMap.has(params) ${msg}`);
		}
	}

}






/**
 * ancien object a supprimer pour
 * faire une class a ala place
 * @argument je sais pas 
 * 
 * 
 */
export const finalStringProcess = {
	/**
	 * OBJECTIF : Generer des arrays que je vais pouvoir manipuler pour ajouter la categorie en avant dernier 
	 * @returns [ "lg", "hover", "first", "orange" ]
	 * @returns {any}
	 */
	makeArrayFromTempMapNoRegex(): string[][] {
		return Array.from(TempMap.get("noRegex") ?? [], x => split(x, ":").filter(Boolean));
	},
	AddCatergoryToArray(array: string[][], category: Category): string[][] {
		for (const subArray of array) {
			subArray.splice(subArray.length - 1, 0, category);
		}
		return array;
	},
	makeFinalStringWithCategory(array: string[][]): string {
		const temp = new Set<string>()
	
		for (const subArray of array) {
			const before: string[] = subArray.slice(0, subArray.length - 2);
			const catAndCSS: string[] = subArray.slice(-2);

			const result = before.length > 0 ? `${before.join(":")}:${catAndCSS.join("-")}` : catAndCSS.join("-")
			temp.add(result)
		}
		return Array.from(temp).join(" ")
	}
}


/**
 * 
 * @param x : string
 * @returns send to the right TempMap if it's a regex or not
 * @description use predicate to know if it's a regex or not
 */
export function moveToSetIfNoRegex(x: string): void {
	if (PredicatRegex(x)) {
		TempMap.get("isRegex")?.add(x);
	} else {
		TempMap.get("noRegex")?.add(x);
	}
}


export const filterRegexOnly = (setFrom_splitString: Set<string>): Regex[] => {
	const listFoundRegex = Array.from(setFrom_splitString).filter(PredicatRegex);
	for (const eACH_splitString of setFrom_splitString) {
		if (listFoundRegex.some((listFoundRegex_ELEMENT) => includes(eACH_splitString, listFoundRegex_ELEMENT))) {
			setFrom_splitString.delete(eACH_splitString);
		}
	}
	return listFoundRegex;
};
export function eliminerUndefined<T>(input: unknown, msg?: string): asserts input is T {
	if (input === undefined) {
		throw new Error(msg ?? "Value is undefined");
	}
	if (input === null) {
		throw new Error(msg ?? "Value is null");
	}
}
export function isRegexP(input: string): asserts input is Regex {
	if (input === undefined) {
		throw new Error("Value is undefined function errorNoRegex");
	}
	if (!regex.isRegexTest.test(input)) {
		throw new Error("Value is not a regex Expression Valid !function errorNoRegex");
	}
}
