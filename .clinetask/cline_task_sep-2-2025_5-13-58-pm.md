**User:**

<task>
标绘信息的数据结构（在README.md中有说明）：
- 使用GeoJSON作为标绘信息的数据结构
- 在GeoJSON数据结构的基础上增加一些该编辑器专用的附加信息
- 检查SceneManager.js、ObjectManager.js、useScene.js、useObjectSelection.js，看是否匹配这个数据结构
- 编辑器专用的附加信息可以根据需求添加
- SceneManager.js中，增加以下函数：
  - clearScene()，清空标绘场景
  - exportScene()，导出标绘数据，就是标绘信息的数据结构
  - loadScene()，加载场景数据，根据json结构重建场景
</task>
<environment_details>
# VSCode Visible Files
(No visible files)

# VSCode Open Tabs
(No open tabs)

# Current Time
2025/9/2 下午5:11:12 (Asia/Shanghai, UTC+8:00)

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
src/components/property/ScenePropertyPane.vue
src/components/scene/
src/components/scene/SceneViewer.vue
src/composables/
src/composables/useAssets.js
src/composables/useEditorConfig.js
src/composables/useObjectSelection.js
src/composables/useScene.js
src/constants/
src/constants/DEFAULT_CAMERA.js
src/constants/DEFAULT_CENTER.js
src/constants/DEFAULT_VIEWER_OPTIONS.js
src/core/
src/core/ObjectManager.js
src/core/SceneManager.js
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
23af16d08ba7a3fb27b20cb8c2be23faff9bc17f

