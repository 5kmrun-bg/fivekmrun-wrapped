import { useEffect } from "react";
import joroAvatar from "./assets/joro-avatar.png";

const IMAGES = [
  "https://5kmrun.bg/files/header_3_large.jpg",
  "https://5kmrun.bg/files/header_4_large.jpg",
  "https://5kmrun.bg/files/header_5_large.jpg",
  "https://5kmrun.bg/images/HaderSelfie.png",
  joroAvatar,
];

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
