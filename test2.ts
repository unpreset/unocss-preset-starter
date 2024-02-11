import { join, replace, split } from "string-ts";
import { splitString,  eliminerUndefined, moveToSetIfNoRegex, TempMap, isRegexP, finalStringProcess } from "./src/netingRules/utils";

class IfRegex {
	texte: string;
	constructor(texte: Regex) {
		this.texte = texte;
	}
	get _texte(): string {
		if (this.texte === undefined) throw new Error("this.texte is undefined");
		return this.texte;
	}
	set _texte(x: Set<string>) {
		const arr = Array.from(x).filter(Boolean)
		this.texte = join(arr, ":")
	}

	#nestedBrackets: RegExp = new RegExp("(?<before>.*):\\[(?<css>.*)\\]");
	isNestingRegex(x = this.texte): x is Regex {
		return this.#nestedBrackets.test(x);
	}

	PredicatRegex(input: string): input is Regex {
		return this.regex.isRegexTest.test(input);
	}
	checkIfRegexAndSendToMAP(x: Regex | string): void {
		function sendToMap(name: "isRegex" | "noRegex", x: string) {
			eliminerUndefined<Set<string>>(TempMap.get(name))
			return TempMap.get(name)?.add(x);
		}
		this.PredicatRegex(x) ? sendToMap("isRegex", x) : sendToMap("noRegex", x);
	}
	mapGet<T extends Set<string>>(params: "isRegex" | "noRegex", msg?: string): T {
		if (TempMap.get(params) instanceof Set && TempMap.has(params)) {
			const result = TempMap.has(params) && TempMap.get(params);
			eliminerUndefined<T>(result, msg);
			return result
		} else {
			throw new Error(`this.TempMap.has(params) ${msg}`);
		}
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
		const obj:Record<"before" | "css", string> = {
			before: matchFn(this.regex.before),
			css: matchFn(this.regex.css)
		
		};
		const tempCss = splitString(obj.css);
		const returnSet = new Set<string>();
		for (const e of tempCss) {
			returnSet.add(`${obj.before}:${e}`)
		}
		return returnSet
	}
	forloop() {

		const set = splitString(this._texte);
		for (const iterator of set) {
			this.checkIfRegexAndSendToMAP(iterator);
		}
		for (const iterator of this.mapGet("isRegex", 'problem isregex in foorLoop')) {
			const result: Set<string> = this.createObjectFromRegex(iterator);
			for (const el of result) {
				this.checkIfRegexAndSendToMAP(el);
			}
			this._texte &&= this.mapGet("noRegex", "problem noRegex in foorLoop");
		}
		
	}
}



export const test2 = (category:Category,x:string) => {
	
	
	const splitFromString: Set<string> = splitString(x);  ///good
	
	for (const iterator of splitFromString) {
		moveToSetIfNoRegex(iterator);
	}
	
	for (const iterator of TempMap?.get("isRegex") ?? []) {
		isRegexP(iterator);
		const aa = new IfRegex(iterator);
		aa.forloop();
	}
	
	const ArrayReadyToModify = finalStringProcess.makeArrayFromTempMapNoRegex()
	const AddCategory = finalStringProcess.AddCatergoryToArray(ArrayReadyToModify,category)
	const finalString = finalStringProcess.makeFinalStringWithCategory(AddCategory)
	return finalString
}
