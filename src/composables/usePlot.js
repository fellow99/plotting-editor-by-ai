/**
 * 标绘环境管理可组合函数
 * 使用新版Cesium 1.132.0 API，不依赖ready和readyPromise
 */

import { ref, reactive, shallowRef } from 'vue'
import * as Cesium from 'cesium'
import DEFAULT_VIEWER_OPTIONS from '../constants/DEFAULT_VIEWER_OPTIONS.js'
import DEFAULT_CAMERA from '../constants/DEFAULT_CAMERA.js'
import DEFAULT_CENTER from '../constants/DEFAULT_CENTER.js'
import { useEditorConfig } from './useEditorConfig.js' // 引入编辑器配置

// 全局状态 - Cesium库的对象使用shallowRef
const viewer = shallowRef(null)
const plot = shallowRef(null)
const camera = shallowRef(null)
const isInitialized = ref(false)

/**
 * 标绘环境管理可组合函数
 */
export function usePlot() {
  
  /**
   * 初始化 Cesium 场景
   * @param {HTMLElement} container - 容器元素
   */
  const initScene = async (container) => {
    try {
      if (isInitialized.value) {
        return
      }

      // 验证容器参数
      if (!container) {
        throw new Error('Container element is required but was not provided')
      }

      // 设置 Cesium 访问令牌（如果需要）
      // Cesium.Ion.defaultAccessToken = 'your_access_token_here'

      // 获取编辑器配置
      const { editorConfig } = useEditorConfig()

      // 基于 DEFAULT_VIEWER_OPTIONS 混合 editorConfig.map 配置
      const options = {
        ...DEFAULT_VIEWER_OPTIONS,
        // 影像图层配置
        imageryProvider: editorConfig.map.imagery ? undefined : false,
        // 地形配置
        terrainProvider: editorConfig.map.terrain ? undefined : false,
        // 天空盒配置（新版 Cesium 需自定义 SkyBox，预留）
        // skyBox: editorConfig.map.skybox ? undefined : false,
        // 性能配置
        requestRenderMode: true,
        maximumRenderTimeChange: Infinity
      }

      // 创建 Viewer，使用最终配置
      viewer.value = new Cesium.Viewer(container, options)

      // 获取Plot和相机引用
      plot.value = viewer.value.scene
      camera.value = viewer.value.camera

      // 设置鼠标操作逻辑（根据编辑器配置）
      // zoomEventType、tiltEventType、rotateEventType
      const controlsConfig = editorConfig.controls
      const sscController = viewer.value.scene.screenSpaceCameraController
      if (controlsConfig) {
        // 缩放事件类型
        sscController.zoomEventTypes = [Cesium.CameraEventType[controlsConfig.zoomEventType] || Cesium.CameraEventType.WHEEL]
        // 倾斜事件类型
        sscController.tiltEventTypes = [Cesium.CameraEventType[controlsConfig.tiltEventType] || Cesium.CameraEventType.RIGHT_DRAG]
        // 旋转事件类型
        sscController.rotateEventTypes = [Cesium.CameraEventType[controlsConfig.rotateEventType] || Cesium.CameraEventType.LEFT_DRAG]
      }

      // 配置场景参数
      configureScene()
      
      // 设置默认视角
      setDefaultView()

      isInitialized.value = true
      
    } catch (error) {
      throw error
    }
  }

  /**
   * 配置场景参数
   */
  const configureScene = () => {
    if (!plot.value) return

    // 获取编辑器配置
    const { editorConfig } = useEditorConfig()

    // 鼠标操作逻辑配置（根据 editorConfig.controls 设置）
    const controlsConfig = editorConfig.controls
    const sscController = plot.value.screenSpaceCameraController
    if (controlsConfig && sscController) {
      // 缩放事件类型
      sscController.zoomEventTypes = [Cesium.CameraEventType[controlsConfig.zoomEventType] || Cesium.CameraEventType.WHEEL]
      // 倾斜事件类型
      sscController.tiltEventTypes = [Cesium.CameraEventType[controlsConfig.tiltEventType] || Cesium.CameraEventType.RIGHT_DRAG]
      // 旋转事件类型
      sscController.rotateEventTypes = [Cesium.CameraEventType[controlsConfig.rotateEventType] || Cesium.CameraEventType.LEFT_DRAG]
    }

    // 启用深度测试（根据配置）
    plot.value.globe.depthTestAgainstTerrain = !!editorConfig.map.depthTest

    // 配置大气效果
    plot.value.skyAtmosphere.show = !!editorConfig.map.atmosphere

    // 配置雾效果（始终开启，密度可后续配置）
    plot.value.fog.enabled = true
    plot.value.fog.density = 0.0002

    // 配置光照
    plot.value.globe.enableLighting = !!editorConfig.map.lighting

    // 配置地下模式
    plot.value.underground = !!editorConfig.map.underground

    // 使用新版 verticalExaggeration 替代 Globe.terrainExaggeration
    plot.value.verticalExaggeration = 1.0
    plot.value.verticalExaggerationRelativeHeight = 0.0

    // 配置天空盒（新版 Cesium 需自定义 SkyBox，预留）
    // plot.value.skyBox.show = !!editorConfig.map.skybox

    // 配置影像/地形（预留，需在 Viewer 初始化时处理）
    // imagery: editorConfig.map.imagery
    // terrain: editorConfig.map.terrain
  }

  /**
   * 设置默认视角
   * 使用DEFAULT_CAMERA和DEFAULT_CENTER配置
   */
  const setDefaultView = () => {
    if (!camera.value) return

    // 使用默认配置设置相机位置
    camera.value.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        DEFAULT_CAMERA.position.lng, 
        DEFAULT_CAMERA.position.lat, 
        DEFAULT_CAMERA.position.height
      ),
      orientation: {
        heading: Cesium.Math.toRadians(DEFAULT_CAMERA.heading),
        pitch: Cesium.Math.toRadians(DEFAULT_CAMERA.pitch),
        roll: Cesium.Math.toRadians(DEFAULT_CAMERA.roll)
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
    const cartesian = viewer.value.camera.pickEllipsoid(screenPosition, plot.value.globe.ellipsoid)
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

  /**
   * 飞行到默认中心点
   * 使用DEFAULT_CENTER配置
   */
  const flyToDefaultCenter = (options = {}) => {
    if (!camera.value) return

    const destination = Cesium.Cartesian3.fromDegrees(
      DEFAULT_CENTER.lng, 
      DEFAULT_CENTER.lat, 
      options.height || 10000
    )

    return camera.value.flyTo({
      destination,
      ...options
    })
  }

  /**
   * 获取默认配置
   */
  const getDefaultConfigs = () => {
    return {
      viewerOptions: DEFAULT_VIEWER_OPTIONS,
      camera: DEFAULT_CAMERA,
      center: DEFAULT_CENTER
    }
  }

  return {
    // 状态
    viewer,
    plot,
    camera,
    isInitialized,
    
    // 方法
    initScene,
    destroyScene,
    flyTo,
    flyToDefaultCenter,
    focusEntity,
    addEntity,
    removeEntity,
    clearEntities,
    pickPosition,
    takeScreenshot,
    getDefaultConfigs
  }
}
