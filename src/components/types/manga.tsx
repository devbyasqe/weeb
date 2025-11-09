import {
  TAiredPublished,
  TCommonBase,
  TExternalLink,
  TNameEntity,
  TPaginationFull,
  TRelation,
} from "./common";

export type TMangaBase = TCommonBase & {
  chapters: number | null;
  volumes: number | null;
  publishing: boolean;
  published: TAiredPublished;
  authors: TNameEntity[];
  serializations: TNameEntity[];
};

export type TMangaFull = TMangaBase & {
  relations: TRelation[];
  external: TExternalLink[];
};

export type TMangaList = {
  pagination: TPaginationFull;
  data: TMangaBase[];
};
