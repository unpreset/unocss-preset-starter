/**
 * GENERATE 2 TO 7 LIKE 1/2 3/4 5/7 6/7 and make dictionary
 * @param {number} x how big do you want fraction
 * @default x 7
 * @example
 * {1/2: 50%};
 * {1/3: 33%};
 *
 * @returns {object} DICTIONARY
 */
export type fraction = `${number}/${number}`;
type pourcentage = `${number}%`;

export const fraction = (x = 8): Record<fraction, pourcentage> => {
	const obj: Record<fraction, pourcentage> = {};
	for (let i = 1; i < x; i++) {
		for (let j = 1; j < i; j++) {
			obj[`${j}/${i}`] = `${(j / i) * 100}%`;
		}
	}
	return obj;
};
export default fraction;
