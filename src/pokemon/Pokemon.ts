import { IPokemon } from './IPokemon'

export enum PokemonType {
  Fire = 'Fire',
  Water = 'Water',
  Plant = 'Plant',
  Electric = 'Electric',
  Normal = 'Normal',
}
export class Pokemon implements IPokemon {
  public attack: number

  constructor(
    public name: string,
    public type: PokemonType,
    public speed: number,
    public hp: number,
  ) {
    this.attack = Math.floor(Math.random() * 100)
  }

  toString() {
    return `${this.name} (${this.type}, ${this.hp}hp, ${this.attack}atk, ${this.speed}spd)`
  }

  isAlive() {
    return this.hp > 0
  }
}
