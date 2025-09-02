<!--
  对象检查器组件
  基于Cesium的地图标绘编辑器对象层级管理
-->
<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';

 // 注入标绘环境管理器和对象选择
const plot = inject('plot');
const objectSelection = inject('objectSelection');

// 定义事件
const emit = defineEmits(['delete-selected']);

// 响应式数据
const plotObjects = ref([]);
const expandedFolders = ref(new Set());

/**
 * 刷新标绘对象列表
 */
function refreshObjects() {
  if (!plot?.viewer?.scene) return;
  
  const entities = plot.viewer.entities.values;
  plotObjects.value = entities.map(entity => ({
    id: entity.id,
    name: entity.name || `Entity ${entity.id.substr(0, 8)}`,
    type: getEntityType(entity),
    visible: entity.show !== false,
    locked: entity.userData?.locked === true,
    entity: entity
  }));
}

/**
 * 获取实体类型
 */
function getEntityType(entity) {
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
 * 获取对象图标
 */
function getObjectIcon(type) {
  const icons = {
    'Billboard': '🖼️',
    'Box': '📦',
    'Cylinder': '🥫',
    'Ellipse': '⭕',
    'Ellipsoid': '🥚',
    'Label': '🏷️',
    'Model': '🏗️',
    'Path': '🛤️',
    'Plane': '✈️',
    'Point': '📍',
    'Polygon': '🔷',
    'Polyline': '📏',
    'PolylineVolume': '📐',
    'Rectangle': '▭',
    'Wall': '🧱',
    'Entity': '📄'
  };
  return icons[type] || '📄';
}

/**
 * 处理对象选择
 */
function handleObjectSelect(obj) {
  if (obj.locked) {
    ElMessage.warning('该对象已被锁定');
    return;
  }
  
  objectSelection?.selectObject(obj.entity);
}

/**
 * 切换对象可见性
 */
function toggleVisibility(obj) {
  obj.entity.show = !obj.visible;
  obj.visible = !obj.visible;
}

/**
 * 切换对象锁定状态
 */
function toggleLock(obj) {
  if (!obj.entity.userData) {
    obj.entity.userData = {};
  }
  obj.entity.userData.locked = !obj.locked;
  obj.locked = !obj.locked;
}

/**
 * 删除对象
 */
function deleteObject(obj) {
  ElMessageBox.confirm(`确定要删除对象 "${obj.name}" 吗？`, '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    plot.viewer.entities.remove(obj.entity);
    refreshObjects();
    ElMessage.success('对象已删除');
  }).catch(() => {});
}

/**
 * 重命名对象
 */
function renameObject(obj) {
  ElMessageBox.prompt('请输入新名称', '重命名对象', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: obj.name
  }).then(({ value }) => {
    if (value && value.trim()) {
      obj.entity.name = value.trim();
      obj.name = value.trim();
      ElMessage.success('重命名成功');
    }
  }).catch(() => {});
}

/**
 * 聚焦到对象
 */
function focusObject(obj) {
  if (plot.viewer && obj.entity) {
    plot.viewer.trackedEntity = obj.entity;
    setTimeout(() => {
      plot.viewer.trackedEntity = undefined;
    }, 3000);
  }
}

// 场景事件监听
let entityAddedListener = null;
let entityRemovedListener = null;

onMounted(() => {
  refreshObjects();
  
  if (plot?.viewer?.entities) {
    entityAddedListener = plot.viewer.entities.collectionChanged.addEventListener(() => {
      refreshObjects();
    });
  }
});

onUnmounted(() => {
  if (entityAddedListener) {
    entityAddedListener();
  }
  if (entityRemovedListener) {
    entityRemovedListener();
  }
});

// 计算属性
const selectedObjectIds = computed(() => {
  return objectSelection?.selectedObjectIds?.value || new Set();
});
</script>

<template>
  <div class="inspector">
    <div class="inspector-header">
      <div class="header-title">场景层级</div>
      <div class="header-actions">
        <button 
          class="action-btn" 
          @click="refreshObjects"
          title="刷新"
        >
          🔄
        </button>
        <button 
          class="action-btn"
          @click="emit('delete-selected')"
          :disabled="selectedObjectIds.size === 0"
          title="删除选中"
        >
          🗑️
        </button>
      </div>
    </div>

    <div class="object-list">
      <div v-if="plotObjects.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <div class="empty-text">标绘环境中暂无对象</div>
      </div>

      <div 
        v-for="obj in plotObjects"
        :key="obj.id"
        :class="[
          'object-item',
          { 
            'selected': selectedObjectIds.has(obj.id),
            'locked': obj.locked,
            'hidden': !obj.visible
          }
        ]"
        @click="handleObjectSelect(obj)"
        @dblclick="focusObject(obj)"
      >
        <div class="object-main">
          <span class="object-icon">{{ getObjectIcon(obj.type) }}</span>
          <div class="object-info">
            <div class="object-name">{{ obj.name }}</div>
            <div class="object-type">{{ obj.type }}</div>
          </div>
        </div>

        <div class="object-actions">
          <button 
            class="mini-btn"
            @click.stop="toggleVisibility(obj)"
            :title="obj.visible ? '隐藏' : '显示'"
          >
            {{ obj.visible ? '👁️' : '🙈' }}
          </button>
          <button 
            class="mini-btn"
            @click.stop="toggleLock(obj)"
            :title="obj.locked ? '解锁' : '锁定'"
          >
            {{ obj.locked ? '🔒' : '🔓' }}
          </button>
          <button 
            class="mini-btn"
            @click.stop="renameObject(obj)"
            title="重命名"
          >
            ✏️
          </button>
          <button 
            class="mini-btn delete-btn"
            @click.stop="deleteObject(obj)"
            title="删除"
          >
            ❌
          </button>
        </div>
      </div>
    </div>

    <div class="inspector-footer">
      <div class="object-count">
        共 {{ plotObjects.length }} 个对象
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inspector {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #2a2a2a;
  color: #fff;
}

.inspector-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #333;
  border-bottom: 1px solid #444;
}

.header-title {
  font-weight: 500;
  font-size: 14px;
}

.header-actions {
  display: flex;
  gap: 4px;
}

.action-btn {
  background: #555;
  border: none;
  color: #fff;
  padding: 4px 6px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #666;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.object-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.empty-text {
  font-size: 14px;
}

.object-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;

  &:hover {
    background: #444;
  }

  &.selected {
    background: #007acc;
    border-color: #0088dd;
  }

  &.locked {
    opacity: 0.7;
    border-left: 3px solid #ff9800;
  }

  &.hidden {
    opacity: 0.5;
  }
}

.object-main {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.object-icon {
  margin-right: 8px;
  font-size: 16px;
  flex-shrink: 0;
}

.object-info {
  flex: 1;
  min-width: 0;
}

.object-name {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.object-type {
  font-size: 11px;
  color: #aaa;
  margin-top: 1px;
}

.object-actions {
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.2s;
}

.object-item:hover .object-actions {
  opacity: 1;
}

.mini-btn {
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: #fff;
  padding: 2px 4px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 10px;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  &.delete-btn:hover {
    background: #e74c3c;
  }
}

.inspector-footer {
  padding: 8px 12px;
  background: #333;
  border-top: 1px solid #444;
  font-size: 12px;
  color: #aaa;
  text-align: center;
}
</style>
