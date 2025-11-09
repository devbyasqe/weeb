import { TAiredPublished, TFullImages } from "./common";

export type TAnimeBase = {
  mal_id: number;
  images: {
    jpg: TFullImages;
    webp: TFullImages;
  };
  trailer: { embed_url: string | null };
  title: string;
  title_english?: string | null;
  type?: string | null;
  source?: string | null;
  episodes?: number | null;
  status?: string | null;
  airing: boolean;
  aired: TAiredPublished;
  duration?: string | null;
  rating?: string | null;
  rank?: number | null;
  popularity?: number | null;
  favorites?: number | null;
  synopsis?: string | null;
  background?: string | null;
  season: "summer";
  year: 0;
  broadcast: {
    day: "string";
    time: "string";
    timezone: "string";
    string: "string";
  };
  producers: [
    {
      mal_id: 0;
      type: "string";
      name: "string";
      url: "string";
    },
  ];
  licensors: [
    {
      mal_id: 0;
      type: "string";
      name: "string";
      url: "string";
    },
  ];
  studios: [
    {
      mal_id: 0;
      type: "string";
      name: "string";
      url: "string";
    },
  ];
  genres: [
    {
      mal_id: 0;
      type: "string";
      name: "string";
      url: "string";
    },
  ];
  explicit_genres: [
    {
      mal_id: 0;
      type: "string";
      name: "string";
      url: "string";
    },
  ];
  themes: [
    {
      mal_id: 0;
      type: "string";
      name: "string";
      url: "string";
    },
  ];
  demographics: [
    {
      mal_id: 0;
      type: "string";
      name: "string";
      url: "string";
    },
  ];
};
