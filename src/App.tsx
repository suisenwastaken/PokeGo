import PokemonCard from './components/PokemonCard/PokemonCard'
import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import {
    PokemonAPI,
    mapApiDataToPokemon,
    pokemonPerPage,
    searchPokemonByName,
} from './constants'
import { Pokemon, PokemonLink } from './types'
import PokemonModal from './components/PokemonModal/PokemonModal'

const App = () => {
    const [search, setSearch] = useState<string>('')
    const [pokemonData, setPokemonData] = useState<Pokemon[] | null>(null)
    const [pokemonLinks, setPokemonLinks] = useState<PokemonLink[] | null>(null)
    const [page, setPage] = useState<number>(1)
    const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const fetchPokemonLinks = async () => {
            try {
                const response = await fetch(
                    PokemonAPI + '?limit=100000&offset=0'
                )
                const data = await response.json()
                if (data) {
                    setPokemonLinks(data.results)
                }
            } catch (error) {
                console.error('Ошибка при запросе ссылок покемонов:', error)
            }
        }
        fetchPokemonLinks()
    }, [])

    useEffect(() => {
        setPokemonData(null)
    }, [search])

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (!pokemonLinks) {
                console.error('pokemonLinks is null')
                return
            }

            try {
                const filteredLinks = searchPokemonByName(search, pokemonLinks)
                const slicedLinks = filteredLinks.slice(
                    (page - 1) * pokemonPerPage,
                    page * pokemonPerPage
                )

                const fetchPromises = slicedLinks.map(async (el) => {
                    const pokemonResponse = await fetch(el.url)
                    if (pokemonResponse.ok) {
                        const data = await pokemonResponse.json()
                        return mapApiDataToPokemon(data)
                    } else {
                        console.error(
                            `Ошибка при запросе: ${pokemonResponse.status} ${pokemonResponse.statusText}`
                        )
                        throw new Error(
                            `Ошибка при запросе: ${pokemonResponse.status} ${pokemonResponse.statusText}`
                        )
                    }
                })

                const fetchedPokemonData: Pokemon[] =
                    await Promise.all(fetchPromises)
                setPokemonData((prev) =>
                    prev ? [...prev, ...fetchedPokemonData] : fetchedPokemonData
                )
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error)
            }
        }, 1000)

        return () => clearTimeout(timeout)
    }, [pokemonLinks, search, page])

    const handleCardClick = (pokemon: Pokemon) => {
        setCurrentPokemon(pokemon)
        setIsSheetOpen(true)
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <Header search={search} setSearch={setSearch} />
            {pokemonData ? (
                pokemonData.length === 0 ? (
                    <div className="text-4xl pt-40">Nothing found</div>
                ) : (
                    <div className="grid h-auto w-3/4 grid-cols-2 items-center justify-center gap-4 bg-background py-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {pokemonData.map((el) => (
                            <PokemonCard
                                key={el.id}
                                pokemon={el}
                                onClick={() => handleCardClick(el)}
                            />
                        ))}
                    </div>
                )
            ) : (
                <img
                    src="pokeball.gif"
                    alt="loader"
                    className="pt-40 grayscale"
                />
            )}
            <PokemonModal
                pokemon={currentPokemon}
                isOpen={isSheetOpen}
                setIsOpen={() => setIsSheetOpen(false)}
            />
        </div>
    )
}

export default App
