import { useEffect, useState } from "react";
import selfie from "@/assets/backgrounds/selfie.jpg";
import kids from "@/assets/backgrounds/kids.jpg";
import xlrun from "@/assets/backgrounds/xlrun.jpg";
import run from "@/assets/backgrounds/5kmrun.jpg";

declare global {
  interface Window {
    preloadedAssets: Record<string, unknown>;
  }
}

const IMAGES = [selfie, kids, xlrun, run];

export const BG = {
  selfie,
  kids,
  xlrun,
  run,
};

const preloadImage = (src: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(src);
    img.src = src;

    // Keep a ref to the image so the browser doesn't refetch it when actually needed
    window.preloadedAssets[src] = img;
  });

const usePreloadImages = () => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    const preloadImages = async (images: string[]) => {
      console.log(`Preloading ${IMAGES.length} assets ...`);

      try {
        window.preloadedAssets = {};
        await Promise.allSettled(images.map(preloadImage));
        console.log(`Finished preloading ${IMAGES.length} assets`);
      } catch (err) {
        console.error(`Failed to preload asset: ${err}`);
      } finally {
        setImagesPreloaded(true);
      }
    };

    preloadImages(IMAGES);
  }, []);

  return imagesPreloaded;
};

export default usePreloadImages;
