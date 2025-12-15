import { cn } from "@/lib/utils";
import { YEAR } from "@/api/constants";
import { useEffect, useRef } from "react";

const BaseWidth = 418;

export const YearBackground = ({
  position = "center",
}: {
  position?: "center" | "bottom";
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const positionClass =
    position === "bottom"
      ? "origin-bottom justify-end"
      : "origin-center justify-center";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      const scale = container.offsetWidth / BaseWidth;
      container.style.transform = `scale(${scale})`;
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 bottom-4 flex flex-col items-center justify-center opacity-[0.08] z-20 origin-bottom",
        positionClass
      )}
    >
      <span className="whitespace-nowrap font-extrabold leading-none text-[220px] italic tracking-tighter">
        {YEAR}
      </span>
      <span className="whitespace-nowrap font-extrabold leading-none text-[90px] italic tracking-tighter">
        C 5KM RUN
      </span>
    </div>
  );
};
