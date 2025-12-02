import React, { useState, useEffect } from 'react'
import { StartScreen } from '@screens/StartScreen'
import { GameScreen } from '@screens/GameScreen'
import { WinScreen } from '@screens/WinScreen'
import { Keys, GameState, ScreenPhase } from './types'

import audio from '@components/game/audio'

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    player1Alive: true,
    player2Alive: true,
    player1Score: 0,
    player2Score: 0
  })

  const [currentScreen, setCurrentScreen] = useState<ScreenPhase>(ScreenPhase.START)
  const [winnerText, setWinnerText] = useState('')

  const [keys1, setKeys1] = useState<Keys>({
    left: { pressed: false },
    right: { pressed: false },
    up: { pressed: false },
    down: { pressed: false },
    shoot: { pressed: false }
  })

  const [keys2, setKeys2] = useState<Keys>({
    left: { pressed: false },
    right: { pressed: false },
    up: { pressed: false },
    down: { pressed: false },
    shoot: { pressed: false }
  })

  const checkGameEnd = () => {
    if (!gameState.player1Alive && !gameState.player2Alive) {
      let winner: string
      if (gameState.player1Score > gameState.player2Score) {
        winner = 'Player 1 Wins!'
      } else if (gameState.player2Score > gameState.player1Score) {
        winner = 'Player 2 Wins!'
      } else {
        winner = "It's a Draw!"
      }
      setWinnerText(winner)
      setCurrentScreen(ScreenPhase.WIN)
    }
  }

  const handleGameOver = (playerNumber: number) => {
    setGameState(prev => ({ ...prev, [`player${playerNumber}Alive`]: false }))
  }

  const startGame = () => {
    audio.backgroundMusic.play()
    audio.start.play()
    setCurrentScreen(ScreenPhase.GAME)
    setGameState({
      player1Alive: true,
      player2Alive: true,
      player1Score: 0,
      player2Score: 0
    })
  }

  const backToStart = () => {
    audio.select.play()
    setCurrentScreen(ScreenPhase.START)
  }

  useEffect(() => {
    checkGameEnd()
  }, [gameState.player1Alive, gameState.player2Alive])

  useEffect(() => {
    const handleKeyPressed = (key: string, newVal: boolean) => {
      switch (key) {
        // Player 1 controls
        case 'a':
          setKeys1(prev => ({ ...prev, left: { pressed: newVal } }))
          break
        case 'd':
          setKeys1(prev => ({ ...prev, right: { pressed: newVal } }))
          break
        case 'w':
          setKeys1(prev => ({ ...prev, up: { pressed: newVal } }))
          break
        case 's':
          setKeys1(prev => ({ ...prev, down: { pressed: newVal } }))
          break
        case 'f':
          setKeys1(prev => ({ ...prev, shoot: { pressed: newVal } }))
          break

        // Player 2 controls
        case 'ArrowLeft':
          setKeys2(prev => ({ ...prev, left: { pressed: newVal } }))
          break
        case 'ArrowRight':
          setKeys2(prev => ({ ...prev, right: { pressed: newVal } }))
          break
        case 'ArrowUp':
          setKeys2(prev => ({ ...prev, up: { pressed: newVal } }))
          break
        case 'ArrowDown':
          setKeys2(prev => ({ ...prev, down: { pressed: newVal } }))
          break
        case ' ':
          setKeys2(prev => ({ ...prev, shoot: { pressed: newVal } }))
          break
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => handleKeyPressed(e.key, true)
    const handleKeyUp = (e: KeyboardEvent) => handleKeyPressed(e.key, false)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div className="game-container">
      {(() => {
        switch (currentScreen) {
          case ScreenPhase.START:
            return <StartScreen onStartGame={startGame} />
          case ScreenPhase.GAME:
            return (
              <GameScreen
                gameState={gameState}
                setGameState={setGameState}
                keys1={keys1}
                keys2={keys2}
                onGameOver={handleGameOver}
                audio={audio}
              />
            )
          case ScreenPhase.WIN:
            return <WinScreen winnerText={winnerText} onBackToStart={backToStart} />
          default:
            return null
        }
      })()}
    </div>
  )
}

export default App
