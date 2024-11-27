import { downloadImage } from "@/lib/utils";
import { toBlob } from "html-to-image";

const imageFileName = "5kmrun-wrapped.png";

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

  const shareData = {
    files: [
      new File([imageBlob], imageFileName, {
        type: imageBlob.type,
      }),
    ],
    title: "Моята година с 5kmrun.bg",
    text: "Моята година с 5kmrun.bg",
  };

  if (navigator.canShare?.(shareData)) {
    await navigator.share(shareData);
  } else {
    await downloadImage(imageBlob, imageFileName);
  }
};
