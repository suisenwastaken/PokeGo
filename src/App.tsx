import PokemonCard from './components/PokemonCard/PokemonCard'
import { examplePokemon } from '../public/TestData'
import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import {
    PokemonAPI,
    mapApiDataToPokemon,
    searchPokemonByName,
} from './constants'
import { Pokemon, PokemonLink } from './types'

const App = () => {
    const pokemons: JSX.Element[] = new Array(10).fill(
        <PokemonCard pokemon={examplePokemon} />
    )
    const [search, setSearch] = useState<string>('')
    const [pokemonData, setPokemonData] = useState<Pokemon[] | null>(null)
    const [pokemonLinks, setPokemonLinks] = useState<PokemonLink[] | null>(null)

    useEffect(() => {
        const pokemonLinksData = async () => {
            try {
                const pokemonLinksResponse = await (
                    await fetch(PokemonAPI + '?limit=100000&offset=0')
                ).json()
                if (pokemonLinksResponse) {
                    setPokemonLinks(pokemonLinksResponse.results)
                }
            } catch (error) {
                console.error(error)
            }
        }
        pokemonLinksData()
    }, [])

    useEffect(() => {
        const timeout = setTimeout(async () => {
            try {
                const fetchPromises: Promise<Pokemon>[] = searchPokemonByName(search, pokemonLinks).map(async (el) => {
                    const pokemonResponse = await fetch(el.url);
                    if (pokemonResponse.ok) {
                        const data: any = await pokemonResponse.json();
                        return mapApiDataToPokemon(data);
                    } else {
                        console.error(`Ошибка при запросе: ${pokemonResponse.status} ${pokemonResponse.statusText}`);
                        throw new Error(`Ошибка при запросе: ${pokemonResponse.status} ${pokemonResponse.statusText}`);
                    }
                });
    
                // Ожидаем завершения всех запросов
                const fetchedPokemonData: Pokemon[] = await Promise.all(fetchPromises);
    
                // Устанавливаем состояние с полученными данными
                setPokemonData(fetchedPokemonData);
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        }, 1000);
    
        return () => clearTimeout(timeout);
    }, [pokemonLinks, search]);
    

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <Header search={search} setSearch={setSearch} />
            <div className="grid h-auto w-3/4 grid-cols-2 items-center justify-center gap-4 bg-background py-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {/* {pokemons} */}
                {pokemonData?.map((el) => <PokemonCard pokemon={el} />)}
            </div>
        </div>
    )
}

export default App
