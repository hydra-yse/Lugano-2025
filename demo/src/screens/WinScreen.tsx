import React from 'react'

interface WinScreenProps {
  winnerText: string
  onBackToStart: () => void
}

export const WinScreen: React.FC<WinScreenProps> = ({ winnerText, onBackToStart }) => (
  <div id="winScreen">
    <div className="centered-text">
      <h1 id="winnerText" className="title-text" style={{ color: 'white' }}>{winnerText}</h1>

      <div id="backToStartButton" className="button-container" onClick={onBackToStart}>
        <img src="./images/button.png" alt="Back Button" />
        <span className="button-label">Back to Start</span>
      </div>
    </div>
  </div>
)
