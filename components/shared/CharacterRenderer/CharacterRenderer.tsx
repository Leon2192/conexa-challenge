import React from "react";
import Card from "@/components/ui/Card/Card";
import { ICharacter } from "@/interfaces/interfaces";
import { useGlobalContext } from "@/context/GlobalContext";

interface CharacterRendererProps {
  characters: ICharacter[];
  selectedCharacter: ICharacter | null;
  setSelectedCharacter: (character: ICharacter) => void;
  charactersPerPage: number;
  characterNumber: number;
}

const CharacterRenderer: React.FC<CharacterRendererProps> = ({
  characters,
  selectedCharacter,
  charactersPerPage,
  characterNumber,
}) => {
  const { handleCharacterSelection, setSelectedCharacter } = useGlobalContext();

  return (
    <>
      {characters.map((character, index) => {
        if (index < charactersPerPage) {
          const isSelected =
            selectedCharacter && selectedCharacter.id === character.id;

          return (
            <div
              key={character.id}
              onClick={() =>
                handleCharacterSelection(
                  character,
                  setSelectedCharacter,
                  characterNumber
                )
              }
              className={`w-full sm:w-1/2 md:w-2/4 lg:w-1/3 px-1 mb-4 overflow-hidden hover:shadow-md transition duration-200 ease-in-out`}
            >
              <Card
                name={character.name}
                status={character.status}
                image={character.image}
                species={character.species}
                url={character.url}
                isSelected={isSelected}
              />
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default CharacterRenderer;
