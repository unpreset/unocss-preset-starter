type regexArray = RegExpMatchArray | null;

type Category = "font" | "text" | "bg" | "border" | "stroke" | "outline" | "underline" | "ring" | "divide";
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
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

