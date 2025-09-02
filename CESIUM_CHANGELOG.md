### b11
- TMS 和解决 WebGL 精度不足

### 1.10
- glb 雏形、PointPrimitive、RTC 以及 buildModuleUrl

### 1.14
- WebGL 2.0

### 1.16
- 支持视频纹理、地形夸张

### 1.17
- 量化压缩地形

### 1.23
- 改用 earcut 库实现大规模三角化，参考 PullRequest 3998
- 持 glTF 1.0 的 WEB3D_quantized_attributes 扩展

### 1.31
- KTX 纹理支持

### 1.41
- 物体裁剪

### 1.43
- Cesium 官方服务 Ion 上线

### 1.44
- Draco 支持

### 1.46
- 后处理

### 1.54
- WebP 贴图支持

### 1.66
- 光

### 1.68
- SpectorJS 与 sourcemap 支持
- 支持使用 SpectorJS 实时修改着色器
- 未压缩版本的 CesiumJS 库支持生成 SourceMap 文件

### 1.70
- TypeScript 增强类型定义与地下模式

### 1.83
- KTX2

### 1.84
- IE 11 结束使命

### 1.92
- 原生 Promise API

### 1.93
- 大气效果提升

### 1.96
- esbuild

### 1.97
- ModelAPI & CustomShaderAPI
- ModelExperimental 转正，移除旧版 Model API
- 3D Tiles Next 的几个扩展（将来是 1.1）得到实现
- 移除 CPU 端的实例化绘制（ModelInstanceCollection 这个私有类被移除，请改用 glTF 模型的 EXT_mesh_gpu_instancing 扩展实现模型的实例化）
- 对 glTF 1.0 的支持逐渐放弃，此版本后不再全量支持
- ModelMesh 和 ModelMaterial 类被移除
- glTF 的 KHR_techniques_webgl 扩展被移除

### 1.100
- 分包（npm workspaces packages）

### 1.101
- 实验性支持 3DTiles 体素渲染

### 1.102
- 底层默认改用 WebGL 2.0

### 1.103
- 相机运动的缓入缓出

### 1.107
- 移除大部分的 ready 和 readyPromise、使用 baseLayer 代替 imageryProvider

### 1.109
- 移除内置的 RequireJS，WebWorker 全部 ESM

### 1.116
- 移除Globe.terrainExaggeration
- Scene.verticalExaggeration 代替了 Globe.terrainExaggeration
- Scene.verticalExaggerationRelativeHeight 代替了 Globe.terrainExaggerationRelativeHeight

### 1.130.1
- 支持3D Texture 和3D 高斯渲染
