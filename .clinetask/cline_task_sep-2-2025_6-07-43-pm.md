**User:**

<task>
PlotManager.js中，以下函数改名：
- clearScene(): clearPlot()
- exportScene(): exportPlot()
- loadScene(json): loadPlot()
</task>
<environment_details>
# VSCode Visible Files
src/core/PlotManager.js

# VSCode Open Tabs
src/core/PlotManager.js

# Current Time
2025/9/2 下午6:00:58 (Asia/Shanghai, UTC+8:00)

# Current Working Directory (d:/pci-workspace/3D/plotting-editor-by-ai) Files
.gitignore
CESIUM_CHANGELOG.md
index.html
LICENSE
package-lock.json
package.json
README.md
vite.config.js
public/
public/vfs.json
public/images/
public/images/screenshot01.png
public/vfs/
public/vfs/.all.json
public/vfs/.folder.json
public/vfs/location/
public/vfs/location/.folder.json
public/vfs/location/location.png
public/vfs/location/location.svg
public/vfs/location/location1.png
public/vfs/location/location1.svg
public/vfs/location/location2.png
public/vfs/location/location2.svg
public/vfs/location/location3.png
public/vfs/location/location3.svg
public/vfs/location/location4.png
public/vfs/location/location4.svg
public/vfs/location/location5.png
public/vfs/location/location5.svg
public/vfs/location/point.png
public/vfs/location/point.svg
script/
script/generate-vfs.js
script/package-lock.json
script/package.json
script/vfs-server.js
script/vfs-server.json
src/
src/App.vue
src/Editor.vue
src/main-func.js
src/main.js
src/style.scss
src/components/
src/components/cesium/
src/components/cesium/CesiumViewer.vue
src/components/dialog/
src/components/dialog/EditorConfigDialog.vue
src/components/editor/
src/components/editor/EditorFooter.vue
src/components/editor/FeatureBrowser.vue
src/components/editor/Inspector.vue
src/components/editor/PropertyPanel.vue
src/components/editor/ResourcePanel.vue
src/components/editor/Toolbar.vue
src/components/editor/VfsFileBrowser.vue
src/components/property/
src/components/property/BasePropertyPane.vue
src/components/property/PlotPropertyPane.vue
src/composables/
src/composables/useAssets.js
src/composables/useEditorConfig.js
src/composables/useObjectSelection.js
src/composables/useViewer.js
src/constants/
src/constants/DEFAULT_CAMERA.js
src/constants/DEFAULT_CENTER.js
src/constants/DEFAULT_VIEWER_OPTIONS.js
src/core/
src/core/ObjectManager.js
src/core/PlotManager.js
src/services/
src/services/static-drive-api.js
src/services/vfs-server-api.js
src/services/vfs-service.js
src/utils/
src/utils/fileUtils.js
src/utils/geometryUtils.js
src/utils/mathUtils.js

# Git Remote URLs
origin: https://github.com/fellow99/plotting-editor-by-ai.git

# Latest Git Commit Hash
4d4eec122faa63e9eaed929bb3f6935e54ef02b8

# Context Window Usage
0 / 128K tokens used (0%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
根据用户需求，需要将src/core/PlotManager.js中的三个函数重命名：
- clearScene() → clearPlot()
- exportScene() → exportPlot()
- loadScene(json) → loadPlot(json)

需要精确查找函数定义和所有引用，并进行统一修改。由于只指定了函数名，没有指定是否有其他地方引用这些函数，建议先在PlotManager.js文件内做重命名，后续如有报错再处理其他引用。

下一步：使用replace_in_file工具，分别将函数定义和内部调用处的名称进行替换。
</thinking>

<replace_in_file>
<path>src/core/PlotManager.js</path>
<diff>
------- SEARCH
function clearScene() {
=======
/**


[Response interrupted by a tool use result. Only one tool may be used at a time and should be placed at the end of the message.]

---

**User:**

[replace_in_file for 'src/core/PlotManager.js'] Result:
The tool execution failed with the following error:
<error>
The SEARCH block:
function clearScene() {
...does not match anything in the file.

This is likely because the SEARCH block content doesn't match exactly with what's in the file, or if you used multiple SEARCH/REPLACE blocks they may not have been in the order they appear in the file. (Please also ensure that when using the replace_in_file tool, Do NOT add extra characters to the markers (e.g., ------- SEARCH> is INVALID). Do NOT forget to use the closing +++++++ REPLACE marker. Do NOT modify the marker format in any way. Malformed XML will cause complete tool failure and break the entire editing process.)

The file was reverted to its original state:

<file_content path="src/core/PlotManager.js">
/**
 * 场景管理器
 * 基于Cesium 1.132.0的场景管理核心逻辑
 * 使用新版API，不依赖ready和readyPromise，移除内置RequireJS
 * 
 * 标绘数据结构采用GeoJSON标准，并在Feature和FeatureCollection对象上扩展userData字段用于存储编辑器专用附加信息。
 * 新增函数：
 * - clearScene(): 清空场景所有实体
 * - exportScene(): 导出场景数据为GeoJSON+userData结构
 * - loadScene(json): 加载GeoJSON结构场景数据并重建场景
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
   * 清空场景所有实体
   * 用于场景重置
   */
  clearScene() {
    if (!this.viewer) return;
    try {
      this.viewer.entities.removeAll();
      this.emit('entitiesCleared');
    } catch (error) {
      console.error('清空场景失败:', error);
    }
  }

  /**
   * 导出场景数据为GeoJSON+userData结构
   * @returns {Object} GeoJSON FeatureCollection
   */
  exportScene() {
    if (!this.viewer) return null;
    try {
      // 构建GeoJSON FeatureCollection
      const geojson = {
        type: 'FeatureCollection',
        features: [],
        userData: {} // 可根据需求填充场景级附加信息
      };
      this.viewer.entities.values.forEach(entity => {
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
      // 可扩展场景级userData
      geojson.userData = {
        exportedAt: Date.now()
        // ...其他场景附加信息
      };
      return geojson;
    } catch (error) {
      console.error('导出场景失败:', error);
      return null;
    }
  }

  /**
   * 加载GeoJSON结构场景数据并重建场景
   * @param {Object} geojson - 标绘数据
   */
  loadScene(geojson) {
    if (!this.viewer || !geojson || geojson.type !== 'FeatureCollection') return;
    try {
      // 清空现有实体
      this.viewer.entities.removeAll();
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

        this.viewer.entities.add(entityOptions);
      });
      // 可处理场景级userData
      this.emit('sceneLoaded', { geojson });
    } catch (error) {
      console.error('加载场景失败:', error);
    }
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

    } catch (error) {
      console.error('销毁场景管理器失败:', error);
    }
  }
}

</file_content>

