import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { generateMnemonic } from 'bip39'

const env = `VITE_PLAYER_1_MNEMONIC="${generateMnemonic()}"\nVITE_PLAYER_2_MNEMONIC="${generateMnemonic()}"\nVITE_HOST_ADDRESS="localhost"`
writeFileSync(join(import.meta.dirname, '..', '.env'), env)
