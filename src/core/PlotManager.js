/**
 * 标绘管理器
 * 标绘数据结构采用GeoJSON标准，并在Feature和FeatureCollection对象上扩展userData字段用于存储编辑器专用附加信息。
 * 新增函数：
 * - clearPlot(): 清空标绘所有实体
 * - exportPlot(): 导出标绘数据为GeoJSON+userData结构
 * - loadPlot(json): 加载GeoJSON结构标绘数据并重建标绘
 */
import * as Cesium from 'cesium';

/**
 * 标绘管理器
 * 仅负责标绘数据管理与导入导出，不再直接管理地图实例
 * 地图对象创建与操作通过注入的 ObjectManager 实例完成
 */
export class PlotManager {
  constructor(objectManager) {
    this.objectManager = objectManager;
    this.eventHandlers = new Map();
    this.isInitialized = false;
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
   * 添加实体到标绘
   */
  /**
   * 通过 ObjectManager 创建地图实体
   */
  addEntity(entityOptions) {
    if (!this.objectManager) return null;

    try {
      const entity = this.objectManager.addEntity(entityOptions);
      this.emit('entityAdded', { entity });
      return entity;

    } catch (error) {
      console.error('添加实体失败:', error);
      throw error;
    }
  }

  /**
   * 从标绘中移除实体
   */
  /**
   * 通过 ObjectManager 移除地图实体
   */
  removeEntity(entity) {
    if (!this.objectManager || !entity) return false;

    try {
      const result = this.objectManager.removeEntity(entity);
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
  /**
   * 通过 ObjectManager 清空所有地图实体
   */
  clearEntities() {
    if (!this.objectManager) return;

    try {
      this.objectManager.clearAll();
      this.emit('entitiesCleared');

    } catch (error) {
      console.error('清空实体失败:', error);
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
   * 清空标绘所有实体
   * 用于标绘重置
   */
  /**
   * 清空标绘所有实体
   */
  clearPlot() {
    if (!this.objectManager) return;
    try {
      this.objectManager.clearAll();
      this.emit('entitiesCleared');
    } catch (error) {
      console.error('清空标绘失败:', error);
    }
  }

  /**
   * 导出标绘数据为GeoJSON+userData结构
   * @returns {Object} GeoJSON FeatureCollection
   */
  /**
   * 导出标绘数据为GeoJSON+userData结构
   * @returns {Object} GeoJSON FeatureCollection
   */
  exportPlot() {
    if (!this.objectManager) return null;
    try {
      // 通过 ObjectManager 获取所有实体
      const entities = this.objectManager.getAllEntities();
      // 构建GeoJSON FeatureCollection
      const geojson = {
        type: 'FeatureCollection',
        features: [],
        userData: {} // 可根据需求填充标绘级附加信息
      };
      entities.forEach(entity => {
        // 仅导出可见实体
        if (!entity.show) return;
        // 判断类型并转换为GeoJSON geometry
        let geometry = null;
        let coordinates = null;
        let type = null;
        // 点
        if (entity.position) {
          const cartesian = entity.position.getValue(Cesium.JulianDate.now());
          if (cartesian) {
            const carto = Cesium.Cartographic.fromCartesian(cartesian);
            coordinates = [
              Cesium.Math.toDegrees(carto.longitude),
              Cesium.Math.toDegrees(carto.latitude),
              carto.height
            ];
            geometry = {
              type: 'Point',
              coordinates: coordinates
            };
            type = 'Point';
          }
        }
        // 线
        else if (entity.polyline && entity.polyline.positions) {
          const positions = entity.polyline.positions.getValue(Cesium.JulianDate.now());
          if (positions && positions.length > 0) {
            coordinates = positions.map(pos => {
              const carto = Cesium.Cartographic.fromCartesian(pos);
              return [
                Cesium.Math.toDegrees(carto.longitude),
                Cesium.Math.toDegrees(carto.latitude),
                carto.height
              ];
            });
            geometry = {
              type: 'LineString',
              coordinates: coordinates
            };
            type = 'LineString';
          }
        }
        // 面
        else if (entity.polygon && entity.polygon.hierarchy) {
          const hierarchy = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now());
          if (hierarchy && hierarchy.positions && hierarchy.positions.length > 0) {
            coordinates = [hierarchy.positions.map(pos => {
              const carto = Cesium.Cartographic.fromCartesian(pos);
              return [
                Cesium.Math.toDegrees(carto.longitude),
                Cesium.Math.toDegrees(carto.latitude),
                carto.height
              ];
            })];
            geometry = {
              type: 'Polygon',
              coordinates: coordinates
            };
            type = 'Polygon';
          }
        }
        // 其他类型可扩展...

        if (!geometry) return;

        // 构建Feature
        const feature = {
          type: 'Feature',
          geometry,
          properties: {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            ...entity.properties // 兼容自定义属性
          },
          userData: entity.userData || {} // 编辑器专用附加信息
        };
        geojson.features.push(feature);
      });
      // 可扩展标绘级userData
      geojson.userData = {
        exportedAt: Date.now()
        // ...其他标绘附加信息
      };
      return geojson;
    } catch (error) {
      console.error('导出标绘失败:', error);
      return null;
    }
  }

  /**
   * 加载GeoJSON结构标绘数据并重建标绘
   * @param {Object} geojson - 标绘数据
   */
  /**
   * 加载GeoJSON结构标绘数据并重建标绘
   * @param {Object} geojson - 标绘数据
   */
  loadPlot(geojson) {
    if (!this.objectManager || !geojson || geojson.type !== 'FeatureCollection') return;
    try {
      // 清空现有实体
      this.objectManager.clearAll();
      // 遍历Feature重建实体
      geojson.features.forEach(feature => {
        let entityOptions = {
          id: feature.properties?.id,
          name: feature.properties?.name,
          description: feature.properties?.description,
          userData: feature.userData || {},
          properties: feature.properties || {}
        };
        // 点
        if (feature.geometry?.type === 'Point') {
          const coords = feature.geometry.coordinates;
          entityOptions.position = Cesium.Cartesian3.fromDegrees(coords[0], coords[1], coords[2] || 0);
          entityOptions.point = {
            pixelSize: 10,
            color: Cesium.Color.YELLOW,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2
          };
        }
        // 线
        else if (feature.geometry?.type === 'LineString') {
          const coords = feature.geometry.coordinates;
          entityOptions.polyline = {
            positions: coords.map(c => Cesium.Cartesian3.fromDegrees(c[0], c[1], c[2] || 0)),
            width: 2,
            material: Cesium.Color.CYAN
          };
        }
        // 面
        else if (feature.geometry?.type === 'Polygon') {
          const coords = feature.geometry.coordinates[0];
          entityOptions.polygon = {
            hierarchy: coords.map(c => Cesium.Cartesian3.fromDegrees(c[0], c[1], c[2] || 0)),
            material: Cesium.Color.BLUE.withAlpha(0.5),
            outline: true,
            outlineColor: Cesium.Color.BLUE,
            outlineWidth: 1
          };
        }
        // 其他类型可扩展...

        this.objectManager.addEntity(entityOptions);
      });
      // 可处理标绘级userData
      this.emit('sceneLoaded', { geojson });
    } catch (error) {
      console.error('加载标绘失败:', error);
    }
  }

  /**
   * 销毁标绘管理器
   */
  /**
   * 销毁标绘管理器
   */
  destroy() {
    try {
      this.eventHandlers.clear();
      this.objectManager = null;
      this.isInitialized = false;
      this.onEvent = null;
    } catch (error) {
      console.error('销毁标绘管理器失败:', error);
    }
  }
}
