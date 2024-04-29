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

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const apiUrl = "https://rickandmortyapi.com/api/";
  const charactersPerPage = 3;

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

  // Obtener characters
  async function fetchCharacters(
    page: number,
    setter: React.Dispatch<ICharacter[]>
  ) {
    setLoading(true); // Indicar que se está cargando
    try {
      const response = await fetch(`${apiUrl}character?page=${page}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTimeout(() => {
        setter(data.results);
        setLoading(false); // Después de obtener los datos, indicar que ya no se está cargando
      }, 1500);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }

  useEffect(() => {
    fetchCharacters(currentPage1, setCharacters1);
    fetchCharacters(currentPage2, setCharacters2);
  }, [currentPage1, currentPage2]);

  const handleNextPage = () => {
    setCurrentPage1((prevPage) => prevPage + 1);
    setCurrentPage2((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage1 > 1) {
      setCurrentPage1((prevPage) => prevPage - 1);
      setCurrentPage2((prevPage) => prevPage - 1);
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
        loading,
        setLoading
      }}
    >
      {loading ? (
       <Loader />
      ) : (
        children
      )}
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
