export interface IPokemon {
  name: string
  type: string
  attack: number
  hp: number
  speed: number
  toString(): string
  isAlive(): boolean
}
