import { useState } from "react";
import { ICharacter } from "@/interfaces/interfaces";
import { useGlobalContext } from "@/context/GlobalContext";
import { useSnackbar } from "notistack";
import { Card } from "@/components/ui/Card/Card";

const useCharacterRenderer = () => {
  const {
    selectedCharacter,
    selectedCharacter2,
    setSelectedCharacter,
    setSelectedCharacter2,
    charactersPerPage,
  } = useGlobalContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleCharacterSelection = (
    character: ICharacter,
    setCharacter: React.Dispatch<React.SetStateAction<ICharacter | null>>
  ) => {
    setCharacter(character);
    enqueueSnackbar(`${character.name} selected`, { variant: "success" });
  };

  const renderCharacters = (characters: ICharacter[]) => {
    return characters.slice(0, charactersPerPage).map((character) => {
      const isSelected =
        selectedCharacter && selectedCharacter.id === character.id;

      return (
        <div
          key={character.id}
          onClick={() =>
            handleCharacterSelection(character, setSelectedCharacter)
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
            onClick={() => setSelectedCharacter(character)}
          />
        </div>
      );
    });
  };

  const renderCharacters2 = (characters: ICharacter[]) => {
    return characters.slice(0, charactersPerPage).map((character) => {
      const isSelected =
        selectedCharacter2 && selectedCharacter2.id === character.id;

      return (
        <div
          key={character.id}
          onClick={() =>
            handleCharacterSelection(character, setSelectedCharacter2)
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
            onClick={() => setSelectedCharacter2(character)}
          />
        </div>
      );
    });
  };

  return { renderCharacters, renderCharacters2 };
};

export default useCharacterRenderer;
