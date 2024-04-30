import React from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import { useGlobalContext } from "@/context/GlobalContext";
import useCharacterRenderer from "@/utils/hooks/useCharacterRender";
import { PiAlienFill } from "react-icons/pi";
import Loader from "@/components/ui/Loader/Loader";

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
  } = useGlobalContext();

  const { renderCharacters, renderCharacters2 } = useCharacterRenderer();

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col" id="characterList">
          <div className="mb-8">
            <h2 className="text-center text-3xl text-white">
              Character #1 List
            </h2>
            <div className="mt-4 flex justify-around mb-4">
              <button onClick={handlePrevPage} disabled={currentPage1 === 1}>
                <MdKeyboardDoubleArrowLeft color="red" />
              </button>
              <span className="text-xs font-bold px-1 py-1 rounded-full bg-red-600 text-white">
                <PiAlienFill size={"1em"} />
              </span>
              <button onClick={handleNextPage}>
                <MdKeyboardDoubleArrowRight color="red" />
              </button>
            </div>

            <div className="flex justify-center gap-4">
              {renderCharacters(characters1)}
            </div>
          </div>

          <div>
            <h2 className="text-center text-3xl text-white">
              Character #2 List
            </h2>
            <div className="mt-4 flex justify-around mb-4">
              <button onClick={handlePrevPage2} disabled={currentPage2 === 1}>
                <MdKeyboardDoubleArrowLeft color="red" />
              </button>
              <span className="text-xs font-bold px-1 py-1 rounded-full bg-red-600 text-white">
                <PiAlienFill size={"1em"} />
              </span>
              <button onClick={handleNextPage2}>
                <MdKeyboardDoubleArrowRight color="red" />
              </button>
            </div>

            <div className="flex justify-center gap-4">
              {renderCharacters2(characters2)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterList;
