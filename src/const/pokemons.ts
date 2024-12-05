import { Pokemon } from '../pokemon/Pokemon.ts'
import { PokemonType } from '../pokemon/PokemonType.js'

export const pokemons: Pick<Pokemon, 'name' | 'type' | 'speed' | 'hp'>[] = [
  { name: 'Pikachu', type: PokemonType.Electric, speed: 20, hp: 999999 },
  { name: 'Raichu', type: PokemonType.Electric, speed: 20, hp: 300 },
  { name: 'Elector', type: PokemonType.Electric, speed: 1, hp: 400 },
  { name: 'Charmeleon', type: PokemonType.Fire, speed: 5, hp: 200 },
  { name: 'Bulbasaur', type: PokemonType.Plant, speed: 4, hp: 500 },
]
