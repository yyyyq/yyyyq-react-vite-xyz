import {
  Canvas,
  Circle,
  Ellipse,
  FabricImage,
  FabricText,
  filters,
  Gradient,
  Polygon,
  Polyline,
  Triangle,
  type SerializedShadowOptions,
} from 'fabric'
import { useEffect, useRef } from 'react'
import fImgDemo from '../assets/table-empty.png'
import testPPP from '../assets/test-ppp.png'

import { Button } from 'antd'

interface IFabricDemoProps {
  width?: number
  height?: number
}

const FabricDemo = ({ width = 800, height = 600 }: IFabricDemoProps) => {
  console.log('FabricDemo rendered with width:', width, 'height:', height)
  const canvasRef = useRef<Canvas | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const ellipseRef = useRef<Ellipse | null>(null)

  // 使用 async/await 来加载图片
  async function loadImage() {
    const img = await FabricImage.fromURL(testPPP)

    img.set({
      left: 100,
      top: 250,
    })

    img.scaleToWidth(200)
    // img.scaleToHeight(200)

    // 添加滤镜
    // img.filters.push(new filters.Grayscale())
    img.filters.push(new filters.Brightness({ brightness: 0.5 }))

    // 应用滤镜
    img.applyFilters()

    // 将图片添加到画布
    canvasRef.current?.add(img)

    // 确保画布重绘
    canvasRef.current?.renderAll()
  }

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

    const gradient = new Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 0, y1: 0, x2: 0, y2: circleBox.height },
      colorStops: [
        { offset: 0, color: 'red' },
        { offset: 0.2, color: 'orange' },
        { offset: 0.4, color: 'yellow' },
        { offset: 0.6, color: 'green' },
        { offset: 0.8, color: 'blue' },
        { offset: 1, color: 'purple' },
      ],
    })
    circleBox.set({ fill: gradient })

    ellipseRef.current = new Ellipse({
      left: 200,
      top: 100,
      rx: 50,
      ry: 20,
      fill: 'blue',
    })
    canvas.add(ellipseRef.current)

    const polygonBox = new Polygon(
      [
        { x: 300, y: 100 },
        { x: 350, y: 150 },
        { x: 400, y: 100 },
        { x: 400, y: 50 },
        { x: 300, y: 50 },
      ],
      { fill: 'pink' },
    )
    canvas.add(polygonBox)

    const polyLineBox = new Polyline(
      [
        { x: 500, y: 100 },
        { x: 550, y: 150 },
      ],
      { stroke: 'green', strokeWidth: 2 },
    )
    canvas.add(polyLineBox)

    const triangleBox = new Triangle({
      width: 100,
      height: 100,
      fill: 'red',
      left: 600,
      top: 100,
    })

    canvas.add(triangleBox)

    const textBox = new FabricText('Hello Fabric.js', {
      left: 250,
      top: 200,
      fontSize: 30,
      fill: 'black',
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fontStyle: 'italic',
      underline: true,
      stroke: '#222222',
      strokeWidth: 1,
      shadow: {
        color: 'rgba(0,0,0,0.3)',
        offsetX: 5,
        offsetY: 5,
        blur: 5,
        affectStroke: false,
        includeDefaultValues: false,
        nonScaling: false,
        id: '',
        toSVG: function (): string {
          throw new Error('Function not implemented.')
        },
        toObject: function (): Partial<SerializedShadowOptions> {
          throw new Error('Function not implemented.')
        },
      },
    })
    canvas.add(textBox)
    const gardientText = new Gradient({
      type: 'linear',
      gradientUnits: 'percentage',
      coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
      colorStops: [
        { offset: 0, color: 'red' },
        { offset: 0.2, color: 'orange' },
        { offset: 0.6, color: 'green' },
        { offset: 0.8, color: 'blue' },
        { offset: 1, color: 'purple' },
      ],
    })
    textBox.set({ fill: gardientText })

    FabricImage.fromURL(fImgDemo).then((img) => {
      img.set({ left: 100, top: 250, scaleX: 0.5, scaleY: 0.5 })
      canvas.add(img)
    })

    return () => {
      canvas.dispose()
      canvasRef.current = null
    }
  }, [width, height])

  return (
    <>
      <div className="fabric-demo mb-2" ref={containerRef}>
        <canvas style={{ border: '1px solid #ccc' }} />
      </div>
      <Button
        color="primary"
        variant="solid"
        onClick={() => {
          ellipseRef.current?.animate(
            { top: 80 },
            { duration: 1000, onChange: () => canvasRef.current?.renderAll() },
          )
        }}
      >
        Animate
      </Button>

      <Button
        color="danger"
        variant="solid"
        className="ml-2"
        onClick={loadImage}
      >
        Load Image with Filter
      </Button>
    </>
  )
}

export default FabricDemo
