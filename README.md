# Pokémon Battle Simulator

This project is a Pokémon battle simulator written in TypeScript. For teaching purposes, it is a simple implementation that focuses on the logic of the battle system.
It allows you to simulate battles between different Pokémon, determining the first attacker based on their type and speed, and logging the battle history.

## Features

- Simulate battles between Pokémon
- Determine the first attacker based on type and speed
- Log battle history
- Handle special type advantages (e.g., Fire vs. Plant)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

To run the battle simulation, you can use the `Battle` class. Here is an example:

```typescript
import { Battle } from './src/battle/Battle'

const battle = new Battle('Pikachu', 'Charmeleon')
const result = battle.fighting()

console.log(result)
```

## Running Tests

This project uses `vitest` for testing. To run the tests, use the following command:

```sh
npm test
```

## Project Structure

- `src/`: Contains the source code for the project
    - `battle/`: Contains the battle logic
    - `const/`: Contains constants used in the project
    - `pokemon/`: Contains the Pokémon class and types
- `test/`: Contains test files
- `.gitignore`: Specifies files to be ignored by Git
- `eslint.config.js`: Configuration for ESLint
- `package.json`: Project metadata and dependencies