Now that you have the latest state of the file, try the operation again with fewer, more precise SEARCH blocks. For large files especially, it may be prudent to try to limit yourself to <5 SEARCH/REPLACE blocks at a time, then wait for the user to respond with the result of the operation before following up with another replace_in_file call to make additional edits.
(If you run into this error 3 times in a row, you may use the write_to_file tool as a fallback.)
</error>
<environment_details>
# VSCode Visible Files
src/core/PlotManager.js

# VSCode Open Tabs
src/core/PlotManager.js

# Current Time
2025/9/2 下午6:01:07 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
0 / 111.452K tokens used (0%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
已获得src/core/PlotManager.js的完整内容。目标是将类SceneManager中的三个方法重命名：
- clearScene() → clearPlot()
- exportScene() → exportPlot()
- loadScene(geojson) → loadPlot(geojson)

需要精确匹配函数定义部分，并修改注释中的函数名。由于函数体较长，建议每次只替换一个函数，确保SEARCH块与文件内容完全一致。

第一步：仅替换clearScene相关内容，包括注释和方法名。
</thinking>

<replace_in_file>
<path>src/core/PlotManager.js</path>
<diff>
------- SEARCH
 * - clearScene(): 清空场景所有实体
=======
 * - clearPlot(): 清空场景所有实体
+++++++ REPLACE

------- SEARCH
  /**
   * 清空场景所有实体
   * 用于场景重置
   */
  clearScene() {
    if (!this.viewer) return;
    try {
      this.viewer.entities.removeAll();
      this.emit('entitiesCleared');
    } catch (error) {
      console.error('清空场景失败:', error);
    }
  }
=======
  /**
   * 清空场景所有实体
   * 用于场景重置
   */
  clearPlot() {
    if (!this.viewer) return;
    try {
      this.viewer.entities.removeAll();
      this.emit('entitiesCleared');
    } catch (error) {
      console.error('清空场景失败:', error);
    }
  }
+++++++ REPLACE
</diff>
</replace_in_file>

---

**User:**

[replace_in_file for 'src/core/PlotManager.js'] Result:
The content was successfully saved to src/core/PlotManager.js.

Here is the full, updated content of the file that was saved:

<final_file_content path="src/core/PlotManager.js">
/**
 * 场景管理器
 * 基于Cesium 1.132.0的场景管理核心逻辑
 * 使用新版API，不依赖ready和readyPromise，移除内置RequireJS
 * 
 * 标绘数据结构采用GeoJSON标准，并在Feature和FeatureCollection对象上扩展userData字段用于存储编辑器专用附加信息。
 * 新增函数：
 * - clearPlot(): 清空场景所有实体
 * - exportScene(): 导出场景数据为GeoJSON+userData结构
 * - loadScene(json): 加载GeoJSON结构场景数据并重建场景
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
   * 清空场景所有实体
   * 用于场景重置
   */
  clearPlot() {
    if (!this.viewer) return;
    try {
      this.viewer.entities.removeAll();
      this.emit('entitiesCleared');
    } catch (error) {
      console.error('清空场景失败:', error);
    }
  }

  /**
   * 导出场景数据为GeoJSON+userData结构
   * @returns {Object} GeoJSON FeatureCollection
   */
  exportScene() {
    if (!this.viewer) return null;
    try {
      // 构建GeoJSON FeatureCollection
      const geojson = {
        type: 'FeatureCollection',
        features: [],
        userData: {} // 可根据需求填充场景级附加信息
      };
      this.viewer.entities.values.forEach(entity => {
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
      // 可扩展场景级userData
      geojson.userData = {
        exportedAt: Date.now()
        // ...其他场景附加信息
      };
      return geojson;
    } catch (error) {
      console.error('导出场景失败:', error);
      return null;
    }
  }

  /**
   * 加载GeoJSON结构场景数据并重建场景
   * @param {Object} geojson - 标绘数据
   */
  loadScene(geojson) {
    if (!this.viewer || !geojson || geojson.type !== 'FeatureCollection') return;
    try {
      // 清空现有实体
      this.viewer.entities.removeAll();
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

        this.viewer.entities.add(entityOptions);
      });
      // 可处理场景级userData
      this.emit('sceneLoaded', { geojson });
    } catch (error) {
      console.error('加载场景失败:', error);
    }
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

    } catch (error) {
      console.error('销毁场景管理器失败:', error);
    }
  }
}

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.


<environment_details>
# VSCode Visible Files
src/core/PlotManager.js

# VSCode Open Tabs
src/core/PlotManager.js

