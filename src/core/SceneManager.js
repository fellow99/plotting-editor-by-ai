/**
 * 场景管理器
 * 基于Cesium 1.132.0的场景管理核心逻辑
 * 使用新版API，不依赖ready和readyPromise，移除内置RequireJS
 */
import * as Cesium from 'cesium';
import { DEFAULT_VIEWER_OPTIONS } from '../constants/DEFAULT_VIEWER_OPTIONS.js';
import { DEFAULT_CAMERA } from '../constants/DEFAULT_CAMERA.js';

export class SceneManager {
  constructor() {
    this.viewer = null;
    this.scene = null;
    this.camera = null;
    this.eventHandlers = new Map();
    this.isInitialized = false;
  }

  /**
   * 初始化场景
   */
  async initialize(container, options = {}) {
    try {
      // 合并默认选项和用户选项
      const viewerOptions = {
        ...DEFAULT_VIEWER_OPTIONS,
        ...options
      };

      // 创建Cesium Viewer - 使用新版API，不依赖ready
      this.viewer = new Cesium.Viewer(container, viewerOptions);
      this.scene = this.viewer.scene;
      this.camera = this.viewer.camera;

      // 配置场景基础设置
      this.setupScene();

      // 设置默认相机位置
      this.setDefaultCameraView();

      // 设置事件监听
      this.setupEventHandlers();

      this.isInitialized = true;
      console.log('Cesium场景初始化完成');

      return this.viewer;

    } catch (error) {
      console.error('初始化Cesium场景失败:', error);
      throw error;
    }
  }

  /**
   * 配置场景基础设置
   */
  setupScene() {
    if (!this.scene) return;

    try {
      // 使用新版API配置场景
      // 基础渲染设置
      this.scene.globe.enableLighting = true;
      this.scene.globe.dynamicAtmosphereLighting = true;
      this.scene.globe.dynamicAtmosphereLightingFromSun = false;

      // 使用新版verticalExaggeration替代Globe.terrainExaggeration
      this.scene.verticalExaggeration = 1.0;

      // 大气效果设置
      this.scene.skyAtmosphere.show = true;
      this.scene.skyBox.show = true;
      this.scene.fog.enabled = true;

      // 阴影设置（默认关闭以提高性能）
      this.scene.shadowMap.enabled = false;

      // 相机控制器设置
      const controller = this.scene.screenSpaceCameraController;
      controller.enableCollisionDetection = true;
      controller.minimumZoomDistance = 1.0;
      controller.maximumZoomDistance = 40075017.0;

      // 帧率和性能设置
      this.scene.maximumRenderTimeChange = 0.0;

    } catch (error) {
      console.error('配置场景设置失败:', error);
    }
  }

