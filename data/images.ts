import rawImages from "./images.json";

export type OpenImageAttribution = {
  sourcePage: string;
};

export type OpenImageRecord = {
  slug: string;
  filePath: string;
  license: string;
  title?: string;
  creator?: string;
  attribution: OpenImageAttribution;
};

const images = rawImages as OpenImageRecord[];

export default images;
