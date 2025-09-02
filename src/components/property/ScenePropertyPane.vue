<!--
  场景属性编辑面板
  基于Cesium 1.132.0的场景全局属性配置
-->
<script setup>
import { ref, computed, inject, onMounted, watch } from 'vue';
import { ElSlider, ElSwitch, ElColorPicker, ElSelect, ElOption } from 'element-plus';
import 'element-plus/es/components/slider/style/css';
import 'element-plus/es/components/switch/style/css';
import 'element-plus/es/components/color-picker/style/css';
import 'element-plus/es/components/select/style/css';
import 'element-plus/es/components/option/style/css';

// 注入场景管理器
const scene = inject('scene');

// 响应式数据
const sceneConfig = ref({
  // 基础设置
  enableLighting: true,
  showSkyBox: true,
  showSkyAtmosphere: true,
  enableFog: true,
  
  // 地形设置
  enableTerrain: false,
  verticalExaggeration: 1.0,
  
  // 渲染设置
  enableShadows: false,
  shadowMapSize: 1024,
  maximumRenderTimeChange: 0.0,
  
  // 大气设置
  atmosphereBrightness: 1.0,
  atmosphereHueShift: 0.0,
  atmosphereSaturation: 1.0,
  
  // 光照设置
  sunIntensity: 1.0,
  moonIntensity: 0.1,
  
  // 相机设置
  enableCollisionDetection: true,
  minimumZoomDistance: 1.0,
  maximumZoomDistance: 40075017.0
});

/**
 * 应用场景配置到Cesium viewer
 */
function applySceneConfig() {
  if (!scene?.viewer) return;
  
  const viewer = scene.viewer;
  const cesiumScene = viewer.scene;
  
  try {
    // 基础设置
    cesiumScene.globe.enableLighting = sceneConfig.value.enableLighting;
    cesiumScene.skyBox.show = sceneConfig.value.showSkyBox;
    cesiumScene.skyAtmosphere.show = sceneConfig.value.showSkyAtmosphere;
    cesiumScene.fog.enabled = sceneConfig.value.enableFog;
    
    // 地形设置 - 使用新版API
    if (sceneConfig.value.enableTerrain) {
      // TODO: 实现地形提供者设置
    }
    cesiumScene.verticalExaggeration = sceneConfig.value.verticalExaggeration;
    
    // 阴影设置
    cesiumScene.shadowMap.enabled = sceneConfig.value.enableShadows;
    if (sceneConfig.value.enableShadows) {
      cesiumScene.shadowMap.size = sceneConfig.value.shadowMapSize;
    }
    
    // 渲染性能设置
    cesiumScene.maximumRenderTimeChange = sceneConfig.value.maximumRenderTimeChange;
    
    // 大气设置
    if (cesiumScene.skyAtmosphere) {
      cesiumScene.skyAtmosphere.brightnessShift = sceneConfig.value.atmosphereBrightness - 1.0;
      cesiumScene.skyAtmosphere.hueShift = sceneConfig.value.atmosphereHueShift;
      cesiumScene.skyAtmosphere.saturationShift = sceneConfig.value.atmosphereSaturation - 1.0;
    }
    
    // 相机设置
    if (viewer.scene.screenSpaceCameraController) {
      viewer.scene.screenSpaceCameraController.enableCollisionDetection = sceneConfig.value.enableCollisionDetection;
      viewer.scene.screenSpaceCameraController.minimumZoomDistance = sceneConfig.value.minimumZoomDistance;
      viewer.scene.screenSpaceCameraController.maximumZoomDistance = sceneConfig.value.maximumZoomDistance;
    }
    
  } catch (error) {
    console.error('应用场景配置时出错:', error);
  }
}

/**
 * 从Cesium viewer读取当前配置
 */
