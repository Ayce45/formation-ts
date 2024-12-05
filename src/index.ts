import { Battle } from './battle/Battle.ts'

const result = await new Battle('Pikachu', 'Charmeleon').fighting()
console.log(result)
