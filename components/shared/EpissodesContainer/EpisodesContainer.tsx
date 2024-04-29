import { useGlobalContext } from "@/context/GlobalContext";
import { IEpisode } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

const EpissodesContainer: React.FC = () => {
  const { episodes, selectedCharacter, selectedCharacter2 } =
    useGlobalContext();

  const [character1Episodes, setCharacter1Episodes] = useState<IEpisode[]>([]);
  const [character2Episodes, setCharacter2Episodes] = useState<IEpisode[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const filteredCharacter1Episodes = episodes.filter((episode) => {
      const characterUrl = selectedCharacter?.url;
      return characterUrl && episode.characters.includes(characterUrl);
    });
    setCharacter1Episodes(filteredCharacter1Episodes);

    if (selectedCharacter2) {
      const filteredCharacter2Episodes = episodes.filter((episode) => {
        const characterUrl = selectedCharacter2?.url;
        return characterUrl && episode.characters.includes(characterUrl);
      });
      setCharacter2Episodes(filteredCharacter2Episodes);
    } else {
      setCharacter2Episodes([]);
    }
  }, [selectedCharacter, selectedCharacter2, episodes]);

  // Notif

  useEffect(() => {
    const filteredCharacter1Episodes = episodes.filter((episode) => {
      const characterUrl = selectedCharacter?.url;
      return characterUrl && episode.characters.includes(characterUrl);
    });
    setCharacter1Episodes(filteredCharacter1Episodes);

    if (selectedCharacter2) {
      const filteredCharacter2Episodes = episodes.filter((episode) => {
        const characterUrl = selectedCharacter2?.url;
        return characterUrl && episode.characters.includes(characterUrl);
      });
      setCharacter2Episodes(filteredCharacter2Episodes);

      if (
        filteredCharacter1Episodes.length > 0 &&
        filteredCharacter2Episodes.length > 0
      ) {
        enqueueSnackbar("¡PERFECTO! Hay episodios con ambos personajes.", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } else {
      setCharacter2Episodes([]);
    }
  }, [selectedCharacter, selectedCharacter2, episodes, enqueueSnackbar]);

  return (
    <>
      <h1 className="text-center mt-4 text-xl">Episode list</h1>
      <div>
        <div className="px-4 py-4 border-b border-gray-200">
          <h2 className="text-center mb-2 text-white text-3xl">
            Character #1 - Only Episodes
          </h2>
          <div>
            {selectedCharacter ? (
              character1Episodes.length > 0 ? (
                character1Episodes.map((episode) => (
                  <span
                    key={episode.id}
                    className="episode-bubble bg-slate-700 text-white rounded-pill px-4 mr-2 mb-2 inline-block shadow-lg hover:shadow-xl transition-all duration-300 rounded-full text-xs"
                  >
                    {episode.name}
                  </span>
                ))
              ) : (
                <p className="text-white text-center">
                  No hay episodios de este personaje solo.
                </p>
              )
            ) : (
              <p className="text-white text-center">
                Selecciona un personaje para ver los episodios.
              </p>
            )}
          </div>
        </div>

        <div className="px-4 py-4 border-b border-gray-200">
          <h2 className="text-center mb-2 text-white text-3xl">
            Character #1 & Character #2 - Shared Episodes
          </h2>
          <div>
            {selectedCharacter && selectedCharacter2 ? (
              character1Episodes.length > 0 && character2Episodes.length > 0 ? (
                character1Episodes
                  .filter((episode) =>
                    episode.characters.includes(selectedCharacter2?.url!)
                  )
                  .map((episode) => (
                    <span
                      key={episode.id}
                      className="episode-bubble bg-slate-600 text-white rounded-pill px-4 mr-2 mb-2 inline-block shadow-lg hover:shadow-xl transition-all duration-300 rounded-full text-xs"
                    >
                      {episode.name}
                    </span>
                  ))
              ) : (
                <p className="text-white text-center">
                  No hay episodios de estos personajes juntos.
                </p>
              )
            ) : (
              <p className="text-white text-center">
                Selecciona personajes de ambas secciones para ver los episodios
                compartidos.
              </p>
            )}
          </div>
        </div>

        <div className="px-4 py-4 border-b border-gray-200">
          <h2 className="text-center mb-2 text-white text-3xl">
            Character #2 - Only Episodes
          </h2>
          <div>
            {selectedCharacter2 ? (
              character2Episodes.length > 0 ? (
                character2Episodes.map((episode) => (
                  <span
                    key={episode.id}
                    className="episode-bubble bg-slate-700 text-white rounded-pill px-4 mr-2 mb-2 inline-block shadow-lg hover:shadow-xl transition-all duration-300 rounded-full text-xs"
                  >
                    {episode.name}
                  </span>
                ))
              ) : (
                <p className="text-white text-center">
                  No hay episodios de este personaje solo.
                </p>
              )
            ) : (
              <p className="text-white text-center">
                Selecciona un personaje para ver los episodios.
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
       
        {selectedCharacter || selectedCharacter2 ? (
          <p className="text-white text-center mt-4">
            Buscaremos episodios en los que aparezcan <span className="text-orange-600 font-bold text-xl underline">{selectedCharacter?.name}</span>{", "}
            <span className="text-orange-600 font-bold text-xl underline"> {selectedCharacter2?.name}</span>
          </p>
        ) : null}
      </div>
    </>
  );
};

export default EpissodesContainer;

const episodeItem = `
  px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 cursor-default
`;
