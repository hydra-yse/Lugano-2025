import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { generateMnemonic } from 'bip39'

const mnemonics = `VITE_PLAYER_1_MNEMONIC="${generateMnemonic()}"\nVITE_PLAYER_2_MNEMONIC="${generateMnemonic()}"`
writeFileSync(join(import.meta.dirname, '..', '.env'), mnemonics)
