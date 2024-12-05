import { IPokemon } from './IPokemon.ts'

export class Pokemon implements IPokemon {
  public attack: IPokemon['attack']
  public id: IPokemon['id']

  constructor(
    public name: IPokemon['name'],
    public type: IPokemon['type'],
    public speed: IPokemon['speed'],
    public hp: IPokemon['hp'],
  ) {
    this.id = `${crypto.randomUUID()}_${name}`
    this.attack = Math.floor(Math.random() * 100)
  }

  toString() {
    return `#${this.id} ${this.name} (${this.type}, ${this.hp}hp, ${this.attack}atk, ${this.speed}spd)`
  }

  isAlive() {
    return this.hp > 0
  }
}