# Current Time
2025/9/2 下午6:01:36 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
17,187 / 111.452K tokens used (15%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
clearPlot已完成。下一步需要将exportScene重命名为exportPlot，并同步修改顶部注释。由于函数体较长，建议仅替换相关注释和方法定义部分，确保SEARCH块与文件内容完全一致。

准备替换：
- 注释中的“exportScene()”→“exportPlot()”
- 方法定义“exportScene()”→“exportPlot()”
</thinking>

<replace_in_file>
<path>src/core/PlotManager.js</path>
<diff>
------- SEARCH
 * - exportScene(): 导出场景数据为GeoJSON+userData结构
=======
 * - exportPlot(): 导出场景数据为GeoJSON+userData结构
+++++++ REPLACE

------- SEARCH
  /**
   * 导出场景数据为GeoJSON+userData结构
   * @returns {Object} GeoJSON FeatureCollection
   */
  exportScene() {
    if (!this.viewer) return null;
    try {
      // 构建GeoJSON FeatureCollection
      const geojson = {
        type: 'FeatureCollection',
        features: [],
        userData: {} // 可根据需求填充场景级附加信息
      };
      this.viewer.entities.values.forEach(entity => {
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
      // 可扩展场景级userData
      geojson.userData = {
        exportedAt: Date.now()
        // ...其他场景附加信息
      };
      return geojson;
    } catch (error) {
      console.error('导出场景失败:', error);
      return null;
    }
  }
=======
  /**
   * 导出场景数据为GeoJSON+userData结构
   * @returns {Object} GeoJSON FeatureCollection
   */
  exportPlot() {
    if (!this.viewer) return null;
    try {
      // 构建GeoJSON FeatureCollection
      const geojson = {
        type: 'FeatureCollection',
        features: [],
        userData: {} // 可根据需求填充场景级附加信息
      };
      this.viewer.entities.values.forEach(entity => {
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
      // 可扩展场景级userData
      geojson.userData = {
        exportedAt: Date.now()
        // ...其他场景附加信息
      };
      return geojson;
    } catch (error) {
      console.error('导出场景失败:', error);
      return null;
    }
  }
+++++++ REPLACE
</diff>
</replace_in_file>

---

**User:**

[replace_in_file for 'src/core/PlotManager.js'] Result:
The content was successfully saved to src/core/PlotManager.js.

Here is the full, updated content of the file that was saved:

<final_file_content path="src/core/PlotManager.js">
/**
 * 场景管理器
 * 基于Cesium 1.132.0的场景管理核心逻辑
 * 使用新版API，不依赖ready和readyPromise，移除内置RequireJS
 * 
 * 标绘数据结构采用GeoJSON标准，并在Feature和FeatureCollection对象上扩展userData字段用于存储编辑器专用附加信息。
 * 新增函数：
 * - clearPlot(): 清空场景所有实体
 * - exportPlot(): 导出场景数据为GeoJSON+userData结构
 * - loadScene(json): 加载GeoJSON结构场景数据并重建场景
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
   * 清空场景所有实体
   * 用于场景重置
   */
  clearPlot() {
    if (!this.viewer) return;
    try {
      this.viewer.entities.removeAll();
      this.emit('entitiesCleared');
    } catch (error) {
      console.error('清空场景失败:', error);
    }
  }

  /**
   * 导出场景数据为GeoJSON+userData结构
   * @returns {Object} GeoJSON FeatureCollection
   */
  exportPlot() {
    if (!this.viewer) return null;
    try {
      // 构建GeoJSON FeatureCollection
      const geojson = {
        type: 'FeatureCollection',
        features: [],
        userData: {} // 可根据需求填充场景级附加信息
      };
      this.viewer.entities.values.forEach(entity => {
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
      // 可扩展场景级userData
      geojson.userData = {
        exportedAt: Date.now()
        // ...其他场景附加信息
      };
      return geojson;
    } catch (error) {
      console.error('导出场景失败:', error);
      return null;
    }
  }

  /**
   * 加载GeoJSON结构场景数据并重建场景
   * @param {Object} geojson - 标绘数据
   */
  loadScene(geojson) {
    if (!this.viewer || !geojson || geojson.type !== 'FeatureCollection') return;
    try {
      // 清空现有实体
      this.viewer.entities.removeAll();
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

        this.viewer.entities.add(entityOptions);
      });
      // 可处理场景级userData
      this.emit('sceneLoaded', { geojson });
    } catch (error) {
      console.error('加载场景失败:', error);
    }
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

    } catch (error) {
      console.error('销毁场景管理器失败:', error);
    }
  }
}

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.


<environment_details>
# VSCode Visible Files
src/core/PlotManager.js

# VSCode Open Tabs
src/core/PlotManager.js

# Current Time
2025/9/2 下午6:02:56 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
22,822 / 111.452K tokens used (20%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
exportPlot已完成。最后需要将loadScene重命名为loadPlot，并同步修改顶部注释。只替换相关注释和方法定义部分，确保SEARCH块与文件内容完全一致。

准备替换：
- 注释中的“loadScene(json)”→“loadPlot(json)”
- 方法定义“loadScene(geojson)”→“loadPlot(geojson)”
</thinking>

<replace_in_file>
<path>src/core/PlotManager.js</path>
<diff>
------- SEARCH
 * - loadScene(json): 加载GeoJSON结构场景数据并重建场景
=======
 * - loadPlot(json): 加载GeoJSON结构场景数据并重建场景
+++++++ REPLACE

------- SEARCH
  /**
   * 加载GeoJSON结构场景数据并重建场景
   * @param {Object} geojson - 标绘数据
   */
  loadScene(geojson) {
    if (!this.viewer || !geojson || geojson.type !== 'FeatureCollection') return;
    try {
      // 清空现有实体
      this.viewer.entities.removeAll();
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

        this.viewer.entities.add(entityOptions);
      });
      // 可处理场景级userData
      this.emit('sceneLoaded', { geojson });
    } catch (error) {
      console.error('加载场景失败:', error);
    }
  }
=======
  /**
   * 加载GeoJSON结构场景数据并重建场景
   * @param {Object} geojson - 标绘数据
   */
  loadPlot(geojson) {
    if (!this.viewer || !geojson || geojson.type !== 'FeatureCollection') return;
    try {
      // 清空现有实体
      this.viewer.entities.removeAll();
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

        this.viewer.entities.add(entityOptions);
      });
      // 可处理场景级userData
      this.emit('sceneLoaded', { geojson });
    } catch (error) {
      console.error('加载场景失败:', error);
    }
  }
+++++++ REPLACE
</diff>
</replace_in_file>

---

**User:**

[replace_in_file for 'src/core/PlotManager.js'] Result:
The content was successfully saved to src/core/PlotManager.js.

Here is the full, updated content of the file that was saved:

<final_file_content path="src/core/PlotManager.js">
/**
 * 场景管理器
 * 基于Cesium 1.132.0的场景管理核心逻辑
 * 使用新版API，不依赖ready和readyPromise，移除内置RequireJS
 * 
 * 标绘数据结构采用GeoJSON标准，并在Feature和FeatureCollection对象上扩展userData字段用于存储编辑器专用附加信息。
 * 新增函数：
 * - clearPlot(): 清空场景所有实体
 * - exportPlot(): 导出场景数据为GeoJSON+userData结构
 * - loadPlot(json): 加载GeoJSON结构场景数据并重建场景
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
   * 清空场景所有实体
   * 用于场景重置
   */
  clearPlot() {
    if (!this.viewer) return;
    try {
      this.viewer.entities.removeAll();
      this.emit('entitiesCleared');
    } catch (error) {
      console.error('清空场景失败:', error);
    }
  }

  /**
   * 导出场景数据为GeoJSON+userData结构
   * @returns {Object} GeoJSON FeatureCollection
   */
  exportPlot() {
    if (!this.viewer) return null;
    try {
      // 构建GeoJSON FeatureCollection
      const geojson = {
        type: 'FeatureCollection',
        features: [],
        userData: {} // 可根据需求填充场景级附加信息
      };
      this.viewer.entities.values.forEach(entity => {
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
      // 可扩展场景级userData
      geojson.userData = {
        exportedAt: Date.now()
        // ...其他场景附加信息
      };
      return geojson;
    } catch (error) {
      console.error('导出场景失败:', error);
      return null;
    }
  }

  /**
   * 加载GeoJSON结构场景数据并重建场景
   * @param {Object} geojson - 标绘数据
   */
  loadPlot(geojson) {
    if (!this.viewer || !geojson || geojson.type !== 'FeatureCollection') return;
    try {
      // 清空现有实体
      this.viewer.entities.removeAll();
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

        this.viewer.entities.add(entityOptions);
      });
      // 可处理场景级userData
      this.emit('sceneLoaded', { geojson });
    } catch (error) {
      console.error('加载场景失败:', error);
    }
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

    } catch (error) {
      console.error('销毁场景管理器失败:', error);
    }
  }
}

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.


<environment_details>
# VSCode Visible Files
src/core/PlotManager.js

# VSCode Open Tabs
src/core/PlotManager.js