# Context Window Usage
0 / 128K tokens used (0%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
根据任务要求，首先需要了解README.md中关于标绘信息的数据结构（GeoJSON及附加信息）的具体说明，然后检查SceneManager.js、ObjectManager.js、useScene.js、useObjectSelection.js是否匹配该结构，并在SceneManager.js中增加clearScene、exportScene、loadScene三个函数。第一步应先阅读README.md，获取数据结构细节和附加信息要求。
</thinking>

<read_file>
<path>README.md</path>
</read_file>

---

**User:**

[read_file for 'README.md'] Result:
# 地图标绘编辑器 (Map Plotting Editor by AI)

一个基于 Vue 3 + Cesium 的地图标绘编辑器，支持各种标绘资源拖放、绘制、属性编辑。
本工程完全使用AI自行编写代码。

## 🎨 截图
![截图1](public/images/screenshot01.png)

## ✅ 主要功能

- 支持地图标绘（点、线、面、模型等多类型），可在三维场景中自由绘制和编辑；
- 资源面板拖拽标绘对象到地图，自动计算地理坐标；
- 标绘对象属性可视化编辑，支持基础属性和自定义扩展属性；
- 集成虚拟文件系统（VFS），支持标绘资源的管理、导入导出；
- 场景管理：支持多场景切换、实体添加/删除、地理坐标拾取；
- 标绘数据采用GeoJSON标准并扩展专用属性，便于数据交换与兼容；
- 支持地形、大气、光照等多种Cesium渲染效果；
- 完全AI驱动开发，代码自动生成，便于快速迭代和扩展。

## 🚀 技术栈

- **前端框架**: Vue 3 + Vite
- **3D引擎**: Cesium
- **构建工具**: Vite
- **样式**: Sass
- **网络请求**: Fetch API
- **工具库**: 
  - Element Plus - 主流UI组件库
  - Lodash - 实用工具函数库
  - Day.js - 轻量级日期时间库
  - Cesium - Cesium三维地图引擎

## 📁 项目结构

```
plotting-editor-by-ai/
├── src/
│   ├── components/                           # Vue 组件
│   │   ├── editor/                           # 编辑器 UI 组件
│   │   │   ├── PropertyPanel.vue             # 属性面板
│   │   │   ├── Toolbar.vue                   # 工具栏
│   │   │   ├── EditorFooter.vue              # 编辑器底部状态栏
│   │   │   ├── ResourcePanel.vue             # 资源面板
│   │   │   ├── FeatureBrowser.vue            # 标绘资源浏览组件
│   │   │   ├── VfsFileBrowser.vue            # 虚拟文件系统面板
│   │   │   ├── Inspector.vue                 # 对象检查器
│   │   ├── property/                         # 各种属性编辑组件
│   │   │   ├── ScenePropertyPane.vue         # 场景属性编辑面板
│   │   │   ├── BasePropertyPane.vue          # 对象基础属性编辑面板
│   │   ├── dialog/                           # 各类对话框组件
│   │   │   ├── EditorConfigDialog.vue        # 编辑器配置对话框
│   │   ├── scene/                            # 3D 场景组件
│   │   │   ├── SceneViewer.vue               # 主场景视图
│   ├── composables/                          # Vue Composition API 可组合函数
│   │   ├── useScene.js                       # 场景管理
│   │   ├── useObjectSelection.js             # 对象选择功能
│   │   ├── useAssets.js                      # 资源管理
│   │   ├── useEditorConfig.js                # 编辑器配置响应式状态与操作方法
│   ├── core/                                 # 核心 Cesium 逻辑
│   │   ├── SceneManager.js                   # 场景管理器
│   │   ├── ObjectManager.js                  # 对象管理器
│   ├── services/                             # 数据请求和外部接口
│   │   ├── static-drive-api.js               # 静态文件系统封装
│   │   ├── vfs-server-api.js                 # 虚拟文件系统封装
│   │   ├── vfs-service.js                    # 虚拟文件系统服务
│   ├── utils/                                # 工具函数
│   │   ├── mathUtils.js                      # 数学工具
│   │   ├── geometryUtils.js                  # 几何工具
│   │   ├── fileUtils.js                      # 文件处理工具
│   ├── constants/                            # 常量定义
│   │   ├── DEFAULT_VIEWER_OPTIONS.js         # 默认Viewer配置
│   │   ├── DEFAULT_CENTER.js                 # 默认中心点配置
│   │   ├── DEFAULT_CAMERA.js                 # 默认相机配置
│   ├── App.vue                               # 根组件（仅负责引入Editor.vue）
│   ├── Editor.vue                            # 主编辑器组件（包含全部业务与UI）
│   ├── main.js                               # 应用入口
│   ├── main-func.js                          # 应用入口文件相关的功能函数
│   ├── style.scss                            # 全局样式
├── public/                                   # 存放无需构建的静态资源
│   ├── images/                               # 图片资源目录
│   ├── vfs/                                  # 静态资源目录（虚拟文件系统）
├── script/                                   # 脚本
│   ├── package.json                          # 脚本子项目配置
│   ├── generate-vfs.js                       # 脚本：生成虚拟文件系统的元数据
│   ├── vfs-server.js                         # 脚本：虚拟文件系统后端服务
├── index.html                                # HTML 模板
├── package.json                              # 项目配置
├── vite.config.js                            # Vite 配置
├── README.md                                 # 项目说明
├── CESIUM_CHANGELOG.md                       # Cesium 版本更新日志

```

## 🏗️ 架构设计

### 组件层次

1. **主编辑器组件** (`Editor.vue`): 负责所有业务逻辑和UI的集成
2. **UI 层** (`components/editor/`, `components/dialog/`): 负责用户界面和交互
3. **地图渲染层** (`components/scene/`): 处理 Cesium 地图场景渲染和显示
4. **逻辑层** (`composables/`, `core/`): 业务逻辑和状态管理
5. **服务层** (`services/`): 数据请求和外部接口
6. **工具层** (`utils/`): 通用工具函数

### 技术特点

- **响应式状态**: 使用 Vue 3 Composition API 管理应用状态
- **模块化设计**: 清晰的代码组织和职责分离
- **Cesium 集成**: 基于 Cesium 1.132.0，使用最新 API（移除 ready/readyPromise，使用 baseLayer 等）
- **类型安全**: 良好的代码结构支持 TypeScript 迁移
- **性能优化**: 合理的组件懒加载和渲染优化

### Cesium 新版特性应用

- 使用 `baseLayer` 替代 `imageryProvider`
- 移除对 `ready` 和 `readyPromise` 的依赖
- 使用 `Scene.verticalExaggeration` 替代 `Globe.terrainExaggeration`
- 采用 ESM 模块化，不依赖内置 RequireJS

## 📋 开发规范

- 遵循 Vue 3 组合式 API 最佳实践
- 使用 ES6+ 语法特性
- 组件命名采用 PascalCase
- 文件和目录命名采用 camelCase
- Git 提交信息格式: `feat: 功能描述`

## 重要逻辑

### 数据结构
- 使用GeoJSON作为标绘信息的数据结构
- 在GeoJSON数据结构的基础上增加一些该编辑器专用的附加信息
标绘信息数据结构如下：
```js
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": { // 遵循GeoJSON标准的地理信息
                "type": "Point",
                "coordinates": [116.4, 39.9]
            },
            "properties": {
                "id": "ID",
                "name": "名称",
                ...<遵循GeoJSON标准的要素属性信息>
            },
            "userData": {
                ...<编辑器专用的要素附加信息>
            }
        }
    ],
    "userData": {
        ...<编辑器专用的标绘附加信息>
    }
}
```

### 场景管理 (useScene.js)
- 基于 Cesium 1.132.0 的场景初始化和管理
- 支持实体的添加、删除和管理
- 提供地理坐标拾取功能
- 集成地形、大气、光照等渲染效果

### 拖拽标绘 (SceneViewer.vue)
- 支持从资源面板拖拽标绘对象到地图
- 自动计算放置位置的地理坐标
- 支持点、线、面、模型等多种标绘类型

## 💯 AI

- 本工程基本使用AI自行编写代码；
- 开发环境：VSCode + Cline + GitHub Copilot + Claude 4 / GPT-4.1
- .clinerules目录：存储AI规则
- .clinetask目录：存储历史对话

<environment_details>
# VSCode Visible Files
(No visible files)

# VSCode Open Tabs
(No open tabs)

# Current Time
2025/9/2 下午5:11:19 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
14,134 / 111.452K tokens used (13%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
已获取README.md中标绘信息的数据结构说明：以GeoJSON为基础，Feature对象和FeatureCollection对象都可包含userData字段，存储编辑器专用附加信息。下一步需检查SceneManager.js、ObjectManager.js、useScene.js、useObjectSelection.js是否匹配该结构。优先阅读SceneManager.js，分析其场景数据结构和导入导出逻辑，为后续函数扩展做准备。
</thinking>

<read_file>
<path>src/core/SceneManager.js</path>
</read_file>

---

**User:**

[read_file for 'src/core/SceneManager.js'] Result:
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

    } catch (error) {
      console.error('销毁场景管理器失败:', error);
    }
  }
}

<environment_details>
# VSCode Visible Files
(No visible files)

# VSCode Open Tabs
(No open tabs)

