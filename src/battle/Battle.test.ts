import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { Battle, BattleResult } from './Battle'

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
      expect(result.firstAttacker).toBe('Pikachu')
    })

    test('Pikachu wins', () => {
      expect(result.winner).toBe('Pikachu')
    })
  })

  describe('Pikachu vs Bulbasaur', () => {
    let result: BattleResult
    beforeEach(() => {
      result = new Battle('Pikachu', 'Bulbasaur').fighting()
    })

    test('should Pikachu is the first', () => {
      expect(result.firstAttacker).toBe('Pikachu')
    })

    test('Pikachu wins', () => {
      expect(result.winner).toBe('Pikachu')
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

      expect(result.firstAttacker).toBe('Pikachu')
    })
  })

  describe('Elector vs Bulbasaur', () => {
    test('should Elector is the first', () => {
      const result = new Battle('Elector', 'Bulbasaur').fighting()

      expect(result.firstAttacker).toBe('Elector')
      expect(
        result.history.includes(
          'Elector attacks first because it is Electric type',
        ),
      ).toBe(true)
    })
  })

  describe('Pikachu vs Elector', () => {
    test('should Pikachu is the first', () => {
      const result = new Battle('Pikachu', 'Elector').fighting()

      expect(result.firstAttacker).toBe('Pikachu')
      expect(
        result.history.includes(
          'Pokemons is Electric type and Pikachu attacks first',
        ),
      ).toBe(true)
    })
  })

  describe('Charmeleon vs Bulbasaur', () => {
    test('should Charmeleon has boost', () => {
      const result = new Battle('Charmeleon', 'Bulbasaur').fighting()

      expect(result.history.includes('Charmeleon has boost')).toBe(true)
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
      expect(result.firstAttacker).toBe('Pikachu')
      vi.spyOn(Math, 'random').mockClear()
    })
  })
})
