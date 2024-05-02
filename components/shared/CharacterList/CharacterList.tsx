import React from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { PiAlienFill } from "react-icons/pi";
import Loader from "@/components/ui/Loader/Loader";
import Button from "@/components/ui/Buttons/Button";
import Tooltip from "@/components/ui/Tooltip/Tooltip";
import Card from "@/components/ui/Card/Card";
import { useGlobalContext } from "@/context/GlobalContext";
import CharacterRenderer from "../CharacterRenderer/CharacterRenderer";

const CharacterList = () => {
  const {
    characters1,
    characters2,
    currentPage1,
    currentPage2,
    handleNextPage,
    handlePrevPage,
    handlePrevPage2,
    handleNextPage2,
    loading,
    selectedCharacter,
    selectedCharacter2,
    resetSelectedCharacters,
    charactersPerPage,
    totalPages1,
    totalPages2,
    setSelectedCharacter,
    setSelectedCharacter2,
  } = useGlobalContext();

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div
          className="flex flex-col"
          id="characterList"
          data-testid="character-list"
        >
          <div className="mb-8 mt-5">
            <h2 className="text-center text-3xl text-white">
              Character #1 List
            </h2>
            <div className="mt-4 flex justify-around mb-4">
              {currentPage1 !== 1 && (
                <Tooltip content="Previous Page">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage1 === 1}
                  >
                    <MdKeyboardDoubleArrowLeft color="red" size={"1.5em"} />
                  </button>
                </Tooltip>
              )}
              <span className="text-xs font-bold px-1 py-1 rounded-full bg-red-600 text-white">
                <PiAlienFill size={"1.5em"} />
              </span>
              {currentPage1 < totalPages1 && (
                <Tooltip content="Next Page">
                  <button onClick={handleNextPage}>
                    <MdKeyboardDoubleArrowRight color="red" size={"1.5em"} />
                  </button>
                </Tooltip>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <CharacterRenderer
                characters={characters1}
                selectedCharacter={selectedCharacter}
                setSelectedCharacter={setSelectedCharacter}
                charactersPerPage={charactersPerPage}
                characterNumber={1}
              />
            </div>
          </div>

          {(selectedCharacter || selectedCharacter2) && (
            <div className="text-center mt-4 mb-4">
              <p className="text-white">
                Selected{" "}
                <span className="text-orange-600 font-bold text-xl underline">
                  {selectedCharacter?.name}
                </span>
                {" , "}
                <span className="text-orange-600 font-bold text-xl underline">
                  {selectedCharacter2?.name}
                </span>
              </p>
            </div>
          )}

          <div>
            <h2 className="text-center text-3xl text-white">
              Character #2 List
            </h2>
            <div className="mt-4 flex justify-around mb-4">
              {currentPage2 > 2 && (
                <Tooltip content="Previous Page">
                  <button
                    onClick={handlePrevPage2}
                    disabled={currentPage2 <= 2}
                  >
                    <MdKeyboardDoubleArrowLeft color="red" size={"1.5em"} />
                  </button>
                </Tooltip>
              )}
              <span className="text-xs font-bold px-1 py-1 rounded-full bg-red-600 text-white">
                <PiAlienFill size={"1.5em"} />
              </span>
              {currentPage2 < totalPages2 && (
                <Tooltip content="Next Page">
                  <button onClick={handleNextPage2}>
                    <MdKeyboardDoubleArrowRight size={"1.5em"} color="red" />
                  </button>
                </Tooltip>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <CharacterRenderer
                characters={characters2}
                selectedCharacter={selectedCharacter2}
                setSelectedCharacter={setSelectedCharacter2}
                charactersPerPage={charactersPerPage}
                characterNumber={2}
              />
            </div>
          </div>
        </div>
      )}
      {selectedCharacter || selectedCharacter2 ? (
        <div className="flex justify-center mt-4">
          <Button onClick={resetSelectedCharacters}>Restart</Button>
        </div>
      ) : null}
    </>
  );
};

export default CharacterList;
