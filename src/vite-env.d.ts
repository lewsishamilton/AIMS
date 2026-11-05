/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Set to "owner" in a local `.env.local` to enable the stats editor. */
  readonly VITE_STATS_EDITOR?: string;
}

declare module "*.PNG" {
  const src: string;
  export default src;
}

declare module "*.JPG" {
  const src: string;
  export default src;
}

declare module "*.JPEG" {
  const src: string;
  export default src;
}
