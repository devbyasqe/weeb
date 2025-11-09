"use client";

import React, { useEffect } from "react";
import { useBannerStore } from "../store/common/banner";
import { HeroBannerCard } from "../cards/banner";
import { BannerLoader } from "../ui/loader";

export const HeroBanner = ({ category }: { category: "anime" | "manga" }) => {
  const { bannerData, fetchBannerData, isError } = useBannerStore();
  const data = bannerData[category];

  useEffect(() => {
    if (!data) {
      fetchBannerData(category);
    }
  }, []);

  if (!data) {
    if (isError) return <BannerLoader isError />;
    return <BannerLoader />;
  }

  return <HeroBannerCard list={data} />;
};
