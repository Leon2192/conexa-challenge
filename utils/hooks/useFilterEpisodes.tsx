import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useGlobalContext } from "@/context/GlobalContext";

const useFilterEpisodes = () => {
  const {
    episodes,
    selectedCharacter,
    selectedCharacter2,
    setLoadingSharedEpisodes,
  } = useGlobalContext();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handleScrollToTop = () => {
      if (selectedCharacter && selectedCharacter2 && window.innerWidth <= 768) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    handleScrollToTop();
  }, [selectedCharacter, selectedCharacter2]);

  useEffect(() => {
    const filteredCharacter1Episodes = episodes.filter((episode) => {
      const characterUrl = selectedCharacter?.url;
      return characterUrl && episode.characters.includes(characterUrl);
    });

    const filteredCharacter2Episodes = selectedCharacter2
      ? episodes.filter((episode) => {
          const characterUrl = selectedCharacter2?.url;
          return characterUrl && episode.characters.includes(characterUrl);
        })
      : [];

    if (
      filteredCharacter1Episodes.length > 0 &&
      filteredCharacter2Episodes.length > 0
    ) {
      enqueueSnackbar("¡GENIAL! Hay episodios con ambos personajes.", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      setLoadingSharedEpisodes(true);
      setTimeout(() => {
        setLoadingSharedEpisodes(false);
      }, 500);
    } else if (selectedCharacter && selectedCharacter2) {
      enqueueSnackbar(
        "¡Lo sentimos! No encontramos coincidencias entre estos personajes.",
        {
          variant: "warning",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    }
  }, [
    selectedCharacter,
    selectedCharacter2,
    episodes,
    enqueueSnackbar,
    setLoadingSharedEpisodes,
  ]);

  return {
    selectedCharacter,
    selectedCharacter2,
    episodes,
  };
};

export default useFilterEpisodes;
