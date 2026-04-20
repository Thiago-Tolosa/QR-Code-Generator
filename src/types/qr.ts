export type DotType =
  | "square"
  | "dots"
  | "rounded"
  | "extra-rounded"
  | "classy"
  | "classy-rounded";

export type CornerSquareType =
  | "square"
  | "dot"
  | "extra-rounded";

export type CornerDotType =
  | "square"
  | "dot";

export type FileImageState = {
  file?: File;
  previewUrl: string;
};