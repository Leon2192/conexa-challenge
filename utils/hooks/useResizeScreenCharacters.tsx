import { useEffect } from "react";

const useResizeScreenCharacters = (
  setCharactersPerPage: (perPage: number) => void
) => {
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
  }, [setCharactersPerPage]);
};

export default useResizeScreenCharacters;
