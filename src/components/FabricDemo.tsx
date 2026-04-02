import { Canvas, Circle, Ellipse, Line, Polygon } from 'fabric'
import { useEffect, useRef } from 'react'

interface IFabricDemoProps {
  width?: number
  height?: number
}

const FabricDemo = ({ width = 800, height = 600 }: IFabricDemoProps) => {
  console.log('FabricDemo rendered with width:', width, 'height:', height)
  const canvasRef = useRef<Canvas | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || canvasRef.current) return
    const canvasEl = containerRef.current.querySelector('canvas')
    if (!canvasEl) return

    const canvas = new Canvas(canvasEl, {
      width,
      height,
      backgroundColor: '#f0f0f0',
    })
    canvasRef.current = canvas

    const circleBox = new Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: 'red',
    })
    canvas.add(circleBox)

    const ellipseBox = new Ellipse({
      left: 200,
      top: 100,
      rx: 50,
      ry: 20,
      fill: 'blue',
    })
    canvas.add(ellipseBox)

    const polygonBox = new Polygon(
      [
        { x: 300, y: 100 },
        { x: 350, y: 150 },
        { x: 400, y: 100 },
        { x: 350, y: 50 },
      ],
      { fill: 'green' },
    )
    canvas.add(polygonBox)

    return () => {
      canvas.dispose()
      canvasRef.current = null
    }
  }, [width, height])

  return (
    <div className="fabric-demo" ref={containerRef}>
      <canvas style={{ border: '1px solid #ccc' }} />
    </div>
  )
}

export default FabricDemo
