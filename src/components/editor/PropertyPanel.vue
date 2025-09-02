<!--
 * 属性面板组件
 * 显示选中对象的属性编辑界面
-->
<script setup>
import { ref } from 'vue'
import { ElTabs, ElTabPane, ElCard, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElSwitch } from 'element-plus'

// 响应式数据
const activeTab = ref('properties')
const selectedObject = ref(null)

// 模拟选中对象数据
const objectProperties = ref({
  name: '未选中对象',
  type: '',
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  visible: true,
  locked: false
})

// 场景属性
const sceneProperties = ref({
  backgroundColor: '#1e1e1e',
  fog: true,
  shadows: true,
  lighting: true,
  terrain: true,
  atmosphere: true
})

// 方法
/**
 * 更新对象属性
 */
const updateObjectProperty = (key, value) => {
  if (selectedObject.value) {
    objectProperties.value[key] = value
    // TODO: 实际更新场景中的对象
  }
}

/**
 * 更新场景属性
 */
const updateSceneProperty = (key, value) => {
  sceneProperties.value[key] = value
  // TODO: 实际更新场景配置
}
</script>

<template>
  <div class="property-panel">
    <!-- 面板标题 -->
    <div class="panel-header">
      <span>属性面板</span>
    </div>
    
    <!-- 面板内容 -->
    <div class="panel-content">
      <!-- 标签页 -->
      <el-tabs v-model="activeTab" type="card">
        <!-- 对象属性 -->
        <el-tab-pane label="对象属性" name="properties">
          <div v-if="!selectedObject" class="no-selection">
            <div class="no-selection-icon">🎯</div>
            <div class="no-selection-text">请在地图上选择一个对象</div>
          </div>
          
          <div v-else class="object-properties">
            <el-form label-position="top" size="small">
              <!-- 基础信息 -->
              <div class="property-group">
                <div class="group-title">基础信息</div>
                <div class="group-content">
                  <el-form-item label="名称">
                    <el-input 
                      v-model="objectProperties.name"
                      @input="updateObjectProperty('name', $event)"
                    />
                  </el-form-item>
                  
                  <el-form-item label="类型">
                    <el-input 
                      v-model="objectProperties.type" 
                      readonly
                    />
                  </el-form-item>
                </div>
              </div>
              
              <!-- 变换属性 -->
              <div class="property-group">
                <div class="group-title">变换</div>
                <div class="group-content">
                  <el-form-item label="位置">
                    <div class="vector-input">
                      <el-input 
                        v-model.number="objectProperties.position.x"
                        placeholder="X"
                        @input="updateObjectProperty('position', objectProperties.position)"
                      />
                      <el-input 
                        v-model.number="objectProperties.position.y"
                        placeholder="Y"
                        @input="updateObjectProperty('position', objectProperties.position)"
                      />
                      <el-input 
                        v-model.number="objectProperties.position.z"
                        placeholder="Z"
                        @input="updateObjectProperty('position', objectProperties.position)"
                      />
                    </div>
                  </el-form-item>
                  
                  <el-form-item label="旋转">
                    <div class="vector-input">
                      <el-input 
                        v-model.number="objectProperties.rotation.x"
                        placeholder="X"
                        @input="updateObjectProperty('rotation', objectProperties.rotation)"
                      />
                      <el-input 
                        v-model.number="objectProperties.rotation.y"
                        placeholder="Y"
                        @input="updateObjectProperty('rotation', objectProperties.rotation)"
                      />
                      <el-input 
                        v-model.number="objectProperties.rotation.z"
                        placeholder="Z"
                        @input="updateObjectProperty('rotation', objectProperties.rotation)"
                      />
                    </div>
                  </el-form-item>
                  
                  <el-form-item label="缩放">
                    <div class="vector-input">
                      <el-input 
                        v-model.number="objectProperties.scale.x"
                        placeholder="X"
                        @input="updateObjectProperty('scale', objectProperties.scale)"
                      />
                      <el-input 
                        v-model.number="objectProperties.scale.y"
                        placeholder="Y"
                        @input="updateObjectProperty('scale', objectProperties.scale)"
                      />
                      <el-input 
                        v-model.number="objectProperties.scale.z"
                        placeholder="Z"
                        @input="updateObjectProperty('scale', objectProperties.scale)"
                      />
                    </div>
                  </el-form-item>
                </div>
              </div>
              
              <!-- 显示属性 -->
              <div class="property-group">
                <div class="group-title">显示</div>
                <div class="group-content">
                  <el-form-item label="可见性">
                    <el-switch 
                      v-model="objectProperties.visible"
                      @change="updateObjectProperty('visible', $event)"
                    />
                  </el-form-item>
                  
                  <el-form-item label="锁定">
                    <el-switch 
                      v-model="objectProperties.locked"
                      @change="updateObjectProperty('locked', $event)"
                    />
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        
        <!-- 场景属性 -->
        <el-tab-pane label="场景属性" name="scene">
          <div class="scene-properties">
            <el-form label-position="top" size="small">
              <!-- 渲染设置 -->
              <div class="property-group">
                <div class="group-title">渲染设置</div>
                <div class="group-content">
                  <el-form-item label="背景颜色">
                    <el-input 
                      v-model="sceneProperties.backgroundColor"
                      @input="updateSceneProperty('backgroundColor', $event)"
                    />
                  </el-form-item>
                  
                  <el-form-item label="雾效果">
                    <el-switch 
                      v-model="sceneProperties.fog"
                      @change="updateSceneProperty('fog', $event)"
                    />
                  </el-form-item>
                  
                  <el-form-item label="阴影">
                    <el-switch 
                      v-model="sceneProperties.shadows"
                      @change="updateSceneProperty('shadows', $event)"
                    />
                  </el-form-item>
                  
                  <el-form-item label="光照">
                    <el-switch 
                      v-model="sceneProperties.lighting"
                      @change="updateSceneProperty('lighting', $event)"
                    />
                  </el-form-item>
                </div>
              </div>
              
              <!-- 地图设置 -->
              <div class="property-group">
                <div class="group-title">地图设置</div>
                <div class="group-content">
                  <el-form-item label="地形">
                    <el-switch 
                      v-model="sceneProperties.terrain"
                      @change="updateSceneProperty('terrain', $event)"
                    />
                  </el-form-item>
                  
                  <el-form-item label="大气">
                    <el-switch 
                      v-model="sceneProperties.atmosphere"
                      @change="updateSceneProperty('atmosphere', $event)"
                    />
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        
        <!-- 图层管理 -->
        <el-tab-pane label="图层管理" name="layers">
          <div class="layer-management">
            <div class="file-info">
              <p>图层管理器</p>
              <p class="text-secondary">功能待实现</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
