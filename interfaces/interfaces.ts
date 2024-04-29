import { Dispatch } from "react";

export interface ICharacter {
  id?: number;
  name: string;
  status: string;
  species: string;
  image: string;
  url: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export interface IEpisode {
  id?: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created?: string;
}

export interface GlobalContextType {
  characters1: ICharacter[];
  characters2: ICharacter[];
  currentPage1: number;
  currentPage2: number;
  charactersPerPage: number;
  episodes: IEpisode[];
  setEpisodes: React.Dispatch<IEpisode[]>;
  fetchCharacters: (
    page: number,
    setter: React.Dispatch<ICharacter[]>
  ) => Promise<void>;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleNextPage2: () => void;
  handlePrevPage2: () => void;
  selectedCharacter: ICharacter | undefined;
  setSelectedCharacter: React.Dispatch<
    React.SetStateAction<ICharacter | undefined>
  >;
  selectedCharacter2: ICharacter | undefined;
  setSelectedCharacter2: React.Dispatch<
    React.SetStateAction<ICharacter | undefined>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
