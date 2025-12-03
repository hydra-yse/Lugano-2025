import React, { useRef, useEffect, useState } from 'react'
import type { Keys, GameState, Position } from '@types'
import { Player } from './Player'
import { Grid } from './Grid'
import { Projectiles, InvaderProjectile } from './Projectiles'
import { Particle } from './Particle'

interface GameProps {
  playerNumber: number
  keys: Keys
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  onGameOver: () => void
  audio: any
}

export const Game: React.FC<GameProps> = ({ playerNumber, keys, setGameState, onGameOver, audio }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameOver, setGameOver] = useState(false)

  const playerRef = useRef<Player | null>(null)
  const projectilesRef = useRef<Projectiles[]>([])
  const gridsRef = useRef<Grid[]>([])
  const invaderProjectilesRef = useRef<InvaderProjectile[]>([])
  const particlesRef = useRef<Particle[]>([])
  const framesRef = useRef(0)
  const randomIntervalRef = useRef(Math.floor(Math.random() * 500) + 500)
  const animationIdRef = useRef<number | null>(null)
  const keysRef = useRef(keys)
  const batchRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const c = canvas.getContext('2d')
    if (!c) return

    const isVertical = window.innerWidth <= 1024
    if (isVertical) {
      canvas.width = window.innerWidth
      canvas.height = Math.floor(window.innerHeight / 2)
    } else {
      canvas.width = Math.floor(window.innerWidth / 2)
      canvas.height = window.innerHeight
    }

    playerRef.current = new Player(canvas, c, "/images/spaceship.png")

    // create stars
    for (let i = 0; i < 100; i++) {
      particlesRef.current.push(
        new Particle({
          position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
          },
          velocity: {
            x: 0,
            y: Math.random() * 0.1 + 0.2
          },
          radius: Math.random() * 1.5,
          color: 'white',
          fades: false,
          c: c
        })
      )
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  const checkPlayerInvaderCollision = () => {
    gridsRef.current.forEach((grid) => {
      grid.invaders.forEach((invader) => {
        if (gameOver) return

        if (invader.position && invader.width && invader.height && playerRef.current) {
          if (
            rectangularCollision({
              rectangle1: playerRef.current,
              rectangle2: invader
            })
          ) {
            setTimeout(() => {
              if (playerRef.current) playerRef.current.opacity = 0
              setGameOver(true)
              onGameOver()

              // create explosion
              createExplosion({
                position: {
                  x: playerRef.current!.position.x + playerRef.current!.width / 2,
                  y: playerRef.current!.position.y + playerRef.current!.height / 2
                },
                color: 'white',
                particleCount: 15
              })
            }, 0)
            setTimeout(() => {
              // stop animation
            }, 2000)
          }
        }
      })
    })
  }

  const animation = () => {
    if (gameOver) return

    const canvas = canvasRef.current
    const c = canvas?.getContext('2d')
    if (!canvas || !c || !playerRef.current) return

    animationIdRef.current = requestAnimationFrame(() => animation())
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    playerRef.current.move()

    particlesRef.current.forEach((particle, particleIndex) => {
      if (particle.position.y - particle.radius > canvas.height) {
        particle.position.x = Math.random() * canvas.width
        particle.position.y = -particle.radius
      }

      if (particle.opacity <= 0) {
        setTimeout(() => {
          particlesRef.current.splice(particleIndex, 1)
        }, 0)
      } else {
        particle.update()
      }
    })

    invaderProjectilesRef.current.forEach((invaderProjectile, index) => {
      if (invaderProjectile.position.y > canvas.height) {
        invaderProjectilesRef.current.splice(index, 1)
      } else invaderProjectile.update()

      checkPlayerInvaderCollision()
      if (
        rectangularCollision({
          rectangle1: invaderProjectile,
          rectangle2: playerRef.current!
        })
      ) {
        setTimeout(() => {
          invaderProjectilesRef.current.splice(index, 1)
          if (playerRef.current) playerRef.current.opacity = 0
          setGameOver(true)
          onGameOver()

          createExplosion({
            position: {
              x: playerRef.current!.position.x + playerRef.current!.width / 2,
              y: playerRef.current!.position.y + playerRef.current!.height / 2
            },
            color: 'white',
            particleCount: 15
          })
        }, 0)
      }
    })

    gridsRef.current.forEach((grid, gridIndex) => {
      grid.update()

      if (framesRef.current % 100 === 0 && grid.invaders.length > 0) {
        grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
          invaderProjectilesRef.current,
          InvaderProjectile
        )
        // Play enemy shoot sound
        if (audio.enemyShoot) audio.enemyShoot.play()
      }

      grid.invaders.forEach((invader) => {
        invader.update({ velocity: grid.velocity })
      })

      // Check if invaders reached the bottom
      grid.invaders.forEach((invader) => {
        if (invader.position.y + invader.height >= canvas.height) {
          setTimeout(() => {
            if (playerRef.current) playerRef.current.opacity = 0
            setGameOver(true)
            onGameOver()

            createExplosion({
              position: {
                x: playerRef.current!.position.x + playerRef.current!.width / 2,
                y: playerRef.current!.position.y + playerRef.current!.height / 2
              },
              color: 'white',
              particleCount: 15
            })
          }, 0)
        }
      })

      projectilesRef.current.forEach((projectile, index) => {
        grid.invaders.forEach((invader, invaderIndex) => {
          if (
            projectile.position.y - projectile.radius <=
            invader.position.y + invader.height &&
            projectile.position.x + projectile.radius >= invader.position.x &&
            projectile.position.x - projectile.radius <=
            invader.position.x + invader.width &&
            projectile.position.y + projectile.radius >= invader.position.y
          ) {
            setTimeout(() => {
              if (grid.invaders.includes(invader) && projectilesRef.current.includes(projectile)) {
                setGameState((prev: GameState) => playerNumber === 1 ? { ...prev, player1Score: prev.player1Score + 100 } : { ...prev, player2Score: prev.player2Score + 100 })
                createExplosion({
                  position: {
                    x: invader.position.x + invader.width / 2,
                    y: invader.position.y + invader.height / 2
                  },
                  color: '#BAA0DE',
                  particleCount: 15
                })
                grid.invaders.splice(invaderIndex, 1)
                projectilesRef.current.splice(index, 1)
              }

              if (grid.invaders.length > 0) {
                const firstInvader = grid.invaders[0]
                const lastInvader = grid.invaders[grid.invaders.length - 1]
                grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width
                grid.position.x = firstInvader.position.x
              } else {
                gridsRef.current.splice(gridIndex, 1)
              }
            }, 0)
          }
        })
      })
    })

    projectilesRef.current.forEach((projectile, index) => {
      projectile.update()
      if (
        projectile.position.x + projectile.radius < 0 ||
        projectile.position.x - projectile.radius > canvas.width ||
        projectile.position.y + projectile.radius < 0 ||
        projectile.position.y - projectile.radius > canvas.height
      ) {
        setTimeout(() => {
          projectilesRef.current.splice(index, 1)
        }, 0)
      }
    })

    // Handle movement
    if (keysRef.current.left?.pressed && playerRef.current.position.x > 0) {
      playerRef.current.velocity.x = -playerRef.current.speed
      playerRef.current.rotate = -0.15
    } else if (keysRef.current.right?.pressed && playerRef.current.position.x + playerRef.current.width < canvas.width) {
      playerRef.current.velocity.x = playerRef.current.speed
      playerRef.current.rotate = 0.15
    } else {
      playerRef.current.velocity.x = 0
      playerRef.current.rotate = 0
    }

    if (keysRef.current.up?.pressed && playerRef.current.position.y > 5) {
      playerRef.current.velocity.y = -playerRef.current.speed
    } else if (keysRef.current.down?.pressed && playerRef.current.position.y + playerRef.current.height < canvas.height) {
      playerRef.current.velocity.y = playerRef.current.speed
    } else {
      playerRef.current.velocity.y = 0
    }

    if (keysRef.current.shoot.pressed) {
      shoot()
      keysRef.current.shoot.pressed = false
    }

    if (framesRef.current % randomIntervalRef.current === 0 && gridsRef.current.length === 0) {
      gridsRef.current.push(new Grid(c, "/images/invader.png", batchRef.current))
      batchRef.current++
      randomIntervalRef.current = Math.floor(Math.random() * 100) + 100
      framesRef.current = 0
    }

    framesRef.current++
  }

  const createExplosion = ({ position, color, particleCount }: { position: Position; color: string; particleCount: number }) => {
    audio.explode.play()

    const canvas = canvasRef.current
    const c = canvas?.getContext('2d')
    if (!c) return

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(
        new Particle({
          position: {
            x: position.x,
            y: position.y
          },
          velocity: {
            x: (Math.random() - 0.5) * 1,
            y: (Math.random() - 0.5) * 1
          },
          radius: Math.random() * 3,
          color: color,
          fades: true,
          c: c
        })
      )
    }
  }

  const shoot = () => {
    if (gameOver || !playerRef.current) return
    audio.shoot.play()
    const canvas = canvasRef.current
    const c = canvas?.getContext('2d')
    if (!c) return

    projectilesRef.current.push(
      new Projectiles(
        {
          x: playerRef.current.position.x + playerRef.current.width / 2,
          y: playerRef.current.position.y
        },
        {
          x: 0,
          y: -10
        },
        c
      )
    )
  }

  const rectangularCollision = ({ rectangle1, rectangle2 }: { rectangle1: any; rectangle2: any }) => {
    if (!rectangle1 || !rectangle2) return false
    return (
      rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
      rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
      rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
      rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    )
  }

  useEffect(() => {
    keysRef.current = keys
  }, [keys])

  useEffect(() => {
    if (!gameOver) {
      animation()
    }
  }, [gameOver])

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  )
}
