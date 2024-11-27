import { useEffect, useRef, useState } from "react";
import { loadStats } from "./stats";
import { Slideshow, Step } from "@/components/slideshow";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { createStories } from "@/stories";
import { Button } from "@/components/ui/button";
import { shareImage } from "@/lib/share";
import { Instagram, SquareArrowOutUpRight } from "lucide-react";
import { toJpeg } from "html-to-image";
import { downloadImage } from "./lib/utils";

//TODO: check if we can use the npm package
import loadMP4Module from "https://unpkg.com/mp4-wasm@1.0.6";

const Loading = () => (
  <div className="flex w-dvh h-dvh justify-center items-center text-2xl">
    Зареждане...
  </div>
);

const videoFileName = "video.mp4";

async function generateImageBlob(snapshotElement: HTMLElement) {
  const dataURI = await toJpeg(snapshotElement, { quality: 0.95 });
  return dataURI;
}

const cerateCanvasVideo = async (snapshotElement: HTMLElement) => {
  const fps = 30;
  const duration = 5; // seconds
  const width = 720;
  const height = 1280;

  const MP4 = await loadMP4Module();
  const encoder = MP4.createWebCodecsEncoder({
    width,
    height,
    fps,
  });

  const imageDataUri = await generateImageBlob(snapshotElement);
  const image = new Image();
  image.width = width;
  image.height = height;
  image.src = imageDataUri;
  image.onload = async () => {
    const imageBitmap = await createImageBitmap(image);
    for (let i = 0; i < duration * fps; i++) {
      // Add bitmap to encoder
      await encoder.addFrame(imageBitmap);
    }
    const buf = await encoder.end();

    console.log(buf);

    const videoBlob = new Blob([buf], { type: "video/mp4" });

    console.log(videoBlob);

    const videoFile = new File([videoBlob], videoFileName, {
      type: videoBlob.type,
    });

    console.log(videoFile);
    const shareData = {
      files: [videoFile],
      title: "Моята година с 5kmrun.bg",
      text: "Моята година с 5kmrun.bg",
    };

    // console.log(video);

    // if (navigator.canShare?.(shareData)) {
    //   await navigator.share(shareData);
    // } else {
    await downloadImage(videoBlob, videoFileName);
    // }
  };
};

export const StatsPage = ({ userId }: { userId: number }) => {
  const slideshowRef = useRef<HTMLDivElement>(null);
  const [stories, setStories] = useState(null as Step[] | null);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const load = async () => {
      const stats = await loadStats(userId);
      console.log(stats);
      const stories = createStories(stats);
      setStories(stories);
    };
    load();
  }, [userId]);

  const handleStep = (step: Step) => {
    const shouldShowShare = !!stories && step === stories[stories.length - 1];
    setShowShare(shouldShowShare);
  };

  const handleShare = async () => {
    const snapshotElement = slideshowRef.current;
    if (snapshotElement) {
      shareImage(snapshotElement);
    }
  };

  const handleShareVideo = async () => {
    const snapshotElement = slideshowRef.current;
    if (snapshotElement) {
      cerateCanvasVideo(snapshotElement);
    }
  };

  if (!stories) return <Loading />;

  return (
    <div className="flex w-dvh h-dvh justify-center items-center">
      <div className="max-h-[800px] h-dvh w-dvh aspect-[9/16]">
        <AspectRatio ratio={9 / 16} className="p-4">
          <Slideshow steps={stories} onStep={handleStep} ref={slideshowRef} />
        </AspectRatio>
      </div>

      {showShare && (
        <div className="flex gap-4 absolute bottom-8">
          <Button
            className="text-white text-lg rounded shadow bg-accent hover:bg-accent hover:scale-110 transition-all"
            onClick={handleShare}
          >
            <SquareArrowOutUpRight />
            <span>Сподели</span>
          </Button>

          <Button
            className="text-white text-lg rounded shadow bg-accent hover:bg-accent hover:scale-110 transition-all"
            onClick={handleShareVideo}
          >
            <Instagram />
            <span>Video</span>
          </Button>
        </div>
      )}
    </div>
  );
};
