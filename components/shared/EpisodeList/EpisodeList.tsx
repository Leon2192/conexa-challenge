import React from "react";
import { IEpisode } from "@/interfaces/interfaces";
import Episode from "../Episode/Episode";

interface EpisodeListProps {
  episodes: IEpisode[];
  hasFilteredEpisodes: boolean; 
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  hasFilteredEpisodes,
}) => (
  <div>
    {episodes.length > 0 ? (
      episodes.map((episode) => <Episode key={episode.id} episode={episode} />)
    ) : (
      <p className="text-white text-center">
        {hasFilteredEpisodes
          ? "No se han encontrado episodios."
          : "Aquí verás los episodios en los que aparezcan los personajes que selecciones."}
      </p>
    )}
  </div>
);

export default EpisodeList;
