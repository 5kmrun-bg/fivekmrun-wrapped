import { useEffect } from "react";
import joroAvatar from "./assets/joro-avatar.png";
import selfie from "./assets/backgrounds/selfie.png";
import kids from "./assets/backgrounds/kids.jpg";
import xlrun from "./assets/backgrounds/xlrun.jpg";
import run from "./assets/backgrounds/5kmrun.jpg";

const IMAGES = [
  selfie,
  kids,
  xlrun,
  run,
  joroAvatar,
];

export const BG = {
  selfie,
  kids,
  xlrun,
  run,
};

const preloadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(src);
    img.src = src;

    // Keep a ref to the image so the browser doesn't refetch it when actually needed
    window.preloadedAssets[src] = img;
  });

const preloadImages = async (images) => {
  console.log(`Preloading ${IMAGES.length} assets ...`);

  try {
    await Promise.all(images.map(preloadImage));
    console.log(`Finished preloading ${IMAGES.length} assets`);
  } catch (err) {
    console.error(`Failed to preload asset: ${err}`);
  }
};

const usePreloadImages = () => {
  useEffect(() => {
    window.preloadedAssets = {};
    preloadImages(IMAGES);
  }, []);
};

export default usePreloadImages;