  /**
   * 设置默认相机视角
   */
  setDefaultCameraView() {
    if (!this.camera) return;

    try {
      const { destination, orientation } = DEFAULT_CAMERA;
      
      this.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          destination.longitude,
          destination.latitude,
          destination.height
        ),
        orientation: {
          heading: Cesium.Math.toRadians(orientation.heading),
          pitch: Cesium.Math.toRadians(orientation.pitch),
          roll: Cesium.Math.toRadians(orientation.roll)
        }
      });

    } catch (error) {
      console.error('设置默认相机视角失败:', error);
    }
  }

  /**
   * 设置事件监听器
   */
  setupEventHandlers() {
    if (!this.viewer) return;

    try {
      // 鼠标点击事件
      this.eventHandlers.set('leftClick', this.viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(
        this.onLeftClick.bind(this),
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      ));

      // 鼠标移动事件
      this.eventHandlers.set('mouseMove', this.viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(
        this.onMouseMove.bind(this),
        Cesium.ScreenSpaceEventType.MOUSE_MOVE
      ));

      // 相机移动事件
      this.eventHandlers.set('cameraChanged', this.camera.changed.addEventListener(
        this.onCameraChanged.bind(this)
      ));

    } catch (error) {
      console.error('设置事件监听器失败:', error);
    }
  }

  /**
   * 鼠标左键点击事件处理
   */
  onLeftClick(event) {
    if (!this.viewer) return;

    try {
      // 获取点击位置的实体
      const pickedObject = this.viewer.scene.pick(event.position);
      
      if (Cesium.defined(pickedObject)) {
        const entity = pickedObject.id;
        if (entity) {
          this.emit('entityClicked', { entity, position: event.position });
        }
      } else {
        // 获取地理坐标
        const cartesian = this.viewer.camera.pickEllipsoid(event.position, this.viewer.scene.globe.ellipsoid);
        if (cartesian) {
          const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          const longitude = Cesium.Math.toDegrees(cartographic.longitude);
          const latitude = Cesium.Math.toDegrees(cartographic.latitude);
          const height = cartographic.height;

          this.emit('groundClicked', {
            position: event.position,
            cartesian,
            longitude,
            latitude,
            height
          });
        }
      }

    } catch (error) {
      console.error('处理鼠标点击事件失败:', error);
    }
  }

  /**
   * 鼠标移动事件处理
   */
  onMouseMove(event) {
    if (!this.viewer) return;

    try {
      // 获取鼠标位置的地理坐标
      const cartesian = this.viewer.camera.pickEllipsoid(event.endPosition, this.viewer.scene.globe.ellipsoid);
      if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude);
        const height = cartographic.height;

        this.emit('mouseMove', {
          position: event.endPosition,
          cartesian,
          longitude,
          latitude,
          height
        });
      }

    } catch (error) {
      // 鼠标移动事件失败不打印错误，避免控制台刷屏
    }
  }

  /**
   * 相机变化事件处理
   */
  onCameraChanged() {
    if (!this.camera) return;

    try {
      const position = this.camera.position;
      const cartographic = Cesium.Cartographic.fromCartesian(position);
      
      const cameraInfo = {
        longitude: Cesium.Math.toDegrees(cartographic.longitude),
        latitude: Cesium.Math.toDegrees(cartographic.latitude),
        height: cartographic.height,
        heading: Cesium.Math.toDegrees(this.camera.heading),
        pitch: Cesium.Math.toDegrees(this.camera.pitch),
        roll: Cesium.Math.toDegrees(this.camera.roll)
      };

      this.emit('cameraChanged', cameraInfo);

    } catch (error) {
      console.error('处理相机变化事件失败:', error);
    }
  }

  /**
   * 添加实体到场景
   */
  addEntity(entityOptions) {
    if (!this.viewer) return null;

    try {
      const entity = this.viewer.entities.add(entityOptions);
      this.emit('entityAdded', { entity });
      return entity;

    } catch (error) {
      console.error('添加实体失败:', error);
      throw error;
    }
  }

  /**
   * 从场景中移除实体
   */
  removeEntity(entity) {
    if (!this.viewer || !entity) return false;

    try {
      const result = this.viewer.entities.remove(entity);
      if (result) {
        this.emit('entityRemoved', { entity });
      }
      return result;

    } catch (error) {
      console.error('移除实体失败:', error);
      return false;
    }
  }

  /**
   * 清空所有实体
   */
  clearEntities() {
    if (!this.viewer) return;

    try {
      this.viewer.entities.removeAll();
      this.emit('entitiesCleared');

    } catch (error) {
      console.error('清空实体失败:', error);
    }
  }

  /**
   * 飞行到指定位置
   */
  flyTo(destination, options = {}) {
    if (!this.viewer || !destination) return Promise.resolve();

    try {
      return this.viewer.camera.flyTo({
        destination,
        orientation: options.orientation,
        duration: options.duration || 3.0,
        complete: options.complete,
        cancel: options.cancel,
        endTransform: options.endTransform,
        maximumHeight: options.maximumHeight,
        pitchAdjustHeight: options.pitchAdjustHeight,
        flyOverLongitude: options.flyOverLongitude,
        flyOverLongitudeWeight: options.flyOverLongitudeWeight,
        convert: options.convert !== false,
        easingFunction: options.easingFunction
      });

    } catch (error) {
      console.error('飞行到位置失败:', error);
      return Promise.reject(error);
    }
  }

  /**
   * 聚焦到实体
   */
  focusEntity(entity, options = {}) {
    if (!this.viewer || !entity) return Promise.resolve();

    try {
      return this.viewer.flyTo(entity, {
        duration: options.duration || 2.0,
        maximumHeight: options.maximumHeight,
        offset: options.offset
      });

    } catch (error) {
      console.error('聚焦实体失败:', error);
      return Promise.reject(error);
    }
  }

  /**
   * 事件发射器
   */
  emit(eventName, data) {
    // 简单的事件发射实现，可以后续扩展为更完整的EventEmitter
    if (this.onEvent) {
      this.onEvent(eventName, data);
    }
  }

  /**
   * 设置事件监听器
   */
  on(callback) {
    this.onEvent = callback;
  }

  /**
   * 销毁场景管理器
   */
  destroy() {
    try {
      // 清理事件监听器
      if (this.viewer && this.eventHandlers.size > 0) {
        this.eventHandlers.forEach((handler, key) => {
          if (typeof handler === 'function') {
            handler();
          }
        });
        this.eventHandlers.clear();
      }

      // 销毁Viewer
      if (this.viewer) {
        this.viewer.destroy();
        this.viewer = null;
      }

      // 清理引用
      this.scene = null;
      this.camera = null;
      this.isInitialized = false;
      this.onEvent = null;

      console.log('场景管理器已销毁');

    } catch (error) {
      console.error('销毁场景管理器失败:', error);
    }
  }
}
