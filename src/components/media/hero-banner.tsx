"use client";

import React, { useEffect } from "react";
import { useBannerStore } from "../store/media/banner";
import { HeroBannerCard } from "../cards/media/banner";
import { BannerLoader } from "../ui/loader";

export const HeroBanner = ({ category }: { category: "anime" | "manga" }) => {
  const { bannerData, fetchBannerData, isError } = useBannerStore();
  const data = bannerData[category];

  useEffect(() => {
    if (!data) {
      fetchBannerData(category);
    }
  }, []);

  if (!data || isError) return <BannerLoader isError={!!isError} />;

  return <HeroBannerCard list={data} />;
};
