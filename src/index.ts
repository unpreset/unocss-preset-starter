import { definePreset } from "@unocss/core";
import type { Preset, Rule, Shortcut } from "unocss";
import Tailwind from "./netingRules";
import { replace } from "string-ts";

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
		name: "unocssjojo",
		rules: [
			[
				/^family-([a-zA-Z_]*)$/,
				([, c]: [null, string]) => {
					c &&= replace(c, "_", " ");

					return {
						"font-family": `${c}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
					};
				},
			],

			[
				/^flex\|([0-9])\|([0-9])\|?([a-z0-9%]{2,})?$/,
				([, grow, shrink, basis]: [unknown, number, number, string | undefined]) => {
					basis ??= "auto";
					if (Number(basis) && !basis.includes("%")) {
						basis &&= `${Number(basis) / 4}rem`;
					}
					return {
						flex: `${grow} ${shrink} ${basis}`,
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
				/^(p|m)-(\d+)-(\d+)?-?(\d+|auto)?-?(\d+|auto)?$/,
				([, PaddingOrMargin, t, r, b, l]:[unknown, "p" | "m", number, number, number | "auto", number | "auto"]) => {
					type isPad<T extends typeof PaddingOrMargin> = T extends "m" ? false : true;

					const isPadding = (<T extends typeof PaddingOrMargin>(x: T) => {
						return (x === "p") as isPad<"p">;
					})(PaddingOrMargin);

					const List: string[] = [];
					for (const e of [t, r, b, l].filter(Boolean)) {
						if (!e || e === "auto") {
							List.push("auto");
						} else List.push(`${Number(e) / 4}em`);
					}
					return isPadding ? { padding: List.join(" ") } : { margin: List.join(" ") };
				},
				{ autocomplete: "(p|m)-<num>-<num>-<num>-<num>" },
			],
			[
				/^(px|py|mx|my|gap)-(\d+)-?(\d+)?$/,
				([, direction, s, optional]: [unknown, "px" | "py" | "mx" | "my" | "gap", number, number]) => {
					const combination = {
						px: "padding-inline",
						py: "padding-block",
						mx: "margin-inline",
						my: "margin-block",
						gap: "gap",
					} as const satisfies Record<typeof direction, string>;

					const returndirection = combination[direction];
					let value = "";

					value = `${Number(s) / 4}rem`;
					value += optional ? ` ${Number(optional) / 4}rem` : "";

					return { [returndirection]: value };
				},
				{ autocomplete: "(gap|px|py|mx|my)-<num>-<num>" },
			],

			[
				/^inset-(x|y)-(\d+)-?(\d+)?$/,
				([, direction, s, optional]: [unknown, "x" | "y", number, number]) => {
					const combination = {
						x: "inset-inline",
						y: "inset-block",
					} as const satisfies Record<typeof direction, string>;

					const returndirection = combination[direction];
					let value = "";
					value = `${s}%`;
					value += optional ? ` ${+optional}%` : "";

					return { [returndirection]: value };
				},
				{ autocomplete: "inset-(x|y)-<num>-<num>" },
			],

			[
				/^size-(\d+)-?(\d+)?$/,
				([, s, optional]: [unknown, number, number]): Record<"block-size" | "inline-size", string>[] => {
					const sizeInRem: number = s / 4;
					return [
						{
							"block-size": `${sizeInRem}rem`,
							"inline-size": optional ? `${optional / 4}rem` : `${sizeInRem}rem`,
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
				([, rl_lr]: [unknown, "rl" | "lr"]): Record<string, `vertical-${typeof rl_lr}`> => {
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
				/^(grid|font|bg|border|stroke|outline|ring|divide|text|row|col)-\[(.*)\]$/,
				(match): string => {
					const [, category, stringElement] = match as [unknown, Category, string];
					return Tailwind(category, stringElement);
				},
			],
		] as Shortcut[],
	};
});
