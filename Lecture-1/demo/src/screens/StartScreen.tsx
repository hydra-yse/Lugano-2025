import React, { useState } from 'react'

interface StartScreenProps {
  onStartGame: (bet: number) => void
}

const Loader = ({ playerName }: { playerName: string }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <div className="loader"></div>
      <span className="text-primary text-lg ml-2">{playerName} Loading...</span>
    </div>
  )
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const MIN_BET = 30;
  const [bet, setBet] = useState<number>(MIN_BET);

  return (
    <div id="startScreen">
      <div className="centered-text">
        <h1 className="title-text">Space Invaders - 2P</h1>

        <div className="flex flex-col gap-1 pt-2">
          <span className="uppercase">Enter an initial bet amount</span>
          <div className="text-primary text-lg">
            <input className="w-[100px] self-center border-primary border-b-1 text-center outline-none" type="number" value={bet} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setBet(parseInt(e.target.value))} min={MIN_BET} />
            <span> sats</span>
          </div>
        </div>

        <div id="startButton" className="button-container" onClick={() => onStartGame(bet)}>
          <img src="./images/button.png" alt="Start Button" />
          <span className="button-label">START</span>
        </div>

        <div className="controls-container">
          {
            true ?
              <div className="controls cool-controls">
                <h3 className="controls-title">Player 1 Controls</h3>
                <p className="control-item">A - Move Left</p>
                <p className="control-item">W - Move Up</p>
                <p className="control-item">D - Move Right</p>
                <p className="control-item">S - Move Down</p>
                <p className="control-item">F - Shoot</p>
              </div>
              : <Loader playerName="P1" />
          }
          {
            true ?
              <div className="controls cool-controls">
                <h3 className="controls-title">Player 2 Controls</h3>
                <p className="control-item"><span>←</span> - Move Left</p>
                <p className="control-item"><span>↑</span> - Move Up</p>
                <p className="control-item"><span>→</span> - Move Right</p>
                <p className="control-item"><span>↓</span> - Move Down</p>
                <p className="control-item">Space - Shoot</p>
              </div>
              : <Loader playerName="P2" />
          }
        </div>
        <p className="fixed left-0 bottom-10 w-full text-center text-xs">Game credits to <a className='text-primary italic' href="https://github.com/Tesfamichael12/space-invaders" target="_blank">Tesfamichael12/space-invaders</a></p>
      </div>
    </div>
  )
}
