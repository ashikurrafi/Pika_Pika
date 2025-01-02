import { useState } from "react";

const Cards = ({ pokemonData }) => {
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem(pokemonData.name) ? true : false
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      localStorage.removeItem(pokemonData.name);
    } else {
      localStorage.setItem(pokemonData.name, JSON.stringify(pokemonData));
    }
    setIsFavorite(!isFavorite);
  };

  const ability = pokemonData.abilities
    .map((currentAbility) => currentAbility.ability.name)
    .slice(0, 1)
    .join(", ");

  const type = pokemonData.types
    .map((currentType) => currentType.type.name)
    .slice(0, 1)
    .join(", ");

  const baseStat = pokemonData.stats?.[5]?.base_stat || "N/A";

  return (
    <>
      <div className="flex flex-col rounded-2xl w-[400px] bg-[#ffffff] shadow-xl">
        <figure className="flex justify-center items-center rounded-2xl">
          <img
            src={pokemonData.sprites.other.dream_world.front_default}
            className="h-96 w-96"
            alt={pokemonData.name}
          />
        </figure>
        <div className="flex flex-col p-8">
          <div className="text-2xl font-bold   text-[#374151] pb-6">
            {pokemonData.name}{" "}
          </div>
          <div className=" text-lg   text-[#374151]">
            <h1>Abilities: {ability}</h1>
            <h1>Types: {type}</h1>
            <h1>Base Stats: {baseStat}</h1>
          </div>
          <div className="flex justify-end pt-6">
            <button
              onClick={toggleFavorite}
              className="bg-[#7e22ce] text-[#ffffff] w-full font-bold text-base  p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform transform"
            >
              {isFavorite ? "Unfavorite" : "Favorite"}{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
