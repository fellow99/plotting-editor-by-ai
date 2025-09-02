/**
 * 场景管理可组合函数
 * 基于 Cesium 1.132.0 的场景管理，使用新版 API
 */

import { ref, reactive } from 'vue'
import * as Cesium from 'cesium'

// 全局状态
const viewer = ref(null)
const scene = ref(null)
const camera = ref(null)
const isInitialized = ref(false)

/**
 * 场景管理可组合函数
 */
export function useScene() {
  
  /**
   * 初始化 Cesium 场景
   * @param {HTMLElement} container - 容器元素
   */
  const initScene = async (container) => {
    try {
      if (isInitialized.value) {
        console.warn('场景已经初始化')
        return
      }

      // 设置 Cesium 访问令牌（如果需要）
      // Cesium.Ion.defaultAccessToken = 'your_access_token_here'

      // 创建 Viewer，使用新版 API
      viewer.value = new Cesium.Viewer(container || 'cesiumContainer', {
        // 基础配置
        animation: false,
        timeline: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: true,
        navigationHelpButton: false,
        sceneModePicker: true,
        baseLayerPicker: true,
        vrButton: false,
        
        // 地形配置
        terrainProvider: Cesium.createWorldTerrain(),
        
        // 影像配置 - 使用新版 baseLayer 替代 imageryProvider
        baseLayer: Cesium.ImageryLayer.fromProviderAsync(
          Cesium.createWorldImageryAsync()
        ),
        
        // 渲染配置
        contextOptions: {
          webgl: {
            preserveDrawingBuffer: true
          }
        },
        
        // 性能配置
        requestRenderMode: true,
        maximumRenderTimeChange: Infinity
      })

      // 获取场景和相机引用
      scene.value = viewer.value.scene
      camera.value = viewer.value.camera

      // 配置场景参数
      configureScene()
      
      // 设置默认视角
      setDefaultView()

      isInitialized.value = true
      console.log('Cesium 场景初始化成功')
      
    } catch (error) {
      console.error('Cesium 场景初始化失败:', error)
      throw error
    }
  }

  /**
   * 配置场景参数
   */
  const configureScene = () => {
    if (!scene.value) return

    // 启用深度测试
    scene.value.globe.depthTestAgainstTerrain = true
    
    // 配置大气效果
    scene.value.skyAtmosphere.show = true
    
    // 配置雾效果
    scene.value.fog.enabled = true
    scene.value.fog.density = 0.0002
    
    // 配置光照
    scene.value.globe.enableLighting = true
    
    // 配置地下模式（如果需要）
    scene.value.underground = false
    
    // 使用新版 verticalExaggeration 替代 Globe.terrainExaggeration
    scene.value.verticalExaggeration = 1.0
    scene.value.verticalExaggerationRelativeHeight = 0.0
  }

  /**
   * 设置默认视角
   */
  const setDefaultView = () => {
    if (!camera.value) return

    // 设置默认相机位置（北京上空）
    camera.value.setView({
      destination: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 10000000),
      orientation: {
        heading: 0.0,
        pitch: -Cesium.Math.PI_OVER_TWO,
        roll: 0.0
      }
    })
  }

  /**
   * 销毁场景
   */
  const destroyScene = () => {
    if (viewer.value) {
      viewer.value.destroy()
      viewer.value = null
      scene.value = null
      camera.value = null
      isInitialized.value = false
      console.log('Cesium 场景已销毁')
    }
  }

  /**
   * 飞行到指定位置
   * @param {Object} destination - 目标位置
   * @param {Object} options - 飞行选项
   */
  const flyTo = (destination, options = {}) => {
    if (!camera.value) return

    return camera.value.flyTo({
      destination,
      ...options
    })
  }

  /**
   * 聚焦到实体
   * @param {Cesium.Entity} entity - 目标实体
   * @param {Object} options - 聚焦选项
   */
  const focusEntity = (entity, options = {}) => {
    if (!viewer.value) return

    return viewer.value.flyTo(entity, options)
  }

  /**
   * 添加实体到场景
   * @param {Object} entityData - 实体数据
   */
  const addEntity = (entityData) => {
    if (!viewer.value) return null

    return viewer.value.entities.add(entityData)
  }

  /**
   * 从场景移除实体
   * @param {Cesium.Entity} entity - 要移除的实体
   */
  const removeEntity = (entity) => {
    if (!viewer.value || !entity) return

    viewer.value.entities.remove(entity)
  }

  /**
   * 清空所有实体
   */
  const clearEntities = () => {
    if (!viewer.value) return

    viewer.value.entities.removeAll()
  }

  /**
   * 获取屏幕坐标对应的地理坐标
   * @param {Cesium.Cartesian2} screenPosition - 屏幕坐标
   */
  const pickPosition = (screenPosition) => {
    if (!viewer.value) return null

    // 优先拾取地形
    const cartesian = viewer.value.camera.pickEllipsoid(screenPosition, scene.value.globe.ellipsoid)
    if (cartesian) {
      return Cesium.Cartographic.fromCartesian(cartesian)
    }

    return null
  }

  /**
   * 截图
   */
  const takeScreenshot = () => {
    if (!viewer.value) return null

    return viewer.value.canvas.toDataURL()
  }

  return {
    // 状态
    viewer,
    scene,
    camera,
    isInitialized,
    
    // 方法
    initScene,
    destroyScene,
    flyTo,
    focusEntity,
    addEntity,
    removeEntity,
    clearEntities,
    pickPosition,
    takeScreenshot
  }
}
