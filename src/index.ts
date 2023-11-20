import { definePreset } from "@unocss/core";
import type { Preset, Rule, Shortcut } from "unocss";
import Tailwind from "./netingRules";
import { replace, join } from "string-ts";
import { numberRemOrString } from "./netingRules/utils";

const digitPlusUnit: RegExp = /\d+(?:em|rem|%|vw)?/;
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
export const unocssPresetWindExtra = definePreset((): Preset => {
	return {
		name: "unocssPresetWindExtra",
		rules: [
			[
				/^family-([a-zA-Z_]*)$/,
				(match) => {
					let [, c] = match as [unknown, string];
					c &&= replace(c, "_", " ");

					return {
						"font-family": `${c}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
					};
				},
			],

			[
				/^flex\|(\d+)?\|(\d+)?\|?([0-9]+(?:em|rem|%|vw)?)?$/,
				([, grow, shrink, basis]: [unknown, number, number, string | "auto"]) => {
					if (basis) {
						if (Number(basis)) {
							basis &&= numberRemOrString(basis);
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
				([, direction, flexNumber]: [unknown, "row" | "col", IntRange<1, 10>]): Record<string, string> => {
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
				/^(p|m)-(\d+(?:em|rem|%|vw)?)-(\d+(?:em|rem|%|vw)?)?-?(\d+(?:em|rem|%|vw)?|auto)?-?(\d+(?:em|rem|%|vw)?|auto)?$/,
				([, PaddingOrMargin, t, r, b, l]) => {
					type isPad<T extends typeof PaddingOrMargin> = T extends "m" ? false : true;

					const isPadding = (<T extends typeof PaddingOrMargin>(x: T) => {
						return (x === "p") as isPad<"p">;
					})(PaddingOrMargin);

					const List: string[] = [];
					for (const e of [t, r, b, l].filter(Boolean)) {
						if (!e || e === "auto") {
							List.push("auto");
						} else List.push(numberRemOrString(e));
					}
					return isPadding ? { padding: List.join(" ") } : { margin: List.join(" ") };
				},
				{ autocomplete: "(p|m)-<num>-<num>-<num>-<num>" },
			],
			[
				new RegExp(`^(px|py|mx|my|gap)-(${digitPlusUnit.source})-?(${digitPlusUnit.source})?$`),
				([, direction, s, optional]: [unknown, "px" | "py" | "mx" | "my" | "gap", string, string]) => {
					const combination = {
						px: "padding-inline",
						py: "padding-block",
						mx: "margin-inline",
						my: "margin-block",
						gap: "gap",
					} as const satisfies Record<typeof direction, string>;

					const returndirection = combination[direction];
					let value = "";

					value = numberRemOrString(s);
					value += optional ? ` ${numberRemOrString(optional)}` : "";

					return { [returndirection]: value };
				},
				{ autocomplete: "(gap|px|py|mx|my)-<num>-<num>" },
			],

			[
				new RegExp(`^inset-(x|y)-(${digitPlusUnit.source})-?(${digitPlusUnit.source})?$`),
				([, direction, s, optional]: [unknown, "x" | "y", string, string]) => {
					const combination = {
						x: "inset-inline",
						y: "inset-block",
					} as const satisfies Record<typeof direction, string>;

					const returndirection = combination[direction];
					let value = "";
					value = numberRemOrString(s);
					value += optional ? ` ${numberRemOrString(optional)}` : "";

					return { [returndirection]: value };
				},
				{ autocomplete: "inset-(x|y)-<num>-<num>" },
			],

			[
				new RegExp(`^size-(${digitPlusUnit.source})-?(${digitPlusUnit.source})?$`),
				([, s, optional = s]: [unknown, string, string]): Record<"block-size" | "inline-size", string>[] => {
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
				/^(mx|my|mt|mb|ml|mr)-trim$/,
				([, s]: [unknown, "mx" | "my" | "mt" | "mb" | "ml" | "mr"]): Record<"margin-trim", "inline" | "block" | "block-start" | "block-end" | "inline-start" | "inline-end">[] => {
					const dictionary = {
						mx: "inline",
						my: "block",
						mt: "block-start",
						mb: "block-end",
						ml: "inline-start",
						mr: "inline-end",
					} as const satisfies Record<typeof s, string>;

					const resultFunction = (x: keyof typeof dictionary) => dictionary[x];

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
					for (const e of returnArr) {
						result[e] = `vertical-${rl_lr}`;
					}
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
				new RegExp(`^(${join(Category, "|")})-\\[(.*)\\]$`),
				(match): string => {
					const [, category, stringElement] = match as [unknown, Category, string];
					return Tailwind(category, stringElement);
				},
			],
		] as Shortcut[],
	};
});

export default unocssPresetWindExtra;