# Current Time
2025/9/2 下午5:11:26 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
14,362 / 111.452K tokens used (13%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
SceneManager.js目前没有导入/导出场景数据的相关方法，也没有直接体现GeoJSON结构。下一步需检查ObjectManager.js，分析实体数据结构和是否支持GeoJSON及userData扩展，然后再查阅useScene.js和useObjectSelection.js。优先阅读ObjectManager.js，因其负责对象管理，可能涉及标绘数据结构的具体实现。
</thinking>

<read_file>
<path>src/core/ObjectManager.js</path>
</read_file>

---

**User:**

[read_file for 'src/core/ObjectManager.js'] Result:
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

<environment_details>
# VSCode Visible Files
(No visible files)

# VSCode Open Tabs
(No open tabs)

# Current Time
2025/9/2 下午5:11:32 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
16,780 / 111.452K tokens used (15%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
ObjectManager.js的导出/导入场景数据结构不是GeoJSON，而是自定义的entities数组，且未包含Feature/FeatureCollection结构。实体属性有userData字段，部分兼容编辑器附加信息，但整体结构与README.md要求不符。下一步需查阅useScene.js，分析场景数据流转和是否有GeoJSON相关处理，之后再查useObjectSelection.js。
</thinking>

<read_file>
<path>src/composables/useScene.js</path>
</read_file>

---

**User:**

[read_file for 'src/composables/useScene.js'] Result:
/**
 * 场景管理可组合函数
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
const scene = shallowRef(null)
const camera = shallowRef(null)
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

      // 获取场景和相机引用
      scene.value = viewer.value.scene
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
    if (!scene.value) return

    // 获取编辑器配置
    const { editorConfig } = useEditorConfig()

    // 鼠标操作逻辑配置（根据 editorConfig.controls 设置）
    const controlsConfig = editorConfig.controls
    const sscController = scene.value.screenSpaceCameraController
    if (controlsConfig && sscController) {
      // 缩放事件类型
      sscController.zoomEventTypes = [Cesium.CameraEventType[controlsConfig.zoomEventType] || Cesium.CameraEventType.WHEEL]
      // 倾斜事件类型
      sscController.tiltEventTypes = [Cesium.CameraEventType[controlsConfig.tiltEventType] || Cesium.CameraEventType.RIGHT_DRAG]
      // 旋转事件类型
      sscController.rotateEventTypes = [Cesium.CameraEventType[controlsConfig.rotateEventType] || Cesium.CameraEventType.LEFT_DRAG]
    }

    // 启用深度测试（根据配置）
    scene.value.globe.depthTestAgainstTerrain = !!editorConfig.map.depthTest

    // 配置大气效果
    scene.value.skyAtmosphere.show = !!editorConfig.map.atmosphere

    // 配置雾效果（始终开启，密度可后续配置）
    scene.value.fog.enabled = true
    scene.value.fog.density = 0.0002

    // 配置光照
    scene.value.globe.enableLighting = !!editorConfig.map.lighting

    // 配置地下模式
    scene.value.underground = !!editorConfig.map.underground

    // 使用新版 verticalExaggeration 替代 Globe.terrainExaggeration
    scene.value.verticalExaggeration = 1.0
    scene.value.verticalExaggerationRelativeHeight = 0.0

    // 配置天空盒（新版 Cesium 需自定义 SkyBox，预留）
    // scene.value.skyBox.show = !!editorConfig.map.skybox

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
    scene,
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

<environment_details>
# VSCode Visible Files
(No visible files)

# VSCode Open Tabs
(No open tabs)

# Current Time
2025/9/2 下午5:11:38 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
21,067 / 111.452K tokens used (19%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
useScene.js仅负责Cesium场景初始化和实体管理，没有涉及GeoJSON结构或导入导出逻辑。实体添加时未强制要求GeoJSON格式，也未处理userData扩展。下一步需查阅useObjectSelection.js，确认是否有与标绘数据结构相关的处理，之后即可总结各文件兼容性并着手扩展SceneManager.js。
</thinking>

<read_file>
<path>src/composables/useObjectSelection.js</path>
</read_file>

---

**User:**

[read_file for 'src/composables/useObjectSelection.js'] Result:
/**
 * 对象选择功能
 * 基于Cesium的实体选择、高亮显示和管理
 */
import { ref, shallowRef, computed, onUnmounted } from 'vue';

// 全局选择状态 - 使用shallowRef以符合Cesium对象引用规范
const selectedObjects = shallowRef(new Set());
const selectedObjectIds = ref(new Set());

// 选择高亮存储 - 存储原始材质信息用于恢复
const selectionStore = new Map();

// 选择变化回调列表
const selectionCallbacks = new Set();

/**
 * 对象选择管理组合式函数
 */
export function useObjectSelection() {
  /**
   * 选择单个对象
   */
  function selectObject(entity) {
    if (!entity) return;
    
    // 清除之前的选择
    clearSelection();
    
    // 添加到选择集合
    selectedObjects.value.add(entity);
    selectedObjectIds.value.add(entity.id);
    
    // 应用选择高亮
    applySelectionHighlight(entity);
    
    // 触发选择变化回调
    notifySelectionChange();
  }
  
  /**
   * 添加对象到选择（多选）
   */
  function addToSelection(entity) {
    if (!entity || selectedObjects.value.has(entity)) return;
    
    selectedObjects.value.add(entity);
    selectedObjectIds.value.add(entity.id);
    
    // 应用选择高亮
    applySelectionHighlight(entity);
    
    // 触发选择变化回调
    notifySelectionChange();
  }
  
  /**
   * 从选择中移除对象
   */
  function removeFromSelection(entity) {
    if (!entity || !selectedObjects.value.has(entity)) return;
    
    selectedObjects.value.delete(entity);
    selectedObjectIds.value.delete(entity.id);
    
    // 移除选择高亮
    removeSelectionHighlight(entity);
    
    // 触发选择变化回调
    notifySelectionChange();
  }
  
  /**
   * 清除所有选择
   */
  function clearSelection() {
    // 移除所有高亮
    selectedObjects.value.forEach(entity => {
      removeSelectionHighlight(entity);
    });
    
    // 清空选择集合
    selectedObjects.value.clear();
    selectedObjectIds.value.clear();
    
    // 触发选择变化回调
    notifySelectionChange();
  }
  
  /**
   * 切换对象选择状态
   */
  function toggleSelection(entity) {
    if (!entity) return;
    
    if (selectedObjects.value.has(entity)) {
      removeFromSelection(entity);
    } else {
      addToSelection(entity);
    }
  }
  
  /**
   * 应用选择高亮效果
   */
  function applySelectionHighlight(entity) {
    if (!entity) return;
    
    const entityId = entity.id;
    
    // 如果已经有高亮，先移除
    if (selectionStore.has(entityId)) {
      removeSelectionHighlight(entity);
    }
    
    // 存储原始状态
    const originalState = {
      outlineColor: null,
      outlineWidth: null
    };
    
    try {
      // 根据实体类型应用不同的高亮效果
      if (entity.billboard) {
        // Billboard高亮
        originalState.outlineColor = entity.billboard.outlineColor;
        originalState.outlineWidth = entity.billboard.outlineWidth;
        
        entity.billboard.outlineColor = Cesium.Color.CYAN;
        entity.billboard.outlineWidth = 3.0;
      } else if (entity.point) {
        // Point高亮
        originalState.outlineColor = entity.point.outlineColor;
        originalState.outlineWidth = entity.point.outlineWidth;
        
        entity.point.outlineColor = Cesium.Color.CYAN;
        entity.point.outlineWidth = 3.0;
      } else if (entity.polygon) {
        // Polygon高亮
        originalState.outlineColor = entity.polygon.outlineColor;
        originalState.outlineWidth = entity.polygon.outlineWidth;
        
        entity.polygon.outlineColor = Cesium.Color.CYAN;
        entity.polygon.outlineWidth = 3.0;
      } else if (entity.polyline) {
        // Polyline高亮
        originalState.outlineColor = entity.polyline.material;
        
        // 创建高亮材质
        entity.polyline.material = Cesium.Color.CYAN;
      } else if (entity.box || entity.cylinder || entity.ellipsoid) {
        // 3D几何体高亮
        const geometry = entity.box || entity.cylinder || entity.ellipsoid;
        originalState.outlineColor = geometry.outlineColor;
        originalState.outlineWidth = geometry.outlineWidth;
        
        geometry.outline = true;
        geometry.outlineColor = Cesium.Color.CYAN;
        geometry.outlineWidth = 3.0;
      }
      
      // 存储原始状态用于恢复
      selectionStore.set(entityId, originalState);
      
    } catch (error) {
      console.warn('应用选择高亮时出错:', error);
    }
  }
  
  /**
   * 移除选择高亮效果
   */
  function removeSelectionHighlight(entity) {
    if (!entity) return;
    
    const entityId = entity.id;
    const originalState = selectionStore.get(entityId);
    
    if (!originalState) return;
    
    try {
      // 根据实体类型恢复原始状态
      if (entity.billboard) {
        entity.billboard.outlineColor = originalState.outlineColor;
        entity.billboard.outlineWidth = originalState.outlineWidth;
      } else if (entity.point) {
        entity.point.outlineColor = originalState.outlineColor;
        entity.point.outlineWidth = originalState.outlineWidth;
      } else if (entity.polygon) {
        entity.polygon.outlineColor = originalState.outlineColor;
        entity.polygon.outlineWidth = originalState.outlineWidth;
      } else if (entity.polyline) {
        entity.polyline.material = originalState.outlineColor || Cesium.Color.WHITE;
      } else if (entity.box || entity.cylinder || entity.ellipsoid) {
        const geometry = entity.box || entity.cylinder || entity.ellipsoid;
        geometry.outlineColor = originalState.outlineColor;
        geometry.outlineWidth = originalState.outlineWidth;
        if (originalState.outlineColor === null) {
          geometry.outline = false;
        }
      }
      
      // 从存储中移除
      selectionStore.delete(entityId);
      
    } catch (error) {
      console.warn('移除选择高亮时出错:', error);
    }
  }
  
  /**
   * 添加选择变化回调
   */
  function onSelectionChange(callback) {
    selectionCallbacks.add(callback);
    
    // 返回移除回调的函数
    return () => {
      selectionCallbacks.delete(callback);
    };
  }
  
  /**
   * 触发选择变化回调
   */
  function notifySelectionChange() {
    selectionCallbacks.forEach(callback => {
      try {
        callback(selectedObjects.value, selectedObjectIds.value);
      } catch (error) {
        console.error('选择变化回调执行出错:', error);
      }
    });
  }
  
  /**
   * 检查对象是否被选中
   */
  function isSelected(entity) {
    return entity ? selectedObjects.value.has(entity) : false;
  }
  
  // 计算属性
  const hasSelection = computed(() => selectedObjects.value.size > 0);
  const selectionCount = computed(() => selectedObjects.value.size);
  
  // 组件卸载时清理
  onUnmounted(() => {
    clearSelection();
    selectionCallbacks.clear();
  });
  
  return {
    // 状态
    selectedObjects,
    selectedObjectIds,
    hasSelection,
    selectionCount,
    
    // 方法
    selectObject,
    addToSelection,
    removeFromSelection,
    clearSelection,
    toggleSelection,
    isSelected,
    onSelectionChange
  };
}

// 导出全局状态用于跨组件访问
export { selectedObjects, selectedObjectIds };

<environment_details>
# VSCode Visible Files
(No visible files)

# VSCode Open Tabs
(No open tabs)

# Current Time
2025/9/2 下午5:11:44 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
23,074 / 111.452K tokens used (21%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
useObjectSelection.js仅负责实体选择和高亮显示，与标绘数据结构无关。综上，当前各文件未完全采用GeoJSON作为场景导出/导入的数据结构，ObjectManager.js的exportScene/importScene为自定义结构，未包含Feature/FeatureCollection和userData扩展。需在SceneManager.js中新增clearScene、exportScene、loadScene函数，且export/load需严格按README.md的GeoJSON+userData结构实现。clearScene可调用实体清空逻辑。实现时需在文件顶部补充注释，并在README.md项目结构中补充SceneManager.js的变更。
</thinking>

<replace_in_file>
<path>src/core/SceneManager.js</path>
<diff>
------- SEARCH
/**
 * 场景管理器
 * 基于Cesium 1.132.0的场景管理核心逻辑
 * 使用新版API，不依赖ready和readyPromise，移除内置RequireJS
 */
import * as Cesium from 'cesium';
import { DEFAULT_VIEWER_OPTIONS } from '../constants/DEFAULT_VIEWER_OPTIONS.js';
import { DEFAULT_CAMERA } from '../constants/DEFAULT_CAMERA.js';

export class SceneManager {
=======
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
+++++++ REPLACE

------- SEARCH
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
=======
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
+++++++ REPLACE
</diff>
</replace_in_file>

---

**User:**

[replace_in_file for 'src/core/SceneManager.js'] Result:
The content was successfully saved to src/core/SceneManager.js.

Here is the full, updated content of the file that was saved:

<final_file_content path="src/core/SceneManager.js">
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

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.


<environment_details>
# VSCode Visible Files
src/core/SceneManager.js

# VSCode Open Tabs
src/core/SceneManager.js

# Current Time
2025/9/2 下午5:13:11 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
26,824 / 111.452K tokens used (24%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
SceneManager.js已完成GeoJSON数据结构相关函数扩展。根据规范，每次新增/修改文件都需同步更新README.md项目结构说明，补充SceneManager.js的功能变更。下一步应在README.md的“项目结构”部分补充SceneManager.js的注释和新增函数说明，并在“重要逻辑”部分补充标绘数据结构与SceneManager.js的导入导出逻辑。
</thinking>

<read_file>
<path>README.md</path>
</read_file>

---

**User:**

[read_file for 'README.md'] Result:
# 地图标绘编辑器 (Map Plotting Editor by AI)

一个基于 Vue 3 + Cesium 的地图标绘编辑器，支持各种标绘资源拖放、绘制、属性编辑。
本工程完全使用AI自行编写代码。

## 🎨 截图
![截图1](public/images/screenshot01.png)

## ✅ 主要功能

- 支持地图标绘（点、线、面、模型等多类型），可在三维场景中自由绘制和编辑；
- 资源面板拖拽标绘对象到地图，自动计算地理坐标；
- 标绘对象属性可视化编辑，支持基础属性和自定义扩展属性；
- 集成虚拟文件系统（VFS），支持标绘资源的管理、导入导出；
- 场景管理：支持多场景切换、实体添加/删除、地理坐标拾取；
- 标绘数据采用GeoJSON标准并扩展专用属性，便于数据交换与兼容；
- 支持地形、大气、光照等多种Cesium渲染效果；
- 完全AI驱动开发，代码自动生成，便于快速迭代和扩展。

## 🚀 技术栈

- **前端框架**: Vue 3 + Vite
- **3D引擎**: Cesium
- **构建工具**: Vite
- **样式**: Sass
- **网络请求**: Fetch API
- **工具库**: 
  - Element Plus - 主流UI组件库
  - Lodash - 实用工具函数库
  - Day.js - 轻量级日期时间库
  - Cesium - Cesium三维地图引擎

## 📁 项目结构

```
plotting-editor-by-ai/
├── src/
│   ├── components/                           # Vue 组件
│   │   ├── editor/                           # 编辑器 UI 组件
│   │   │   ├── PropertyPanel.vue             # 属性面板
│   │   │   ├── Toolbar.vue                   # 工具栏
│   │   │   ├── EditorFooter.vue              # 编辑器底部状态栏
│   │   │   ├── ResourcePanel.vue             # 资源面板
│   │   │   ├── FeatureBrowser.vue            # 标绘资源浏览组件
│   │   │   ├── VfsFileBrowser.vue            # 虚拟文件系统面板
│   │   │   ├── Inspector.vue                 # 对象检查器
│   │   ├── property/                         # 各种属性编辑组件
│   │   │   ├── ScenePropertyPane.vue         # 场景属性编辑面板
│   │   │   ├── BasePropertyPane.vue          # 对象基础属性编辑面板
│   │   ├── dialog/                           # 各类对话框组件
│   │   │   ├── EditorConfigDialog.vue        # 编辑器配置对话框
│   │   ├── scene/                            # 3D 场景组件
│   │   │   ├── SceneViewer.vue               # 主场景视图
│   ├── composables/                          # Vue Composition API 可组合函数
│   │   ├── useScene.js                       # 场景管理
│   │   ├── useObjectSelection.js             # 对象选择功能
│   │   ├── useAssets.js                      # 资源管理
│   │   ├── useEditorConfig.js                # 编辑器配置响应式状态与操作方法
│   ├── core/                                 # 核心 Cesium 逻辑
│   │   ├── SceneManager.js                   # 场景管理器
│   │   ├── ObjectManager.js                  # 对象管理器
│   ├── services/                             # 数据请求和外部接口
│   │   ├── static-drive-api.js               # 静态文件系统封装
│   │   ├── vfs-server-api.js                 # 虚拟文件系统封装
│   │   ├── vfs-service.js                    # 虚拟文件系统服务
│   ├── utils/                                # 工具函数
│   │   ├── mathUtils.js                      # 数学工具
│   │   ├── geometryUtils.js                  # 几何工具
│   │   ├── fileUtils.js                      # 文件处理工具
│   ├── constants/                            # 常量定义
│   │   ├── DEFAULT_VIEWER_OPTIONS.js         # 默认Viewer配置
│   │   ├── DEFAULT_CENTER.js                 # 默认中心点配置
│   │   ├── DEFAULT_CAMERA.js                 # 默认相机配置
│   ├── App.vue                               # 根组件（仅负责引入Editor.vue）
│   ├── Editor.vue                            # 主编辑器组件（包含全部业务与UI）
│   ├── main.js                               # 应用入口
│   ├── main-func.js                          # 应用入口文件相关的功能函数
│   ├── style.scss                            # 全局样式
├── public/                                   # 存放无需构建的静态资源
│   ├── images/                               # 图片资源目录
│   ├── vfs/                                  # 静态资源目录（虚拟文件系统）
├── script/                                   # 脚本
│   ├── package.json                          # 脚本子项目配置
│   ├── generate-vfs.js                       # 脚本：生成虚拟文件系统的元数据
│   ├── vfs-server.js                         # 脚本：虚拟文件系统后端服务
├── index.html                                # HTML 模板
├── package.json                              # 项目配置
├── vite.config.js                            # Vite 配置
├── README.md                                 # 项目说明
├── CESIUM_CHANGELOG.md                       # Cesium 版本更新日志

```

## 🏗️ 架构设计

### 组件层次

1. **主编辑器组件** (`Editor.vue`): 负责所有业务逻辑和UI的集成
2. **UI 层** (`components/editor/`, `components/dialog/`): 负责用户界面和交互
3. **地图渲染层** (`components/scene/`): 处理 Cesium 地图场景渲染和显示
4. **逻辑层** (`composables/`, `core/`): 业务逻辑和状态管理
5. **服务层** (`services/`): 数据请求和外部接口
6. **工具层** (`utils/`): 通用工具函数

### 技术特点

- **响应式状态**: 使用 Vue 3 Composition API 管理应用状态
- **模块化设计**: 清晰的代码组织和职责分离
- **Cesium 集成**: 基于 Cesium 1.132.0，使用最新 API（移除 ready/readyPromise，使用 baseLayer 等）
- **类型安全**: 良好的代码结构支持 TypeScript 迁移
- **性能优化**: 合理的组件懒加载和渲染优化

### Cesium 新版特性应用

- 使用 `baseLayer` 替代 `imageryProvider`
- 移除对 `ready` 和 `readyPromise` 的依赖
- 使用 `Scene.verticalExaggeration` 替代 `Globe.terrainExaggeration`
- 采用 ESM 模块化，不依赖内置 RequireJS

## 📋 开发规范

- 遵循 Vue 3 组合式 API 最佳实践
- 使用 ES6+ 语法特性
- 组件命名采用 PascalCase
- 文件和目录命名采用 camelCase
- Git 提交信息格式: `feat: 功能描述`

## 重要逻辑

### 数据结构
- 使用GeoJSON作为标绘信息的数据结构
- 在GeoJSON数据结构的基础上增加一些该编辑器专用的附加信息
标绘信息数据结构如下：
```js
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": { // 遵循GeoJSON标准的地理信息
                "type": "Point",
                "coordinates": [116.4, 39.9]
            },
            "properties": {
                "id": "ID",
                "name": "名称",
                ...<遵循GeoJSON标准的要素属性信息>
            },
            "userData": {
                ...<编辑器专用的要素附加信息>
            }
        }
    ],
    "userData": {
        ...<编辑器专用的标绘附加信息>
    }
}
```

### 场景管理 (useScene.js)
- 基于 Cesium 1.132.0 的场景初始化和管理
- 支持实体的添加、删除和管理
- 提供地理坐标拾取功能
- 集成地形、大气、光照等渲染效果

### 拖拽标绘 (SceneViewer.vue)
- 支持从资源面板拖拽标绘对象到地图
- 自动计算放置位置的地理坐标
- 支持点、线、面、模型等多种标绘类型

## 💯 AI

- 本工程基本使用AI自行编写代码；
- 开发环境：VSCode + Cline + GitHub Copilot + Claude 4 / GPT-4.1
- .clinerules目录：存储AI规则
- .clinetask目录：存储历史对话

<environment_details>
# VSCode Visible Files
src/core/SceneManager.js

# VSCode Open Tabs
src/core/SceneManager.js

# Current Time
2025/9/2 下午5:13:21 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
30,802 / 111.452K tokens used (28%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
需要在README.md的“项目结构”部分补充SceneManager.js的详细功能注释和新增函数说明，并在“重要逻辑”部分补充SceneManager.js的GeoJSON导入导出逻辑。应在core/SceneManager.js条目下添加注释，重要逻辑下补充导入导出流程说明。
</thinking>

<replace_in_file>
<path>README.md</path>
<diff>
------- SEARCH
│   ├── core/                                 # 核心 Cesium 逻辑
│   │   ├── SceneManager.js                   # 场景管理器
│   │   ├── ObjectManager.js                  # 对象管理器
=======
│   ├── core/                                 # 核心 Cesium 逻辑
│   │   ├── SceneManager.js                   # 场景管理器（支持GeoJSON标绘数据结构，包含clearScene、exportScene、loadScene等场景管理与数据导入导出函数）
│   │   ├── ObjectManager.js                  # 对象管理器
+++++++ REPLACE

------- SEARCH
### 数据结构
- 使用GeoJSON作为标绘信息的数据结构
- 在GeoJSON数据结构的基础上增加一些该编辑器专用的附加信息
标绘信息数据结构如下：
```js
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": { // 遵循GeoJSON标准的地理信息
                "type": "Point",
                "coordinates": [116.4, 39.9]
            },
            "properties": {
                "id": "ID",
                "name": "名称",
                ...<遵循GeoJSON标准的要素属性信息>
            },
            "userData": {
                ...<编辑器专用的要素附加信息>
            }
        }
    ],
    "userData": {
        ...<编辑器专用的标绘附加信息>
    }
}
```
=======
### 数据结构
- 使用GeoJSON作为标绘信息的数据结构
- 在GeoJSON数据结构的基础上增加一些该编辑器专用的附加信息
- 场景管理器（SceneManager.js）支持以下数据操作流程：
  - clearScene(): 清空场景所有实体
  - exportScene(): 导出场景数据为GeoJSON+userData结构，Feature和FeatureCollection均支持userData字段，便于扩展和编辑器专用信息存储
  - loadScene(json): 加载GeoJSON结构场景数据，根据json内容重建场景实体
标绘信息数据结构如下：
```js
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": { // 遵循GeoJSON标准的地理信息
                "type": "Point",
                "coordinates": [116.4, 39.9]
            },
            "properties": {
                "id": "ID",
                "name": "名称",
                ...<遵循GeoJSON标准的要素属性信息>
            },
            "userData": {
                ...<编辑器专用的要素附加信息>
            }
        }
    ],
    "userData": {
        ...<编辑器专用的标绘附加信息>
    }
}
```
+++++++ REPLACE
</diff>
</replace_in_file>

---

**User:**

[replace_in_file for 'README.md'] Result:
The content was successfully saved to README.md.

Here is the full, updated content of the file that was saved:

<final_file_content path="README.md">
# 地图标绘编辑器 (Map Plotting Editor by AI)

一个基于 Vue 3 + Cesium 的地图标绘编辑器，支持各种标绘资源拖放、绘制、属性编辑。
本工程完全使用AI自行编写代码。

## 🎨 截图
![截图1](public/images/screenshot01.png)

## ✅ 主要功能

- 支持地图标绘（点、线、面、模型等多类型），可在三维场景中自由绘制和编辑；
- 资源面板拖拽标绘对象到地图，自动计算地理坐标；
- 标绘对象属性可视化编辑，支持基础属性和自定义扩展属性；
- 集成虚拟文件系统（VFS），支持标绘资源的管理、导入导出；
- 场景管理：支持多场景切换、实体添加/删除、地理坐标拾取；
- 标绘数据采用GeoJSON标准并扩展专用属性，便于数据交换与兼容；
- 支持地形、大气、光照等多种Cesium渲染效果；
- 完全AI驱动开发，代码自动生成，便于快速迭代和扩展。

## 🚀 技术栈

- **前端框架**: Vue 3 + Vite
- **3D引擎**: Cesium
- **构建工具**: Vite
- **样式**: Sass
- **网络请求**: Fetch API
- **工具库**: 
  - Element Plus - 主流UI组件库
  - Lodash - 实用工具函数库
  - Day.js - 轻量级日期时间库
  - Cesium - Cesium三维地图引擎

## 📁 项目结构

```
plotting-editor-by-ai/
├── src/
│   ├── components/                           # Vue 组件
│   │   ├── editor/                           # 编辑器 UI 组件
│   │   │   ├── PropertyPanel.vue             # 属性面板
│   │   │   ├── Toolbar.vue                   # 工具栏
│   │   │   ├── EditorFooter.vue              # 编辑器底部状态栏
│   │   │   ├── ResourcePanel.vue             # 资源面板
│   │   │   ├── FeatureBrowser.vue            # 标绘资源浏览组件
│   │   │   ├── VfsFileBrowser.vue            # 虚拟文件系统面板
│   │   │   ├── Inspector.vue                 # 对象检查器
│   │   ├── property/                         # 各种属性编辑组件
│   │   │   ├── ScenePropertyPane.vue         # 场景属性编辑面板
│   │   │   ├── BasePropertyPane.vue          # 对象基础属性编辑面板
│   │   ├── dialog/                           # 各类对话框组件
│   │   │   ├── EditorConfigDialog.vue        # 编辑器配置对话框
│   │   ├── scene/                            # 3D 场景组件
│   │   │   ├── SceneViewer.vue               # 主场景视图
│   ├── composables/                          # Vue Composition API 可组合函数
│   │   ├── useScene.js                       # 场景管理
│   │   ├── useObjectSelection.js             # 对象选择功能
│   │   ├── useAssets.js                      # 资源管理
│   │   ├── useEditorConfig.js                # 编辑器配置响应式状态与操作方法
│   ├── core/                                 # 核心 Cesium 逻辑
│   │   ├── SceneManager.js                   # 场景管理器（支持GeoJSON标绘数据结构，包含clearScene、exportScene、loadScene等场景管理与数据导入导出函数）
│   │   ├── ObjectManager.js                  # 对象管理器
│   ├── services/                             # 数据请求和外部接口
│   │   ├── static-drive-api.js               # 静态文件系统封装
│   │   ├── vfs-server-api.js                 # 虚拟文件系统封装
│   │   ├── vfs-service.js                    # 虚拟文件系统服务
│   ├── utils/                                # 工具函数
│   │   ├── mathUtils.js                      # 数学工具
│   │   ├── geometryUtils.js                  # 几何工具
│   │   ├── fileUtils.js                      # 文件处理工具
│   ├── constants/                            # 常量定义
│   │   ├── DEFAULT_VIEWER_OPTIONS.js         # 默认Viewer配置
│   │   ├── DEFAULT_CENTER.js                 # 默认中心点配置
│   │   ├── DEFAULT_CAMERA.js                 # 默认相机配置
│   ├── App.vue                               # 根组件（仅负责引入Editor.vue）
│   ├── Editor.vue                            # 主编辑器组件（包含全部业务与UI）
│   ├── main.js                               # 应用入口
│   ├── main-func.js                          # 应用入口文件相关的功能函数
│   ├── style.scss                            # 全局样式
├── public/                                   # 存放无需构建的静态资源
│   ├── images/                               # 图片资源目录
│   ├── vfs/                                  # 静态资源目录（虚拟文件系统）
├── script/                                   # 脚本
│   ├── package.json                          # 脚本子项目配置
│   ├── generate-vfs.js                       # 脚本：生成虚拟文件系统的元数据
│   ├── vfs-server.js                         # 脚本：虚拟文件系统后端服务
├── index.html                                # HTML 模板
├── package.json                              # 项目配置
├── vite.config.js                            # Vite 配置
├── README.md                                 # 项目说明
├── CESIUM_CHANGELOG.md                       # Cesium 版本更新日志

```

## 🏗️ 架构设计

### 组件层次

1. **主编辑器组件** (`Editor.vue`): 负责所有业务逻辑和UI的集成
2. **UI 层** (`components/editor/`, `components/dialog/`): 负责用户界面和交互
3. **地图渲染层** (`components/scene/`): 处理 Cesium 地图场景渲染和显示
4. **逻辑层** (`composables/`, `core/`): 业务逻辑和状态管理
5. **服务层** (`services/`): 数据请求和外部接口
6. **工具层** (`utils/`): 通用工具函数

### 技术特点

- **响应式状态**: 使用 Vue 3 Composition API 管理应用状态
- **模块化设计**: 清晰的代码组织和职责分离
- **Cesium 集成**: 基于 Cesium 1.132.0，使用最新 API（移除 ready/readyPromise，使用 baseLayer 等）
- **类型安全**: 良好的代码结构支持 TypeScript 迁移
- **性能优化**: 合理的组件懒加载和渲染优化

### Cesium 新版特性应用

- 使用 `baseLayer` 替代 `imageryProvider`
- 移除对 `ready` 和 `readyPromise` 的依赖
- 使用 `Scene.verticalExaggeration` 替代 `Globe.terrainExaggeration`
- 采用 ESM 模块化，不依赖内置 RequireJS

## 📋 开发规范

- 遵循 Vue 3 组合式 API 最佳实践
- 使用 ES6+ 语法特性
- 组件命名采用 PascalCase
- 文件和目录命名采用 camelCase
- Git 提交信息格式: `feat: 功能描述`

## 重要逻辑

### 数据结构
- 使用GeoJSON作为标绘信息的数据结构
- 在GeoJSON数据结构的基础上增加一些该编辑器专用的附加信息
- 场景管理器（SceneManager.js）支持以下数据操作流程：
  - clearScene(): 清空场景所有实体
  - exportScene(): 导出场景数据为GeoJSON+userData结构，Feature和FeatureCollection均支持userData字段，便于扩展和编辑器专用信息存储
  - loadScene(json): 加载GeoJSON结构场景数据，根据json内容重建场景实体
标绘信息数据结构如下：
```js
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": { // 遵循GeoJSON标准的地理信息
                "type": "Point",
                "coordinates": [116.4, 39.9]
            },
            "properties": {
                "id": "ID",
                "name": "名称",
                ...<遵循GeoJSON标准的要素属性信息>
            },
            "userData": {
                ...<编辑器专用的要素附加信息>
            }
        }
    ],
    "userData": {
        ...<编辑器专用的标绘附加信息>
    }
}
```

### 场景管理 (useScene.js)
- 基于 Cesium 1.132.0 的场景初始化和管理
- 支持实体的添加、删除和管理
- 提供地理坐标拾取功能
- 集成地形、大气、光照等渲染效果

### 拖拽标绘 (SceneViewer.vue)
- 支持从资源面板拖拽标绘对象到地图
- 自动计算放置位置的地理坐标
- 支持点、线、面、模型等多种标绘类型

## 💯 AI

- 本工程基本使用AI自行编写代码；
- 开发环境：VSCode + Cline + GitHub Copilot + Claude 4 / GPT-4.1
- .clinerules目录：存储AI规则
- .clinetask目录：存储历史对话

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.


<environment_details>
# VSCode Visible Files
README.md

# VSCode Open Tabs
src/core/SceneManager.js
README.md

# Current Time
2025/9/2 下午5:13:50 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
32,789 / 111.452K tokens used (29%)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
所有要求已完成：SceneManager.js已实现clearScene、exportScene、loadScene，且严格采用GeoJSON+userData结构，README.md已同步补充项目结构和重要逻辑说明。未发现编译错误。下一步应提交代码，并按规范写中文feat注释。
</thinking>

<execute_command>
<command>git add src/core/SceneManager.js README.md; git commit -m "feat: 场景管理器支持GeoJSON标绘数据结构，新增clearScene、exportScene、loadScene函数，并完善README项目结构和数据逻辑说明"</command>
<requires_approval>true</requires_approval>
</execute_command>