# Current Time
2025/9/2 下午6:03:49 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
27,849 / 111.452K tokens used (25%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

已完成对src/core/PlotManager.js中三个函数的重命名：
- clearScene → clearPlot
- exportScene → exportPlot
- loadScene → loadPlot

注释与方法定义均已同步修改，符合代码规范要求。  
如需同步修改其他文件中的调用引用，请告知具体文件或范围。

---

**User:**

[ERROR] You did not use a tool in your previous response! Please retry with a tool use.

# Reminder: Instructions for Tool Use

Tool uses are formatted using XML-style tags. The tool name is enclosed in opening and closing tags, and each parameter is similarly enclosed within its own set of tags. Here's the structure:

<tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
...
</tool_name>

For example:

<attempt_completion>
<result>
I have completed the task...
</result>
</attempt_completion>

Always adhere to this format for all tool uses to ensure proper parsing and execution.

# Next Steps

If you have completed the user's task, use the attempt_completion tool. 
If you require additional information from the user, use the ask_followup_question tool. 
Otherwise, if you have not completed the task and do not need additional information, then proceed with the next step of the task. 
(This is an automated message, so do not respond to it conversationally.)
<environment_details>
# VSCode Visible Files
src/core/PlotManager.js

# VSCode Open Tabs
src/core/PlotManager.js

# Current Time
2025/9/2 下午6:03:56 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
31,801 / 111.452K tokens used (29%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<attempt_completion>
<result>
已完成对src/core/PlotManager.js文件中三个函数的重命名，具体如下：
- clearScene() 已改为 clearPlot()
- exportScene() 已改为 exportPlot()
- loadScene(json) 已改为 loadPlot(json)

所有相关注释和方法定义已同步修改，符合项目代码规范要求。
</result>
</attempt_completion>

---

**User:**

[attempt_completion] Result:
The user has provided feedback on the results. Consider their input to continue the task, and then attempt completion again.
<feedback>
Toolbar.vue中，实现导入、导出功能
</feedback>
<environment_details>
# VSCode Visible Files
src/components/editor/Toolbar.vue

# VSCode Open Tabs
src/core/PlotManager.js
src/components/editor/Toolbar.vue

# Current Time
2025/9/2 下午6:05:29 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
32,184 / 111.452K tokens used (29%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
用户要求在src/components/editor/Toolbar.vue中实现“导入”和“导出”功能。结合PlotManager.js的最新API，需调用clearPlot、exportPlot、loadPlot。需先读取Toolbar.vue内容，分析现有结构，确定如何集成这两个功能（如按钮、事件、方法等），并保证代码规范。
</thinking>

<read_file>
<path>src/components/editor/Toolbar.vue</path>
</read_file>

---

**User:**

[read_file for 'src/components/editor/Toolbar.vue'] Result:
<!--
  工具栏组件
  地图标绘编辑器顶部工具栏，分组为“文件”“编辑”“对象变换”“视图”“配置”，所有功能按钮均为预留
-->

<script setup>
import { ref } from 'vue'
import EditorConfigDialog from '../dialog/EditorConfigDialog.vue'

/**
 * 编辑器配置对话框显示状态
 * @type {import('vue').Ref<boolean>}
 */
const showEditorConfig = ref(false)

/**
 * 当前对象变换模式
 * @type {import('vue').Ref<string>}
 */
const transformMode = ref('translate')

/**
 * 是否有选中对象（预留）
 * @type {import('vue').Ref<boolean>}
 */
const hasSelection = ref(false)

/**
 * 是否可撤销（预留）
 * @type {import('vue').Ref<boolean>}
 */
const canUndo = ref(false)

/**
 * 是否可重做（预留）
 * @type {import('vue').Ref<boolean>}
 */
const canRedo = ref(false)

/**
 * 新建项目（预留功能）
 */
function newProject() {
  // TODO: 实现新建项目
}

/**
 * 暂存项目到本地（预留功能）
 */
function saveLocal() {
  // TODO: 实现暂存到本地
}

/**
 * 保存项目（预留功能）
 */
function saveProject() {
  // TODO: 实现保存项目
}

/**
 * 加载项目（预留功能）
 */
function loadProject() {
  // TODO: 实现加载项目
}

/**
 * 导出项目（预留功能）
 */
function exportProject() {
  // TODO: 实现导出项目
}

/**
 * 导入项目（预留功能）
 */
function importProject() {
  // TODO: 实现导入项目
}

/**
 * 撤销操作（预留功能）
 */
function undo() {
  // TODO: 实现撤销
}

/**
 * 重做操作（预留功能）
 */
function redo() {
  // TODO: 实现重做
}

/**
 * 复制选中对象（预留功能）
 */
function duplicateSelected() {
  // TODO: 实现复制
}

/**
 * 删除选中对象（预留功能）
 */
function deleteSelected() {
  // TODO: 实现删除
}

/**
 * 设置对象变换模式（预留功能）
 * @param {string} mode
 */
function setTransformMode(mode) {
  transformMode.value = mode
}

/**
 * 聚焦到选中对象（预留功能）
 */
function focusSelected() {
  // TODO: 实现聚焦
}

/**
 * 重置相机（预留功能）
 */
function resetCamera() {
  // TODO: 实现重置相机
}

/**
 * 打开编辑器配置（预留功能）
 */
function openEditorConfig() {
  showEditorConfig.value = true
}
</script>

<template>
  <div class="ribbon-toolbar dark">
    <div class="ribbon-content">
      <!-- 文件分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">文件</div>
        <div class="ribbon-group-buttons">
          <button class="ribbon-btn" @click="newProject" title="新建项目">
            <span class="icon">📄</span>
            <div>新建</div>
          </button>
          <button class="ribbon-btn" @click="saveLocal" title="暂存到本地">
            <span class="icon">🗄️</span>
            <div>暂存</div>
          </button>
          <button class="ribbon-btn" @click="saveProject" title="保存项目">
            <span class="icon">💾</span>
            <div>保存</div>
          </button>
          <button class="ribbon-btn" @click="loadProject" title="加载项目">
            <span class="icon">📂</span>
            <div>加载</div>
          </button>
          <button class="ribbon-btn" @click="exportProject" title="导出项目">
            <span class="icon">📤</span>
            <div>导出</div>
          </button>
          <button class="ribbon-btn" @click="importProject" title="导入项目">
            <span class="icon">📥</span>
            <div>导入</div>
          </button>
        </div>
      </div>
      <!-- 编辑分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">编辑</div>
        <div class="ribbon-group-buttons">
          <button class="ribbon-btn" @click="undo" :disabled="!canUndo" title="撤销 (Ctrl+Z)">
            <span class="icon">↶</span>
            <div>撤销</div>
          </button>
          <button class="ribbon-btn" @click="redo" :disabled="!canRedo" title="重做 (Ctrl+Y)">
            <span class="icon">↷</span>
            <div>重做</div>
          </button>
          <button class="ribbon-btn" @click="duplicateSelected" :disabled="!hasSelection" title="复制 (Ctrl+D)">
            <span class="icon">📋</span>
            <div>复制</div>
          </button>
          <button class="ribbon-btn danger" @click="deleteSelected" :disabled="!hasSelection" title="删除 (Delete)">
            <span class="icon">🗑️</span>
            <div>删除</div>
          </button>
        </div>
      </div>
      <!-- 对象变换分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">对象变换</div>
        <div class="ribbon-group-buttons">
          <button
            class="ribbon-btn"
            :class="{ active: transformMode === 'translate' }"
            @click="setTransformMode('translate')"
            :disabled="!hasSelection"
            title="移动工具 (G)"
          >
            <span class="icon">↔️</span>
            <div>移动</div>
          </button>
          <button
            class="ribbon-btn"
            :class="{ active: transformMode === 'rotate' }"
            @click="setTransformMode('rotate')"
            :disabled="!hasSelection"
            title="旋转工具 (R)"
          >
            <span class="icon">🔄</span>
            <div>旋转</div>
          </button>
          <button
            class="ribbon-btn"
            :class="{ active: transformMode === 'scale' }"
            @click="setTransformMode('scale')"
            :disabled="!hasSelection"
            title="缩放工具 (S)"
          >
            <span class="icon">📏</span>
            <div>缩放</div>
          </button>
        </div>
      </div>
      <!-- 视图分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">视图</div>
        <div class="ribbon-group-buttons">
          <button
            class="ribbon-btn"
            @click="focusSelected"
            :disabled="!hasSelection"
            title="聚焦到选中对象 (F)"
          >
            <span class="icon">🎯</span>
            <div>聚焦</div>
          </button>
          <button
            class="ribbon-btn"
            @click="resetCamera"
            title="重置相机"
          >
            <span class="icon">📷</span>
            <div>重置相机</div>
          </button>
        </div>
      </div>
      <!-- 配置分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">配置</div>
        <div class="ribbon-group-buttons">
          <button class="ribbon-btn" @click="openEditorConfig" title="编辑器配置">
            <span class="icon">⚙️</span>
            <div>编辑器</div>
          </button>
        </div>
      </div>
    </div>
<!-- 编辑器配置对话框 -->
<EditorConfigDialog v-model="showEditorConfig" />
  </div>
</template>

<style lang="scss" scoped>
.ribbon-toolbar.dark {
  background: #23272e;
  color: #f3f3f3;
  border-bottom: 1.5px solid #2d323a;
  padding: 0 12px;
  box-shadow: 0 2px 8px #0006;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.ribbon-content {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: flex-end;
  padding: 4px;
  width: 100%;
  flex-wrap: wrap;
}

.ribbon-group {
  background: #282c34;
  border-radius: 8px 8px 0 0;
  border: 1.5px solid #353a42;
  box-shadow: 0 2px 8px #0003;
  padding: 4px;
  margin-right: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 120px;
  height: 80px;
  position: relative;
  box-sizing: border-box;
}

.ribbon-group-title {
  font-size: 13px;
  font-weight: bold;
  color: #7ecfff;
  margin-bottom: 4px;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px #0008;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

.ribbon-group-buttons {
  display: flex;
  flex-direction: row;
  gap: 4px;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-start;
}

.ribbon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px 7px;
  background: #23272e;
  border: 1px solid #353a42;
  border-radius: 5px;
  color: #f3f3f3;
  font-size: 11px;
  cursor: pointer;
  margin-bottom: 6px;
  min-width: 48px;
  transition: background 0.2s, border 0.2s, color 0.2s;
}

.ribbon-btn:hover:not(:disabled) {
  background: #2d323a;
  border-color: #7ecfff;
  color: #fff;
}

.ribbon-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ribbon-btn.active {
  background: #007acc;
  border-color: #0088dd;
  color: #fff;
}

.ribbon-btn.danger {
  background: #d73a49;
  border-color: #e85662;
  color: #fff;
}

.ribbon-btn.danger:hover:not(:disabled) {
  background: #e85662;
}

.icon {
  font-size: 18px;
  line-height: 1;
}

@media (max-width: 900px) {
  .ribbon-content {
    flex-wrap: wrap;
    gap: 12px;
  }
  .ribbon-group {
    min-width: 90px;
    padding: 8px 8px 10px 8px;
  }
  .ribbon-group-title {
    font-size: 12px;
    margin-bottom: 6px;
  }
  .ribbon-btn {
    min-width: 40px;
    font-size: 10px;
    padding: 5px 6px;
  }
  .icon {
    font-size: 15px;
  }
}
</style>

<environment_details>
# VSCode Visible Files
src/components/editor/Toolbar.vue

# VSCode Open Tabs
src/core/PlotManager.js
src/components/editor/Toolbar.vue

# Current Time
2025/9/2 下午6:05:35 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
32,381 / 111.452K tokens used (29%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
Toolbar.vue已预留导入/导出相关方法（importProject、exportProject），但未实现具体逻辑。需实现：
- exportProject：调用SceneManager实例的exportPlot方法，导出GeoJSON并触发下载。
- importProject：读取本地文件，解析GeoJSON并调用SceneManager的loadPlot方法。

需假定SceneManager实例可通过props或inject获得，或需补充获取方式。实现时需添加文件选择、下载等逻辑，并补充必要注释，符合Vue和项目规范。
</thinking>

<replace_in_file>
<path>src/components/editor/Toolbar.vue</path>
<diff>
------- SEARCH
/**
 * 导出项目（预留功能）
 */
function exportProject() {
  // TODO: 实现导出项目
}
=======
/**
 * 导出项目
 * 调用SceneManager.exportPlot并下载GeoJSON文件
 */
function exportProject() {
  // 假定sceneManager为shallowRef实例，可根据实际获取方式调整
  const geojson = sceneManager.value?.exportPlot?.()
  if (!geojson) return
  const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'plot-export.json'
  a.click()
  URL.revokeObjectURL(url)
}
+++++++ REPLACE

------- SEARCH
/**
 * 导入项目（预留功能）
 */
function importProject() {
  // TODO: 实现导入项目
}
=======
/**
 * 导入项目
 * 选择本地GeoJSON文件并调用SceneManager.loadPlot加载
 */
function importProject() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json,application/json'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const geojson = JSON.parse(evt.target.result)
        sceneManager.value?.loadPlot?.(geojson)
      } catch (err) {
        alert('文件解析失败，请检查格式')
      }
    }
    reader.readAsText(file)
  }
  input.click()
}
+++++++ REPLACE
</diff>
</replace_in_file>

