import { Pokemon } from '@/types'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { Badge } from '../ui/badge'
import PokemonCharacteristic from '../PokemonCharacteristic/PokemonCharacteristic'

type PokemonModalProps = {
    pokemon: Pokemon | null
    isOpen: boolean
    setIsOpen: () => void
}

const PokemonModal: React.FC<PokemonModalProps> = ({
    pokemon,
    isOpen,
    setIsOpen,
}) => {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-4xl">
                        {pokemon?.name}
                    </SheetTitle>
                    <SheetDescription className="text-xl">
                        # {pokemon?.id}
                    </SheetDescription>
                </SheetHeader>
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <img
                        src={pokemon?.img}
                        alt="pokemon img"
                        className="w-full"
                    />
                    <div className="flex w-full items-center justify-center gap-3">
                        {pokemon?.types.map((el, i) => {
                            return (
                                <Badge
                                    variant={'default'}
                                    key={i}
                                    className="text-lg"
                                >
                                    {el.name}
                                </Badge>
                            )
                        })}
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        {pokemon?.characteristics.map((el, i) => {
                            return (
                                <PokemonCharacteristic
                                    characteristic={el}
                                    key={i}
                                />
                            )
                        })}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default PokemonModal
