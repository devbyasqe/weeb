import { TFullImages, TPerson } from "./common";

type CharacterImage = {
  jpg: {
    image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url: string;
  };
};

type CharacterBase = {
  mal_id: number;
  url: string;
  name: string;
  images: CharacterImage;
};

type TVoiceArtist = {
  person: TPerson;
  language: "string";
};

type MediaEntry = {
  mal_id: number;
  url: string;
  images: {
    jpg: TFullImages;
    webp: TFullImages;
  };
  title: string;
};

export type TMangaCharacter = {
  character: CharacterBase;
  role: string;
};

export type TAnimeCharacter = TMangaCharacter & {
  favorites?: number;
  voice_actors: TVoiceArtist[];
};

export type TCharacterFullBase = CharacterBase & {
  name_kanji: string | null;
  nicknames: string[] | null;
  favorites: number;
  about: string | null;
};

export type CharacterFullAnimeList = {
  role: string;
  anime: MediaEntry;
};

export type CharacterFullMangaList = {
  role: string;
  manga: MediaEntry;
};

export type CharacterFullVoiceArtists = {
  language: string;
  person: TPerson;
};
