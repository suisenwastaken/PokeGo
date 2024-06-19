import { Dispatch, FC, SetStateAction } from 'react'
import { Input } from '../ui/input'

type HeaderProps = {
    search: string | undefined
    setSearch: Dispatch<SetStateAction<string>>
}

const Header: FC<HeaderProps> = ({ search, setSearch }) => {
    return (
        <div className="relative px-10 sm:px-30 md:px-40 lg:px-56 flex w-full flex-col items-start justify-center gap-8 overflow-hidden bg-primary-foreground py-24">
            <img
                className="absolute right-0 top-0 w-48 md:w-64 lg:w-96 -translate-y-1/3 translate-x-1/3 transform"
                src="pokeball.svg"
                alt="Pokeball"
            />
            <h1 className="text-4xl">Enter name of the Pokemon!</h1>
            <Input
                className="text-2xl"
                placeholder="e.g. Pikachu"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}

export default Header
