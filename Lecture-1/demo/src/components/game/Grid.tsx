import { Position, Velocity } from '@types'
import { Invader } from './Invader'

export class Grid {
  c: CanvasRenderingContext2D
  position: Position
  velocity: Velocity
  invaders: Invader[]
  width: number
  height: number
  batch: number

  constructor(c: CanvasRenderingContext2D, invaderImage: string, batch: number = 0) {
    this.c = c
    this.batch = batch
    this.position = {
      x: 0,
      y: 0
    }
    this.velocity = {
      x: 1 + batch * 0.2,
      y: 0
    }

    this.invaders = []

    let columns = Math.floor(Math.random() * 10 + 5)
    const rows = Math.floor(Math.random() * 5 + 2) + Math.floor(this.batch / 3)

    // Ensure the grid fits within the canvas
    columns = Math.min(columns, Math.floor(this.c.canvas.width / 30))

    this.width = columns * 30
    this.height = rows * 30

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(
          new Invader({
            position: {
              x: x * 30,
              y: y * 30
            },
            c: c,
            invaderImage
          })
        )
      }
    }
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.velocity.y = 0

    if (this.position.x + this.width >= this.c.canvas.width || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x * 1.04
      this.velocity.y = 40 + this.batch * 2
    }
  }
}
