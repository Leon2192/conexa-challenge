import { useMemo } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

const useFilterEpisodes = () => {
  const { episodes, selectedCharacter, selectedCharacter2 } =
    useGlobalContext();

  const filterResult = useMemo(() => {
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
  }, [episodes, selectedCharacter, selectedCharacter2]);

  return filterResult;
};

export default useFilterEpisodes;
