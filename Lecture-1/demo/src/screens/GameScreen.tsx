import React from 'react'
import { Game } from '@components/game/Game'
import { Keys, GameState } from '@types'

interface GameScreenProps {
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  keys1: Keys
  keys2: Keys
  onGameOver: (playerNumber: number) => void
  audio: any
}

export const GameScreen: React.FC<GameScreenProps> = ({ gameState, setGameState, keys1, keys2, onGameOver, audio }) => (
  <>
    {/* Player 1 Game */}
    <div className="game-wrapper">
      <p className="score-container">
        <span>Player 1 Score: </span> <span>{gameState.player1Score}</span>
      </p>

      <Game
        playerNumber={1}
        keys={keys1}
        setGameState={setGameState}
        onGameOver={() => onGameOver(1)}
        audio={audio}
      />

      {/* game over screen for player 1 */}
      <div id="gameOver1" style={{ display: !gameState.player1Alive ? 'flex' : 'none' }}>
        <div className="centered-text">
          <h1 className="game-over-text">Player 1 Game Over</h1>
          <h1 id="finalScore1" className="final-score">{gameState.player1Score}</h1>
          <p className="points-text">Points</p>
        </div>
      </div>
    </div>

    {/* Player 2 Game */}
    <div className="game-wrapper">
      <p className="score-container">
        <span>Player 2 Score: </span> <span>{gameState.player2Score}</span>
      </p>

      <Game
        playerNumber={2}
        keys={keys2}
        setGameState={setGameState}
        onGameOver={() => onGameOver(2)}
        audio={audio}
      />

      {/* game over screen for player 2 */}
      <div id="gameOver2" style={{ display: !gameState.player2Alive ? 'flex' : 'none' }}>
        <div className="centered-text">
          <h1 className="game-over-text">Player 2 Game Over</h1>
          <h1 id="finalScore2" className="final-score">{gameState.player2Score}</h1>
          <p className="points-text">Points</p>
        </div>
      </div>
    </div>
  </>
)
