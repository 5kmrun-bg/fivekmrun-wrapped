import { YEAR } from "@/api/constants";
import { downloadImage } from "@/lib/utils";
import { toBlob } from "html-to-image";
import { toCanvas } from "html-to-image";

//TODO: check if we can use the npm package
import loadMP4Module from "https://unpkg.com/mp4-wasm@1.0.6";

const imageFileName = `5kmrun-${YEAR}.png`;
const videoFileName = `5kmrun-${YEAR}.mp4`;

const fps = 1; // 1 frame per second is enough
const sotryDuration = 3;
const width = 720;
const height = 1280;

export const shareVideo = async (elements: HTMLElement[]) => {
  const MP4 = await loadMP4Module();
  const encoder = MP4.createWebCodecsEncoder({
    width,
    height,
    fps,
  });

  for (const element of elements) {
    const canvas = await toCanvas(element, {
      canvasWidth: width,
      canvasHeight: height,
    });

    for (let i = 0; i < sotryDuration * fps; i++) {
      await encoder.addFrame(canvas);
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
  const file = new File([blob], fileName, {
    type: blob.type,
  });

  const shareData = {
    files: [file],
    title: "Моята година с 5kmrun.bg",
    text: "Моята година с 5kmrun.bg",
  };

  if (navigator.canShare?.(shareData)) {
    await navigator.share(shareData);
  } else {
    await downloadImage(blob, fileName);
  }
};
