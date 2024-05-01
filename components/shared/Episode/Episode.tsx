import React from "react";
import { IEpisode } from "@/interfaces/interfaces";

interface EpisodeProps {
  episode: IEpisode;
}

const Episode: React.FC<EpisodeProps> = ({ episode }) => (
  <span
    key={episode.id}
    className="episode-bubble bg-gradient-to-br from-purple-600 to-rose-500 text-white rounded-pill px-4 py-1 mr-2 mb-2 inline-block shadow-lg hover:shadow-xl transition-all duration-300 rounded-full text-xs"



  >
    {episode.name}
  </span>
);

export default Episode;
