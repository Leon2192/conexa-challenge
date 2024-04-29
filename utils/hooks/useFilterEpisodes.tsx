import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useGlobalContext } from "@/context/GlobalContext";

const useFilterEpisodes = () => {
  const { episodes, selectedCharacter, selectedCharacter2 } =
    useGlobalContext();
  const { enqueueSnackbar } = useSnackbar();

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
  }, [selectedCharacter, selectedCharacter2, episodes, enqueueSnackbar]);

  return {
    selectedCharacter,
    selectedCharacter2,
    episodes,
  };
};

export default useFilterEpisodes;
