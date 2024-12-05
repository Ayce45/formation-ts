import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { Battle, BattleResult } from './Battle.ts'

describe('Battle test', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.spyOn(console, 'info').mockClear()
  })

  describe('Pikachu vs Charmeleon', () => {
    let result: BattleResult
    beforeEach(() => {
      result = new Battle('Pikachu', 'Charmeleon').fighting()
    })

    test('should Pikachu is the first', () => {
      expect(result.firstAttacker).toBe(result.pokemon1.id)
    })

    test('Pikachu wins', () => {
      expect(result.winner).toBe(result.pokemon1.id)
    })
  })

  describe('Pikachu vs Bulbasaur', () => {
    let result: BattleResult
    beforeEach(() => {
      result = new Battle('Pikachu', 'Bulbasaur').fighting()
    })

    test('should Pikachu is the first', () => {
      expect(result.firstAttacker).toBe(result.pokemon1.id)
    })

    test('Pikachu wins', () => {
      expect(result.winner).toBe(result.pokemon1.id)
    })
  })

  describe('Pikachu vs undefined', () => {
    test('should be error', () => {
      try {
        new Battle('Pikachu', 'Charmeleon')
      } catch (e) {
        expect(e.message).toBe('Pokemon not found')
      }
    })
  })

  describe('Pikachu vs Elector', () => {
    test('should Pikachu is the first', () => {
      const result = new Battle('Pikachu', 'Elector').fighting()

      expect(result.firstAttacker).toBe(result.pokemon1.id)
    })
  })

  describe('Elector vs Bulbasaur', () => {
    test('should Elector is the first', () => {
      const result = new Battle('Elector', 'Bulbasaur').fighting()

      expect(result.firstAttacker).toBe(result.pokemon1.id)
      expect(
        result.history.includes(
          `${result.pokemon1.id} attacks first because it is Electric type`,
        ),
      ).toBe(true)
    })
  })

  describe('Pikachu vs Elector', () => {
    test('should Pikachu is the first', () => {
      const result = new Battle('Pikachu', 'Elector').fighting()

      expect(result.firstAttacker).toBe(result.pokemon1.id)
      expect(
        result.history.includes(
          `Pokemons is Electric type and ${result.pokemon1.id} attacks first`,
        ),
      ).toBe(true)
    })
  })

  describe('Charmeleon vs Bulbasaur', () => {
    test('should Charmeleon has boost', () => {
      const result = new Battle('Charmeleon', 'Bulbasaur').fighting()

      expect(result.history.includes(`${result.pokemon1.id} has boost`)).toBe(
        true,
      )
    })
  })

  describe('Pikachu vs Raichu', () => {
    test('should first attacker to be random', () => {
      vi.spyOn(Math, 'random').mockImplementation(() => {
        return 0.6
      })

      const result = new Battle('Pikachu', 'Raichu').fighting()
      expect(
        result.history.includes('Speed is equal, random first attacker'),
      ).toBe(true)
      expect(result.firstAttacker).toBe(result.pokemon1.id)
      vi.spyOn(Math, 'random').mockClear()
    })
  })

  describe('Pikachu vs Pikachu', () => {
    test('should first attacker to be random', () => {
      vi.spyOn(Math, 'random').mockImplementation(() => {
        return 0.6
      })

      const result = new Battle('Pikachu', 'Pikachu').fighting()
      expect(
        result.history.includes('Speed is equal, random first attacker'),
      ).toBe(true)
      expect(result.firstAttacker).toBe(result.pokemon1.id)
      vi.spyOn(Math, 'random').mockClear()
    })
  })
})
