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
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleNextPage2: () => void;
  handlePrevPage2: () => void;
  selectedCharacter: ICharacter | null;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<ICharacter | null>>;
  selectedCharacter2: ICharacter | null;
  setSelectedCharacter2: React.Dispatch<
    React.SetStateAction<ICharacter | null>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loadingSharedEpisodes: boolean;
  setLoadingSharedEpisodes: React.Dispatch<React.SetStateAction<boolean>>;
  filterEpisodes: {
    character1Episodes: IEpisode[];
    character2Episodes: IEpisode[];
    sharedEpisodes: IEpisode[];
  };
  resetSelectedCharacters: () => void;
}