function loadSceneConfig() {
  if (!scene?.viewer) return;
  
  const viewer = scene.viewer;
  const cesiumScene = viewer.scene;
  
  try {
    sceneConfig.value = {
      // 基础设置
      enableLighting: cesiumScene.globe.enableLighting,
      showSkyBox: cesiumScene.skyBox.show,
      showSkyAtmosphere: cesiumScene.skyAtmosphere.show,
      enableFog: cesiumScene.fog.enabled,
      
      // 地形设置
      enableTerrain: false, // TODO: 检测地形提供者
      verticalExaggeration: cesiumScene.verticalExaggeration || 1.0,
      
      // 渲染设置
      enableShadows: cesiumScene.shadowMap.enabled,
      shadowMapSize: cesiumScene.shadowMap.size || 1024,
      maximumRenderTimeChange: cesiumScene.maximumRenderTimeChange || 0.0,
      
      // 大气设置
      atmosphereBrightness: (cesiumScene.skyAtmosphere?.brightnessShift || 0) + 1.0,
      atmosphereHueShift: cesiumScene.skyAtmosphere?.hueShift || 0,
      atmosphereSaturation: (cesiumScene.skyAtmosphere?.saturationShift || 0) + 1.0,
      
      // 光照设置
      sunIntensity: 1.0, // TODO: 获取实际光照强度
      moonIntensity: 0.1,
      
      // 相机设置
      enableCollisionDetection: viewer.scene.screenSpaceCameraController?.enableCollisionDetection ?? true,
      minimumZoomDistance: viewer.scene.screenSpaceCameraController?.minimumZoomDistance ?? 1.0,
      maximumZoomDistance: viewer.scene.screenSpaceCameraController?.maximumZoomDistance ?? 40075017.0
    };
  } catch (error) {
    console.error('读取场景配置时出错:', error);
  }
}

/**
 * 重置为默认设置
 */
function resetToDefaults() {
  sceneConfig.value = {
    enableLighting: true,
    showSkyBox: true,
    showSkyAtmosphere: true,
    enableFog: true,
    enableTerrain: false,
    verticalExaggeration: 1.0,
    enableShadows: false,
    shadowMapSize: 1024,
    maximumRenderTimeChange: 0.0,
    atmosphereBrightness: 1.0,
    atmosphereHueShift: 0.0,
    atmosphereSaturation: 1.0,
    sunIntensity: 1.0,
    moonIntensity: 0.1,
    enableCollisionDetection: true,
    minimumZoomDistance: 1.0,
    maximumZoomDistance: 40075017.0
  };
  applySceneConfig();
}

// 阴影贴图尺寸选项
const shadowMapSizes = [
  { label: '512x512', value: 512 },
  { label: '1024x1024', value: 1024 },
  { label: '2048x2048', value: 2048 },
  { label: '4096x4096', value: 4096 }
];

// 监听配置变化并应用
watch(sceneConfig, applySceneConfig, { deep: true });

// 组件挂载时加载当前配置
onMounted(() => {
  loadSceneConfig();
});
</script>

