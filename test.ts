import { join, replace, split } from "string-ts";
import { splitString, filterRegexOnly, eliminerUndefined, errorNoRegex } from "./src/netingRules/utils";

class TailwindCompressor {
	texte: Regex;
	Temp = new Map<"Initial" | "Css" | "Before" | "Input" | "Output" | string, string | Before>();
	constructor(texte: Regex) {
		this.texte = texte;
		this.Temp.set("Initial", texte);
	}
	get _texte(): string {
		if (this.texte === undefined) throw new Error("this.texte is undefined");
		return this.texte;
	}
	set _texte(x: Regex) {
		this.isNestingRegex(x);
		this.texte = x;
	}
	get numberOfBrackets(): NonNullable<number> {
		if ((this._texte.match(/\[/g) || []).length === (this._texte.match(/\]/g) || []).length) {
			return (this._texte.match(/\[/g) || []).length;
		}
		throw new Error("regex number issue [ != ]");
	}
	#nestedBrackets: RegExp = new RegExp("(?<before>\\w+):\\[(?<css>.+)\\]");

	isNestingRegex(x = this.texte): x is Regex {
		return this.#nestedBrackets.test(x);
	}
	mapGet<T extends string>(params: "Css" | "Before" | "Input" | "Output" | "Initial", msg?: string): T {
		if (!this.Temp.has(params)) throw new Error(`this.Temp.has(params) ${msg}`);
		const result = this.Temp.get(params);
		eliminerUndefined<T>(result, msg);
		return result;
	}

	TempInputUpdater(x: NonNullable<Regex>): void {
		const tempInput = this.#nestedBrackets.exec(x)?.[0];
		eliminerUndefined<string>(tempInput, "TempInputUpdater value is null|undefined");
		this.Temp.set("Input", tempInput);
		this.TempBeforeUpdater();
		this.TempCssUpdater();
	}
	TempBeforeUpdater(): void {
		const beforeRegex = new RegExp("(?<before>.*):\\[");
		const input = this.mapGet<string>("Input", "no Input in TempBeforeUpdater()");
		console.log("input🔸🔸 ", input);
		const before = input.match(beforeRegex)?.groups?.before; ///bug ici il ne prend pas tout
		console.log("before🔸🔸 ", before);
		eliminerUndefined<Before>(before, "no before undefined line 40");
		this.Temp.set("Before", before);
	}
	TempCssUpdater(): void {
		const Input = this.mapGet<string>("Input", "no css detected line 47");
		const css = Input?.match(this.#nestedBrackets)?.groups?.css;

		if (css) {
			this.Temp.set("Css", css);
		} else {
			console.log("else no css detected");
			this.Temp.delete("Css");
		}
	}
	#TemporarySet = new Set<string>();

	beforeAndCss(x = this.Temp?.get("Css")): string {
		eliminerUndefined<string>(x, "error this.Temp?.get(Css) line 54");
		const before = this.mapGet<Before>("Before", "no Before detected line 65");
		const BeforeSet = new Set<Before>();
		for (const element of split(before, ":")) {
			BeforeSet.add(element);
		}
		const SetUniqueToSend: string[] = x.split(",").map((e: string) => {
			const BeforeSetCSS = new Set<Before>();

			const SplitCssBefore = (x: string): string => {
				const temp: Array<string> = x.split(":");
				const tempBefore = temp.slice(0, -1) as Before[];
				for (const element of tempBefore) {
					BeforeSetCSS.add(element);
				}
				return temp.pop() ?? x;
			};

			const cssOnly = SplitCssBefore(e);
			const beforeMergeAll: string = join([...BeforeSet, ...BeforeSetCSS], ":");
			const result: string = `${beforeMergeAll}:${cssOnly}`;
			this.#TemporarySet.add(result);
			return result;
		});
		console.log("SetUniqueToSend🔸🔸 ", SetUniqueToSend);
		for (const iterator of SetUniqueToSend) {
			this.#TemporarySet.add(iterator);
		}

		return join(Array.from(this.#TemporarySet), ",");
	}
	#forLoopIncreament = 0;
	forLoop(forloopActivate = true) {
		if (this.#forLoopIncreament >= this.numberOfBrackets) {
			return this.mapGet<string>("Initial", "no Initial detected line 97");
		}

		//ne pas utiliser la fonction mapGet avant de tester car peut etre undefined a une utilité
		if (this.isNestingRegex(this.Temp.get("Initial") ?? this._texte)) {
			this.TempInputUpdater(this.Temp.get("Initial") ?? this._texte);
		}
		for (let index = 1; index !== this.numberOfBrackets - this.#forLoopIncreament; index++) {
			if (this.Temp.has("Css")) {
				this.TempInputUpdater(this.mapGet<string>("Css", "no css in forLoop Line 106"));
			} else {
				throw new Error("no css detected");
			}
		}
		const before = this.mapGet<Before>("Before", "no before detected line 113 in forLoop🦄🦄🦄");
		this.Temp.set(before, this.Temp.get("Css") ?? "error css");
		const beforeAndCss = this.beforeAndCss();
		eliminerUndefined<string>(beforeAndCss);
		this.Temp.set("Output", beforeAndCss);
		this.Temp.set("Initial", replace(this.Temp.get("Initial") as string, this.Temp.get("Input") as string, this.Temp.get("Output") as string));
		console.log("TEMP🔸🔸 ", this.Temp);
		// for (const iterator of ["Css", "Before", "Input", "Output"]) {
		// 	this.Temp.delete(iterator);
		// }
		if (forloopActivate === true) {
			this.#forLoopIncreament++;
			this.forLoop();
		}
	}
}

const text = "lg:hoveeeer:[orange,green,hover:orange]"; // lg:[orange,[hover,[pink,center]]]
//"lg:[red,hover:[green,3xl,first:[yellow,1xl]]],"
const arr = ["lg:hover:[orange,green,hover:orange]", "lg:[orange,[hover,[pink,center]]]", "lg:[red,hover:[green,3xl,first:[yellow,1xl]]]"];

const textInArray = splitString(text);
for (const e of filterRegexOnly(textInArray)) {
	const ccd = new TailwindCompressor(e);
	ccd.forLoop(false);
	ccd._texte = ccd.Temp.get("Initial");
	eliminerUndefined<string>(ccd._texte, "error this.Temp?.get(Css) line 54");
	console.log("ccd._texte🔸🔸 ", ccd._texte);

	textInArray.add(ccd.texte);
	//console.log("ici lorsque cest une regex🔸🔸 ", textInArray);
}
