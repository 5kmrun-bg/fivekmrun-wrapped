/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SlideShowProgress } from "./slideshow-progress";
import Autoplay from "embla-carousel-autoplay";
import { Logo } from "@/stories/logo";

export type Step = {
  id: string;
  content: React.ReactNode;
};
export type SlideshowProps = {
  steps: Step[];
  onStep?: (step: Step) => void;
};

export const Slideshow = React.forwardRef<HTMLDivElement, SlideshowProps>(
  ({ steps, onStep }, ref) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const autoplayRef = React.useRef(
      Autoplay({ delay: 3000, stopOnInteraction: true, stopOnLastSnap: true })
    );

    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);

    const [activeIndex, setActiveIndex] = useState(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(false);
      dragStartX.current = e.clientX;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (Math.abs(e.clientX - dragStartX.current) > 5) {
        setIsDragging(true);
      }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging && api) {
        const containerRect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - containerRect.left;
        const containerWidth = containerRect.width;

        if (clickX < containerWidth / 2) {
          api.scrollPrev();
        } else {
          api.scrollNext();
        }
      }
      setIsDragging(false);
    };

    useEffect(() => {
      if (api && onStep) {
        const onSelect = () => {
          const selected = api.selectedScrollSnap();
          onStep(steps[selected]);
          setActiveIndex(selected);
        };

        api.on("select", onSelect);

        return () => {
          api.off("select", onSelect);
        };
      }
    }, [api, onStep, steps]);

    return (
      <Carousel
        setApi={setApi}
        plugins={[autoplayRef.current]}
        className="relative cursor-grab active:cursor-grabbing h-full w-full select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <SlideShowProgress
          api={api}
          autoplayApi={autoplayRef.current}
          className="absolute top-0 left-0 right-0 pointer-events-none z-10 p-4"
        />
        <Logo />

        <CarouselContent ref={ref}>
          {steps.map((card, idx) => (
            <CarouselItem key={card.id} id={"item" + idx}>
              {React.cloneElement(card.content as any, {
                isActive: idx === activeIndex, // Pass active state to each story
              })}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }
);
