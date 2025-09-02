<!--
  属性面板组件
  参考 three-editor-by-ai 工程，采用 button tabs 实现方式和深色 UI 风格
  Tabs: 对象属性、场景属性、图层管理
  严格遵循 Vue 代码规范
-->
<script setup>
import { ref } from 'vue'

/**
 * 当前激活的标签页
 * @type {import('vue').Ref<string>}
 */
const activeTab = ref('properties')

/**
 * 是否有选中对象（预留，实际应由外部传入或组合式函数管理）
 * @type {import('vue').Ref<boolean>}
 */
const hasSelection = ref(false)

/**
 * 选中对象属性（预留）
 */
const objectProperties = ref({
  name: '未选中对象',
  type: '',
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  visible: true,
  locked: false
})

/**
 * 场景属性（预留）
 */
const sceneProperties = ref({
  backgroundColor: '#1e1e1e',
  fog: true,
  shadows: true,
  lighting: true,
  terrain: true,
  atmosphere: true
})

/**
 * 更新对象属性（预留）
 */
function updateObjectProperty(key, value) {
  objectProperties.value[key] = value
}

/**
 * 更新场景属性（预留）
 */
function updateSceneProperty(key, value) {
  sceneProperties.value[key] = value
}
</script>

<template>
  <div class="property-panel">
    <!-- 标签页头部 -->
    <div class="panel-tabs">
      <button
        @click="activeTab = 'properties'"
        :class="['tab-btn', { active: activeTab === 'properties' }]"
      >对象属性</button>
      <button
        @click="activeTab = 'scene'"
        :class="['tab-btn', { active: activeTab === 'scene' }]"
      >场景属性</button>
      <button
        @click="activeTab = 'layers'"
        :class="['tab-btn', { active: activeTab === 'layers' }]"
      >图层管理</button>
    </div>
    <div class="panel-content">
      <!-- 对象属性 -->
      <div v-show="activeTab === 'properties'">
        <div v-if="!hasSelection" class="no-selection">
          <div class="no-selection-icon">🎯</div>
          <div class="no-selection-text">请在地图上选择一个对象</div>
        </div>
        <div v-else class="object-properties">
          <div class="property-group">
            <div class="group-title">基础信息</div>
            <div class="group-content">
              <label>名称</label>
              <input v-model="objectProperties.name" @input="updateObjectProperty('name', objectProperties.name)" class="input" />
              <label>类型</label>
              <input v-model="objectProperties.type" readonly class="input" />
            </div>
          </div>
          <div class="property-group">
            <div class="group-title">变换</div>
            <div class="group-content vector-input">
              <label>位置</label>
              <input v-model.number="objectProperties.position.x" placeholder="X" class="input" />
              <input v-model.number="objectProperties.position.y" placeholder="Y" class="input" />
              <input v-model.number="objectProperties.position.z" placeholder="Z" class="input" />
              <label>旋转</label>
              <input v-model.number="objectProperties.rotation.x" placeholder="X" class="input" />
              <input v-model.number="objectProperties.rotation.y" placeholder="Y" class="input" />
              <input v-model.number="objectProperties.rotation.z" placeholder="Z" class="input" />
              <label>缩放</label>
              <input v-model.number="objectProperties.scale.x" placeholder="X" class="input" />
              <input v-model.number="objectProperties.scale.y" placeholder="Y" class="input" />
              <input v-model.number="objectProperties.scale.z" placeholder="Z" class="input" />
            </div>
          </div>
          <div class="property-group">
            <div class="group-title">显示</div>
            <div class="group-content">
              <label>可见性</label>
              <input type="checkbox" v-model="objectProperties.visible" />
              <label>锁定</label>
              <input type="checkbox" v-model="objectProperties.locked" />
            </div>
          </div>
        </div>
      </div>
      <!-- 场景属性 -->
      <div v-show="activeTab === 'scene'" class="scene-properties">
        <div class="property-group">
          <div class="group-title">渲染设置</div>
          <div class="group-content">
            <label>背景颜色</label>
            <input v-model="sceneProperties.backgroundColor" class="input" />
            <label>雾效果</label>
            <input type="checkbox" v-model="sceneProperties.fog" />
            <label>阴影</label>
            <input type="checkbox" v-model="sceneProperties.shadows" />
            <label>光照</label>
            <input type="checkbox" v-model="sceneProperties.lighting" />
          </div>
        </div>
        <div class="property-group">
          <div class="group-title">地图设置</div>
          <div class="group-content">
            <label>地形</label>
            <input type="checkbox" v-model="sceneProperties.terrain" />
            <label>大气</label>
            <input type="checkbox" v-model="sceneProperties.atmosphere" />
          </div>
        </div>
      </div>
      <!-- 图层管理 -->
      <div v-show="activeTab === 'layers'" class="layer-management">
        <div class="file-info">
          <p>图层管理器</p>
          <p class="text-secondary">功能待实现</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.property-panel {
  width: 300px;
  height: 100%;
  background: #2a2a2a;
  border-left: 1px solid #444;
  display: flex;
  flex-direction: column;
  color: #fff;
  min-height: 0;
}
.panel-tabs {
  display: flex;
  background: #333;
  border-bottom: 1px solid #444;
}
.tab-btn {
  flex: 1;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: #aaa;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.tab-btn:hover {
  background: #444;
  color: #fff;
}
.tab-btn.active {
  background: #2a2a2a;
  border-bottom-color: #007acc;
  color: #fff;
}
.panel-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 12px;
}
.no-selection {
  text-align: center;
  padding: 40px 20px;
  color: #888;
}
.no-selection-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.no-selection-text {
  font-size: 14px;
}
.property-group {
  margin-bottom: 20px;
}
.group-title {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 12px;
  color: #ccc;
  border-bottom: 1px solid #404040;
  padding-bottom: 4px;
}
.group-content {
  padding-left: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.vector-input {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}
.input {
  background: #333;
  border: 1px solid #555;
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  outline: none;
}
.input:focus {
  border-color: #007acc;
}
.file-info {
  text-align: center;
  padding: 20px;
  color: #888;
}
.file-info p {
  margin-bottom: 8px;
}
.text-secondary {
  color: #666;
  font-size: 12px;
}
</style>
