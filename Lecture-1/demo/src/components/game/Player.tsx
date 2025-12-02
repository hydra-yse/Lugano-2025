import { Position, Velocity } from '@types'

export class Player {
  canvas: HTMLCanvasElement
  c: CanvasRenderingContext2D
  velocity: Velocity
  position: Position
  speed: number
  rotate: number
  opacity: number
  image?: HTMLImageElement
  width: number = 0
  height: number = 0

  constructor(canvas: HTMLCanvasElement, c: CanvasRenderingContext2D, spaceshipImage: string) {
    this.canvas = canvas
    this.c = c
    this.velocity = {
      x: 0,
      y: 0
    }
    this.position = {
      x: canvas.width / 2,
      y: canvas.height - 50
    }
    this.speed = 5

    this.rotate = 0
    this.opacity = 1

    const image = new Image()
    image.src = spaceshipImage
    image.onload = () => {
      const scale = 0.12
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20
      }
    }
  }

  draw() {
    this.c.save()
    this.c.globalAlpha = this.opacity
    this.c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )

    this.c.rotate(this.rotate)

    this.c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    )

    if (this.image) {
      this.c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }

    this.c.restore()
  }

  move() {
    if (this.image) {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }
}
