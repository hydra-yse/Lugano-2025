import type { Position, Velocity } from '@types'

export class Particle {
  position: Position
  velocity: Velocity
  c: CanvasRenderingContext2D
  radius: number
  color: string
  opacity: number
  fades: boolean

  constructor({ position, velocity, radius, color, fades, c }: { position: Position; velocity: Velocity; radius: number; color: string; fades: boolean; c: CanvasRenderingContext2D }) {
    this.position = position
    this.velocity = velocity
    this.c = c

    this.radius = radius
    this.color = color
    this.opacity = 1
    this.fades = fades
  }

  draw() {
    this.c.save()
    this.c.globalAlpha = this.opacity
    this.c.beginPath()
    this.c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    this.c.fillStyle = this.color
    this.c.fill()
    this.c.closePath()
    this.c.restore()
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.fades) this.opacity -= 0.01
  }
}
