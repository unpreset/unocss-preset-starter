import size from "./size";

// Create a type from the size object
export type SizeType = typeof size;

// Extract keys of the size object
export type SizeKeys = keyof typeof size;

// Extract values of the size object
export type SizeValues = SizeType[SizeKeys];

//export type NumInString<LIGHHHT extends string> = LIGHHHT extends `${number}` ? string : LIGHHHT extends keyof SizeType ? SizeType[LIGHHHT] : never;

type fraction<F extends string> = F extends `${number}/${number}` ? `${number}%` : never;
export type IsNumberP<N> = N extends `${number}` ? `${string}rem` : never;
export type ReturnDico<P extends string> = P extends SizeKeys ? SizeType[P] : never;
export type BeforeInArr<A extends unknown[]> = A extends [...infer B, infer C] ? B : never;
export type CssInArr<A extends unknown[]> = A extends [...infer B, infer C] ? C : never;
