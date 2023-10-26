import nestedElement from "./nestedElement";
import { joinArray } from "./utils";

/**
 * Description Genere Set of strings with tailwind style. No duplicate inside
 * @param {Category} 'category of element (text,bg,border)'
 * @param {NestedElementResult} obj_Before_Css
 * @returns {Set} Set of tailwinds ready to spread...
 */
const generateSetOfStrings = (category: string, obj_Before_Css: NestedElementResult): Set<string> => {
	const FINAL_SET: Set<string> = new Set();

	let { cssInside } = obj_Before_Css;

	cssInside.flatMap((e) => {
		const temporaryMap = new Map();

		if (Object.hasOwn(obj_Before_Css, "before") || e.length > 1) {
			const tempState = e.slice(0, -1) as Before[];
			let { before } = obj_Before_Css as { before: Before[] };
			const tempSet_Before_State: Set<Before> = before && !!before.length ? new Set(before.concat(tempState)) : new Set(tempState);
			temporaryMap.set("state", [...tempSet_Before_State]) as Map<string, Before[] | null>;
		}
		temporaryMap.set("category_&&_css", [category, e.pop()!]) as Map<string, [Category, string]>; //[bg,red]
		const valuesArrayCatCSS: string[][] = Array.from(temporaryMap.values());
		const valuesArrayCatCss_JOIN: string = joinArray(valuesArrayCatCSS);
		FINAL_SET.add(valuesArrayCatCss_JOIN);
	});
	return FINAL_SET;
};

export default generateSetOfStrings;
