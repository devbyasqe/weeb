export type TFullImages = {
  image_url: string | null;
  small_image_url?: string | null;
  large_image_url?: string | null;
};

export type TDateProp = {
  day: number | null;
  month: number | null;
  year: number | null;
};

export type TAiredPublished = {
  from: string | null;
  to: string | null;
  prop: {
    from: TDateProp;
    to: TDateProp;
  };
  string?: string | null;
};

export type TTitle = {
  type: string;
  title: string;
};

export type TBroadcast = {
  day?: string | null;
  time?: string | null;
  timezone?: string | null;
  string?: string | null;
};

export type TNameEntity = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export type TRelation = {
  relation: string;
  entry: TNameEntity[];
};

export type TExternalLink = {
  name: string;
  url: string;
};

export type TPaginationFull = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page?: number;
  items?: {
    count: number;
    total: number;
    per_page: number;
  };
};

export type TCommonBase = {
  mal_id: 0;
  url: string;
  images: {
    jpg: TFullImages;
    webp: TFullImages;
  };
  approved: boolean;
  titles: TTitle[];
  title: string;
  title_english?: string | null;
  title_japanese?: string | null;
  title_synonyms: string[];
  type?: string | null;
  status?: string | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number;
  favorites: number;
  synopsis: string | null;
  background: string | null;
  genres: TNameEntity[];
  explicit_genres: TNameEntity[];
  themes: TNameEntity[];
  demographics: TNameEntity[];
};

export type TPerson = {
  mal_id: number;
  url: string;
  name: string;
  images: {
    jpg: { image_url: string | null };
  };
};

export type TSmallPagination = {
  last_visible_page: number;
  has_next_page: boolean;
};
