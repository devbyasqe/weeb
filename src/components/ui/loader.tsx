import { cn } from "@/lib/utils";
import React from "react";
import { TChildren } from "../types";

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
  <div className="px-2 pt-24 pb-10 transition-all duration-300 md:px-4">
    <div className="grid md:grid-cols-2 md:gap-x-2 md:gap-y-6">
      <Skeleton
        isError={isError}
        className="grid h-dvh max-h-130 min-h-96 overflow-clip border md:order-2"
      />
      <Skeleton isError={isError} className="border px-4 py-6 max-md:-mt-24" />
    </div>
  </div>
);

export const MediaOverViewStatsLoader = ({
  isError,
  children,
}: TLoader & TChildren) => (
  <>
    <div className="space-y-2 px-2 pt-24 pb-10 transition-all duration-300 md:space-y-4 md:px-4">
      <Skeleton isError={isError} className="h-8 max-w-56" />
      <Skeleton isError={isError} className="h-10 max-w-lg" />
    </div>
    <div className="bg-gray-muted flex justify-center px-1 py-4">
      <Skeleton
        isError={isError}
        className="h-11 w-full max-w-120 rounded-full"
      />
    </div>

    <section className="flex gap-2 px-2 py-10 transition-all duration-300 max-md:flex-col md:gap-4 md:px-4">
      <div className="transition-all duration-300 md:w-4/12 lg:w-3/12">
        <div className="sticky top-14 space-y-2 transition-all duration-300 md:space-y-4">
          <Skeleton isError={isError} className="aspect-image" />
          <div className="p-1">
            <div className="ring-offset-gray-accent ring-gray-border grid grid-cols-2 gap-1 overflow-clip rounded-lg ring-1 ring-offset-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  isError={isError}
                  key={index}
                  className="h-20 rounded-none"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2 transition-all duration-300 md:w-8/12 md:space-y-4 lg:w-9/12">
        {children}
      </div>
    </section>
  </>
);

export const MediaOverviewInfosLoader = ({ isError }: TLoader) =>
  Array.from({ length: 4 }).map((_, index) => (
    <Skeleton isError={isError} key={index} className="h-56" />
  ));

export const CardLoader = ({
  isError,
  noOfItems = 12,
}: {
  isError?: boolean;
  noOfItems?: number;
}) => (
  <section className="">
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: noOfItems }).map((_, index) => (
        <Skeleton isError={isError} key={index} className="aspect-image" />
      ))}
    </div>
  </section>
);

export const FetchMoreItem = ({ ref }: { ref: React.Ref<HTMLDivElement> }) => (
  <>
    <Skeleton ref={ref} className="aspect-image" />
    <Skeleton className="aspect-image" />
    <Skeleton className="aspect-image max-md:hidden" />
    <Skeleton className="aspect-image max-lg:hidden" />
  </>
);

export const StaffPageLoader = ({
  isError,
  noOfItems = 4,
}: {
  isError?: boolean;
  noOfItems?: number;
}) => {
  return (
    <div className="rounded-lg border p-4">
      <Skeleton className="h-8 max-w-xs" />
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: noOfItems }).map((_, index) => (
          <div key={index} className="">
            <Skeleton
              isError={isError}
              className="size-14 overflow-clip rounded-full"
            />
            <Skeleton className="mt-1 h-6 max-w-40" />
          </div>
        ))}
      </div>
    </div>
  );
};


export const AnimeEpisodesPageLoader = ({
  isError,
  noOfItems = 12,
}: {
  isError?: boolean;
  noOfItems?: number;
}) => (
  <div className="grid gap-2">
    {Array.from({ length: noOfItems }).map((_, index) => (
      <div key={index} className="flex items-center gap-2">
        <Skeleton isError={isError} className="h-20 w-full " />
      </div>
    ))}
  </div>
);


