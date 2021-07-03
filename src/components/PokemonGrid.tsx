import React, { FunctionComponent, useCallback } from 'react'
import PokemonSquare, { Pokemon, Color } from './PokemonSquare';
import './PokemonGrid.css';

export interface PokemonGridProps {
    pokemon: Pokemon[],
    onPkmnColorChange: (color: Color, pkmn: Pokemon) => void,
    showName: boolean,
    showNum: boolean
}

const PokemonGrid: FunctionComponent<PokemonGridProps> = (props) => {
    return (
        <div className="PokemonGrid">
            <div className="grid">
                {props.pokemon.map((pkmn: Pokemon) => (
                    <PokemonSquare
                        key={pkmn.imgPath}
                        pokemon={pkmn}
                        showName={props.showName}
                        showNum={props.showNum}
                        onChangeColor={(newColor: Color) => props.onPkmnColorChange(newColor, pkmn)}
                    />
                ))}
            </div>
        </div>
    );
}
export default PokemonGrid