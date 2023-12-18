import { replace } from "string-ts";
import { splitString, filterRegexOnly } from "./src/netingRules/utils";

/* 
I want to make a code than will convert a string of text by removing brakets like my exemple i give you bellow. If you know tailwind it's to convert to a tailwind like syntax. My code is a typescript
code. 
input String : red,hover:green,lg:[orange,hover:[pink,center]]
Output string wanted : red,hover:green,lg:orange,lg:hover:pink,lg:hover:center

Edit the code i give you 
*/
class TailwindCompressor {
	texte: string;
	Temp: Map<string, string | undefined> = new Map();
	constructor(texte: string) {
		this.texte = texte;
		this.Temp.set("Initial", texte);
	}
	get _texte(): string {
		return this.texte;
	}
	set _texte(x: string) {
        this.texte = x;

	}
	get numberOfBrackets(): number {
		if ((this._texte.match(/\[/g) || []).length === (this._texte.match(/\]/g) || []).length) {
			return (this._texte.match(/\[/g) || []).length;
		}
		throw new Error("regex number issue [ != ]");
	}
	#nestedBrackets: RegExp = new RegExp("(?<before>\\w+):\\[(?<css>.+)\\]");
	isNestingRegex(x = this.texte): boolean {
		return this.#nestedBrackets.test(x);
	}
	TempInputUpdater(x: string) {
		const tempInput = this.#nestedBrackets.exec(x)?.[0] as string;
		this.Temp.set("Input", tempInput);
		this.TempBeforeUpdater();
		this.TempCssUpdater();
	}
	TempBeforeUpdater() {
		const beforeRegex = new RegExp("(?<before>.+):\\[");
		const before = this.Temp.get("Input")?.match(beforeRegex)?.groups?.before ?? "error Before regex";
		/**
		 * probeme avec la regex before
		 * je dois trouver une solution pour tout prendre et nin que le premier devant kes crochets
		 *
		 * / */
		if (before) {
			this.Temp.set("Before", before);
		} else {
			this.Temp.delete("Before");
		}
	}
	TempCssUpdater() {
		const css = this.Temp.get("Input")?.match(this.#nestedBrackets)?.groups?.css ?? "error";
		if (css) {
			this.Temp.set("Css", css as string);
		} else {
			console.log("else no css detected");
			this.Temp.delete("Css");
		}
	}
	beforeAndCss(x = this.Temp.get("Css") ?? "error beforeAndCss"): string {
		const BeforeSet: Set<string> = new Set();
		const before = this.Temp.get("Before") ?? "error : error :before";
		for (const element of before.split(":")) {
			BeforeSet.add(element);
		}
		return x
			.split(",")
			.map((e: string) => {
				const BeforeSetCSS = new Set();
				const css = (x: string): string => {
					const temp: string[] = x.split(":");
					for (const element of temp.slice(0, -1)) {
						if (element) {
							BeforeSetCSS.add(element);
						}
					}
					return temp.pop() ?? x;
				};
				const cssString = css(e);
				const before = [...BeforeSet, ...BeforeSetCSS].join(":");
				return `${before}:${cssString}`;
			})
			.join(",");
	}
	#forLoopIncreament = 0;
	forLoop() {
		if (this.#forLoopIncreament >= this.numberOfBrackets) {
			return this.Temp.get("Initial");
		}
		this.TempInputUpdater(this.Temp.get("Initial") ?? this._texte);
		for (let index = 1; index !== this.numberOfBrackets - this.#forLoopIncreament; index++) {
			if (this.Temp.has("Css")) {
				this.TempInputUpdater(this.Temp.get("Css") as string);
			}
		}
		this.Temp.set(this.Temp.get("Before") ?? "error before", this.Temp.get("Css") ?? "error css");
		this.Temp.set("Output", this.beforeAndCss());
		this.Temp.set("Initial", replace(this.Temp.get("Initial") as string, this.Temp.get("Input") as string, this.Temp.get("Output") as string));
		for (const iterator of ["Css", "Before", "Input", "Output"]) {
			this.Temp.delete(iterator);
		}
		this.#forLoopIncreament++;

		this.forLoop();
	}
}

const text = "lg:[red,hover:[green,3xl,first:[yellow,1xl]]]"; // lg:[orange,[hover,[pink,center]]]
const text3 = "lg:hover:[hg,bb,hh:yh,hh:bb:hh:bb]";
const text4 = "lg:[hg]";

const textInArray = splitString(text);
for (const e of filterRegexOnly(textInArray)) {
	const ccd = new TailwindCompressor(e);
	ccd.forLoop();
	const result = ccd.Temp.get("Initial") as string;
	ccd._texte = result
	console.log("text result ::🔸🔸 ", ccd.texte);
}
