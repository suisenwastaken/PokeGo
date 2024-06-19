import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { Pokemon } from '@/types'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'

type PokemonCardProps = {
    pokemon: Pokemon
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const [isHover, setIsHover] = useState(false)

    return (
        <Card
            className="flex h-fit flex-col items-center justify-center"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            isHover={isHover}
        >
            <CardHeader>
                <CardTitle>{pokemon.name}</CardTitle>
                <CardDescription># {pokemon.id}</CardDescription>
            </CardHeader>
            <CardContent className="box-border">
                <img
                    className={cn(
                        'scale-150 object-cover grayscale transition-all duration-300 ease-in-out',
                        isHover ? 'grayscale-0' : ''
                    )}
                    src={pokemon.img}
                    alt="Pokemon Image"
                />
            </CardContent>
            <CardFooter className="gap-1">
                {pokemon.types.map((el, i) => {
                    return (
                        <Badge
                            variant={isHover ? 'default' : 'secondary'}
                            key={i}
                        >
                            {el.name}
                        </Badge>
                    )
                })}
            </CardFooter>
        </Card>
    )
}

export default PokemonCard
