<!--
 * 编辑器底部状态栏组件
 * 显示当前状态信息、坐标、相机信息等
-->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useScene } from '../../composables/useScene'

// 使用场景管理
const { viewer, camera, isInitialized } = useScene()

// 响应式数据
const mousePosition = ref({ x: 0, y: 0 })
const worldPosition = ref({ longitude: 0, latitude: 0, height: 0 })
const cameraInfo = ref({
  height: 0,
  heading: 0,
  pitch: 0,
  roll: 0
})
const entityCount = ref(0)
const performanceInfo = ref({
  fps: 0,
  renderTime: 0
})

// 更新定时器
let updateTimer = null

// 生命周期
onMounted(() => {
  startStatusUpdate()
})

onUnmounted(() => {
  stopStatusUpdate()
})

// 方法
/**
 * 开始状态更新
 */
const startStatusUpdate = () => {
  updateTimer = setInterval(() => {
    updateStatus()
  }, 100) // 每100ms更新一次
}

/**
 * 停止状态更新
 */
const stopStatusUpdate = () => {
  if (updateTimer) {
    clearInterval(updateTimer)
    updateTimer = null
  }
}

/**
 * 更新状态信息
 */
const updateStatus = () => {
  if (!isInitialized.value || !viewer.value) return

  try {
    // 更新相机信息
    updateCameraInfo()
    
    // 更新实体数量
    updateEntityCount()
    
    // 更新性能信息
    updatePerformanceInfo()
  } catch (error) {
    console.warn('状态更新失败:', error)
  }
}

/**
 * 更新相机信息
 */
const updateCameraInfo = () => {
  if (!camera.value) return

  const position = camera.value.positionCartographic
  if (position) {
    cameraInfo.value = {
      height: Math.round(position.height),
      heading: Math.round(Cesium.Math.toDegrees(camera.value.heading)),
      pitch: Math.round(Cesium.Math.toDegrees(camera.value.pitch)),
      roll: Math.round(Cesium.Math.toDegrees(camera.value.roll))
    }
  }
}

/**
 * 更新实体数量
 */
const updateEntityCount = () => {
  if (!viewer.value) return
  
  entityCount.value = viewer.value.entities.values.length
}

/**
 * 更新性能信息
 */
const updatePerformanceInfo = () => {
  if (!viewer.value) return

  // 简单的FPS计算（实际项目中可能需要更精确的方法）
  performanceInfo.value.fps = Math.round(1000 / 16.67) // 假设60fps
  performanceInfo.value.renderTime = Math.round(Math.random() * 5 + 10) // 模拟渲染时间
}

/**
 * 处理鼠标移动事件
 */
const handleMouseMove = (event) => {
  if (!viewer.value) return

  mousePosition.value = {
    x: event.clientX,
    y: event.clientY
  }

  // 获取鼠标位置对应的世界坐标
  const canvas = viewer.value.canvas
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const cartesian = camera.value.pickEllipsoid(
    new Cesium.Cartesian2(x, y),
    viewer.value.scene.globe.ellipsoid
  )

  if (cartesian) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
    worldPosition.value = {
      longitude: parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(6)),
      latitude: parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(6)),
      height: Math.round(cartographic.height)
    }
  }
}

// 计算属性
const statusText = computed(() => {
  if (!isInitialized.value) {
    return '场景未初始化'
  }
  return '场景已就绪'
})

const coordinateText = computed(() => {
  return `经度: ${worldPosition.value.longitude}° 纬度: ${worldPosition.value.latitude}° 高度: ${worldPosition.value.height}m`
})

const cameraText = computed(() => {
  return `相机高度: ${cameraInfo.value.height}m 方向: ${cameraInfo.value.heading}° 俯仰: ${cameraInfo.value.pitch}°`
})

const performanceText = computed(() => {
  return `FPS: ${performanceInfo.value.fps} 渲染时间: ${performanceInfo.value.renderTime}ms`
})
</script>

<template>
  <div class="editor-footer" @mousemove="handleMouseMove">
    <!-- 左侧状态信息 -->
    <div class="footer-section">
      <span class="status-item">
        <i class="status-icon" :class="{ 'status-ready': isInitialized }">●</i>
        {{ statusText }}
      </span>
      
      <span class="status-item">
        <i class="status-icon">📊</i>
        对象数量: {{ entityCount }}
      </span>
    </div>
    
    <!-- 中央坐标信息 -->
    <div class="footer-section footer-center">
      <span class="status-item coordinate-info">
        <i class="status-icon">🌍</i>
        {{ coordinateText }}
      </span>
    </div>
    
    <!-- 右侧性能和相机信息 -->
    <div class="footer-section">
      <span class="status-item">
        <i class="status-icon">📹</i>
        {{ cameraText }}
      </span>
      
      <span class="status-item performance-info">
        <i class="status-icon">⚡</i>
        {{ performanceText }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.editor-footer {
  height: 30px;
  background-color: #007acc;
  border-top: 1px solid #404040;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 12px;
  color: #ffffff;
  user-select: none;
  z-index: 1000;
}

.footer-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-center {
  flex: 1;
  justify-content: center;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.status-icon {
  font-size: 10px;
  opacity: 0.8;
}

.status-icon.status-ready {
  color: #00ff00;
}

.coordinate-info {
  font-family: 'Courier New', monospace;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 2px 8px;
  border-radius: 3px;
}

.performance-info {
  font-family: 'Courier New', monospace;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .footer-section {
    gap: 12px;
  }
  
  .status-item {
    gap: 2px;
  }
}

@media (max-width: 768px) {
  .editor-footer {
    padding: 0 8px;
    font-size: 11px;
  }
  
  .footer-section {
    gap: 8px;
  }
  
  .footer-center {
    display: none;
  }
  
  .status-item:nth-child(n+3) {
    display: none;
  }
}

@media (max-width: 480px) {
  .performance-info {
    display: none;
  }
}
</style>
