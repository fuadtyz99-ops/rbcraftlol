import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'

const sceneConfig = {
  gridSize: 21,
  blockSize: 16,
  maxHeight: 24,
  heightBias: 0.6,
  animationDuration: 3000,
  easing: 'back.out(1.7)',
  animationDelay: 50,
}

const colorPalettes = {
  default: { topColor: '#5D4037', backColor: '#3E2723' },
  grass: { topColor: '#388E3C', backColor: '#1B5E20' },
  stone: { topColor: '#757575', backColor: '#424242' },
}

function getBlockProperties(
  gridSize: number,
  maxHeight: number,
  heightBias: number,
  x: number,
  y: number
) {
  const center = Math.floor(gridSize / 2)
  const angle = Math.atan2(y - center, x - center)
  const distance = Math.sqrt((x - center) ** 2 + (y - center) ** 2)
  const normalizedDist = Math.min(distance / center, 1)
  const slope = Math.pow(Math.cos((normalizedDist * Math.PI) / 2), 2)
  const directionalBias = 0.5 + 0.5 * Math.sin(angle + Math.PI / 4)
  const rawHeight =
    slope * directionalBias * maxHeight * (1 - normalizedDist * 0.3)
  const height = Math.floor(
    Math.pow(rawHeight / maxHeight, heightBias) * maxHeight
  )

  let colorPalette = colorPalettes.default
  if (height > 14) {
    colorPalette = colorPalettes.stone
  } else if (height > 8 && Math.random() > 0.3) {
    colorPalette = colorPalettes.grass
  } else if (Math.random() > 0.8) {
    colorPalette = colorPalettes.grass
  }

  return { height, colorPalette }
}

function createCell(x: number, y: number) {
  const { height, colorPalette } = getBlockProperties(
    sceneConfig.gridSize,
    sceneConfig.maxHeight,
    sceneConfig.heightBias,
    x,
    y
  )

  const cell = document.createElement('div')
  cell.className = 'surface__cell'
  cell.style.transformStyle = 'preserve-3d'
  cell.style.gridColumnStart = String(x + 1)
  cell.style.gridRowStart = String(y + 1)

  for (let h = 0; h <= height; h++) {
    const topColor = h === height ? colorPalette.topColor : colorPalette.backColor
    const backColor = colorPalette.backColor

    const block = document.createElement('div')
    block.className = 'block-3d'
    block.dataset.height = String(h)
    block.style.setProperty('--topColor', topColor)
    block.style.setProperty('--backColor', backColor)
    block.style.transform = `translateZ(${h * sceneConfig.blockSize}px)`

    for (let f = 0; f < 6; f++) {
      const face = document.createElement('div')
      face.className = 'block__face'
      if (f === 4) {
        face.dataset.face = 'top'
      }
      block.appendChild(face)
    }

    cell.appendChild(block)
  }

  return cell
}

function animateEntrance() {
  const blocks = document.querySelectorAll('.block-3d')
  const center = Math.floor(sceneConfig.gridSize / 2)

  blocks.forEach((block, index) => {
    const parent = block.parentElement
    const x = parent
      ? parseInt(parent.style.gridColumnStart || '1') - 1
      : Math.floor(index / sceneConfig.gridSize)
    const y = parent
      ? parseInt(parent.style.gridRowStart || '1') - 1
      : index % sceneConfig.gridSize

    const distance = Math.sqrt((x - center) ** 2 + (y - center) ** 2)
    const delay = (distance * sceneConfig.animationDelay) / 1000
    const height = parseInt((block as HTMLElement).dataset.height || '0')

    const el = block as HTMLElement
    el.style.transform = el.style.transform.replace(/scale3d\([^)]+\)/, '') || 'scale3d(0,0,0)'
    el.style.opacity = '0'

    gsap.to(el, {
      scale: 1,
      opacity: 1,
      duration: sceneConfig.animationDuration / 1000,
      delay: delay + height * 0.05,
      ease: sceneConfig.easing,
    })
  })
}

function updateSceneRotation(
  mountain: HTMLElement,
  surface: HTMLElement,
  scrollProgress: number
) {
  const cameraAngle = scrollProgress * 90
  const cameraDistance = 800 - scrollProgress * 200
  const cameraHeight = 600 + scrollProgress * 200
  const rad = (cameraAngle * Math.PI) / 180
  const x = Math.sin(rad) * cameraDistance
  const z = Math.cos(rad) * cameraDistance

  mountain.style.transform = `rotateX(60deg) rotateZ(45deg) translate3d(${x}px, 0, ${z}px)`

  if (mountain.parentElement) {
    mountain.parentElement.style.perspectiveOrigin = `${50 + scrollProgress * 20}% ${40 + scrollProgress * 10}%`
  }

  surface.style.transform = `rotateY(${scrollProgress * 15}deg)`
}

export default function BlockTerrain() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const mountainRef = useRef<HTMLDivElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number>(0)

  const buildTerrain = useCallback(() => {
    if (!surfaceRef.current) return
    surfaceRef.current.innerHTML = ''

    for (let y = 0; y < sceneConfig.gridSize; y++) {
      for (let x = 0; x < sceneConfig.gridSize; x++) {
        const cell = createCell(x, y)
        surfaceRef.current.appendChild(cell)
      }
    }
  }, [])

  useEffect(() => {
    buildTerrain()
    animateEntrance()

    const mountain = mountainRef.current
    const surface = surfaceRef.current
    if (!mountain || !surface) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })
    lenisRef.current = lenis

    const raf = (time: number) => {
      updateSceneRotation(mountain, surface, (lenis as any).progress || 0)
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    // Auto-orbit
    let autoRotate = 0
    const autoOrbitInterval = setInterval(() => {
      autoRotate += 0.1
      const currentTransform = mountain.style.transform || ''
      if (!currentTransform.includes('rotateZ')) {
        mountain.style.transform = currentTransform + ` rotateZ(${autoRotate}deg)`
      }
      surface.style.transform = `rotateY(${autoRotate * 0.5}deg)`
    }, 50)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearInterval(autoOrbitInterval)
      lenis.destroy()
    }
  }, [buildTerrain])

  return (
    <div className="scene" ref={sceneRef}>
      <div
        className="mountain"
        ref={mountainRef}
        style={{
          transform: 'rotateX(60deg) rotateZ(45deg)',
        }}
      >
        <div
          className="surface"
          ref={surfaceRef}
          style={{
            transformStyle: 'preserve-3d',
          }}
        />
      </div>
    </div>
  )
}
