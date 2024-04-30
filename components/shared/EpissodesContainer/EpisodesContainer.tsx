import React, { useEffect, useState } from "react";
import Image from "next/image";
import useFilterEpisodes from "../../../utils/hooks/useFilterEpisodes";
import EpisodeList from "../EpisodeList/EpisodeList";
import { useGlobalContext } from "@/context/GlobalContext";
import Loader from "@/components/ui/Loader/Loader";

const EpisodesContainer: React.FC = () => {
  const { loadingSharedEpisodes } = useGlobalContext();
  const { selectedCharacter, selectedCharacter2, episodes } =
    useFilterEpisodes();

  const [showLoader, setShowLoader] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  useEffect(() => {
    setShowLoader(true);

    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [selectedCharacter, selectedCharacter2]);

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

  const hasFilteredEpisodes =
    character1Episodes.length > 0 ||
    character2Episodes.length > 0 ||
    sharedEpisodes.length > 0;

  const handlePlayButtonClick = () => {
    setShowPlayButton(false);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <>
      <div className="text-center mb-4">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={250}
            height={220}
            className="rounded-full"
          />
        </div>
      </div>
      {loadingSharedEpisodes || showLoader ? (
        <Loader />
      ) : (
        <>
          {!selectedCharacter && !selectedCharacter2 && showPlayButton && (
            <div>
              <h1 className="text-center mt-6 text-4xl mb-2  text-white">
                WELCOME!
              </h1>
              <p className="text-center mt-7 mx-2 text-white text-2xl">
                Lets find the episodes of the television series Rick & Morty in
                which the characters you select appear. You just need to choose
                one character 1 and one character 2, and well take care of the
                rest!
              </p>
            </div>
          )}
          <div>
            {selectedCharacter && selectedCharacter2 && (
              <div>
                <div className="px-4 py-4 border-b border-gray-200">
                  <h2 className="text-center mb-2 text-white text-2xl sm:text-3xl">
                    Episodes Character #1
                  </h2>
                  <EpisodeList
                    episodes={character1Episodes}
                    hasFilteredEpisodes={hasFilteredEpisodes}
                  />
                </div>

                <div className="px-4 py-4 border-b border-gray-200">
                  <h2 className="text-center mb-2 text-white text-2xl sm:text-3xl">
                    Shared Episodes Character #1 & Character #2
                  </h2>
                  <EpisodeList
                    episodes={sharedEpisodes}
                    hasFilteredEpisodes={hasFilteredEpisodes}
                  />
                </div>

                <div className="px-4 py-4 border-b border-gray-200">
                  <h2 className="text-center mb-2 text-white text-2xl sm:text-3xl">
                    Episodes Character #2
                  </h2>
                  <EpisodeList
                    episodes={character2Episodes}
                    hasFilteredEpisodes={hasFilteredEpisodes}
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            {selectedCharacter || selectedCharacter2 ? (
              <p className="text-white text-center mt-4">
                Buscaremos episodios en los que aparezcan{" "}
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
          {showPlayButton && (
            <a
              href="#characterList"
              className="text-white bg-gradient-to-r from-red-500 to-purple-700 text-center py-2 px-3 rounded-full mt-8 mx-auto block mb-5 md:hidden"
              onClick={handlePlayButtonClick}
            >
              ¡Vamos a jugar!
            </a>
          )}
        </>
      )}
    </>
  );
};

export default EpisodesContainer;
