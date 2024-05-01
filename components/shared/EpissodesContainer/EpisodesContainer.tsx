import React, { useEffect, useState } from "react";
import Image from "next/image";
import EpisodeList from "../EpisodeList/EpisodeList";
import { useGlobalContext } from "@/context/GlobalContext";
import Loader from "@/components/ui/Loader/Loader";

const EpisodesContainer: React.FC = () => {
  const {
    loadingSharedEpisodes,
    selectedCharacter,
    selectedCharacter2,
    filterEpisodes,
  } = useGlobalContext();

  const { character1Episodes, character2Episodes, sharedEpisodes } =
    filterEpisodes;

  const [showLoader, setShowLoader] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  useEffect(() => {
    setShowLoader(true);
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [character1Episodes, character2Episodes]);

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
          {selectedCharacter && selectedCharacter2 ? (
            <>
              <div>
                <p className="text-white text-center mt-4">
                  Episodes where they appear{" "}
                  <span className="text-orange-600 font-bold text-xl underline">
                    {selectedCharacter?.name}
                  </span>
                  {" , "}
                  <span className="text-orange-600 font-bold text-xl underline">
                    {selectedCharacter2?.name}
                  </span>
                </p>
              </div>
              <div>
                <div
                  data-testid="episodes-container"
                  className="px-4 py-4 border-b border-gray-200"
                >
                  <h2 className="text-center mb-2 text-white text-2xl sm:text-3xl">
                    Episodes Character #1
                  </h2>
                  <EpisodeList
                    episodes={character1Episodes}
                    hasFilteredEpisodes={character1Episodes.length > 0}
                  />
                </div>

                <div className="px-4 py-4 border-b border-gray-200">
                  <h2 className="text-center mb-2 text-white text-2xl sm:text-3xl">
                    Shared Episodes Character #1 & Character #2
                  </h2>
                  <EpisodeList
                    episodes={sharedEpisodes}
                    hasFilteredEpisodes={sharedEpisodes.length > 0}
                  />
                </div>

                <div className="px-4 py-4 border-b border-gray-200">
                  <h2 className="text-center mb-2 text-white text-2xl sm:text-3xl">
                    Episodes Character #2
                  </h2>
                  <EpisodeList
                    episodes={character2Episodes}
                    hasFilteredEpisodes={character2Episodes.length > 0}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="justify-center text-white">
              <h1 className="text-center font-bold text-orange-600 text-3xl sm:text-3xl mx-4 md:mx-8">
                Select a character number #1 and a character #2 and discover in
                which episodes of the Rick & Morty series each one appears
                individually and sharing episodes
              </h1>
              <p className="text-center text-2xl mt-6">Sounds easy, right?</p>
              <p className="text-center text-3xl mt-8 font-bold text-orange-700">
                LET'S GO!
              </p>
            </div>
          )}

          {showPlayButton && (
            <a
              href="#characterList"
              className="text-white bg-gradient-to-r from-red-500 to-purple-700 text-center py-2 px-3 rounded-full mt-8 mx-auto block mb-5 md:hidden"
              onClick={handlePlayButtonClick}
            >
              Let's play!
            </a>
          )}
        </>
      )}
    </>
  );
};

export default EpisodesContainer;
