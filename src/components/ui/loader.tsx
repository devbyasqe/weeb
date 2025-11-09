import { cn } from "@/lib/utils";
import React from "react";

type TLoader = { isError?: boolean };

export const Skeleton = ({
  className,
  isError,
  ref,
}: {
  className?: string;
  isError?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}) => (
  <div
    ref={ref}
    className={cn(
      "animate-loader transform-gpu rounded-lg border bg-[linear-gradient(to_left,hsl(var(--gray-border))_0%,hsl(var(--gray-accent))_30%,hsl(var(--gray-muted))_70%,hsl(var(--gray-border))_100%)] bg-size-[150%_100%]",
      isError &&
        "border-red/50 bg-[linear-gradient(to_left,hsla(var(--red),0.4)_0%,hsla(var(--red),0.5)_30%,hsla(var(--gray-muted))_70%,hsla(var(--red),0.4)_100%)]",
      className,
    )}
  />
);

export const BannerLoader = ({ isError }: TLoader) => (
  <div className="isolate px-2 pt-20 pb-10 transition-all duration-300 md:px-4">
    <div className="grid md:grid-cols-2 md:gap-x-2 md:gap-y-6">
      <Skeleton
        isError={isError}
        className="grid h-dvh max-h-130 min-h-96 overflow-clip border md:order-2"
      />
      <Skeleton isError={isError} className="border px-4 py-6 max-md:-mt-24" />
    </div>
  </div>
);
