import { pokemons } from '../const/pokemons'
import { Pokemon, PokemonType } from '../pokemon/Pokemon'

export type BattleResult = {
  history: string[]
  firstAttacker: Pokemon['name']
  winner: Pokemon['name']
  pokemon1: Pokemon
  pokemon2: Pokemon
}

export class Battle {
  private readonly pokemon1: Pokemon
  private readonly pokemon2: Pokemon
  private history: string[] = []
  constructor(name1: Pokemon['name'], name2: Pokemon['name']) {
    this.pokemon1 = this.findPokemon(name1)
    this.pokemon2 = this.findPokemon(name2)
  }

  public fighting(): BattleResult {
    console.info('**** START ****')
    console.info(this.pokemon1)
    console.info(this.pokemon2)

    let turn: Pokemon['name']

    const firstAttacker = this.firstAttacker(this.pokemon1, this.pokemon2)
    turn = firstAttacker.name
    console.info(`${firstAttacker.name} attacks first`)

    while (this.pokemon1.isAlive() && this.pokemon2.isAlive()) {
      console.info(`**** TURN OF ${turn} ****`)

      const attacker =
        turn === this.pokemon1.name ? this.pokemon1 : this.pokemon2
      const defender =
        turn === this.pokemon1.name ? this.pokemon2 : this.pokemon1

      this.attackPokemon(attacker, defender)
      turn = defender.name

      this.log(
        `${attacker.name} attacks ${defender.name} and hit with damage ${attacker.attack} (${defender.name} left ${defender.hp}hp)`,
      )
    }

    console.info(`**** END ****`)
    const winner: Pokemon['name'] = this.pokemon1.isAlive()
      ? this.pokemon1.name
      : this.pokemon2.name
    this.log(`${winner} wins`)

    return {
      history: this.history,
      firstAttacker: firstAttacker.name,
      winner,
      pokemon1: this.pokemon1,
      pokemon2: this.pokemon2,
    }
  }

  /**
   * Finds a Pokémon by name.
   *
   * @param {string} name - The name of the Pokémon to find.
   * @returns {Pokemon} The found Pokémon.
   * @throws {Error} If the Pokémon is not found.
   */
  private findPokemon(name: string): Pokemon {
    const pokemon = pokemons.find((p) => p.name === name)

    if (!pokemon) {
      throw new Error('Pokemon not found')
    }

    return new Pokemon(pokemon.name, pokemon.type, pokemon.speed, pokemon.hp)
  }

  private firstAttacker(pokemon1: Pokemon, pokemon2: Pokemon): Pokemon {
    if (
      pokemon1.type === PokemonType.Electric &&
      pokemon2.type === PokemonType.Electric
    ) {
      if (pokemon1.speed === pokemon2.speed) {
        this.log('Speed is equal, random first attacker')
        return Math.random() > 0.5 ? pokemon1 : pokemon2
      }

      const first = pokemon1.speed > pokemon2.speed ? pokemon1 : pokemon2
      this.log(
        `Pokemons is ${PokemonType.Electric} type and ${first.name} attacks first`,
      )
      return first
    }

    if (
      pokemon1.type === PokemonType.Electric ||
      pokemon2.type === PokemonType.Electric
    ) {
      const first = pokemon1.type === PokemonType.Electric ? pokemon1 : pokemon2
      this.log(
        `${first.name} attacks first because it is ${PokemonType.Electric} type`,
      )
      return first
    }

    if (pokemon1.speed === pokemon2.speed) {
      this.log('Speed is equal, random first attacker')
      return Math.random() > 0.5 ? pokemon1 : pokemon2
    }

    return pokemon1.speed > pokemon2.speed ? pokemon1 : pokemon2
  }

  private attackPokemon(pokemon1: Pokemon, pokemon2: Pokemon): void {
    if (
      pokemon1.type === PokemonType.Fire &&
      pokemon2.type === PokemonType.Plant
    ) {
      this.log(`${pokemon1.name} has boost`)
      pokemon2.hp -= pokemon1.attack * 2
    } else {
      pokemon2.hp -= pokemon1.attack
    }
  }

  private log(log: string | Pokemon): void {
    if (log instanceof Pokemon) {
      log = log.toString()
    }

    this.history.push(log)
    console.info(log)
  }
}
