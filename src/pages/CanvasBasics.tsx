import { useRef, useEffect } from 'react'

export default function CanvasBasics() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 1. 矩形
    ctx.fillStyle = '#ff6b6b'
    ctx.fillRect(10, 10, 100, 60)

    // 2. 圆形
    ctx.beginPath()
    ctx.arc(300, 40, 30, 0, Math.PI * 2)
    ctx.fillStyle = '#4ecdc4'
    ctx.fill()

    // 3. 线条
    ctx.beginPath()
    ctx.moveTo(10, 100)
    ctx.lineTo(100, 180)
    ctx.lineTo(180, 120)
    ctx.lineTo(100, 100)
    ctx.closePath()
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fill()

    // 4. 文本
    ctx.font = '20px Arial'
    ctx.fillStyle = '#2c3e50'
    ctx.fillText('Canvas Basics', 10, 220)

    // 5. 变换
    ctx.save()
    ctx.translate(250, 150)
    ctx.rotate(Math.PI / 6)
    ctx.fillStyle = '#f39c12'
    ctx.fillRect(-25, -25, 50, 50)
    ctx.restore()

    // 6. 路径组合
    ctx.beginPath()
    ctx.moveTo(120, 100)
    ctx.bezierCurveTo(150, 50, 200, 50, 230, 100)
    ctx.bezierCurveTo(200, 150, 150, 150, 120, 100)
    ctx.fillStyle = '#9b59b6'
    ctx.fill()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Canvas 基础</h2>
      <canvas
        ref={canvasRef}
        width={400}
        height={250}
        style={{ border: '1px solid #ccc' }}
      />
      <div className="mt-4 text-gray-600">
        <p>演示内容：矩形、圆形、线条、文本、变换、贝塞尔曲线</p>
      </div>
    </div>
  )
}
