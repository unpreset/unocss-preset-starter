type regexArray = RegExpMatchArray | null;
type Category = "col" | "row" | "grid" | "font" | "text" | "bg" | "border" | "stroke" | "outline" | "underline" | "ring" | "divide";
type currentElement<T extends boolean> = T extends true ? "" : string;

type Before =
	| "hover"
	| "focus"
	| "focus-within"
	| "focus-visible"
	| "active"
	| "visited"
	| "target"
	| "first"
	| "last"
	| "only"
	| "odd"
	| "even"
	| "first-of-type"
	| "last-of-type"
	| "only-of-type"
	| "empty"
	| "disabled"
	| "enabled"
	| "checked"
	| "indeterminate"
	| "default"
	| "required"
	| "valid"
	| "invalid"
	| "in-range"
	| "out-of-range"
	| "placeholder-shown"
	| "autofill"
	| "read-only"
	| "before"
	| "after"
	| "first-letter"
	| "first-line"
	| "marker"
	| "selection"
	| "file"
	| "backdrop"
	| "placeholder"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "2xl"
	| "3xl"
	| "max-sm"
	| "max-md"
	| "max-lg"
	| "max-xl"
	| "max-2xl"
	| "dark"
	| "portrait"
	| "landscape"
	| "motion-safe"
	| "motion-reduce"
	| "contrast-more"
	| "contrast-less"
	| "print"
	| "aria-checked"
	| "aria-disabled"
	| "aria-expanded"
	| "aria-hidden"
	| "aria-pressed"
	| "aria-readonly"
	| "aria-required"
	| "aria-selected"
	| ("open" & string);

type StringElement<T = string | number> = T | Array<StringElement<T>>;

interface NestedElementResult {
	before?: Before[];
	cssInside: Array<string | Before>[];
}

interface finnalREturn {
	category: Category;
	before: Before[];
	state: Before[];
	css: [string];
}
type Mapp = Map<"Category", Category>;

/// flex number 1-9
type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

type InterValueFromColor<Color extends string> = Color extends `${infer N}-${infer C}-${infer T}` ? { namespace: N; color: C; tone: T } : never;

type TailwindExtra<Match extends string> = Match extends `${infer N extends Category}-[${infer C}]` ? { Category: N; stringElement: C } : never;
type SplitInsideBrakets<Inside extends string> = Inside extends `${infer N extends Before}:[${infer C}]` ? { before: N; stringElement: C } : string;

type JoinArrayResult<T extends Before[], U extends [Category, string]> = T extends [Before, Before] ? [string, `${Category}-${string}`] : T extends [Before] ? `${Category}-${string}` : never;

interface FixedLengthArray<T extends unknown[], L extends number> {
	length: L;
}
type LengthOfArray<Type extends readonly unknown[]> = Type["length"];
type LastInArray<Type extends unknown[]> = Type extends [...unknown[], infer R] ? R : never;
type RemoveLastInArray<Type extends unknown[]> = Type extends [...infer R, unknown] ? R : never;

type inff<T extends string> = T extends `bg-${infer N extends string}` ? N : never;

type LastOrString<Type extends string | string[]> = Type extends unknown[] ? LastInArray<Type> : Type;

type LastOfArray<T extends any[]> = T extends [...T[number], infer U] ? U : never;
type Pop<T extends unknown[]> = T extends [...infer R, infer _] ? R : never;
type Regex = `${string}:[${string}]`;

type IsRegex<RegexType> = RegexType extends `${infer Bef}:[${infer inside}]` ? true : false;

type IsRegex2<RegexType> = RegexType extends `${infer Bef}:[${infer inside}]`
	? {
			before: Bef;
			inside: inside;
	  }
	: never;

interface ReturnFlex {
	display: "flex";
	"flex-direction": "row" | "column";
	"justify-content": "start" | "center" | "end";
	"align-items": "start" | "center" | "end";
}
type UnionValueDictionary<T extends Record<string, string>> = T[keyof T];
