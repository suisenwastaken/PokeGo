export type Pokemon = {
    id: number
    name: string
    img: string
    characteristics: PokemonCharacteristics
    types: PokemonType[]
}

export type PokemonCharacteristics = {
    hp: number
    attack: number
    defense: number
    speed: number
}

export type PokemonType = {
    name: string
    color: string
}
