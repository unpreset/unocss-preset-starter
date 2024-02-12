import fraction from "./fraction";
/**
 *  @link www.google.fr
 * 	@exports  full: "100%",	screen: "100lvw",	min: "min-content",	max: "max-content",	fit: "fit-content",	fill: "fill",	auto: "auto",
 */
export let size = {
	full: "100%",
	screen: "100lvw",
	min: "min-content",
	max: "max-content",
	fit: "fit-content",
	fill: "fill",
	auto: "auto",
} satisfies Record<string, string>;

size = Object.assign(size, fraction());

export default Object.freeze(size);