---

**User:**

[replace_in_file for 'src/components/editor/Toolbar.vue'] Result:
The content was successfully saved to src/components/editor/Toolbar.vue.

Here is the full, updated content of the file that was saved:

<final_file_content path="src/components/editor/Toolbar.vue">
<!--
  工具栏组件
  地图标绘编辑器顶部工具栏，分组为“文件”“编辑”“对象变换”“视图”“配置”，所有功能按钮均为预留
-->

<script setup>
import { ref } from 'vue'
import EditorConfigDialog from '../dialog/EditorConfigDialog.vue'

/**
 * 编辑器配置对话框显示状态
 * @type {import('vue').Ref<boolean>}
 */
const showEditorConfig = ref(false)

/**
 * 当前对象变换模式
 * @type {import('vue').Ref<string>}
 */
const transformMode = ref('translate')

/**
 * 是否有选中对象（预留）
 * @type {import('vue').Ref<boolean>}
 */
const hasSelection = ref(false)

/**
 * 是否可撤销（预留）
 * @type {import('vue').Ref<boolean>}
 */
const canUndo = ref(false)

/**
 * 是否可重做（预留）
 * @type {import('vue').Ref<boolean>}
 */
const canRedo = ref(false)

/**
 * 新建项目（预留功能）
 */
