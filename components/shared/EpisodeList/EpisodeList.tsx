import React from "react";
import { IEpisode } from "@/interfaces/interfaces";
import Episode from "../Episode/Episode";

interface EpisodeListProps {
  episodes: IEpisode[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => (
  <div>
    {episodes.length > 0 ? (
      episodes.map((episode) => <Episode key={episode.id} episode={episode} />)
    ) : (
      <p className="text-white text-center">
        No hay episodios de este personaje solo.
      </p>
    )}
  </div>
);

export default EpisodeList;
