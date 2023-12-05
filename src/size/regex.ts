import size from "./size";

const keysOfSize: string = Object.keys(size).join("\\b|\\b");

export const sizeRegex = {
	fraction: new RegExp("\\d\\/\\d\\b"),
	insideBracketsString: "\\[(\\d+\\w+?|\\d+%|\\d\\/\\d)\\]",
	get numberOrBracket() {
		return new RegExp(`((?<!\\[)\\d+|${this.insideBracketsString}|/${keysOfSize})`);
	},
	cleanerARRAY(arr: string[]): string[] | never {
		if (Array.isArray(arr) && arr !== null) {
			const exceptInArray = ["-", "["];
			return arr?.filter(Boolean)?.filter((x) => !exceptInArray.some((d) => x.includes(d)));
		}
		throw new Error(`${arr} is not an array`);
	},
};