function newProject() {
  // TODO: 实现新建项目
}

/**
 * 暂存项目到本地（预留功能）
 */
function saveLocal() {
  // TODO: 实现暂存到本地
}

/**
 * 保存项目（预留功能）
 */
function saveProject() {
  // TODO: 实现保存项目
}

/**
 * 加载项目（预留功能）
 */
function loadProject() {
  // TODO: 实现加载项目
}

/**
 * 导出项目
 * 调用SceneManager.exportPlot并下载GeoJSON文件
 */
function exportProject() {
  // 假定sceneManager为shallowRef实例，可根据实际获取方式调整
  const geojson = sceneManager.value?.exportPlot?.()
  if (!geojson) return
  const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'plot-export.json'
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * 导入项目
 * 选择本地GeoJSON文件并调用SceneManager.loadPlot加载
 */
function importProject() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json,application/json'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const geojson = JSON.parse(evt.target.result)
        sceneManager.value?.loadPlot?.(geojson)
      } catch (err) {
        alert('文件解析失败，请检查格式')
      }
    }
    reader.readAsText(file)
  }
  input.click()
}

/**
 * 撤销操作（预留功能）
 */
function undo() {
  // TODO: 实现撤销
}

/**
 * 重做操作（预留功能）
 */
function redo() {
  // TODO: 实现重做
}

/**
 * 复制选中对象（预留功能）
 */
function duplicateSelected() {
  // TODO: 实现复制
}

/**
 * 删除选中对象（预留功能）
 */
function deleteSelected() {
  // TODO: 实现删除
}

/**
 * 设置对象变换模式（预留功能）
 * @param {string} mode
 */
function setTransformMode(mode) {
  transformMode.value = mode
}

/**
 * 聚焦到选中对象（预留功能）
 */
function focusSelected() {
  // TODO: 实现聚焦
}

/**
 * 重置相机（预留功能）
 */
function resetCamera() {
  // TODO: 实现重置相机
}

/**
 * 打开编辑器配置（预留功能）
 */
function openEditorConfig() {
  showEditorConfig.value = true
}
</script>

<template>
  <div class="ribbon-toolbar dark">
    <div class="ribbon-content">
      <!-- 文件分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">文件</div>
        <div class="ribbon-group-buttons">
          <button class="ribbon-btn" @click="newProject" title="新建项目">
            <span class="icon">📄</span>
            <div>新建</div>
          </button>
          <button class="ribbon-btn" @click="saveLocal" title="暂存到本地">
            <span class="icon">🗄️</span>
            <div>暂存</div>
          </button>
          <button class="ribbon-btn" @click="saveProject" title="保存项目">
            <span class="icon">💾</span>
            <div>保存</div>
          </button>
          <button class="ribbon-btn" @click="loadProject" title="加载项目">
            <span class="icon">📂</span>
            <div>加载</div>
          </button>
          <button class="ribbon-btn" @click="exportProject" title="导出项目">
            <span class="icon">📤</span>
            <div>导出</div>
          </button>
          <button class="ribbon-btn" @click="importProject" title="导入项目">
            <span class="icon">📥</span>
            <div>导入</div>
          </button>
        </div>
      </div>
      <!-- 编辑分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">编辑</div>
        <div class="ribbon-group-buttons">
          <button class="ribbon-btn" @click="undo" :disabled="!canUndo" title="撤销 (Ctrl+Z)">
            <span class="icon">↶</span>
            <div>撤销</div>
          </button>
          <button class="ribbon-btn" @click="redo" :disabled="!canRedo" title="重做 (Ctrl+Y)">
            <span class="icon">↷</span>
            <div>重做</div>
          </button>
          <button class="ribbon-btn" @click="duplicateSelected" :disabled="!hasSelection" title="复制 (Ctrl+D)">
            <span class="icon">📋</span>
            <div>复制</div>
          </button>
          <button class="ribbon-btn danger" @click="deleteSelected" :disabled="!hasSelection" title="删除 (Delete)">
            <span class="icon">🗑️</span>
            <div>删除</div>
          </button>
        </div>
      </div>
      <!-- 对象变换分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">对象变换</div>
        <div class="ribbon-group-buttons">
          <button
            class="ribbon-btn"
            :class="{ active: transformMode === 'translate' }"
            @click="setTransformMode('translate')"
            :disabled="!hasSelection"
            title="移动工具 (G)"
          >
            <span class="icon">↔️</span>
            <div>移动</div>
          </button>
          <button
            class="ribbon-btn"
            :class="{ active: transformMode === 'rotate' }"
            @click="setTransformMode('rotate')"
            :disabled="!hasSelection"
            title="旋转工具 (R)"
          >
            <span class="icon">🔄</span>
            <div>旋转</div>
          </button>
          <button
            class="ribbon-btn"
            :class="{ active: transformMode === 'scale' }"
            @click="setTransformMode('scale')"
            :disabled="!hasSelection"
            title="缩放工具 (S)"
          >
            <span class="icon">📏</span>
            <div>缩放</div>
          </button>
        </div>
      </div>
      <!-- 视图分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">视图</div>
        <div class="ribbon-group-buttons">
          <button
            class="ribbon-btn"
            @click="focusSelected"
            :disabled="!hasSelection"
            title="聚焦到选中对象 (F)"
          >
            <span class="icon">🎯</span>
            <div>聚焦</div>
          </button>
          <button
            class="ribbon-btn"
            @click="resetCamera"
            title="重置相机"
          >
            <span class="icon">📷</span>
            <div>重置相机</div>
          </button>
        </div>
      </div>
      <!-- 配置分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">配置</div>
        <div class="ribbon-group-buttons">
          <button class="ribbon-btn" @click="openEditorConfig" title="编辑器配置">
            <span class="icon">⚙️</span>
            <div>编辑器</div>
          </button>
        </div>
      </div>
    </div>
<!-- 编辑器配置对话框 -->
<EditorConfigDialog v-model="showEditorConfig" />
  </div>
</template>

<style lang="scss" scoped>
.ribbon-toolbar.dark {
  background: #23272e;
  color: #f3f3f3;
  border-bottom: 1.5px solid #2d323a;
  padding: 0 12px;
  box-shadow: 0 2px 8px #0006;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.ribbon-content {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: flex-end;
  padding: 4px;
  width: 100%;
  flex-wrap: wrap;
}

.ribbon-group {
  background: #282c34;
  border-radius: 8px 8px 0 0;
  border: 1.5px solid #353a42;
  box-shadow: 0 2px 8px #0003;
  padding: 4px;
  margin-right: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 120px;
  height: 80px;
  position: relative;
  box-sizing: border-box;
}

