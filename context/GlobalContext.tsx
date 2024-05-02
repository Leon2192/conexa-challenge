import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import {
  GlobalContextType,
  ICharacter,
  IEpisode,
} from "@/interfaces/interfaces";
import useResizeScreenCharacters from "../utils/hooks/useResizeScreenCharacters";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const apiUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
  const [charactersPerPage, setCharactersPerPage] = useState(3);
  const [loading, setLoading] = useState(true);
  const [loadingSharedEpisodes, setLoadingSharedEpisodes] = useState(false);
  const [characters1, setCharacters1] = useState<ICharacter[]>([]);
  const [characters2, setCharacters2] = useState<ICharacter[]>([]);
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(2);
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null
  );
  const [selectedCharacter2, setSelectedCharacter2] =
    useState<ICharacter | null>(null);

  useResizeScreenCharacters(setCharactersPerPage);

  useEffect(() => {
    const fetchCharacters = async (
      page: number,
      setter: React.Dispatch<ICharacter[]>
    ) => {
      setLoading(true);
      try {
        const cachedData = localStorage.getItem(`charactersPage${page}`);
        if (cachedData) {
          setter(JSON.parse(cachedData));
        } else {
          const response = await axios.get(`${apiUrl}/character?page=${page}`);
          const data = response.data;
          setter(data.results);
          localStorage.setItem(
            `charactersPage${page}`,
            JSON.stringify(data.results)
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setLoading(false);
      }
    };

    fetchCharacters(currentPage1, setCharacters1);
    fetchCharacters(currentPage2, setCharacters2);
  }, [apiUrl, currentPage1, currentPage2]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoadingSharedEpisodes(true);
        const cachedEpisodes = localStorage.getItem("episodes");
        if (cachedEpisodes) {
          setEpisodes(JSON.parse(cachedEpisodes));
        } else {
          const response = await axios.get(`${apiUrl}episode`);
          const data = response.data;
          setEpisodes(data.results);
          localStorage.setItem("episodes", JSON.stringify(data.results));
        }
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoadingSharedEpisodes(false);
      }
    };

    fetchEpisodes();
  }, [apiUrl]);

  useEffect(() => {
    const updateCharactersPerPage = () => {
      if (window.innerWidth <= 768) {
        setCharactersPerPage(1);
      } else {
        setCharactersPerPage(3);
      }
    };

    updateCharactersPerPage();
    window.addEventListener("resize", updateCharactersPerPage);
    return () => {
      window.removeEventListener("resize", updateCharactersPerPage);
    };
  }, []);

  useEffect(() => {
    if (
      selectedCharacter &&
      selectedCharacter2 &&
      filterEpisodes.sharedEpisodes.length > 0 &&
      selectedCharacter !== null &&
      selectedCharacter2 !== null
    ) {
      enqueueSnackbar("AWESOME! There are episodes with both characters.", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else if (
      selectedCharacter &&
      selectedCharacter2 &&
      selectedCharacter !== null &&
      selectedCharacter2 !== null &&
      filterEpisodes.sharedEpisodes.length <= 0
    ) {
      enqueueSnackbar(
        "Sorry! We couldn't find any matches between these characters.",
        {
          variant: "warning",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharacter, selectedCharacter2]);

  useEffect(() => {
    const cachedCharacters1 = localStorage.getItem("characters1");
    if (cachedCharacters1) {
      setCharacters1(JSON.parse(cachedCharacters1));
    }
    const cachedCharacters2 = localStorage.getItem("characters2");
    if (cachedCharacters2) {
      setCharacters2(JSON.parse(cachedCharacters2));
    }
    const cachedEpisodes = localStorage.getItem("episodes");
    if (cachedEpisodes) {
      setEpisodes(JSON.parse(cachedEpisodes));
    }
  }, []);

  const totalPages1 = Math.ceil(characters1.length / charactersPerPage);
  const totalPages2 = Math.ceil(characters2.length / charactersPerPage);

  const filterEpisodes = useMemo(() => {
    const character1Episodes = selectedCharacter
      ? episodes.filter(
          (episode) =>
            selectedCharacter.url &&
            episode.characters.includes(selectedCharacter.url)
        )
      : [];

    const character2Episodes = selectedCharacter2
      ? episodes.filter(
          (episode) =>
            selectedCharacter2.url &&
            episode.characters.includes(selectedCharacter2.url)
        )
      : [];

    const sharedEpisodes =
      selectedCharacter && selectedCharacter2
        ? character1Episodes.filter((episode) =>
            episode.characters.includes(selectedCharacter2.url)
          )
        : [];

    return {
      character1Episodes,
      character2Episodes,
      sharedEpisodes,
    };
  }, [selectedCharacter, selectedCharacter2, episodes]);

  const handleNextPage = () => {
    const nextPage1 = currentPage1 + 1;
    if (nextPage1 <= totalPages1) {
      if (nextPage1 === currentPage2) {
        setCurrentPage1(nextPage1 + 1);
      } else {
        setCurrentPage1(nextPage1);
      }
      setSelectedCharacter(null);
    }
  };

  const handleNextPage2 = () => {
    const nextPage2 = currentPage2 + 1;
    if (nextPage2 <= totalPages2) {
      if (nextPage2 <= currentPage1) {
        setCurrentPage2(currentPage1 + 1);
      } else {
        setCurrentPage2(nextPage2);
      }
      setSelectedCharacter2(null);
    }
  };

  const handlePrevPage = () => {
    if (currentPage1 > 1) {
      const prevPage1 = currentPage1 - 1;
      if (prevPage1 === currentPage2) {
        if (currentPage2 > 1) {
          setCurrentPage2(currentPage2 - 1);
        } else {
          setCurrentPage2(currentPage2 + 1);
        }
      }
      setCurrentPage1(prevPage1);
      setSelectedCharacter(null);
    }
  };

  const handlePrevPage2 = () => {
    if (currentPage2 > 1) {
      const prevPage2 = currentPage2 - 1;
      if (prevPage2 === currentPage1) {
        if (currentPage1 > 1) {
          setCurrentPage1(currentPage1 - 1);
        } else {
          setCurrentPage1(currentPage1 + 1);
        }
      }
      setCurrentPage2(prevPage2);
      setSelectedCharacter2(null);
    }
  };

  const resetSelectedCharacters = () => {
    setSelectedCharacter(null);
    setSelectedCharacter2(null);
    setCurrentPage1(1);
    setCurrentPage2(2);
  };

  const handleCharacterSelection = (
    character: ICharacter,
    setCharacter: React.Dispatch<React.SetStateAction<ICharacter | null>>,
    characterNumber: number
  ) => {
    if (characterNumber === 1) {
      setSelectedCharacter(character);
    } else if (characterNumber === 2) {
      setSelectedCharacter2(character);
    }
    enqueueSnackbar(`${character.name} selected`, { variant: "success" });
  };

  // Scroll to top en celulares
  useEffect(() => {
    if (selectedCharacter && selectedCharacter2) {
      if (window.innerWidth <= 768) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [selectedCharacter, selectedCharacter2]);

  const contextValue: GlobalContextType = {
    characters1,
    characters2,
    currentPage1,
    currentPage2,
    charactersPerPage,
    setSelectedCharacter,
    setSelectedCharacter2,
    handleNextPage,
    handlePrevPage,
    handleNextPage2,
    handlePrevPage2,
    loading,
    setLoading,
    loadingSharedEpisodes,
    setLoadingSharedEpisodes,
    filterEpisodes,
    episodes,
    setEpisodes,
    selectedCharacter,
    selectedCharacter2,
    resetSelectedCharacters,
    totalPages1,
    totalPages2,
    handleCharacterSelection,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export { GlobalProvider, useGlobalContext };
