import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import {
  GlobalContextType,
  ICharacter,
  IEpisode,
} from "@/interfaces/interfaces";
import Loader from "@/components/ui/Loader/Loader";
import useResizeScreenCharacters from "../utils/hooks/useResizeScreenCharacters";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const apiUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
  const [charactersPerPage, setCharactersPerPage] = useState(3);

  const [characters1, setCharacters1] = useState<ICharacter[]>([]);
  const [characters2, setCharacters2] = useState<ICharacter[]>([]);
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(2);
  const [selectedCharacter, setSelectedCharacter] = useState<
    ICharacter | undefined
  >(undefined);
  const [selectedCharacter2, setSelectedCharacter2] = useState<
    ICharacter | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  useResizeScreenCharacters(setCharactersPerPage);

  // Obtener characters
  async function fetchCharacters(
    page: number,
    setter: React.Dispatch<ICharacter[]>
  ) {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}character?page=${page}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTimeout(() => {
        setter(data.results);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }

  useEffect(() => {
    fetchCharacters(currentPage1, setCharacters1);
    fetchCharacters(currentPage2, setCharacters2);
  }, [currentPage1, currentPage2]);

  const handleNextPage = () => {
    const nextPage1 = currentPage1 + 1;
    if (nextPage1 === currentPage2) {
      setCurrentPage1(nextPage1 + 1);
    } else {
      setCurrentPage1(nextPage1);
    }
    setSelectedCharacter(undefined);
  };

  const handleNextPage2 = () => {
    const nextPage2 = currentPage2 + 1;
    if (nextPage2 === currentPage1) {
      setCurrentPage2(nextPage2 + 1);
    } else {
      setCurrentPage2(nextPage2);
    }
    setSelectedCharacter2(undefined);
  };

  const handlePrevPage = () => {
    if (currentPage1 > 1) {
      const prevPage1 = currentPage1 - 1;
      if (prevPage1 === currentPage2) {
        setCurrentPage1(prevPage1 - 1);
      } else {
        setCurrentPage1(prevPage1);
      }
      setSelectedCharacter(undefined);
    }
  };

  const handlePrevPage2 = () => {
    if (currentPage2 > 1) {
      const prevPage2 = currentPage2 - 1;
      if (prevPage2 === currentPage1) {
        setCurrentPage2(prevPage2 - 1);
      } else {
        setCurrentPage2(prevPage2);
      }
      setSelectedCharacter2(undefined);
    }
  };

  // Obtener episodes
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(`${apiUrl}episode`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEpisodes(data.results);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, [apiUrl]);

  useEffect(() => {
    const updateCharactersPerPage: () => void = () => {
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

  return (
    <GlobalContext.Provider
      value={{
        characters1,
        characters2,
        currentPage1,
        currentPage2,
        charactersPerPage,
        fetchCharacters,
        episodes,
        setEpisodes,
        selectedCharacter,
        setSelectedCharacter,
        selectedCharacter2,
        setSelectedCharacter2,
        handleNextPage,
        handlePrevPage,
        handleNextPage2,
        handlePrevPage2,
        loading,
        setLoading,
      }}
    >
      {loading ? <Loader /> : children}
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