.ribbon-group-title {
  font-size: 13px;
  font-weight: bold;
  color: #7ecfff;
  margin-bottom: 4px;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px #0008;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

.ribbon-group-buttons {
  display: flex;
  flex-direction: row;
  gap: 4px;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-start;
}

.ribbon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px 7px;
  background: #23272e;
  border: 1px solid #353a42;
  border-radius: 5px;
  color: #f3f3f3;
  font-size: 11px;
  cursor: pointer;
  margin-bottom: 6px;
  min-width: 48px;
  transition: background 0.2s, border 0.2s, color 0.2s;
}

.ribbon-btn:hover:not(:disabled) {
  background: #2d323a;
  border-color: #7ecfff;
  color: #fff;
}

.ribbon-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ribbon-btn.active {
  background: #007acc;
  border-color: #0088dd;
  color: #fff;
}

.ribbon-btn.danger {
  background: #d73a49;
  border-color: #e85662;
  color: #fff;
}

.ribbon-btn.danger:hover:not(:disabled) {
  background: #e85662;
}

.icon {
  font-size: 18px;
  line-height: 1;
}

@media (max-width: 900px) {
  .ribbon-content {
    flex-wrap: wrap;
    gap: 12px;
  }
  .ribbon-group {
    min-width: 90px;
    padding: 8px 8px 10px 8px;
  }
  .ribbon-group-title {
    font-size: 12px;
    margin-bottom: 6px;
  }
  .ribbon-btn {
    min-width: 40px;
    font-size: 10px;
    padding: 5px 6px;
  }
  .icon {
    font-size: 15px;
  }
}
</style>

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.


<environment_details>
# VSCode Visible Files
src/components/editor/Toolbar.vue

# VSCode Open Tabs
src/core/PlotManager.js
src/components/editor/Toolbar.vue

# Current Time
2025/9/2 下午6:06:03 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
34,964 / 111.452K tokens used (31%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<attempt_completion>
<result>
已在src/components/editor/Toolbar.vue实现“导入”和“导出”功能，分别调用SceneManager的exportPlot和loadPlot方法，支持GeoJSON文件的导入与导出。相关方法已补充详细注释，符合Vue及项目代码规范。请确保sceneManager实例在Toolbar组件中可访问（如通过inject、props或全局状态管理）。
</result>
</attempt_completion>

---

**User:**

[attempt_completion] Result:
The user has provided feedback on the results. Consider their input to continue the task, and then attempt completion again.
<feedback>
回退上一步操作
</feedback>
<environment_details>
# VSCode Visible Files
src/core/PlotManager.js

# VSCode Open Tabs
src/core/PlotManager.js
src/components/editor/Toolbar.vue

# Current Time
2025/9/2 下午6:07:13 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
37,570 / 111.452K tokens used (34%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
用户要求回退Toolbar.vue的“导入”“导出”功能实现，恢复为原来的预留方法（即仅保留TODO注释）。需将exportProject和importProject方法内容恢复为原始的“// TODO: 实现导出项目”和“// TODO: 实现导入项目”。
</thinking>

<replace_in_file>
<path>src/components/editor/Toolbar.vue</path>
<diff>
------- SEARCH
/**
 * 导出项目
 * 调用SceneManager.exportPlot并下载GeoJSON文件
 */
function exportProject() {
  // 假定sceneManager为shallowRef实例，可根据实际获取方式调整
  const geojson = sceneManager.value?.exportPlot?.()
  if (!geojson) return
  const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'plot-export.json'
  a.click()
  URL.revokeObjectURL(url)
}
=======
/**
 * 导出项目（预留功能）
 */
function exportProject() {
  // TODO: 实现导出项目
}
+++++++ REPLACE

------- SEARCH
/**
 * 导入项目
 * 选择本地GeoJSON文件并调用SceneManager.loadPlot加载
 */
function importProject() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json,application/json'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const geojson = JSON.parse(evt.target.result)
        sceneManager.value?.loadPlot?.(geojson)
      } catch (err) {
        alert('文件解析失败，请检查格式')
      }
    }
    reader.readAsText(file)
  }
  input.click()
}
=======
/**
 * 导入项目（预留功能）
 */
function importProject() {
  // TODO: 实现导入项目
}
+++++++ REPLACE
</diff>
</replace_in_file>

---

**User:**

[replace_in_file for 'src/components/editor/Toolbar.vue'] Result:
The content was successfully saved to src/components/editor/Toolbar.vue.

Here is the full, updated content of the file that was saved:

<final_file_content path="src/components/editor/Toolbar.vue">
<!--
  工具栏组件
  地图标绘编辑器顶部工具栏，分组为“文件”“编辑”“对象变换”“视图”“配置”，所有功能按钮均为预留
-->

<script setup>
import { ref } from 'vue'
import EditorConfigDialog from '../dialog/EditorConfigDialog.vue'

/**
 * 编辑器配置对话框显示状态
 * @type {import('vue').Ref<boolean>}
 */
const showEditorConfig = ref(false)

/**
 * 当前对象变换模式
 * @type {import('vue').Ref<string>}
 */
const transformMode = ref('translate')

/**
 * 是否有选中对象（预留）
 * @type {import('vue').Ref<boolean>}
 */
const hasSelection = ref(false)

/**
 * 是否可撤销（预留）
 * @type {import('vue').Ref<boolean>}
 */
const canUndo = ref(false)

/**
 * 是否可重做（预留）
 * @type {import('vue').Ref<boolean>}
 */
const canRedo = ref(false)

/**
 * 新建项目（预留功能）
 */
function newProject() {
  // TODO: 实现新建项目
}

/**
 * 暂存项目到本地（预留功能）
 */
function saveLocal() {
  // TODO: 实现暂存到本地
}

/**
 * 保存项目（预留功能）
 */
function saveProject() {
  // TODO: 实现保存项目
}

/**
 * 加载项目（预留功能）
 */
function loadProject() {
  // TODO: 实现加载项目
}

/**
 * 导出项目（预留功能）
 */
function exportProject() {
  // TODO: 实现导出项目
}

/**
 * 导入项目（预留功能）
 */
function importProject() {
  // TODO: 实现导入项目
}

/**
 * 撤销操作（预留功能）
 */
function undo() {
  // TODO: 实现撤销
}

/**
 * 重做操作（预留功能）
 */
function redo() {
  // TODO: 实现重做
}

/**
 * 复制选中对象（预留功能）
 */
function duplicateSelected() {
  // TODO: 实现复制
}

/**
 * 删除选中对象（预留功能）
 */
function deleteSelected() {
  // TODO: 实现删除
}

/**
 * 设置对象变换模式（预留功能）
 * @param {string} mode
 */
function setTransformMode(mode) {
  transformMode.value = mode
}

/**
 * 聚焦到选中对象（预留功能）
 */
function focusSelected() {
  // TODO: 实现聚焦
}

