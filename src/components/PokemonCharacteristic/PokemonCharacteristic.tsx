import { PokemonCharacteristics } from "@/types";
import React from "react";
import { Progress } from "../ui/progress";

type PokemonCharacteristicProps = {
    characteristic: PokemonCharacteristics
}

const PokemonCharacteristic:  React.FC<PokemonCharacteristicProps> = ({characteristic}) => {
    return (
        <div className="flex flex-col w-full gap-1">
            <div className="text-base">{characteristic.name}</div>
            <Progress value={characteristic.value}/>
        </div>
    );
}

export default PokemonCharacteristic;