import fraction from "./fraction";
export const size = {
	full: "100%",
	screen: "100vw",
	min: "min-content",
	max: "max-content",
	fit: "fit-content",
	fill: "fill",
	auto: "auto",
	...fraction(),
} as const;

export default size;