/**
 * 重置相机（预留功能）
 */
function resetCamera() {
  // TODO: 实现重置相机
}

/**
 * 打开编辑器配置（预留功能）
 */
function openEditorConfig() {
  showEditorConfig.value = true
}
</script>

<template>
  <div class="ribbon-toolbar dark">
    <div class="ribbon-content">
      <!-- 文件分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">文件</div>
        <div class="ribbon-group-buttons">
          <button class="ribbon-btn" @click="newProject" title="新建项目">
            <span class="icon">📄</span>
            <div>新建</div>
          </button>
          <button class="ribbon-btn" @click="saveLocal" title="暂存到本地">
            <span class="icon">🗄️</span>
            <div>暂存</div>
          </button>
          <button class="ribbon-btn" @click="saveProject" title="保存项目">
            <span class="icon">💾</span>
            <div>保存</div>
          </button>
          <button class="ribbon-btn" @click="loadProject" title="加载项目">
            <span class="icon">📂</span>
            <div>加载</div>
          </button>
          <button class="ribbon-btn" @click="exportProject" title="导出项目">
            <span class="icon">📤</span>
            <div>导出</div>
          </button>
          <button class="ribbon-btn" @click="importProject" title="导入项目">
            <span class="icon">📥</span>
            <div>导入</div>
          </button>
        </div>
      </div>
      <!-- 编辑分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">编辑</div>
        <div class="ribbon-group-buttons">
          <button class="ribbon-btn" @click="undo" :disabled="!canUndo" title="撤销 (Ctrl+Z)">
            <span class="icon">↶</span>
            <div>撤销</div>
          </button>
          <button class="ribbon-btn" @click="redo" :disabled="!canRedo" title="重做 (Ctrl+Y)">
            <span class="icon">↷</span>
            <div>重做</div>
          </button>
          <button class="ribbon-btn" @click="duplicateSelected" :disabled="!hasSelection" title="复制 (Ctrl+D)">
            <span class="icon">📋</span>
            <div>复制</div>
          </button>
          <button class="ribbon-btn danger" @click="deleteSelected" :disabled="!hasSelection" title="删除 (Delete)">
            <span class="icon">🗑️</span>
            <div>删除</div>
          </button>
        </div>
      </div>
      <!-- 对象变换分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">对象变换</div>
        <div class="ribbon-group-buttons">
          <button
            class="ribbon-btn"
            :class="{ active: transformMode === 'translate' }"
            @click="setTransformMode('translate')"
            :disabled="!hasSelection"
            title="移动工具 (G)"
          >
            <span class="icon">↔️</span>
            <div>移动</div>
          </button>
          <button
            class="ribbon-btn"
            :class="{ active: transformMode === 'rotate' }"
            @click="setTransformMode('rotate')"
            :disabled="!hasSelection"
            title="旋转工具 (R)"
          >
            <span class="icon">🔄</span>
            <div>旋转</div>
          </button>
          <button
            class="ribbon-btn"
            :class="{ active: transformMode === 'scale' }"
            @click="setTransformMode('scale')"
            :disabled="!hasSelection"
            title="缩放工具 (S)"
          >
            <span class="icon">📏</span>
            <div>缩放</div>
          </button>
        </div>
      </div>
      <!-- 视图分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">视图</div>
        <div class="ribbon-group-buttons">
          <button
            class="ribbon-btn"
            @click="focusSelected"
            :disabled="!hasSelection"
            title="聚焦到选中对象 (F)"
          >
            <span class="icon">🎯</span>
            <div>聚焦</div>
          </button>
          <button
            class="ribbon-btn"
            @click="resetCamera"
            title="重置相机"
          >
            <span class="icon">📷</span>
            <div>重置相机</div>
          </button>
        </div>
      </div>
      <!-- 配置分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">配置</div>
        <div class="ribbon-group-buttons">
          <button class="ribbon-btn" @click="openEditorConfig" title="编辑器配置">
            <span class="icon">⚙️</span>
            <div>编辑器</div>
          </button>
        </div>
      </div>
    </div>
<!-- 编辑器配置对话框 -->
<EditorConfigDialog v-model="showEditorConfig" />
  </div>
</template>

<style lang="scss" scoped>
.ribbon-toolbar.dark {
  background: #23272e;
  color: #f3f3f3;
  border-bottom: 1.5px solid #2d323a;
  padding: 0 12px;
  box-shadow: 0 2px 8px #0006;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.ribbon-content {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: flex-end;
  padding: 4px;
  width: 100%;
  flex-wrap: wrap;
}

.ribbon-group {
  background: #282c34;
  border-radius: 8px 8px 0 0;
  border: 1.5px solid #353a42;
  box-shadow: 0 2px 8px #0003;
  padding: 4px;
  margin-right: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 120px;
  height: 80px;
  position: relative;
  box-sizing: border-box;
}

.ribbon-group-title {
  font-size: 13px;
  font-weight: bold;
  color: #7ecfff;
  margin-bottom: 4px;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px #0008;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

.ribbon-group-buttons {
  display: flex;
  flex-direction: row;
  gap: 4px;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-start;
}

.ribbon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px 7px;
  background: #23272e;
  border: 1px solid #353a42;
  border-radius: 5px;
  color: #f3f3f3;
  font-size: 11px;
  cursor: pointer;
  margin-bottom: 6px;
  min-width: 48px;
  transition: background 0.2s, border 0.2s, color 0.2s;
}

.ribbon-btn:hover:not(:disabled) {
  background: #2d323a;
  border-color: #7ecfff;
  color: #fff;
}

.ribbon-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ribbon-btn.active {
  background: #007acc;
  border-color: #0088dd;
  color: #fff;
}

.ribbon-btn.danger {
  background: #d73a49;
  border-color: #e85662;
  color: #fff;
}

.ribbon-btn.danger:hover:not(:disabled) {
  background: #e85662;
}

.icon {
  font-size: 18px;
  line-height: 1;
}

@media (max-width: 900px) {
  .ribbon-content {
    flex-wrap: wrap;
    gap: 12px;
  }
  .ribbon-group {
    min-width: 90px;
    padding: 8px 8px 10px 8px;
  }
  .ribbon-group-title {
    font-size: 12px;
    margin-bottom: 6px;
  }
  .ribbon-btn {
    min-width: 40px;
    font-size: 10px;
    padding: 5px 6px;
  }
  .icon {
    font-size: 15px;
  }
}
</style>

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.


<environment_details>
# VSCode Visible Files
src/components/editor/Toolbar.vue

# VSCode Open Tabs
src/core/PlotManager.js
src/components/editor/Toolbar.vue

# Current Time
2025/9/2 下午6:07:26 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
38,074 / 111.452K tokens used (34%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<attempt_completion>
<result>
已将src/components/editor/Toolbar.vue中的“导入项目”“导出项目”方法回退为预留状态，仅保留TODO注释，功能实现已移除，恢复为初始版本。
</result>
</attempt_completion>

