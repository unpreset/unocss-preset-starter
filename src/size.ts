export const size = {
	full: "100%",
	screen: "100vw",
	min: "min-content",
	max: "max-content",
	fit: "fit-content",
	fill: "fill",
} as const;

const keysOfSize: RegExp = new RegExp(`\\b${Object.keys(size).join("\\b\\s*|\\b")}\\b`);
export const sizeRegex: Record<string, RegExp> = {
	numberOrBracket: new RegExp(`(\\d+|\\[\\d+\\w*\\]|${keysOfSize}?)`),
	insideBrackets: new RegExp("\\[(\\d+\\w+|\\d+%)\\]"),
};

type SizeType = typeof size;
type SizeKeys = keyof SizeType;
type SizeValues = SizeType[SizeKeys];
type ReturnSizeFn<T> = T extends SizeKeys ? SizeValues : string;

export function numberRemOrString<T extends string>(x: T): ReturnSizeFn<T> {
	if (!Number.isNaN(Number(x))) {
		return `${Number(x) / 4}rem` as ReturnSizeFn<T>;
	} else if (Object.keys(size).includes(x as string)) {
		return size[x as SizeKeys] as ReturnSizeFn<T>;
	} else if (sizeRegex.insideBrackets.test(x)) {
		const match = sizeRegex.insideBrackets.exec(x);
		if (match) {
			const [, valueInsideBrackets] = match;
			return valueInsideBrackets as ReturnSizeFn<T>;
		}
	}
	return "error" as ReturnSizeFn<T>;
}
