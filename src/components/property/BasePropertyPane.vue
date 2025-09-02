<!--
  对象基础属性编辑面板
  基于Cesium的实体基础属性编辑（名称、类型、显示状态等）
-->
<script setup>
import { ref, computed, inject, watch, onMounted } from 'vue';
import { ElInput, ElSwitch, ElMessage } from 'element-plus';
import 'element-plus/es/components/input/style/css';
import 'element-plus/es/components/switch/style/css';
import 'element-plus/es/components/message/style/css';

// 注入对象选择管理器
const objectSelection = inject('objectSelection');

// 响应式数据
const properties = ref({
  id: '',
  name: '',
  type: '',
  show: true,
  description: ''
});

// 计算属性 - 获取当前选中的实体
const selectedEntity = computed(() => {
  if (!objectSelection?.selectedObjects?.value || objectSelection.selectedObjects.value.size === 0) {
    return null;
  }
  // 获取第一个选中的对象
  const firstSelected = Array.from(objectSelection.selectedObjects.value)[0];
  return firstSelected || null;
});

/**
 * 获取实体类型
 */
function getEntityType(entity) {
  if (!entity) return 'Unknown';
  
  if (entity.billboard) return 'Billboard';
  if (entity.box) return 'Box';
  if (entity.cylinder) return 'Cylinder';
  if (entity.ellipse) return 'Ellipse';
  if (entity.ellipsoid) return 'Ellipsoid';
  if (entity.label) return 'Label';
  if (entity.model) return 'Model';
  if (entity.path) return 'Path';
  if (entity.plane) return 'Plane';
  if (entity.point) return 'Point';
  if (entity.polygon) return 'Polygon';
  if (entity.polyline) return 'Polyline';
  if (entity.polylineVolume) return 'PolylineVolume';
  if (entity.rectangle) return 'Rectangle';
  if (entity.wall) return 'Wall';
  return 'Entity';
}

/**
 * 从选中实体加载属性
 */
function loadFromEntity() {
  if (!selectedEntity.value) {
    // 没有选中对象时清空属性
    properties.value = {
      id: '',
      name: '',
      type: '',
      show: true,
      description: ''
    };
    return;
  }

  const entity = selectedEntity.value;
  properties.value = {
    id: entity.id || '',
    name: entity.name || '',
    type: getEntityType(entity),
    show: entity.show !== false,
    description: entity.description || ''
  };
}

/**
 * 应用属性到选中实体
 */
function applyToEntity() {
  if (!selectedEntity.value) return;

  try {
    const entity = selectedEntity.value;
    
    // 更新名称
    if (properties.value.name !== entity.name) {
      entity.name = properties.value.name;
    }
    
    // 更新显示状态
    if (properties.value.show !== entity.show) {
      entity.show = properties.value.show;
    }
    
    // 更新描述
    if (properties.value.description !== entity.description) {
      entity.description = properties.value.description;
    }
    
    ElMessage.success('属性已更新');
  } catch (error) {
    console.error('更新实体属性时出错:', error);
    ElMessage.error('更新属性失败');
  }
}

/**
 * 重置属性
 */
function resetProperties() {
  loadFromEntity();
}

/**
 * 复制对象ID到剪贴板
 */
async function copyIdToClipboard() {
  if (!properties.value.id) return;
  
  try {
    await navigator.clipboard.writeText(properties.value.id);
    ElMessage.success('ID已复制到剪贴板');
  } catch (error) {
    console.error('复制ID失败:', error);
    ElMessage.error('复制ID失败');
  }
}

// 监听选中对象变化
watch(selectedEntity, loadFromEntity, { immediate: true });

// 监听属性变化并实时应用（除了名称需要手动应用）
watch(() => properties.value.show, (newValue) => {
  if (selectedEntity.value && selectedEntity.value.show !== newValue) {
    selectedEntity.value.show = newValue;
  }
});

// 组件挂载时加载属性
onMounted(() => {
  loadFromEntity();
});
</script>

<template>
  <div class="base-property-pane">
    <div v-if="!selectedEntity" class="no-selection">
      <div class="no-selection-icon">📭</div>
      <div class="no-selection-text">未选中任何对象</div>
    </div>

    <div v-else class="property-content">
      <div class="property-section">
        <h4 class="section-title">基础信息</h4>
        
        <div class="property-item">
          <label>ID</label>
          <div class="id-display">
            <span class="id-text">{{ properties.id }}</span>
            <button 
              class="copy-btn"
              @click="copyIdToClipboard"
              title="复制ID"
            >
              📋
            </button>
          </div>
        </div>
        
        <div class="property-item">
          <label>类型</label>
          <span class="type-badge">{{ properties.type }}</span>
        </div>
        
        <div class="property-item">
          <label>名称</label>
          <div class="name-input-group">
            <ElInput 
              v-model="properties.name"
              placeholder="输入对象名称"
              size="small"
              @blur="applyToEntity"
              @keyup.enter="applyToEntity"
            />
          </div>
        </div>
        
        <div class="property-item">
          <label>显示</label>
          <ElSwitch v-model="properties.show" />
        </div>
      </div>

      <div class="property-section">
        <h4 class="section-title">描述信息</h4>
        
        <div class="property-item">
          <label>描述</label>
          <ElInput 
            v-model="properties.description"
            type="textarea"
            :rows="3"
            placeholder="输入对象描述"
            size="small"
            @blur="applyToEntity"
          />
        </div>
      </div>

      <div class="property-actions">
        <button class="action-btn" @click="resetProperties">
          重置
        </button>
        <button class="action-btn primary" @click="applyToEntity">
          应用
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-property-pane {
  padding: 16px;
  color: #fff;
  background: #2a2a2a;
  height: 100%;
  overflow-y: auto;
}

.no-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
}

.no-selection-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.no-selection-text {
  font-size: 14px;
}

.property-content {
  height: 100%;
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
  margin-bottom: 12px;
  
  label {
    display: block;
    font-size: 12px;
    color: #ccc;
    margin-bottom: 4px;
  }
}

.id-display {
  display: flex;
  align-items: center;
  background: #333;
  border-radius: 4px;
  padding: 6px 8px;
}

.id-text {
  flex: 1;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #aaa;
  word-break: break-all;
}

.copy-btn {
  background: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 2px;
  transition: background 0.2s;

  &:hover {
    background: #444;
  }
}

.type-badge {
  display: inline-block;
  padding: 4px 8px;
  background: #007acc;
  color: #fff;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

.name-input-group {
  display: flex;
  gap: 8px;
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

  &.primary {
    background: #007acc;

    &:hover {
      background: #0088dd;
    }
  }

  &:active {
    background: #444;
  }
}

// Element Plus 组件样式覆盖
:deep(.el-input__wrapper) {
  background-color: #444;
  border: 1px solid #555;
  box-shadow: none;
}

:deep(.el-input__inner) {
  background-color: transparent;
  color: #fff;
  
  &::placeholder {
    color: #888;
  }
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #007acc;
  box-shadow: 0 0 0 1px rgba(0, 122, 204, 0.2);
}

:deep(.el-switch) {
  --el-switch-on-color: #007acc;
  --el-switch-off-color: #555;
}

:deep(.el-textarea__inner) {
  background-color: #444;
  border-color: #555;
  color: #fff;
  
  &::placeholder {
    color: #888;
  }
  
  &:focus {
    border-color: #007acc;
    box-shadow: 0 0 0 1px rgba(0, 122, 204, 0.2);
  }
}
</style>