.property-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #252525;
}

.panel-header {
  height: 40px;
  background-color: #333333;
  border-bottom: 1px solid #404040;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
}

.panel-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.no-selection {
  text-align: center;
  padding: 40px 20px;
  color: #888888;
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
  color: #cccccc;
  border-bottom: 1px solid #404040;
  padding-bottom: 4px;
}

.group-content {
  padding-left: 8px;
}

.vector-input {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4px;
}

.file-info {
  text-align: center;
  padding: 20px;
  color: #888888;
}

.file-info p {
  margin-bottom: 8px;
}

.text-secondary {
  color: #666666;
  font-size: 12px;
}

/* Element Plus 组件样式覆盖 */
:deep(.el-tabs__nav) {
  background-color: #2d2d2d;
}

:deep(.el-tabs__item) {
  color: #aaaaaa;
  border-color: #555555;
}

:deep(.el-tabs__item.is-active) {
  color: #007acc;
  background-color: #252525;
}

:deep(.el-tabs__content) {
  color: #ffffff;
}

:deep(.el-form-item__label) {
  color: #cccccc !important;
  font-size: 12px;
}

:deep(.el-input__wrapper) {
  background-color: #3c3c3c;
  border-color: #555555;
}

:deep(.el-input__inner) {
  color: #ffffff;
  font-size: 12px;
}

:deep(.el-switch__core) {
  background-color: #555555;
}

:deep(.el-switch.is-checked .el-switch__core) {
  background-color: #007acc;
}

/* 滚动条样式 */
.panel-content::-webkit-scrollbar {
  width: 6px;
}

.panel-content::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.panel-content::-webkit-scrollbar-thumb {
  background: #404040;
  border-radius: 3px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: #555555;
}
</style>
