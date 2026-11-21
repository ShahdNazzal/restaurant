/**
 * AURELIA image library — curated cinematic photography
 * All hosted on the z.ai OSS CDN for guaranteed reachability.
 */

const OSS = (path: string) =>
  `https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/${path}`;

export const IMAGES = {
  story: {
    plating: OSS("5f1029ae7204.jpeg"),
  },
};

export type ImageKey = keyof typeof IMAGES;
