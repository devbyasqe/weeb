"use client";
import { StaffCard } from "@/components/cards/media/staffs";
import { useAnimeStaffsStore } from "@/components/store/media/staffs";
import { TIdParams } from "@/components/types";
import { StaffPageLoader } from "@/components/ui/loader";
import React, { use, useEffect } from "react";

const AnimeStaffsPage = ({ params }: TIdParams) => {
  const { id } = use(params);
  const { animeStaffs, fetchAnimeStaff, isError } = useAnimeStaffsStore();
  const data = animeStaffs[id];

  useEffect(() => {
    if (!data) {
      fetchAnimeStaff(id);
    }
  }, []);

  if (!data || isError) return <StaffPageLoader isError={!!isError} />;

  if (Object.keys(data).length === 0) {
    return (
      <div className="py-14 text-center">
        <h2 className="text-red">No staff data found for this anime.</h2>
        <h3 className="text-violet-foreground mt-3 text-balance">
          It might not have any staff listed yet, or something went wrong while
          fetching them.
        </h3>
      </div>
    );
  }

  return (
    <div className="grid gap-y-2">
      {Object.entries(data).map(([position, person], index) => (
        <StaffCard
          key={position + index}
          position={position}
          person={person}
          index={index}
        />
      ))}
    </div>
  );
};

export default AnimeStaffsPage;