<template>
  <div class="scene-property-pane">
    <div class="property-section">
      <h4 class="section-title">基础设置</h4>
      
      <div class="property-item">
        <label>启用光照</label>
        <ElSwitch v-model="sceneConfig.enableLighting" />
      </div>
      
      <div class="property-item">
        <label>显示天空盒</label>
        <ElSwitch v-model="sceneConfig.showSkyBox" />
      </div>
      
      <div class="property-item">
        <label>显示大气效果</label>
        <ElSwitch v-model="sceneConfig.showSkyAtmosphere" />
      </div>
      
      <div class="property-item">
        <label>启用雾效</label>
        <ElSwitch v-model="sceneConfig.enableFog" />
      </div>
    </div>

    <div class="property-section">
      <h4 class="section-title">地形设置</h4>
      
      <div class="property-item">
        <label>启用地形</label>
        <ElSwitch v-model="sceneConfig.enableTerrain" />
      </div>
      
      <div class="property-item">
        <label>垂直夸张 ({{ sceneConfig.verticalExaggeration.toFixed(1) }})</label>
        <ElSlider 
          v-model="sceneConfig.verticalExaggeration"
          :min="0.1"
          :max="10.0"
          :step="0.1"
          style="width: 100px;"
        />
      </div>
    </div>

    <div class="property-section">
      <h4 class="section-title">渲染设置</h4>
      
      <div class="property-item">
        <label>启用阴影</label>
        <ElSwitch v-model="sceneConfig.enableShadows" />
      </div>
      
      <div class="property-item" v-if="sceneConfig.enableShadows">
        <label>阴影贴图尺寸</label>
        <ElSelect v-model="sceneConfig.shadowMapSize" style="width: 120px;">
          <ElOption
            v-for="size in shadowMapSizes"
            :key="size.value"
            :label="size.label"
            :value="size.value"
          />
        </ElSelect>
      </div>
      
      <div class="property-item">
        <label>最大渲染时间变化 ({{ sceneConfig.maximumRenderTimeChange.toFixed(1) }})</label>
        <ElSlider 
          v-model="sceneConfig.maximumRenderTimeChange"
          :min="0.0"
          :max="5.0"
          :step="0.1"
          style="width: 100px;"
        />
      </div>
    </div>

    <div class="property-section" v-if="sceneConfig.showSkyAtmosphere">
      <h4 class="section-title">大气设置</h4>
      
      <div class="property-item">
        <label>亮度 ({{ sceneConfig.atmosphereBrightness.toFixed(2) }})</label>
        <ElSlider 
          v-model="sceneConfig.atmosphereBrightness"
          :min="0.0"
          :max="3.0"
          :step="0.01"
          style="width: 100px;"
        />
      </div>
      
      <div class="property-item">
        <label>色相偏移 ({{ sceneConfig.atmosphereHueShift.toFixed(2) }})</label>
        <ElSlider 
          v-model="sceneConfig.atmosphereHueShift"
          :min="-1.0"
          :max="1.0"
          :step="0.01"
          style="width: 100px;"
        />
      </div>
      
      <div class="property-item">
        <label>饱和度 ({{ sceneConfig.atmosphereSaturation.toFixed(2) }})</label>
        <ElSlider 
          v-model="sceneConfig.atmosphereSaturation"
          :min="0.0"
          :max="3.0"
          :step="0.01"
          style="width: 100px;"
        />
      </div>
    </div>

    <div class="property-section">
      <h4 class="section-title">相机设置</h4>
      
      <div class="property-item">
        <label>启用碰撞检测</label>
        <ElSwitch v-model="sceneConfig.enableCollisionDetection" />
      </div>
      
      <div class="property-item">
        <label>最小缩放距离 ({{ sceneConfig.minimumZoomDistance.toFixed(1) }}m)</label>
        <ElSlider 
          v-model="sceneConfig.minimumZoomDistance"
          :min="0.1"
          :max="1000.0"
          :step="0.1"
          style="width: 100px;"
        />
      </div>
    </div>

    <div class="property-actions">
      <button class="action-btn" @click="resetToDefaults">
        重置默认
      </button>
      <button class="action-btn" @click="loadSceneConfig">
        刷新配置
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scene-property-pane {
  padding: 16px;
  color: #fff;
  background: #2a2a2a;
  height: 100%;
  overflow-y: auto;
}

.property-section {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #444;

  &:last-of-type {
    border-bottom: none;
  }
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #e0e0e0;
  display: flex;
  align-items: center;
}

.property-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  
  label {
    font-size: 12px;
    color: #ccc;
    flex: 1;
    margin-right: 8px;
  }
}

.property-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #444;
}

.action-btn {
  flex: 1;
  padding: 8px 12px;
  background: #555;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #666;
  }

  &:active {
    background: #444;
  }
}

// Element Plus 组件样式覆盖
:deep(.el-switch) {
  --el-switch-on-color: #007acc;
  --el-switch-off-color: #555;
}

:deep(.el-slider) {
  --el-slider-main-bg-color: #007acc;
  --el-slider-runway-bg-color: #444;
  --el-slider-button-bg-color: #fff;
}

:deep(.el-select) {
  --el-select-input-color: #fff;
  --el-select-border-color-hover: #007acc;
  --el-select-input-focus-border-color: #007acc;
}

:deep(.el-input__inner) {
  background-color: #444 !important;
  border-color: #555 !important;
  color: #fff !important;
}

:deep(.el-popper) {
  --el-bg-color: #333 !important;
  --el-text-color-primary: #fff !important;
  --el-border-color-light: #555 !important;
}
</style>
