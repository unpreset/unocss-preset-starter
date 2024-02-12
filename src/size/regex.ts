import size from "./size";

const keysOfSize: string = Object.keys(size).join("\\b|\\b");

type IsARRAy<T> = T extends string[] ? string[] : never;

export const sizeRegex = {
	fraction: new RegExp("\\d\\/\\d\\b"),
	insideBracketsString: "\\[(\\d+\\w+?|\\d+%|\\d\\/\\d)\\]",
	get numberOrBracket() {
		return new RegExp(`((?<!\\[)\\d+|${this.insideBracketsString}|/${keysOfSize})`);
	},

	cleanerARRAY<A extends string[]>(arr: A): IsARRAy<A> {
		
		if (Array.isArray(arr)) {

			const exceptInArray = ["-", "["];
			return arr?.filter((x: string) => !exceptInArray.some((d) => x.includes(d))) as IsARRAy<A>;
		}
		throw new Error(`${arr} is not an array`);
	},
};
