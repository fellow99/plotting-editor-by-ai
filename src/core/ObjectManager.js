/**
 * 对象管理器
 * 基于Cesium的实体对象管理核心逻辑
 * 支持对象的增删改查、序列化导入导出等功能
 */
import * as Cesium from 'cesium';

export class ObjectManager {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.objects = new Map(); // 对象缓存 ID -> Entity
    this.objectMetadata = new Map(); // 对象元数据 ID -> metadata
    this.eventCallbacks = new Map(); // 事件回调
  }

  /**
   * 创建点标记
   */
  createPoint(position, options = {}) {
    try {
      const entityOptions = {
        position: this.convertPosition(position),
        point: {
          pixelSize: options.pixelSize || 10,
          heightReference: options.heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
          color: options.color || Cesium.Color.YELLOW,
          outlineColor: options.outlineColor || Cesium.Color.BLACK,
          outlineWidth: options.outlineWidth || 2,
          show: options.show !== false,
          distanceDisplayCondition: options.distanceDisplayCondition,
          scaleByDistance: options.scaleByDistance,
          translucencyByDistance: options.translucencyByDistance
        },
        name: options.name || 'Point',
        description: options.description || '',
        userData: options.userData || {}
      };

      return this.addEntity(entityOptions);

    } catch (error) {
      console.error('创建点标记失败:', error);
      throw error;
    }
  }

  /**
   * 创建线标记
   */
  createPolyline(positions, options = {}) {
    try {
      const entityOptions = {
        polyline: {
          positions: positions.map(pos => this.convertPosition(pos)),
          width: options.width || 2,
          clampToGround: options.clampToGround !== false,
          material: options.material || Cesium.Color.CYAN,
          show: options.show !== false,
          followSurface: options.followSurface !== false,
          granularity: options.granularity,
          shadows: options.shadows || Cesium.ShadowMode.DISABLED,
          distanceDisplayCondition: options.distanceDisplayCondition,
          classificationType: options.classificationType
        },
        name: options.name || 'Polyline',
        description: options.description || '',
        userData: options.userData || {}
      };

      return this.addEntity(entityOptions);

    } catch (error) {
      console.error('创建线标记失败:', error);
      throw error;
    }
  }

  /**
   * 创建面标记
   */
  createPolygon(positions, options = {}) {
    try {
      const entityOptions = {
        polygon: {
          hierarchy: positions.map(pos => this.convertPosition(pos)),
          material: options.material || Cesium.Color.BLUE.withAlpha(0.5),
          outline: options.outline !== false,
          outlineColor: options.outlineColor || Cesium.Color.BLUE,
          outlineWidth: options.outlineWidth || 1,
          height: options.height || 0,
          heightReference: options.heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
          extrudedHeight: options.extrudedHeight,
          extrudedHeightReference: options.extrudedHeightReference,
          show: options.show !== false,
          fill: options.fill !== false,
          shadows: options.shadows || Cesium.ShadowMode.DISABLED,
          distanceDisplayCondition: options.distanceDisplayCondition,
          classificationType: options.classificationType
        },
        name: options.name || 'Polygon',
        description: options.description || '',
        userData: options.userData || {}
      };

      return this.addEntity(entityOptions);

    } catch (error) {
      console.error('创建面标记失败:', error);
      throw error;
    }
  }

  /**
   * 创建圆形标记
   */
  createCircle(center, radius, options = {}) {
    try {
      const entityOptions = {
        position: this.convertPosition(center),
        ellipse: {
          semiMajorAxis: radius,
          semiMinorAxis: radius,
          material: options.material || Cesium.Color.GREEN.withAlpha(0.5),
          outline: options.outline !== false,
          outlineColor: options.outlineColor || Cesium.Color.GREEN,
          outlineWidth: options.outlineWidth || 1,
          height: options.height || 0,
          heightReference: options.heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
          extrudedHeight: options.extrudedHeight,
          extrudedHeightReference: options.extrudedHeightReference,
          show: options.show !== false,
          fill: options.fill !== false,
          shadows: options.shadows || Cesium.ShadowMode.DISABLED,
          distanceDisplayCondition: options.distanceDisplayCondition,
          classificationType: options.classificationType
        },
        name: options.name || 'Circle',
        description: options.description || '',
        userData: options.userData || {}
      };

      return this.addEntity(entityOptions);

    } catch (error) {
      console.error('创建圆形标记失败:', error);
      throw error;
    }
  }

  /**
   * 创建矩形标记
   */
  createRectangle(west, south, east, north, options = {}) {
    try {
      const entityOptions = {
        rectangle: {
          coordinates: Cesium.Rectangle.fromDegrees(west, south, east, north),
          material: options.material || Cesium.Color.RED.withAlpha(0.5),
          outline: options.outline !== false,
          outlineColor: options.outlineColor || Cesium.Color.RED,
          outlineWidth: options.outlineWidth || 1,
          height: options.height || 0,
          heightReference: options.heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
          extrudedHeight: options.extrudedHeight,
          extrudedHeightReference: options.extrudedHeightReference,
          show: options.show !== false,
          fill: options.fill !== false,
          shadows: options.shadows || Cesium.ShadowMode.DISABLED,
          distanceDisplayCondition: options.distanceDisplayCondition,
          classificationType: options.classificationType
        },
        name: options.name || 'Rectangle',
        description: options.description || '',
        userData: options.userData || {}
      };

      return this.addEntity(entityOptions);

    } catch (error) {
      console.error('创建矩形标记失败:', error);
      throw error;
    }
  }

  /**
   * 创建标签
   */
  createLabel(position, text, options = {}) {
    try {
      const entityOptions = {
        position: this.convertPosition(position),
        label: {
          text: text,
          font: options.font || '16pt sans-serif',
          style: options.style || Cesium.LabelStyle.FILL_AND_OUTLINE,
          fillColor: options.fillColor || Cesium.Color.WHITE,
          outlineColor: options.outlineColor || Cesium.Color.BLACK,
          outlineWidth: options.outlineWidth || 2,
          horizontalOrigin: options.horizontalOrigin || Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: options.verticalOrigin || Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: options.pixelOffset || new Cesium.Cartesian2(0, -40),
          heightReference: options.heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
          show: options.show !== false,
          scale: options.scale || 1.0,
          distanceDisplayCondition: options.distanceDisplayCondition,
          scaleByDistance: options.scaleByDistance,
          translucencyByDistance: options.translucencyByDistance
        },
        name: options.name || 'Label',
        description: options.description || '',
        userData: options.userData || {}
      };

      return this.addEntity(entityOptions);

    } catch (error) {
      console.error('创建标签失败:', error);
      throw error;
    }
  }

  /**
   * 创建GLTF模型
   */
  createModel(position, uri, options = {}) {
    try {
      const entityOptions = {
        position: this.convertPosition(position),
        model: {
          uri: uri,
          scale: options.scale || 1.0,
          minimumPixelSize: options.minimumPixelSize || 64,
          maximumScale: options.maximumScale || 200000,
          incrementallyLoadTextures: options.incrementallyLoadTextures !== false,
          runAnimations: options.runAnimations !== false,
          clampAnimations: options.clampAnimations !== false,
          shadows: options.shadows || Cesium.ShadowMode.ENABLED,
          heightReference: options.heightReference || Cesium.HeightReference.NONE,
          silhouetteColor: options.silhouetteColor,
          silhouetteSize: options.silhouetteSize || 0.0,
          color: options.color,
          colorBlendMode: options.colorBlendMode,
          colorBlendAmount: options.colorBlendAmount || 0.5,
          show: options.show !== false,
          distanceDisplayCondition: options.distanceDisplayCondition
        },
        orientation: options.orientation || Cesium.Transforms.headingPitchRollQuaternion(
          this.convertPosition(position),
          new Cesium.HeadingPitchRoll(0, 0, 0)
        ),
        name: options.name || 'Model',
        description: options.description || '',
        userData: options.userData || {}
      };

      return this.addEntity(entityOptions);

    } catch (error) {
      console.error('创建模型失败:', error);
      throw error;
    }
  }

  /**
   * 添加实体到场景
   */
  addEntity(entityOptions) {
    if (!this.sceneManager?.viewer) {
      throw new Error('场景管理器未初始化');
    }

    try {
      const entity = this.sceneManager.viewer.entities.add(entityOptions);
      
      // 缓存对象
      this.objects.set(entity.id, entity);
      
      // 存储元数据
      this.objectMetadata.set(entity.id, {
        createTime: Date.now(),
        type: this.getEntityType(entity),
        originalOptions: { ...entityOptions }
      });

      // 触发事件
      this.emit('entityAdded', { entity });

      return entity;

    } catch (error) {
      console.error('添加实体失败:', error);
      throw error;
    }
  }

  /**
   * 移除实体
   */
  removeEntity(entity) {
    if (!entity || !this.sceneManager?.viewer) return false;

    try {
      const result = this.sceneManager.viewer.entities.remove(entity);
      
      if (result) {
        // 清理缓存
        this.objects.delete(entity.id);
        this.objectMetadata.delete(entity.id);
        
        // 触发事件
        this.emit('entityRemoved', { entity });
      }

      return result;

    } catch (error) {
      console.error('移除实体失败:', error);
      return false;
    }
  }

  /**
   * 根据ID获取实体
   */
  getEntityById(id) {
    return this.objects.get(id) || null;
  }

  /**
   * 获取所有实体
   */
  getAllEntities() {
    return Array.from(this.objects.values());
  }

  /**
   * 获取未锁定的实体
   */
  getUnlockedEntities() {
    return this.getAllEntities().filter(entity => 
      entity.userData?.locked !== true
    );
  }

  /**
   * 清空所有实体
   */
  clearAll() {
    if (!this.sceneManager?.viewer) return;

    try {
      this.sceneManager.viewer.entities.removeAll();
      this.objects.clear();
      this.objectMetadata.clear();
      
      this.emit('entitiesCleared');

    } catch (error) {
      console.error('清空实体失败:', error);
    }
  }

  /**
   * 获取实体类型
   */
  getEntityType(entity) {
    if (!entity) return 'Unknown';
    
    if (entity.point) return 'Point';
    if (entity.polyline) return 'Polyline';
    if (entity.polygon) return 'Polygon';
    if (entity.ellipse) return 'Ellipse';
    if (entity.rectangle) return 'Rectangle';
    if (entity.label) return 'Label';
    if (entity.model) return 'Model';
    if (entity.billboard) return 'Billboard';
    if (entity.box) return 'Box';
    if (entity.cylinder) return 'Cylinder';
    if (entity.ellipsoid) return 'Ellipsoid';
    if (entity.wall) return 'Wall';
    if (entity.corridor) return 'Corridor';
    if (entity.plane) return 'Plane';
    if (entity.polylineVolume) return 'PolylineVolume';
    
    return 'Entity';
  }

  /**
   * 转换位置参数
   */
  convertPosition(position) {
    if (position instanceof Cesium.Cartesian3) {
      return position;
    }

    if (Array.isArray(position)) {
      if (position.length === 2) {
        return Cesium.Cartesian3.fromDegrees(position[0], position[1]);
      } else if (position.length === 3) {
        return Cesium.Cartesian3.fromDegrees(position[0], position[1], position[2]);
      }
    }

    if (typeof position === 'object' && position.longitude !== undefined && position.latitude !== undefined) {
      return Cesium.Cartesian3.fromDegrees(
        position.longitude,
        position.latitude,
        position.height || 0
      );
    }

    throw new Error('无效的位置参数格式');
  }

  /**
   * 导出场景数据
   */
  exportScene() {
    try {
      const sceneData = {
        version: '1.0',
        timestamp: Date.now(),
        entities: []
      };

      this.getAllEntities().forEach(entity => {
        const entityData = {
          id: entity.id,
          name: entity.name,
          description: entity.description,
          show: entity.show,
          userData: entity.userData,
          type: this.getEntityType(entity)
        };

        // 导出位置信息
        if (entity.position) {
          const cartographic = Cesium.Cartographic.fromCartesian(entity.position.getValue(Cesium.JulianDate.now()));
          entityData.position = {
            longitude: Cesium.Math.toDegrees(cartographic.longitude),
            latitude: Cesium.Math.toDegrees(cartographic.latitude),
            height: cartographic.height
          };
        }

        // 导出几何体属性
        if (entity.point) {
          entityData.point = this.serializeGraphics(entity.point);
        }
        if (entity.polyline) {
          entityData.polyline = this.serializeGraphics(entity.polyline);
        }
        if (entity.polygon) {
          entityData.polygon = this.serializeGraphics(entity.polygon);
        }
        // ... 其他几何体类型

        sceneData.entities.push(entityData);
      });

      return sceneData;

    } catch (error) {
      console.error('导出场景失败:', error);
      throw error;
    }
  }

  /**
   * 导入场景数据
   */
  importScene(sceneData) {
    try {
      if (!sceneData || !sceneData.entities) {
        throw new Error('无效的场景数据格式');
      }

      // 清空当前场景
      this.clearAll();

      // 导入实体
      sceneData.entities.forEach(entityData => {
        const entityOptions = {
          id: entityData.id,
          name: entityData.name,
          description: entityData.description,
          show: entityData.show,
          userData: entityData.userData
        };

        // 设置位置
        if (entityData.position) {
          entityOptions.position = Cesium.Cartesian3.fromDegrees(
            entityData.position.longitude,
            entityData.position.latitude,
            entityData.position.height || 0
          );
        }

        // 设置几何体
        if (entityData.point) {
          entityOptions.point = this.deserializeGraphics(entityData.point);
        }
        if (entityData.polyline) {
          entityOptions.polyline = this.deserializeGraphics(entityData.polyline);
        }
        if (entityData.polygon) {
          entityOptions.polygon = this.deserializeGraphics(entityData.polygon);
        }
        // ... 其他几何体类型

        this.addEntity(entityOptions);
      });

      this.emit('sceneImported', { sceneData });

    } catch (error) {
      console.error('导入场景失败:', error);
      throw error;
    }
  }

  /**
   * 序列化图形属性（简化版本）
   */
  serializeGraphics(graphics) {
    const result = {};
    
    // 这里应该实现完整的Cesium属性序列化
    // 目前只是一个简化版本
    Object.keys(graphics).forEach(key => {
      const value = graphics[key];
      if (value && typeof value.getValue === 'function') {
        result[key] = value.getValue(Cesium.JulianDate.now());
      } else {
        result[key] = value;
      }
    });

    return result;
  }

  /**
   * 反序列化图形属性（简化版本）
   */
  deserializeGraphics(data) {
    // 这里应该实现完整的Cesium属性反序列化
    // 目前只是一个简化版本
    return data;
  }

  /**
   * 事件发射器
   */
  emit(eventName, data) {
    const callbacks = this.eventCallbacks.get(eventName);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`事件回调执行失败 [${eventName}]:`, error);
        }
      });
    }
  }

  /**
   * 添加事件监听器
   */
  on(eventName, callback) {
    if (!this.eventCallbacks.has(eventName)) {
      this.eventCallbacks.set(eventName, new Set());
    }
    this.eventCallbacks.get(eventName).add(callback);
  }

  /**
   * 移除事件监听器
   */
  off(eventName, callback) {
    if (this.eventCallbacks.has(eventName)) {
      this.eventCallbacks.get(eventName).delete(callback);
    }
  }

  /**
   * 销毁对象管理器
   */
  destroy() {
    this.clearAll();
    this.eventCallbacks.clear();
    this.sceneManager = null;
  }
}
