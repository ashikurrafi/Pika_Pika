import { useEffect, useState } from "react";
import Cards from "./Cards";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const data = "https://pokeapi.co/api/v2/pokemon?limit=50";

  const getPokemon = async () => {
    try {
      const response = await fetch(data);
      const data_2 = await response.json();

      const pokemonDetails = data_2.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data_3 = await res.json();
        return data_3;
      });

      const detailedResponse = await Promise.all(pokemonDetails);

      setPokemon(detailedResponse);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center text-red-500">{error.message}</h1>;
  }

  return (
    <>
      <div className="max-w-md mx-auto">
        <div className="flex justify-between mb-4">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              placeholder="Search Pokémon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredPokemon.map((pokemon) => (
            <Cards key={pokemon.name} pokemonData={pokemon} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Pokemon;
