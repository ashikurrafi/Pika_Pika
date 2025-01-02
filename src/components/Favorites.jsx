import { useEffect, useState } from "react";
import Cards from "./Cards";

const Favorites = () => {
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  useEffect(() => {
    const savedFavorites = Object.keys(localStorage).map((key) =>
      JSON.parse(localStorage.getItem(key))
    );
    setFavoritePokemons(savedFavorites);
  }, []);

  return (
    <>
      <h1 className="text-center font-semibold text-xl">Favorite Pokémon</h1>

      {favoritePokemons.length === 0 ? (
        <div className="text-center text-xl text-red-500 mt-8">
          <h2>404 No Pokémon Found</h2>
        </div>
      ) : (
        <div className="flex justify-center mt-4">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {favoritePokemons.map((pokemon) => (
              <Cards key={pokemon.name} pokemonData={pokemon} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Favorites;
