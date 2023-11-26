import { join } from "string-ts";
export const size = {
	full: "100%",
	screen: "100vw",
	min: "min-content",
	max: "max-content",
	fit: "fit-content",
	fill: "fill",
} as const;

const keysOfSize = join(Object.keys(size), "|");
export const digitPlusUnit: RegExp = new RegExp(`(\\d+(?:em|rem|%|vw|vh|svh|lvh|svw|lvw|dvw|svi|lvi|dvb)?|\b${keysOfSize}?)`);

type SizeType = typeof size;
type SizeKeys = keyof SizeType;
type SizeValues = SizeType[SizeKeys];
type ReturnSizeFn<T> = T extends SizeKeys ? SizeValues : string;

export function numberRemOrString<T extends string | SizeKeys>(x: T): ReturnSizeFn<T> {
	if (!Number.isNaN(Number(x))) {
		return `${Number(x) / 4}rem` as ReturnSizeFn<T>;
	} else if (Object.keys(size).includes(x as string)) {
		return size[x as SizeKeys] as ReturnSizeFn<T>;
	}
	return x as ReturnSizeFn<T>;
}
