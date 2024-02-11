import { definePreset } from "@unocss/core";
import type { Preset, Rule, Shortcut } from "unocss";
import { replace } from "string-ts";
//import Tailwind from "./netingRules";
import { numberRemOrString, sizeRegex } from "./size";
import { removeDuplicateArrayPaddingOrMargin } from "./utils";
import { test2 } from "../test2";
import { removeDuplicates } from "./netingRules/utils";

const Category: Readonly<Category[]> = ["col", "row", "grid", "font", "text", "bg", "border", "stroke", "outline", "underline", "ring", "divide"];

/**
 * Liste des category available
 *
 * @typedef {Category}
 */

/**
 * Description placeholder
 *
 * @type {*}
 */
const unocssPresetWindExtra = definePreset((): Preset => {
	return {
		name: "unocssPresetWindExtra",
		rules: [
			[
				/^family-([a-zA-Z_]*)$/,
				(match) => {
					const [, c = "Arial"] = match;
					const d = c && replace(c, "_", " ");

					return {
						"font-family": `${d}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
					};
				},
			],

			[
				/^flex\|(\d+)?\|(\d+)?\|?([0-9]+(?:em|rem|%|vw)?)?$/,
				([, grow = 0, shrink = 1, basis]: [unknown, number, number, string | "auto"]) => {
					if (basis) {
						if (Number(basis)) {
							const basisUp = numberRemOrString(basis);

							return {
								flex: `${grow} ${shrink} ${basisUp}`,
							};
						}
						return {
							flex: `${grow} ${shrink} ${basis}`,
						};
					}
					return {
						flex: `${grow} ${shrink}`,
					};
				},
				{ autocomplete: "flex|<num>|<num>|(<num>|auto)" },
			],
			[
				/^flex-(row|col)-([1-9])$/,
				([, direction = "row", flexNumber]: [unknown, "row" | "col", IntRange<1, 10>]): ReturnFlex => {
					type PositionProps = Readonly<"start" | "center" | "end">;
					const positions = {
						1: ["start", "start"],
						2: ["center", "start"],
						3: ["end", "start"],
						4: ["start", "center"],
						5: ["center", "center"],
						6: ["end", "center"],
						7: ["start", "end"],
						8: ["center", "end"],
						9: ["end", "end"],
					} as const satisfies Record<typeof flexNumber, readonly [PositionProps, PositionProps]>;
					type Direction<T extends "row" | "col"> = T extends "col" ? "column" : "row";
					const columORrow: Direction<typeof direction> = direction === "row" ? "row" : "column";

					const [justify, align] = positions[flexNumber];

					return {
						display: "flex",
						"flex-direction": columORrow,
						"justify-content": justify,
						"align-items": align,
					};
				},
				{ autocomplete: "flex-(col|row)-(1|2|3|4|5|6|7|8|9)" },
			],
			[
				new RegExp(`^(p|m)-${sizeRegex.numberOrBracket.source}-${sizeRegex.numberOrBracket.source}-?${sizeRegex.numberOrBracket.source}?-?${sizeRegex.numberOrBracket.source}?-?${sizeRegex.numberOrBracket.source}?$`),
				(match) => {

					const [PaddingOrMargin, ...t_r_b_l]: string[] = sizeRegex.cleanerARRAY(match);
					type isPad<T extends typeof PaddingOrMargin> = T extends "m" ? false : true;
					const isPadding = (<T extends typeof PaddingOrMargin>(x: T) => {
						return (x === "p") as isPad<"p">;
					})(PaddingOrMargin);

					const List: string[] = [];
					for (const e of removeDuplicateArrayPaddingOrMargin(t_r_b_l)) {
						List.push(numberRemOrString(e));
					}
					return isPadding ? { padding: List.join(" ") } : { margin: List.join(" ") };
				},
				{ autocomplete: "(p|m)-<num>-<num>-<num>-<num>" },
			],
			[
				new RegExp(`(^(?:p|m)(?:x|y)|gap)-(${sizeRegex.numberOrBracket.source}-?(${sizeRegex.numberOrBracket.source})?)$`),
				(match: string[]) => {
					const [direction, ...valueRegex] = sizeRegex.cleanerARRAY(match) as ["px" | "py" | "mx" | "my" | "gap", ...string[]];
					const [s, optional] = [...new Set(valueRegex)];
					const combination = {
						px: "padding-inline",
						py: "padding-block",
						mx: "margin-inline",
						my: "margin-block",
						gap: "gap",
					} as const satisfies Record<typeof direction, string>;
					const returnDirection: UnionValueDictionary<typeof combination> = combination[direction];
					let value = "";
					value = numberRemOrString(s);
					value += optional ? ` ${numberRemOrString(optional)}` : "";
					return { [returnDirection]: value };
				},
				{ autocomplete: "(gap|px|py|mx|my)-<num>-<num>" },
			],

			[
				new RegExp(`^inset-(x|y)-(${sizeRegex.numberOrBracket.source}-?(${sizeRegex.numberOrBracket.source})?)$`),
				(match: string[]) => {
					const [direction, ...valueRegex] = sizeRegex.cleanerARRAY(match) as ["x" | "y", ...string[]];
					const [s, optional] = removeDuplicates(valueRegex); //[...new Set(valueRegex)];
					const combination = {
						x: "inset-inline",
						y: "inset-block",
					} as const satisfies Record<typeof direction, string>;

					const returnDirection = combination[direction];
					let value = "";
					value = numberRemOrString(s);
					value += optional ? ` ${numberRemOrString(optional)}` : "";

					return { [returnDirection]: value };
				},
				{ autocomplete: "inset-(x|y)-<num>-<num>" },
			],

			[
				new RegExp(`^size-(${sizeRegex.numberOrBracket.source}-?(${sizeRegex.numberOrBracket.source}?)?)$`),
				(match: string[]): Record<"block-size" | "inline-size", string>[] => {
					const valueRegex = sizeRegex.cleanerARRAY(match);
					const [s, optional = s] = [...new Set(valueRegex)] as [string, string];
					return [
						{
							"block-size": numberRemOrString(s),
							"inline-size": numberRemOrString(optional),
						},
					];
				},
				{ autocomplete: "size-<num>-<num>" },
			],
			[
				/(?<direction>^m(?:(x|y|t|b|l|r)))-trim\b$/,
				([, s]: [unknown, "mx" | "my" | "mt" | "mb" | "ml" | "mr"]): Record<"margin-trim", "inline" | "block" | "block-start" | "block-end" | "inline-start" | "inline-end">[] => {
					const dictionary = {
						mx: "inline",
						my: "block",
						mt: "block-start",
						mb: "block-end",
						ml: "inline-start",
						mr: "inline-end",
					} as const satisfies Record<typeof s, string>;

					const resultFunction = (x: keyof typeof dictionary): UnionValueDictionary<typeof dictionary> => dictionary[x];

					return [
						{
							"margin-trim": resultFunction(s),
						},
					];
				},
				{ autocomplete: "(mx|my|mt|mb|ml|mr)-trim" },
			],
			[
				/^vertical-(rl|lr)$/,
				([, rl_lr = "lr"]: [unknown, "rl" | "lr"]): Record<string, `vertical-${typeof rl_lr}`> => {
					const returnArr: string[] = ["-webkit-writing-mode", "-ms-writing-mode", "writingMode"];
					const result: Record<string, `vertical-${typeof rl_lr}`> = {};
					for (const e of returnArr) result[e] = `vertical-${rl_lr}`;

					return result;
				},
				{ autocomplete: "vertical-(rl|lr)" },
			],
			[
				/^grid-area-(\w+)$/,
				([, match]: [undefined, string]): Record<"grid-area", typeof match> => {
					return {
						"grid-area": match,
					};
				},
			],
		] as Rule[],
		shortcuts: [
			[
				new RegExp(`^(${Category.join("|")})-\\[(.*)\\]$`),
				(match): string => {
					const [, category, stringElement] = match as [unknown, Category, string];
					return test2(category, stringElement);
				},
			],
		] as Shortcut[],
	};
});

export default unocssPresetWindExtra;
