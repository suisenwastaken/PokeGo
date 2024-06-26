export type Pokemon = {
    id: number
    name: string
    img: string
    characteristics: PokemonCharacteristics[]
    types: PokemonType[]
}

export type PokemonCharacteristics = {
    name: string,
    value: number
}

export type PokemonType = {
    name: string
    color: string
}

export type PokemonLink = {
    name: string,
    url: string,
}