import { useEffect, useRef, useState } from 'react'
import {
  Canvas,
  Circle,
  Control,
  controlsUtils,
  FabricImage,
  FabricObject,
  Line,
  Point,
  Polygon,
  Rect,
  Textbox,
  util,
} from 'fabric'
import { Button, ColorPicker, Input, Upload, message } from 'antd'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<Canvas | null>(null)

  // 活动对象
  const [activeObject, setActiveObject] = useState<FabricObject | null>(null)
  const [, forceUpdate] = useState(0)

  // 抠图相关状态
  const [isDrawingClip, setIsDrawingClip] = useState(false)
  const [clipPoints, setClipPoints] = useState<Point[]>([])
  const [targetImage, setTargetImage] = useState<FabricImage | null>(null)
  const tempObjectsRef = useRef<FabricObject[]>([])

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
    canvas.on('object:modified', (e) => {
      handleSelection()
      // 多边形顶点拖动结束后，更新可选中区域
      const target = e.target
      if (target && target.type === 'polygon') {
        const polygon = target as Polygon

        // 记录第一个顶点的屏幕坐标作为参考
        const firstPoint = polygon.points[0]
        const oldLocalPos = new Point(
          firstPoint.x - polygon.pathOffset.x,
          firstPoint.y - polygon.pathOffset.y,
        )
        const oldScreenPos = oldLocalPos.transform(
          polygon.calcTransformMatrix(),
        )

        // 重新计算边界框
        polygon.setBoundingBox(true)

        // 计算新的第一个顶点屏幕坐标
        const newLocalPos = new Point(
          firstPoint.x - polygon.pathOffset.x,
          firstPoint.y - polygon.pathOffset.y,
        )
        const newScreenPos = newLocalPos.transform(
          polygon.calcTransformMatrix(),
        )

        // 补偿位置差异
        polygon.left += oldScreenPos.x - newScreenPos.x
        polygon.top += oldScreenPos.y - newScreenPos.y

        polygon.setCoords()
        canvas.requestRenderAll()
      }
    })
    canvas.on('object:moving', () => forceUpdate((n) => n + 1)) // 强制刷新 React
    canvas.on('selection:cleared', () => setActiveObject(null))

    return () => {
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

  // 添加多边形
  const addPolygon = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const points = [
      { x: 200, y: 200 },
      { x: 250, y: 250 },
      { x: 220, y: 300 },
      { x: 180, y: 280 },
    ]
    const polygon = new Polygon(points, {
      left: 200,
      top: 200,
      fill: 'lightcoral',
      hasBorders: false, // 隐藏矩形边框
      lockScalingX: true, // 禁止缩放（因为用顶点编辑）
      lockScalingY: true,
      objectCaching: false, // 禁用缓存，防止拖动顶点时被裁剪
      perPixelTargetFind: true, // 基于实际像素检测点击，而非矩形边界框
    })
    addVertexControls(polygon)
    canvas.add(polygon)
    canvas.setActiveObject(polygon)
  }

  const addVertexControls = (polygon: Polygon) => {
    polygon.controls = {}

    polygon.points.forEach((point, index) => {
      polygon.controls[`p${index}`] = new Control({
        positionHandler: function (dim, finalMatrix, fabricObject) {
          const x = fabricObject.points[index].x - fabricObject.pathOffset.x
          const y = fabricObject.points[index].y - fabricObject.pathOffset.y

          return util.transformPoint(
            { x, y },
            util.multiplyTransformMatrices(
              fabricObject.canvas.viewportTransform,
              fabricObject.calcTransformMatrix(),
            ),
          )
        },

        actionHandler: function (eventData, transform, x, y) {
          const polygon = transform.target as Polygon
          // 用逆矩阵将屏幕坐标转换为本地坐标
          const invertedMatrix = util.invertTransform(
            polygon.calcTransformMatrix(),
          )
          const localPoint = new Point(x, y).transform(invertedMatrix)

          polygon.points[index] = {
            x: localPoint.x + polygon.pathOffset.x,
            y: localPoint.y + polygon.pathOffset.y,
          }

          polygon.set({ dirty: true })
          polygon.canvas?.requestRenderAll()
          return true
        },

        render: controlsUtils.renderCircleControl,
      })
    })
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

  // 上传图片
  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      if (!canvasRef.current || !e.target?.result) return
      const canvas = canvasRef.current

      const img = await FabricImage.fromURL(e.target.result as string)
      // 缩放图片适应画布
      const scale = Math.min(
        (canvas.width! * 0.8) / img.width!,
        (canvas.height! * 0.8) / img.height!,
      )
      img.scale(scale)
      img.set({
        left: canvas.width! / 2,
        top: canvas.height! / 2,
        originX: 'center',
        originY: 'center',
      })
      canvas.add(img)
      canvas.setActiveObject(img)
      canvas.requestRenderAll()
    }
    reader.readAsDataURL(file)
    return false // 阻止默认上传
  }

  // 开始绘制裁剪区域
  const startDrawClip = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    // 检查是否选中了图片
    const activeObj = canvas.getActiveObject()
    if (!activeObj || activeObj.type !== 'image') {
      message.warning('请先选中一张图片')
      return
    }

    setTargetImage(activeObj as FabricImage)
    setIsDrawingClip(true)
    setClipPoints([])
    canvas.selection = false // 禁用框选
    canvas.discardActiveObject()
    canvas.requestRenderAll()

    message.info('点击添加顶点，双击完成绘制')
  }

  // 处理画布点击（绘制模式）
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    const handleMouseDown = (e: any) => {
      if (!isDrawingClip) return

      const pointer = canvas.getScenePoint(e.e)
      const newPoints = [...clipPoints, new Point(pointer.x, pointer.y)]
      setClipPoints(newPoints)

      // 清除临时对象
      tempObjectsRef.current.forEach((obj) => canvas.remove(obj))
      tempObjectsRef.current = []

      // 绘制顶点标记
      newPoints.forEach((p) => {
        const circle = new Circle({
          left: p.x,
          top: p.y,
          radius: 5,
          fill: '#ff0000',
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false,
        })
        canvas.add(circle)
        tempObjectsRef.current.push(circle)
      })

      // 绘制连线
      for (let i = 0; i < newPoints.length - 1; i++) {
        const line = new Line(
          [newPoints[i].x, newPoints[i].y, newPoints[i + 1].x, newPoints[i + 1].y],
          {
            stroke: '#ff0000',
            strokeWidth: 2,
            selectable: false,
            evented: false,
          },
        )
        canvas.add(line)
        tempObjectsRef.current.push(line)
      }

      canvas.requestRenderAll()
    }

    const handleDoubleClick = () => {
      if (!isDrawingClip || clipPoints.length < 3 || !targetImage) return

      // 清除临时对象
      tempObjectsRef.current.forEach((obj) => canvas.remove(obj))
      tempObjectsRef.current = []

      // 将点转换为相对于图片的本地坐标
      const imgMatrix = targetImage.calcTransformMatrix()
      const invertedMatrix = util.invertTransform(imgMatrix)

      const localPoints = clipPoints.map((p) => {
        const localP = p.transform(invertedMatrix)
        return { x: localP.x, y: localP.y }
      })

      // 创建裁剪多边形
      const clipPolygon = new Polygon(localPoints, {
        originX: 'center',
        originY: 'center',
      })

      // 应用裁剪
      targetImage.set({ clipPath: clipPolygon })
      targetImage.setCoords()

      // 重置状态
      setIsDrawingClip(false)
      setClipPoints([])
      setTargetImage(null)
      canvas.selection = true
      canvas.setActiveObject(targetImage)
      canvas.requestRenderAll()

      message.success('裁剪完成')
    }

    canvas.on('mouse:down', handleMouseDown)
    canvas.on('mouse:dblclick', handleDoubleClick)

    return () => {
      canvas.off('mouse:down', handleMouseDown)
      canvas.off('mouse:dblclick', handleDoubleClick)
    }
  }, [isDrawingClip, clipPoints, targetImage])

  // 取消绘制
  const cancelDrawClip = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    tempObjectsRef.current.forEach((obj) => canvas.remove(obj))
    tempObjectsRef.current = []

    setIsDrawingClip(false)
    setClipPoints([])
    setTargetImage(null)
    canvas.selection = true
    canvas.requestRenderAll()
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
        <Button color="pink" variant="solid" onClick={addPolygon}>
          addPolygon
        </Button>
        <Button color="danger" variant="solid" onClick={deleteSelected}>
          deleteSelected
        </Button>
        <Button color="pink" variant="solid" onClick={exportJSON}>
          exportJSON
        </Button>
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={handleImageUpload}
        >
          <Button>上传图片</Button>
        </Upload>
        {!isDrawingClip ? (
          <Button color="cyan" variant="solid" onClick={startDrawClip}>
            抠图
          </Button>
        ) : (
          <Button color="default" variant="solid" onClick={cancelDrawClip}>
            取消抠图
          </Button>
        )}
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
