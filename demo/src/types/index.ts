export interface Position {
  x: number
  y: number
}

export interface Velocity {
  x: number
  y: number
}

export interface Keys {
  left: { pressed: boolean }
  right: { pressed: boolean }
  up: { pressed: boolean }
  down: { pressed: boolean }
  shoot: { pressed: boolean }
}

export enum ScreenPhase {
  START,
  GAME,
  WIN,
}

export interface GameState {
  player1Alive: boolean
  player2Alive: boolean
  player1Score: number
  player2Score: number
}
