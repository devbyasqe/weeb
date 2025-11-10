import React, { useEffect, useRef, useState } from "react";
import { useMediaCharacterStore } from "../store/media/characters";
import { CardLoader, FetchMoreItem } from "../ui/loader";
import { useInView } from "motion/react";
import { useClickOutSide } from "../hooks/mouse-click";
import { Button } from "../ui/button";
import { HeartIcon, SortIcon } from "../svg";
import { ItemCard } from "../cards/item";
import { formatFavorites } from "@/lib/utils";

const SORT_BY_LIST = {
  anime: [
    "Roles",
    "Favorites ASC",
    "Favorites DSC",
    "Alphabetical DSC",
    "Alphabetical ASC",
  ],
  manga: ["Roles", "Alphabetical DSC", "Alphabetical ASC"],
};

export const MediaCharacters = ({ id }: { id: string }) => {
  const { isError, paginatedData, fetchCharacters } = useMediaCharacterStore();
  const data = paginatedData[id];

  useEffect(() => {
    if (!data) {
      fetchCharacters(id);
    }
  }, []);

  if (!data || isError) return <CardLoader isError={!!isError} />;

  if (data.displayed.length === 0) {
    return (
      <div className="py-14 text-center">
        <h2 className="text-red">No characters found for this anime.</h2>
        <h3 className="text-violet-foreground mt-3 text-balance">
          The character list might not be available yet, or something went wrong
          while fetching it.
        </h3>
      </div>
    );
  }

  return <InfiniteCharacter id={id} />;
};

export const InfiniteCharacter = ({ id }: { id: string }) => {
  const [showFilters, setShowFilters] = useState(false);

  const { sortType, paginatedData, fetchMore, sortCharacters } =
    useMediaCharacterStore();

  const data = paginatedData[id];
  const lastRef = useRef(null);
  const isInView = useInView(lastRef, { amount: 0.25 });

  useEffect(() => {
    if (isInView && data && data.hasMore) {
      fetchMore(id);
    }
  }, [isInView]);

  const elRef = useClickOutSide(() => {
    if (showFilters) {
      setShowFilters(false);
    }
  });

  const category = id.startsWith("anime") ? "anime" : "manga";

  return (
    <>
      <div className="relative">
        <Button variant={"muted"} onClick={() => setShowFilters(!showFilters)}>
          Sortby <SortIcon />
        </Button>
        {showFilters && (
          <div
            ref={elRef}
            className="bg-gray-background absolute top-11 left-2 z-10 flex max-w-2xs flex-wrap justify-center gap-3 rounded-xl border p-2 md:left-4"
          >
            {SORT_BY_LIST[category].map((sort, index) => {
              const firstAvailableIndex = SORT_BY_LIST[category].findIndex(
                (s) => s !== sortType,
              );
              const isAutoFocus = index === firstAvailableIndex;

              return (
                <Button
                  key={sort}
                  autoFocus={isAutoFocus}
                  variant="outline"
                  disabled={sort === sortType}
                  onClick={() => {
                    sortCharacters(id, sort);
                    setShowFilters(false);
                  }}
                >
                  {sort}
                </Button>
              );
            })}
          </div>
        )}
      </div>

      <div className="group/item-cards mt-6 grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.displayed.map((item) => {
          const { character, role } = item;
          const favorites = "favorites" in item ? item.favorites : undefined; // type guard

          return (
            <ItemCard
              color="violet"
              key={character.mal_id}
              link={`/characters/${character.mal_id}`}
              imgSrc={
                character.images.webp.image_url ||
                character.images.jpg.image_url
              }
              left={
                favorites !== undefined
                  ? {
                      icon: <HeartIcon />,
                      text: formatFavorites(favorites),
                      color: "red",
                    }
                  : undefined
              }
              right={{ text: role }}
              title={character.name}
            />
          );
        })}

        {data.hasMore && <FetchMoreItem ref={lastRef} />}
      </div>
    </>
  );
};
