import { PokemonType } from './PokemonType.js'

export type IPokemon = {
  id: `${string}-${string}-${string}-${string}-${string}_${IPokemon['name']}`
  name: string
  type: PokemonType
  attack: number
  hp: number
  speed: number
  multiplierAttack?: Record<keyof PokemonType, number>
  toString(): string
  isAlive(): boolean
}
