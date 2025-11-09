import {
  TAiredPublished,
  TBroadcast,
  TCommonBase,
  TExternalLink,
  TFullImages,
  TNameEntity,
  TPaginationFull,
  TPerson,
  TRelation,
  TTitle,
} from "./common";

type AnimeTrailer = {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
  images?: {
    image_url?: string | null;
    small_image_url?: string | null;
    medium_image_url?: string | null;
    large_image_url?: string | null;
    maximum_image_url?: string | null;
  };
};

type AnimeTheme = {
  openings: string[];
  endings: string[];
};

export type TAnimeBase = TCommonBase & {
  trailer: AnimeTrailer;
  source?: string | null;
  episodes?: number | null;
  airing: boolean;
  aired: TAiredPublished;
  duration?: string | null;
  rating?: string | null;
  season?: string | null;
  year?: number | null;
  broadcast: TBroadcast | null;
  producers: TNameEntity[];
  licensors: TNameEntity[];
  studios: TNameEntity[];
};

export type TAnimeFull = TAnimeBase & {
  relations: TRelation[];
  theme: AnimeTheme;
  external: TExternalLink[];
  streaming: TExternalLink[];
};

export type TAnimeList = {
  pagination: TPaginationFull;
  data: TAnimeBase[];
};

export type TAnimeStaffs = {
  person: TPerson;
  positions: string[];
};


export type TAnimeEpisode = {
  mal_id: number;
  url: string;
  title: string;
  title_japanese?: string | null;
  title_romanji?: string | null;
  aired?: string | null;
  score?: number | null;
  filler: boolean;
  recap: boolean;
  forum_url?: string | null;
};