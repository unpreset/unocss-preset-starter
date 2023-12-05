import size from "./size";

export type SizeType = typeof size;
export type SizeKeys = keyof SizeType;
export type SizeValues = SizeType[SizeKeys];
export type ReturnSizeFn<T> = T extends SizeKeys ? SizeValues : string;
