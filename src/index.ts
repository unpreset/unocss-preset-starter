import { definePreset } from "@unocss/core";
import type { Preset, Rule, Shortcut } from "unocss";
import { Tailwind } from "./netingRules";
type Category =
	| "font"
	| "text"
	| "bg"
	| "border"
	| "stroke"
	| "outline"
	| "underline"
	| "ring"
	| "divide";

export const presetStarter = definePreset((): Preset => {
	return {
		name: "unocssjojo",

		rules: [
			[
				/^family-([a-zA-Z_]*)$/,
				([, c]:[null,string]) => {
					c ??= c.replace("_", " ");
					return {
						"font-family": `${c}, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
					};
				},
			],

			[
				/^flex\|([0-9])\|([0-9])\|?([a-z0-9%]{2,})?$/,
				(match) => {
					let [, grow, shrink, basis] = match as [
						unknown,
						number,
						number,
						string,
					];
					if (Number(basis) && !basis.includes("%")) {
						basis &&= `${Number(basis) / 4}rem`;
					}
					basis ??= "auto";
					return {
						flex: `${grow} ${shrink} ${basis}`,
					};
				},
			],
			[
				/^flex-(row|col)-([1-9])$/,
				(match:unknown[]) => {
					const [, direction, number] = match as [
						unknown,
						"row" | "col",
						number,
					];
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
					} as const satisfies Record<
						number,
						readonly [PositionProps, PositionProps]
					>;
					type Direction<T extends "row" | "col"> = T extends "col" ? "column" : "row";
				
					const columORrow: Direction<typeof direction> =
						direction === "row"
							? "row"
							: "column";

					const [justify, align] = positions[number as keyof typeof positions];

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
				(match) => {
					let [, PaddingOrMargin, t, r, b, l] = match as [
						unknown,
						"p" | "m",
						number,
						number,
						number | "auto",
						number | "auto",
					];
					const isPadding: boolean = PaddingOrMargin === "m" ? false : true;
					const List: string[] = [];
					for (const e of [t, r, b, l].filter(Boolean)) {
						if (!e || e === "auto") {
							List.push("auto");
						} else List.push(`${Number(e) / 4}em`);
					}
					return isPadding
						? { padding: List.join(" ") }
						: { margin: List.join(" ") };
				},
				{ autocomplete: "p|m-<num>-<num>-<num>-<num>" },
			],
			[
				/^(px|py|mx|my)-(\d+)-?(\d+)?$/,
				(match) => {
					const [, direction, s, optional] = match as [
						unknown,
						"px" | "py" | "mx" | "my",
						number,
						number,
					];
					const combination = {
						px: "padding-inline",
						py: "padding-block",
						mx: "margin-inline",
						my: "margin-block",
					} as const satisfies Record<typeof direction, string>;

					const returndirection = combination[direction];

					let value = `${Number(s) / 4}em`;
					value += optional ? ` ${+optional / 4}em` : "";
					return { [returndirection]: value };
				},
				{ autocomplete: "px|py|mx|my-<num>-<num>" },
			],
			[
				/^size-(\d+)-?(\d+)?$/,
				([, s, optional]:[unknown, number,number]):Record<"block-size"|"inline-size",string>[] => {
					//let [, s, optional] = match as [unknown, number,number];
					const sizeInRem: number = s / 4;
					return [
						{
							"block-size": `${sizeInRem}rem`,
							"inline-size": optional ? `${optional/4}rem`:`${sizeInRem}rem`,
						}
					]
				},
				{ autocomplete: "size-<num>-<num>" },
			],
			[
				/^(mx|my)-trim$/,
				([, s]: [unknown, "mx" | "my"]): Record<"margin-trim","inline"|"block">[] => {
					//let [, s] = match as [unknown, "mx" | "my"];

				type ReturnFunction<T extends "mx" | "my"> = (x: T) => T extends "mx" ? "inline" : "block";

				interface Dictionary {
					mx: "inline";
					my: "block";
				} 

					type DictionaryWithFn = Dictionary & { fn: ReturnFunction<"mx" | "my"> };

					const dictionary: DictionaryWithFn  = {
						mx: "inline",
						my: "block",
						fn(x) {
							return this[x];
						},
					};

					return [
						{
							"margin-trim": dictionary.fn(s),
						},
					];
				},
				{ autocomplete: "mx|px-trim" },
			],
		] as Rule[],
		shortcuts: [
			[
				/^(font|bg|border|stroke|outline|ring|divide|text)-\[(.*)\]$/,
				(match):string => {
					const [, category, stringElement] = match as [
						unknown,
						Category,
						string,
					];
					return Tailwind(category, stringElement);
				},
			],
		] as Shortcut[],
	};
});