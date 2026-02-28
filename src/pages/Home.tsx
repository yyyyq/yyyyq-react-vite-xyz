import { useEffect, useRef, useState } from 'react'
import { Canvas, FabricObject, Rect, Textbox } from 'fabric'
import { Button, ColorPicker, Input } from 'antd'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<Canvas | null>(null)

  // 活动对象
  const [activeObject, setActiveObject] = useState<FabricObject | null>(null)
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    if (!containerRef.current || canvasRef.current) return

    const canvasEl = containerRef.current.querySelector('canvas')
    if (!canvasEl) return

    const canvas = new Canvas(canvasEl, {
      width: 800,
      height: 500,
      backgroundColor: '#f5f5f5',
    })

    canvasRef.current = canvas

    const handleSelection = () => {
      const obj = canvas.getActiveObject()
      setActiveObject(obj || null)
    }

    canvas.on('selection:created', handleSelection)
    canvas.on('selection:updated', handleSelection)
    canvas.on('selection:cleared', () => setActiveObject(null))

    return () => {
      canvas.off('selection:created', handleSelection)
      canvas.off('selection:updated', handleSelection)
      canvas.dispose()
      canvasRef.current = null
    }
  }, [])

  // 添加矩形
  const addRect = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const rect = new Rect({
      left: 100,
      top: 100,
      fill: 'skyblue',
      width: 100,
      height: 100,
    })
    canvas.add(rect)
    canvas.setActiveObject(rect)
  }

  // 添加文本
  const addText = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const text = new Textbox('Hello Fabric!', {
      left: 150,
      top: 150,
      fill: 'black',
      fontSize: 24,
    })
    canvas.add(text)
    canvas.setActiveObject(text)
  }

  // 删除选中对象
  const deleteSelected = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      canvas.remove(activeObject)
    }
  }

  // 导出 JSON
  const exportJSON = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const json = canvas.toJSON()
    console.log('Exported JSON:', JSON.stringify(json))
  }

  const updateProperty = (key: string, value: any) => {
    if (!activeObject) return

    activeObject.set(key as any, value)
    canvasRef.current?.renderAll()

    // 强制刷新 React
    forceUpdate((n) => n + 1)
  }

  return (
    <>
      <div className="flex gap-x-[4px]">
        <Button color="default" variant="solid" onClick={addRect}>
          addRect
        </Button>
        <Button color="primary" variant="solid" onClick={addText}>
          addText
        </Button>
        <Button color="danger" variant="solid" onClick={deleteSelected}>
          deleteSelected
        </Button>
        <Button color="pink" variant="solid" onClick={exportJSON}>
          exportJSON
        </Button>
      </div>
      <div className="flex mt-[12px]">
        <div className="border border-gray-300" ref={containerRef}>
          <canvas />
        </div>
        <div style={{ width: 250, marginLeft: 20 }}>
          <div className="mb-[12px] font-bold text-[16px]">属性面板</div>

          {activeObject ? (
            <>
              <div className="flex items-center gap-[8px]">
                <label>X:</label>
                <Input
                  type="number"
                  value={activeObject.left || 0}
                  onChange={(e) =>
                    updateProperty('left', Number(e.target.value))
                  }
                />
              </div>

              <div className="flex items-center gap-[8px] mt-[12px]">
                <label>Y:</label>
                <Input
                  type="number"
                  value={activeObject.top || 0}
                  onChange={(e) =>
                    updateProperty('top', Number(e.target.value))
                  }
                />
              </div>

              {'fill' in activeObject && (
                <div className="flex items-center gap-[8px] mt-[12px]">
                  <label>颜色:</label>
                  <ColorPicker
                    value={(activeObject as any).fill}
                    onChange={(color) =>
                      updateProperty('fill', color.toHexString())
                    }
                    showText
                  />
                </div>
              )}
            </>
          ) : (
            <div>请选择一个对象</div>
          )}
        </div>
      </div>
    </>
  )
}
