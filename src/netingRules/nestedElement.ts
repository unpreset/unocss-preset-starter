import { removeDuplicates, splitInsideBrakets, regex } from "./utils";
/**
 * @description   groups: { before: 'lg:hover', cssInside: 'first:red-100,last:green' } ]
 */
function nestedElement(x: string): NestedElementResult | Omit<NestedElementResult, "before"> {
	// Check if the string contains nested elements like "hover:[red,3xl]"
	const match: regexArray = x.match(regex.beforeCapture);

	if (regex.nestedBrackets.test(x) && match) {
		const obj = {
			_before: match?.groups?.before,
			_string: match?.groups?.cssInside,

			get beforefn(): Array<string> {
				if (this._before) {
					return removeDuplicates(this._before.split(":"));
				}
				return [];
			},
			get cssArraySpliterFn(): string[][] {
				if (this._string && !regex.nestedBrackets.test(this._string)) {
					return splitInsideBrakets(this._string);
				} else {
					//if another lg:[...] or hover:[...] inside the
					console.error("error important: ", this._string);
				}

				return [[]];
			},
		};

		return {
			before: obj.beforefn as Before[],
			cssInside: obj.cssArraySpliterFn,
		};
	} else {
		return {
			cssInside: splitInsideBrakets(x),
		};
	}
}

export default nestedElement;
