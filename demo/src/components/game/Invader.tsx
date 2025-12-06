import type { Position, Velocity } from '@types'

export class Invader {
  velocity: Velocity
  c: CanvasRenderingContext2D
  position: Position
  image?: HTMLImageElement
  width = 0
  height = 0

  constructor({ position, c, invaderImage }: { position: Position; c: CanvasRenderingContext2D; invaderImage: string }) {
    this.velocity = {
      x: 0,
      y: 0
    }
    this.c = c

    const image = new Image()
    image.src = invaderImage
    this.position = {
      x: position.x,
      y: position.y
    }
    image.onload = () => {
      const scale = 1
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
    }
  }

  draw() {
    if (this.image) {
      this.c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }
  }

  update({ velocity }: { velocity: Velocity }) {
    if (this.image) {
      this.draw()
      this.position.x += velocity.x
      this.position.y += velocity.y
    }
  }

  shoot(invaderProjectiles: any[], InvaderProjectileClass: any) {
    invaderProjectiles.push(
      new InvaderProjectileClass({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height
        },
        velocity: {
          x: 0,
          y: 5
        },
        c: this.c
      })
    )
  }
}
