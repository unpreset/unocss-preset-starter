/**
 * Description
 REMOVE DUPLICATES IN MARGIN OR PADDING TO AVOID REPETITION IN CSS OUTPUT
 @example
  margin : 2px 2px 2px 2px
 */
export const removeDuplicateArrayPaddingOrMargin = (array: Array<string>): Array<string> => {
	switch (array.length) {
		case 2:
			if (array[0] === array[1]) {
				array.pop();
			}
			if (new Set(array).size === 1) {
				array.splice(1, 2);
			}
			break;
		case 3:
			if (array[1] === array[2]) {
				array.pop();
			}
			if (new Set(array).size === 1) {
				array.splice(1, 3);
			}
			break;
		case 4:
			if (array[0] === array[2]) {
				if (array[1] === array[3]) {
					array.splice(3, 1);
				}
				array.splice(2, 1);
			}
			if (new Set(array).size === 1) {
				array.splice(1, 3);
			}
			break;
		default:
			throw new Error("ARRAY IS TOO SHORT MUST BE AN ERROR");
	}
	return array;
};
