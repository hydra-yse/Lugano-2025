import init, { BindingLiquidSdk, connect, defaultConfig, setLogger, type Logger, type LogEntry } from '@breeztech/breez-sdk-liquid';

export const newSdk = async (mnemonic: string): Promise<BindingLiquidSdk> => {
  const config = defaultConfig('regtest', import.meta.env.VITE_BREEZ_API_KEY);
  config.liquidExplorer = {
    type: "esplora",
    url: `http://${import.meta.env.VITE_HOST_ADDRESS}:3120/api`,
    useWaterfalls: true
  }
  config.bitcoinExplorer = {
    type: "esplora",
    url: `http://${import.meta.env.VITE_HOST_ADDRESS}:4002/api`,
    useWaterfalls: true
  }
  config.customBoltzUrl = `http://${import.meta.env.VITE_HOST_ADDRESS}:8387/v2`
  config.syncServiceUrl = `http://${import.meta.env.VITE_HOST_ADDRESS}:8089`
  return connect({
    config,
    mnemonic
  })
}

export let P1_SDK: BindingLiquidSdk | null = null;
export let P2_SDK: BindingLiquidSdk | null = null;

class MyLogger implements Logger {
  log(l: LogEntry) {
    console.log(`[${l.level}]: ${l.line}`)
  }
}

const initLogging = () => {
  setLogger(new MyLogger())
}

init()
  .then(async () => {
    try {
      P1_SDK = await newSdk(import.meta.env.VITE_PLAYER_1_MNEMONIC);
      console.log("Player 1 connected successfully");
      P2_SDK = await newSdk(import.meta.env.VITE_PLAYER_2_MNEMONIC);
      console.log("Player 2 connected successfully");
      initLogging();
    } catch (err) {
      console.error(`Could not connect players: ${err}`)
    }
  });
