/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "mp4-wasm/build/mp4" {
  export default function loadMP4Module(): Promise<any>;
}

declare module "https://unpkg.com/mp4-wasm@1.0.6" {
  export default function loadMP4Module(): Promise<any>;
}
