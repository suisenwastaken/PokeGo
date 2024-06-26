import { Pokemon, PokemonCharacteristics, PokemonType } from '../src/types';

const exampleCharacteristics: PokemonCharacteristics = {
    hp: 45,
    attack: 49,
    defense: 49,
    speed: 45,
};

const exampleTypes: PokemonType[] = [
    { name: "Grass", color: "bg-green-200" },
    { name: "Poison", color: "bg-purple-200" },
];

export const examplePokemon: Pokemon = {
    id: 1,
    name: "Bulbasaur",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    characteristics: exampleCharacteristics,
    types: exampleTypes,
};
