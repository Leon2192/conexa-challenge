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
          ? "Here you will see the episodes in which the characters you select appear."
          : "No episodes were found"}
      </p>
    )}
  </div>
);

export default EpisodeList;
