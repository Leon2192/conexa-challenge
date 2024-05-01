import React, { useState } from "react";
import { Card } from "@/components/ui/Card/Card";
import { ICharacter } from "@/interfaces/interfaces";
import { useGlobalContext } from "@/context/GlobalContext";

interface CharacterRendererProps {
  characters: ICharacter[];
  selectedCharacter?: ICharacter;
  setSelectedCharacter: (character: ICharacter) => void;
}

const CharacterRenderer: React.FC<CharacterRendererProps> = ({
  characters,
  selectedCharacter,
  setSelectedCharacter,
}) => {
  const { charactersPerPage } = useGlobalContext();

  // Obtener los personajes de la página actual utilizando slice
  const charactersToShow = characters.slice(0, charactersPerPage);

  return (
    <>
      {charactersToShow.map((character) => (
        <div
          key={character.id}
          className={`w-full sm:w-1/2 md:w-2/4 lg:w-1/3 px-1 mb-4 overflow-hidden hover:shadow-md transition duration-200 ease-in-out`}
        >
          <Card
            name={character.name}
            status={character.status}
            image={character.image}
            species={character.species}
            url={character.url}
            isSelected={
              selectedCharacter && selectedCharacter.id === character.id
            }
            onClick={() => setSelectedCharacter(character)}
          />
        </div>
      ))}
      {/* Agregar lógica para mostrar botones de paginación aquí */}
    </>
  );
};

export default CharacterRenderer;
