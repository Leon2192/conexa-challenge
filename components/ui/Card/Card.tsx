import Image from "next/image";
import React from "react";
import { ICharacter } from "@/interfaces/interfaces";
import { FaCheckCircle } from "react-icons/fa";

export function Card({ name, status, species, image, isSelected }: ICharacter) {
  const borderClass = isSelected
    ? "border border-pink-500 border-solid border-2 bg-orange-600"
    : "border border-gray-200 dark:border-white border-solid";

  return (
    <div
      data-testid="character-card"
      className={`flex flex-row shadow-md dark:shadow-emerald-500/[0.1] dark:bg-transparent overflow-hidden rounded-lg border ${borderClass} h-56 transition duration-300 ease-in-out transform hover:shadow-lg hover:bg-rose-500 hover:text-white hover:cursor-pointer`}
    >
      <div className="w-2/5">
        <Image
          src={image}
          alt="thumbnail"
          width={200}
          height={200}
          className="object-cover rounded-l-lg h-full"
          loading="eager"
          priority
        />
      </div>
      <div className="flex-1 p-4">
        <h3 className="text-xl font-bold text-white dark:text-green-700 text-center underline">
          {name}
        </h3>
        <div className="flex mt-2">
          <p className="text-white text-md mr-2 dark:text-neutral-300">
            <span className="text-md font-bold text-sky-800">Status:</span>{" "}
            {status}
          </p>
          <p className="text-white text-md dark:text-neutral-300">
            <span className="font-semibold text-purple-600"> Specie:</span>  
            {species}
          </p>
        </div>
        <div className="flex justify-center mt-8">
          {isSelected ? (
            <div className="flex items-center">
              <p className="text-green-300 font-semibold mr-2 text-xl">
                Selected!
              </p>
              <FaCheckCircle size={"1.5em"} className="text-green-400" />
            </div>
          ) : (
            <p className="text-white underline">Choose Character</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
