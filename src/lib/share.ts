import { YEAR } from "@/api/constants";
import { downloadImage } from "@/lib/utils";
import { toBlob } from "html-to-image";
import { toCanvas } from "html-to-image";

//TODO: check if we can use the npm package
import loadMP4Module from "https://unpkg.com/mp4-wasm@1.0.6";

const imageFileName = `5kmrun-${YEAR}.png`;
const videoFileName = `5kmrun-${YEAR}.mp4`;
const title = `${YEAR} с 5kmrun.bg`;

const fps = 24;
const stroyDuration = 3;
const width = 720;
const height = 1280;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const shareVideo = async (
  elements: HTMLElement[],
  select: (idx: number) => void
) => {
  const MP4 = await loadMP4Module();
  const encoder = MP4.createWebCodecsEncoder({
    width,
    height,
    fps,
  });

  for (let i = 0; i < elements.length; i++) {
    select(i);

    for (let j = 0; j < stroyDuration * fps; j++) {
      console.time(`slide ${i} frame ${j}`);
      const canvas = await toCanvas(elements[i], {
        canvasWidth: width,
        canvasHeight: height,
      });

      await encoder.addFrame(canvas);
      console.timeEnd(`slide ${i} frame ${j}`);

      await sleep(1000 / fps);
    }
  }

  const buf = await encoder.end();

  const videoBlob = new Blob([buf], { type: "video/mp4" });

  await shareOrDownload(videoBlob, videoFileName);
};

export const shareImage = async (element: HTMLElement) => {
  // HACKY: Fix buggy image not loading on IOS
  // ref: https://github.com/bubkoo/html-to-image/issues/361#issuecomment-1442120307)
  await toBlob(element);
  await toBlob(element);
  await toBlob(element);

  const imageBlob = await toBlob(element, {
    backgroundColor: "#242424",
  });

  if (!imageBlob) return;

  await shareOrDownload(imageBlob, imageFileName);
};

const shareOrDownload = async (blob: Blob, fileName: string) => {
  const file = new File([blob], fileName, { type: blob.type });

  const shareData = {
    files: [file],
    title,
    text: title,
  };

  if (navigator.canShare?.(shareData)) {
    await navigator.share(shareData);
  } else {
    await downloadImage(blob, fileName);
  }
};
