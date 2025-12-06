# Note

This project was inspired by https://github.com/Tesfamichael12/space-invaders, and has been extended and readapted for the purposes of the Lugano demo. All rights are reserved to the original author.

## Pre-requisites

This guide assumes you have an environment with git, NodeJS and `pnpm` already installed. Note that pnpm can be replaced with any other node package manager of your choice (`yarn`, `npm`, etc.), but if you wish to use the same one you can simply run:

```bash
npm i -g pnpm
```

then make sure the npm `bin` folder is available in your PATH.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hydra-yse/Lugano-2025.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Lugano-2025/demo
   ```
3. Install the dependencies:
   ```bash
   pnpm install
   ```
4. Start the game:
   ```bash
   pnpm dev
   ```

## Local Setup
If you wish to run the setup locally, you can run:
   ```bash
   ./scripts/setup_local.sh
   ```
Please make sure you have Rust and Docker installed before running.

To stop the setup, you can then run:
   ```bash
   ./scripts/stop_setup.sh
   ```
