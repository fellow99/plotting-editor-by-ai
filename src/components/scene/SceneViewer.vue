<!--
 * 主场景视图组件
 * 基于 Cesium 的地图场景容器，支持拖拽添加标绘对象
-->
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as Cesium from 'cesium'
import { useScene } from '../../composables/useScene'

// 响应式数据
const cesiumContainer = ref(null)
const isLoading = ref(true)
const isDragOver = ref(false)

// 使用场景管理
const { 
  viewer, 
  scene, 
  camera, 
  initScene, 
  destroyScene,
  addEntity,
  pickPosition 
} = useScene()

// 生命周期
onMounted(async () => {
  try {
    await nextTick()
    if (cesiumContainer.value) {
      await initScene(cesiumContainer.value)
      isLoading.value = false
      
      // 设置场景事件监听
      setupSceneEvents()
    } else {
      console.error('cesiumContainer.value 为 null，无法初始化场景')
      isLoading.value = false
    }
  } catch (error) {
    console.error('场景初始化失败:', error)
    isLoading.value = false
  }
})

onUnmounted(() => {
  destroyScene()
})

// 方法
/**
 * 设置场景事件监听
 */
const setupSceneEvents = () => {
  if (!viewer.value) return

  // 鼠标点击事件
  viewer.value.cesiumWidget.canvas.addEventListener('click', handleCanvasClick)
  
  // 鼠标移动事件
  viewer.value.cesiumWidget.canvas.addEventListener('mousemove', handleCanvasMouseMove)
}

/**
 * 处理画布点击事件
 */
const handleCanvasClick = (event) => {
  const click = new Cesium.Cartesian2(event.clientX, event.clientY)
  
  // 拾取对象
  const pickedObject = viewer.value.scene.pick(click)
  if (pickedObject) {
    // TODO: 处理对象选择
  }
  
  // 获取地理坐标
  const position = pickPosition(click)
  if (position) {
    const longitude = Cesium.Math.toDegrees(position.longitude)
    const latitude = Cesium.Math.toDegrees(position.latitude)
  }
}

/**
 * 处理画布鼠标移动事件
 */
const handleCanvasMouseMove = (event) => {
  // TODO: 处理鼠标悬停效果
}

/**
 * 处理拖拽进入
 */
const handleDragEnter = (event) => {
  event.preventDefault()
  isDragOver.value = true
}

/**
 * 处理拖拽离开
 */
const handleDragLeave = (event) => {
  event.preventDefault()
  isDragOver.value = false
}

/**
 * 处理拖拽悬停
 */
const handleDragOver = (event) => {
  event.preventDefault()
}

/**
 * 处理拖拽放置
 */
const handleDrop = (event) => {
  event.preventDefault()
  isDragOver.value = false
  
  const dropData = event.dataTransfer.getData('application/json')
  if (!dropData) return
  
  try {
    const data = JSON.parse(dropData)
    const dropPosition = new Cesium.Cartesian2(event.clientX, event.clientY)
    
    // 获取放置位置的地理坐标
    const worldPosition = pickPosition(dropPosition)
    if (worldPosition) {
      handleObjectDrop(data, worldPosition)
    }
  } catch (error) {
    console.error('拖拽数据解析失败:', error)
  }
}

/**
 * 处理对象拖拽放置
 * @param {Object} data - 拖拽数据
 * @param {Cesium.Cartographic} position - 放置位置
 */
const handleObjectDrop = (data, position) => {
  // 根据对象类型创建不同的实体
  switch (data.type) {
    case 'point':
      addPointEntity(position, data)
      break
    case 'line':
      addLineEntity(position, data)
      break
    case 'polygon':
      addPolygonEntity(position, data)
      break
    case 'model':
      addModelEntity(position, data)
      break
    default:
      console.warn('未知的对象类型:', data.type)
  }
}

/**
 * 添加点实体
 */
