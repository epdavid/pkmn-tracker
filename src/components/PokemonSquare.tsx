import React, { FunctionComponent } from 'react'
import clsx from 'clsx';
import './PokemonSquare.css'


export interface Pokemon {
    imgPath: string,
    name: string,
    dexNumber: number,
    generation: number,
    color: Color
}
export interface PokemonSquareProps {
    pokemon: Pokemon,
    showName: boolean,
    showNum: boolean,
    onChangeColor: (newColor: Color) => void
}

export enum Color {
    white = 'white',
    grey = 'grey',
    blue = 'blue',
    red = 'red',
    yellow = 'yellow',
    green = 'green'
}

const PokemonSquare: FunctionComponent<PokemonSquareProps> = (props) => {
    const handleClick = () => {
        switch (props.pokemon.color) {
            case Color.white:
                props.onChangeColor(Color.grey)
                break
            case Color.grey:
                props.onChangeColor(Color.blue)
                break
            case Color.blue:
                props.onChangeColor(Color.red)
                break
            case Color.red:
                props.onChangeColor(Color.yellow)
                break
            case Color.yellow:
                props.onChangeColor(Color.green)
                break
            case Color.green:
            default:
                props.onChangeColor(Color.white)
                break
        }
    }
    return (
        <div onClick={handleClick} className={clsx(props.pokemon.color, 'PokemonSquare')}>
            <img src={props.pokemon.imgPath} alt={`#${props.pokemon.dexNumber} ${props.pokemon.name}`}/>
            {props.showName && <div className="subtitle">{props.pokemon.name}</div>}
            {props.showNum && <div className="subtitle">#{props.pokemon.dexNumber}</div>}
        </div>
    )
}


export default PokemonSquare