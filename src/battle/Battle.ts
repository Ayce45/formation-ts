import { pokemons } from '../const/pokemons.ts'
import { Pokemon } from '../pokemon/Pokemon.ts'
import { PokemonType } from '../pokemon/PokemonType.js'

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

  /**
   * Starts a fight between two Pokémon.
   *
   * @returns {Promise<BattleResult>} The result of the battle.
   */
  public fighting(): BattleResult {
    console.info('**** START ****')
    console.info(this.pokemon1)
    console.info(this.pokemon2)

    let turn: Pokemon['id']

    const firstAttacker = this.firstAttacker(this.pokemon1, this.pokemon2)
    turn = firstAttacker.id
    console.info(`${firstAttacker.id} attacks first`)

    while (this.pokemon1.isAlive() && this.pokemon2.isAlive()) {
      console.info(`**** TURN OF ${turn} ****`)

    const attacker = turn === this.pokemon1.id ? this.pokemon1 : this.pokemon2
    const defender = turn === this.pokemon1.id ? this.pokemon2 : this.pokemon1

    this.attackPokemon(attacker, defender)
    turn = defender.id

    this.log(
      `${attacker.id} attacks ${defender.id} and hit with damage ${attacker.attack} (${defender.id} left ${defender.hp}hp)`,
    )
    }

    console.info(`**** END ****`)
    const winner: Pokemon = this.pokemon1.isAlive()
      ? this.pokemon1
      : this.pokemon2
    this.log(`${winner.id} wins`)

    return {
      history: this.history,
      firstAttacker: firstAttacker.id,
      winner: winner.id,
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

  /**
   * Determines the first attacker.
   *
   * @param pokemon1
   * @param pokemon2
   * @returns {Pokemon} The first attacker.
   * @private
   */
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
        `Pokemons is ${PokemonType.Electric} type and ${first.id} attacks first`,
      )
      return first
    }

    if (
      pokemon1.type === PokemonType.Electric ||
      pokemon2.type === PokemonType.Electric
    ) {
      const first = pokemon1.type === PokemonType.Electric ? pokemon1 : pokemon2
      this.log(
        `${first.id} attacks first because it is ${PokemonType.Electric} type`,
      )
      return first
    }

    if (pokemon1.speed === pokemon2.speed) {
      this.log('Speed is equal, random first attacker')
      return Math.random() > 0.5 ? pokemon1 : pokemon2
    }

    return pokemon1.speed > pokemon2.speed ? pokemon1 : pokemon2
  }

  /**
   * Attacks a Pokémon.
   *
   * @param pokemon1
   * @param pokemon2
   * @private
   */
  private attackPokemon(pokemon1: Pokemon, pokemon2: Pokemon) {
      if (
        pokemon1.type === PokemonType.Fire &&
        pokemon2.type === PokemonType.Plant
      ) {
        this.log(`${pokemon1.id} has boost`)
        pokemon2.hp -= pokemon1.attack * 2
      } else {
        pokemon2.hp -= pokemon1.attack
      }
  }

  /**
   * Logs a message.
   *
   * @param {string | Pokemon} arg - The message to log.
   * @private
   */
  private log(arg: string | Pokemon): void {
    if (arg instanceof Pokemon) {
      arg = arg.toString()
    }

    this.history.push(arg)
    console.info(arg)
  }
}
