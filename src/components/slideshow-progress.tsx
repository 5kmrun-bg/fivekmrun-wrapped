import { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { AutoplayType } from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

interface SlideShowProgressProps {
  api: CarouselApi;
  autoplayApi: AutoplayType;
  className?: string;
}

export function SlideShowProgress({
  api,
  autoplayApi,
  className,
}: SlideShowProgressProps) {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.slideNodes().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setProgress(0);
    });
  }, [api]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(() => {
        if (!autoplayApi.isPlaying()) {
          return 100;
        }

        const tillNext = autoplayApi.timeUntilNext() as number;
        const total = autoplayApi.options.delay as number;

        if (!tillNext) {
          return 0;
        }

        return (1 - tillNext / total) * 100;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [autoplayApi]);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex space-x-1">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="h-1 flex-grow bg-secondary rounded-full overflow-hidden opacity-50"
          >
            <div
              className={`h-full ${
                index <= current ? "bg-primary" : "bg-muted"
              }`}
              style={{
                width:
                  index === current
                    ? `${progress}%`
                    : index < current
                    ? "100%"
                    : "0%",
                transition: "width 0.1s linear",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
