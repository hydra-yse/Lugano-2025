import React from 'react'

interface StartScreenProps {
  onStartGame: () => void
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => (
  <div id="startScreen">
    <div className="centered-text">
      <h1 className="title-text">Space Invaders - 2P</h1>

      <div id="startButton" className="button-container" onClick={onStartGame}>
        <img src="./images/button.png" alt="Start Button" />
        <span className="button-label">START</span>
      </div>

      <div className="controls-container">
        <div className="controls cool-controls">
          <h3 className="controls-title">Player 1 Controls</h3>
          <p className="control-item">A - Move Left</p>
          <p className="control-item">W - Move Up</p>
          <p className="control-item">D - Move Right</p>
          <p className="control-item">S - Move Down</p>
          <p className="control-item">F - Shoot</p>
        </div>
        <div className="controls cool-controls">
          <h3 className="controls-title">Player 2 Controls</h3>
          <p className="control-item"><span>←</span> - Move Left</p>
          <p className="control-item"><span>↑</span> - Move Up</p>
          <p className="control-item"><span>→</span> - Move Right</p>
          <p className="control-item"><span>↓</span> - Move Down</p>
          <p className="control-item">Space - Shoot</p>
        </div>
      </div>
    </div>
  </div>
)