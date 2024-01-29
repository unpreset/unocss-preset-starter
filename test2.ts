import { join, replace, split } from "string-ts";
import { splitString, filterRegexOnly, eliminerUndefined, errorNoRegex, splitInsideBrakets, moveToSetIfNoRegex, TempMap, isRegexP } from "./src/netingRules/utils";
type MatchRegex = {
	Before: Before[];
	css: string;
};

const tempSet = new Set<string>();
const a = "lg:hover:[red,focus:[green],hover:[blue]]";
//const mysplit = splitString(a);
// console.log('mysplit🔸🔸 ', mysplit);
//const allRegexList = filterRegexOnly(mysplit);

class IfRegex {
	texte: string;
	recursive? = true;

	constructor(texte: Regex, recurs: boolean) {
		this.texte = texte;
		this.recursive = recurs;
	}
	get _texte() {
		if (this.texte === undefined) throw new Error("this.texte is undefined");
		return this.texte;
	}
	set _texte(x: string) {

		this.isNestingRegex(x);
		this.texte = x;
	}
	#nestedBrackets: RegExp = new RegExp("(?<before>.*):\\[(?<css>.*)\\]");

	isNestingRegex(x = this.texte): x is Regex {
		return this.#nestedBrackets.test(x);
	}
	//#forLoopIncreament = 0;
	get numberOfBrackets(): NonNullable<number> {
		if ((this._texte.match(/\[/g) || []).length === (this._texte.match(/\]/g) || []).length) {
			return (this._texte.match(/\[/g) || []).length;
		}
		throw new Error("regex number issue [ != ]");
	}


	PredicatRegex(input: string): input is Regex {
		return this.regex.isRegexTest.test(input);
	}
	checkIfRegex(x: Regex | string): void {
		if (!this.PredicatRegex(x)) {
			console.log("its not regex🔸🔸");
			this.sendToMap("noRegex", x);
		} else {
			this.sendToMap("isRegex", x);

		}
	}
	sendToMap(name: "isRegex" | "noRegex", x: string) {
		TempMap.get(name)?.add(x);
	}

	regex = {
		isRegexTest: new RegExp(":\\["),
		before: new RegExp("^(?<before>.*?)(?=:\\[)"),
		css: new RegExp("(?<=:\\[)(?<css>.+)(?=\\])"),
	};
	createObjectFromRegex(regexVariable: string): Set<string> {
		this.PredicatRegex(regexVariable);
		const matchFn = (x: RegExp) => {
			const temp = regexVariable.match(x)?.[1]
			eliminerUndefined<string>(temp)
			return temp
		}
		const obj = {
			before: matchFn(this.regex.before),
			css: matchFn(this.regex.css),
		};

		//? mettre tempcss en un set afin eviter les duplicatae
		/**
		 * todo: mettre tempcss en un set afin eviter les duplicatae
		 */

		const tempCss = splitString(obj.css);
		// return tempCss?.forEach((e) => `${obj.before}:${e}`);
		const returnSet = new Set<string>();
		for (const e of tempCss) {
			returnSet.add(`${obj.before}:${e}`)
		}
		return returnSet
	}
	forloop() {

		const set = splitString(this._texte);
		for (const iterator of set) {
			this.checkIfRegex(iterator);
		}
		eliminerUndefined<Regex>(TempMap.get("isRegex"))
		let returnString = ""
		for (const iterator of TempMap.get("isRegex") || []) {
			const result = this.createObjectFromRegex(iterator);
			returnString = join(Array.from(result), ",");

		}
		this._texte = returnString


		/// J 'ai un map avec les regex et les noRegex


	}
}









//bg-[red,focus:[green],hover:[blue]]
const iterators = "xl:orange,lg:hover:[focus:[green,3xl],focusd:[green,3xl]]";
const splited = splitString(iterators);  ///good


for (const iterator of splited) {
	moveToSetIfNoRegex(iterator);
}

for (const iterator of TempMap?.get("isRegex") ?? []) {
	isRegexP(iterator);
	const aa = new IfRegex(iterator, true);
	aa.forloop();
	/**
	 * j'ai pu faire le premier loop il faut mettre
	 * la recursive pour finir
	 * 
	 * ! j'ai mis this.text comme string temporaire
	 */

	console.log(aa._texte)



	//eliminerUndefined<string>(bb, "createObjectFromRegex est undefined");

	//aa._texte = bb;
	//console.log('texte🔸🔸 ', aa._texte);
}
