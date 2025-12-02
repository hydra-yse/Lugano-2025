import { Position, Velocity } from '@types'

export class Projectiles {
  position: Position
  velocity: Velocity
  c: CanvasRenderingContext2D
  radius: number

  constructor(position: Position, velocity: Velocity, c: CanvasRenderingContext2D) {
    this.position = position
    this.velocity = velocity
    this.c = c

    this.radius = 4
  }

  draw() {
    this.c.beginPath()
    this.c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    this.c.fillStyle = 'red'
    this.c.fill()
    this.c.closePath()
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

export class InvaderProjectile {
  position: Position
  velocity: Velocity
  c: CanvasRenderingContext2D
  width: number
  height: number

  constructor({ position, velocity, c }: { position?: Position; velocity: Velocity; c: CanvasRenderingContext2D }) {
    this.position = position || { x: 0, y: 0 }
    this.velocity = velocity
    this.c = c

    this.width = 3
    this.height = 10
  }

  draw() {
    this.c.fillStyle = '#FF00FF'
    this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
