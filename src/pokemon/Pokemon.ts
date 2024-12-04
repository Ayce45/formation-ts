import { IPokemon } from './IPokemon.ts'

export enum PokemonType {
  Fire = 'Fire',
  Water = 'Water',
  Plant = 'Plant',
  Electric = 'Electric',
  Normal = 'Normal',
}
export class Pokemon implements IPokemon {
  public attack: number
  public id: `${PokemonType}-${Pokemon['name']}`

  constructor(
    public name: string,
    public type: PokemonType,
    public speed: number,
    public hp: number,
  ) {
    this.id = `${type}-${name}-${crypto.randomUUID()}`
    this.attack = Math.floor(Math.random() * 100)
  }

  toString() {
    return `#${this.id} ${this.name} (${this.type}, ${this.hp}hp, ${this.attack}atk, ${this.speed}spd)`
  }

  isAlive() {
    return this.hp > 0
  }
}
