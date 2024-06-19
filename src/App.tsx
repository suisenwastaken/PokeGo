import PokemonCard from './components/PokemonCard/PokemonCard'
import { examplePokemon } from '../public/TestData'
import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'

const App = () => {
    const pokemons: JSX.Element[] = new Array(10).fill(
        <PokemonCard pokemon={examplePokemon} />
    )
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setTimeout(() => {
            
        },5000)
    },[search])

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <Header search={search} setSearch={setSearch}/>
            <div className="grid h-auto py-16 w-3/4 grid-cols-2 items-center justify-center gap-4 bg-background sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {pokemons}
            </div>
        </div>
    )
}

export default App
