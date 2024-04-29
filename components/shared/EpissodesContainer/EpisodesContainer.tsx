import React from "react";
import Image from "next/image";
import useFilterEpisodes from "../../../utils/hooks/useFilterEpisodes";
import EpisodeList from "../EpisodeList/EpisodeList";

const EpisodesContainer: React.FC = () => {
  const { selectedCharacter, selectedCharacter2, episodes } =
    useFilterEpisodes();

  const character1Episodes = episodes.filter((episode) => {
    const characterUrl = selectedCharacter?.url;
    return characterUrl && episode.characters.includes(characterUrl);
  });

  const character2Episodes = selectedCharacter2
    ? episodes.filter((episode) => {
        const characterUrl = selectedCharacter2?.url;
        return characterUrl && episode.characters.includes(characterUrl);
      })
    : [];

  const sharedEpisodes =
    selectedCharacter && selectedCharacter2
      ? character1Episodes.filter((episode) =>
          episode.characters.includes(selectedCharacter2?.url!)
        )
      : [];

  return (
    <>
      <div className="text-center mb-4 md:hidden">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={190}
            className="rounded-full"
          />
        </div>
      </div>
      <h1 className="text-center mt-4 text-xl">Episode list</h1>
      <div>
        <div className="px-4 py-4 border-b border-gray-200">
          <h2 className="text-center mb-2 text-white text-3xl">
            Character #1 - Only Episodes
          </h2>
          <EpisodeList episodes={character1Episodes} />
        </div>

        <div className="px-4 py-4 border-b border-gray-200">
          <h2 className="text-center mb-2 text-white text-3xl">
            Character #1 & Character #2 - Shared Episodes
          </h2>
          <EpisodeList episodes={sharedEpisodes} />
        </div>

        <div className="px-4 py-4 border-b border-gray-200">
          <h2 className="text-center mb-2 text-white text-3xl">
            Character #2 - Only Episodes
          </h2>
          <EpisodeList episodes={character2Episodes} />
        </div>
      </div>
      <div>
        {selectedCharacter || selectedCharacter2 ? (
          <p className="text-white text-center mt-4">
            Buscaremos episodios en los que aparezcan
            <span className="text-orange-600 font-bold text-xl underline">
              {selectedCharacter?.name}
            </span>
            {" , "}
            <span className="text-orange-600 font-bold text-xl underline">
              {selectedCharacter2?.name}
            </span>
          </p>
        ) : null}
      </div>
      <a
        href="#characterList"
        className="text-white bg-gradient-to-r from-red-500 to-purple-700 text-center py-2 px-3 rounded-full mt-4 mx-auto block md:hidden"
      >
        ¡Vamos a jugar!
      </a>
    </>
  );
};

export default EpisodesContainer;
