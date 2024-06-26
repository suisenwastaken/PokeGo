import {
    Pokemon,
    PokemonCharacteristics,
    PokemonLink,
    PokemonType,
} from './types'

export const PokemonAPI = 'https://pokeapi.co/api/v2/pokemon/'
export const pokemonPerPage = 20

export function mapApiDataToPokemon(apiData: any): Pokemon {
    const characteristics: PokemonCharacteristics[] = [
        { name: 'hp', value: apiData.stats.find((stat: any) => stat.stat.name === 'hp').base_stat },
        { name: 'attack', value: apiData.stats.find((stat: any) => stat.stat.name === 'attack').base_stat },
        { name: 'defense', value: apiData.stats.find((stat: any) => stat.stat.name === 'defense').base_stat },
        { name: 'speed', value: apiData.stats.find((stat: any) => stat.stat.name === 'speed').base_stat }
    ];

    // Извлечение типов
    const types: PokemonType[] = apiData.types.map((type: any) => ({
        name: type.type.name,
        color: '' // Ваше значение цвета для этого типа покемона
    }));

    // Построение объекта Pokemon
    const pokemon: Pokemon = {
        id: apiData.id,
        name: apiData.name,
        img: apiData.sprites.front_default,
        characteristics: characteristics,
        types: types,
    };

    return pokemon;
}


export function searchPokemonByName(
    searchString: string,
    pokemonLinkList: PokemonLink[] | null
): PokemonLink[] {
    if (!pokemonLinkList) {
        console.error('pokemonLinkList is null')
        return []
    }

    return pokemonLinkList.filter((el) => el.name.includes(searchString))
}
