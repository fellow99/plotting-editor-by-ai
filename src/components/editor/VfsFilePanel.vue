<!--
  虚拟文件系统面板
  基于Cesium的地图标绘编辑器文件管理组件
-->
<script setup>
import { ref, onMounted, inject } from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

// 注入场景管理器
const scene = inject('scene');

// 响应式数据
const files = ref([]);
const folders = ref([]);
const currentPath = ref('/');
const loading = ref(false);

/**
 * 加载文件列表
 */
async function loadFiles(path = '/') {
  loading.value = true;
  try {
    // TODO: 实现虚拟文件系统API调用
    // 临时模拟数据
    files.value = [
      {
        name: 'terrain.czml',
        type: 'czml',
        size: '1.2MB',
        path: path + 'terrain.czml'
      },
      {
        name: 'building.kml',
        type: 'kml',
        size: '856KB',
        path: path + 'building.kml'
      }
    ];
    folders.value = [
      {
        name: 'models',
        type: 'folder',
        path: path + 'models/'
      }
    ];
  } catch (error) {
    ElMessage.error('加载文件列表失败');
    console.error('Load files error:', error);
  } finally {
    loading.value = false;
  }
}

/**
 * 处理文件拖拽开始
 */
function handleDragStart(event, file) {
  event.dataTransfer.setData('application/json', JSON.stringify({
    type: 'vfs-file',
    file: file
  }));
  event.dataTransfer.effectAllowed = 'copy';
}

/**
 * 处理文件夹点击
 */
function handleFolderClick(folder) {
  currentPath.value = folder.path;
  loadFiles(folder.path);
}

/**
 * 返回上级目录
 */
function goBack() {
  const parts = currentPath.value.split('/').filter(p => p);
  if (parts.length > 0) {
    parts.pop();
    currentPath.value = '/' + parts.join('/') + (parts.length > 0 ? '/' : '');
    loadFiles(currentPath.value);
  }
}

/**
 * 获取文件图标
 */
function getFileIcon(type) {
  const icons = {
    'czml': '🗺️',
    'kml': '📍',
    'geojson': '🌐',
    'gltf': '🏗️',
    'folder': '📁'
  };
  return icons[type] || '📄';
}

// 组件挂载时加载文件
onMounted(() => {
  loadFiles();
});
</script>

<template>
  <div class="vfs-file-panel">
    <div class="panel-header">
      <div class="path-nav">
        <button 
          v-if="currentPath !== '/'"
          @click="goBack"
          class="nav-btn"
        >
          ← 返回
        </button>
        <span class="current-path">{{ currentPath }}</span>
      </div>
    </div>

    <div class="file-list" v-loading="loading">
      <!-- 文件夹列表 -->
      <div 
        v-for="folder in folders"
        :key="folder.path"
        class="file-item folder"
        @click="handleFolderClick(folder)"
      >
        <span class="file-icon">{{ getFileIcon('folder') }}</span>
        <span class="file-name">{{ folder.name }}</span>
      </div>

      <!-- 文件列表 -->
      <div 
        v-for="file in files"
        :key="file.path"
        class="file-item"
        draggable="true"
        @dragstart="handleDragStart($event, file)"
      >
        <span class="file-icon">{{ getFileIcon(file.type) }}</span>
        <div class="file-info">
          <div class="file-name">{{ file.name }}</div>
          <div class="file-size">{{ file.size }}</div>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <div class="help-text">
        拖拽文件到地图加载数据
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vfs-file-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #2a2a2a;
  color: #fff;
}

.panel-header {
  padding: 12px;
  border-bottom: 1px solid #444;
  background: #333;
}

.path-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  background: #555;
  border: none;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;

  &:hover {
    background: #666;
  }
}

.current-path {
  font-size: 12px;
  color: #aaa;
}

.file-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #444;
  }

  &.folder {
    background: #333;
    border: 1px solid #555;

    &:hover {
      background: #444;
      border-color: #666;
    }
  }
}

.file-icon {
  margin-right: 8px;
  font-size: 16px;
}

.file-info {
  flex: 1;
}

.file-name {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 2px;
}

.file-size {
  font-size: 11px;
  color: #aaa;
}

.panel-footer {
  padding: 8px 12px;
  border-top: 1px solid #444;
  background: #333;
}

.help-text {
  font-size: 11px;
  color: #aaa;
  text-align: center;
}
</style>
