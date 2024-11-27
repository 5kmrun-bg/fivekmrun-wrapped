import { useEffect, useRef, useState } from "react";
import { loadStats } from "./stats";
import { Slideshow, Step } from "@/components/slideshow";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { createStories } from "@/stories";
import { Button } from "@/components/ui/button";
import { shareImage, shareVideo } from "@/lib/share";
import { Instagram, SquareArrowOutUpRight } from "lucide-react";

const Loading = () => (
  <div className="flex w-dvh h-dvh justify-center items-center text-2xl">
    Зареждане...
  </div>
);

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
      const elements = [...snapshotElement.children] as HTMLElement[];
      shareVideo(elements);
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