const addPointEntity = (position, data) => {
  const cartesian = Cesium.Cartographic.toCartesian(position)
  
  addEntity({
    name: data.name || '点标绘',
    position: cartesian,
    point: {
      pixelSize: 10,
      color: Cesium.Color.YELLOW,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    label: {
      text: data.name || '点标绘',
      font: '14pt monospace',
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -9)
    }
  })
}

/**
 * 添加线实体
 */
const addLineEntity = (position, data) => {
  const cartesian = Cesium.Cartographic.toCartesian(position)
  
  // 创建一个简单的线段（从点击位置向东延伸1000米）
  const endPosition = new Cesium.Cartographic(
    position.longitude + Cesium.Math.toRadians(0.01),
    position.latitude,
    position.height
  )
  const endCartesian = Cesium.Cartographic.toCartesian(endPosition)
  
  addEntity({
    name: data.name || '线标绘',
    polyline: {
      positions: [cartesian, endCartesian],
      width: 3,
      clampToGround: true,
      material: Cesium.Color.RED
    }
  })
}

/**
 * 添加面实体
 */
const addPolygonEntity = (position, data) => {
  const cartesian = Cesium.Cartographic.toCartesian(position)
  
  // 创建一个简单的矩形
  const offset = Cesium.Math.toRadians(0.005)
  const positions = [
    Cesium.Cartesian3.fromRadians(position.longitude - offset, position.latitude - offset),
    Cesium.Cartesian3.fromRadians(position.longitude + offset, position.latitude - offset),
    Cesium.Cartesian3.fromRadians(position.longitude + offset, position.latitude + offset),
    Cesium.Cartesian3.fromRadians(position.longitude - offset, position.latitude + offset)
  ]
  
  addEntity({
    name: data.name || '面标绘',
    polygon: {
      hierarchy: positions,
      material: Cesium.Color.BLUE.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.BLUE
    }
  })
}

/**
 * 添加模型实体
 */
const addModelEntity = (position, data) => {
  const cartesian = Cesium.Cartographic.toCartesian(position)
  
  addEntity({
    name: data.name || '模型',
    position: cartesian,
    model: {
      uri: data.url || data.path,
      scale: 1.0,
      minimumPixelSize: 128,
      maximumScale: 20000
    }
  })
}
</script>

<template>
  <div class="scene-viewer">
    <!-- 加载提示 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <div class="loading-text">正在初始化地图场景...</div>
      </div>
    </div>
    
    <!-- Cesium 容器 -->
    <div 
      ref="cesiumContainer" 
      class="cesium-container cesium-viewer"
      :class="{ 'drag-over': isDragOver }"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      @dragover="handleDragOver"
      @drop="handleDrop"
    ></div>
    
    <!-- 拖拽提示 -->
    <div v-if="isDragOver" class="drop-hint">
      <div class="drop-hint-content">
        <i class="el-icon-upload"></i>
        <div>在此位置放置标绘对象</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scene-viewer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.cesium-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.cesium-container.drag-over {
  border: 2px dashed #007acc;
  background-color: rgba(0, 122, 204, 0.1);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(30, 30, 30, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-content {
  text-align: center;
  color: #ffffff;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #333333;
  border-top: 4px solid #007acc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

.loading-text {
  font-size: 14px;
  color: #cccccc;
}

.drop-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 122, 204, 0.9);
  color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  pointer-events: none;
  z-index: 1001;
}

.drop-hint-content i {
  font-size: 32px;
  margin-bottom: 8px;
  display: block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Cesium 组件样式覆盖 */
:deep(.cesium-widget-credits) {
  display: none !important;
}

:deep(.cesium-viewer-toolbar) {
  top: 10px;
  left: 10px;
  right: auto;
}

:deep(.cesium-viewer-geocoderContainer) {
  display: none;
}

:deep(.cesium-home-button) {
  background-color: rgba(48, 51, 54, 0.8);
}

:deep(.cesium-sceneModePicker-wrapper) {
  background-color: rgba(48, 51, 54, 0.8);
}

:deep(.cesium-baseLayerPicker-dropDown) {
  background-color: rgba(48, 51, 54, 0.9);
}
</style>
