import { CAROUSEL_INTERVAL } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

type TDirection = "left" | "right";
type TUseCarousel<T> = {
  data: T[];
  intervalTime?: number;
  autoStart?: boolean;
};

const useCarousel = <T,>({
  data,
  intervalTime = CAROUSEL_INTERVAL,
  autoStart = true,
}: TUseCarousel<T>) => {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState<TDirection>("right");
  const [paused, setPaused] = useState(!autoStart);

  const dataLength = data?.length ?? 0;

  useEffect(() => {
    if (paused || dataLength <= 1) return;

    const interval = setInterval(() => {
      setDirection("right");
      setSelected((prev) => (prev < data.length - 1 ? prev + 1 : 0));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [paused, data?.length, selected]);

  const changeSelected = useCallback(
    (index: number) => {
      if (data?.[index] && index !== selected) {
        setDirection(index > selected ? "right" : "left");
        setSelected(index);
      }
    },
    [data, selected],
  );

  const next = useCallback(() => {
    if (dataLength <= 1) return;
    setDirection("right");
    setSelected((prev) => (prev === dataLength - 1 ? 0 : prev + 1));
  }, [dataLength]);

  const prev = useCallback(() => {
    if (dataLength <= 1) return;
    setDirection("left");
    setSelected((prev) => (prev === 0 ? dataLength - 1 : prev - 1));
  }, [dataLength]);

  const togglePause = useCallback(() => {
    setPaused((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? "hidden" : "auto";
      return newState;
    });
  }, []);

  return {
    selected,
    direction,
    paused,
    changeSelected,
    next,
    prev,
    togglePause,
    item: data[selected],
  };
};

export default useCarousel;
