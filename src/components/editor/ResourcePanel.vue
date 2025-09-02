<!--
 * 资源面板组件
 * 显示标绘资源库和虚拟文件系统
-->
<script setup>
import { ref, reactive, computed } from 'vue'
import { ElTabs, ElTabPane, ElCard, ElButton, ElInput, ElMessage } from 'element-plus'

// 响应式数据
const activeTab = ref('plotting')
const searchKeyword = ref('')

// 标绘资源数据
const plottingResources = reactive([
  {
    id: 'point',
    name: '点标绘',
    type: 'point',
    icon: '📍',
    category: 'basic'
  },
  {
    id: 'line',
    name: '线标绘',
    type: 'line',
    icon: '📏',
    category: 'basic'
  },
  {
    id: 'polygon',
    name: '面标绘',
    type: 'polygon',
    icon: '🔷',
    category: 'basic'
  },
  {
    id: 'circle',
    name: '圆形',
    type: 'circle',
    icon: '⭕',
    category: 'geometry'
  },
  {
    id: 'rectangle',
    name: '矩形',
    type: 'rectangle',
    icon: '⬜',
    category: 'geometry'
  },
  {
    id: 'text',
    name: '文本标注',
    type: 'text',
    icon: '📝',
    category: 'annotation'
  }
])

// 方法
/**
 * 开始拖拽资源
 */
const startDrag = (event, resource) => {
  event.dataTransfer.setData('application/json', JSON.stringify(resource))
  event.dataTransfer.effectAllowed = 'copy'
  
  console.log('开始拖拽资源:', resource)
}

/**
 * 搜索资源
 */
const searchResources = () => {
  if (!searchKeyword.value.trim()) {
    ElMessage.info('请输入搜索关键词')
    return
  }
  
  ElMessage.info(`搜索功能待实现: ${searchKeyword.value}`)
}

/**
 * 清空搜索
 */
const clearSearch = () => {
  searchKeyword.value = ''
}

/**
 * 过滤资源
 */
const filteredResources = computed(() => {
  if (!searchKeyword.value.trim()) {
    return plottingResources
  }
  
  const keyword = searchKeyword.value.toLowerCase()
  return plottingResources.filter(resource => 
    resource.name.toLowerCase().includes(keyword) ||
    resource.type.toLowerCase().includes(keyword)
  )
})
</script>

<template>
  <div class="resource-panel">
    <!-- 面板标题 -->
    <div class="panel-header">
      <span>资源面板</span>
    </div>
    
    <!-- 面板内容 -->
    <div class="panel-content">
      <!-- 标签页 -->
      <el-tabs v-model="activeTab" type="card">
        <!-- 标绘资源 -->
        <el-tab-pane label="标绘资源" name="plotting">
          <!-- 搜索框 -->
          <div class="search-section">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索标绘资源..."
              clearable
              @clear="clearSearch"
              @keyup.enter="searchResources"
            >
              <template #append>
                <el-button @click="searchResources">🔍</el-button>
              </template>
            </el-input>
          </div>
          
          <!-- 资源列表 -->
          <div class="resource-grid">
            <div
              v-for="resource in filteredResources"
              :key="resource.id"
              class="resource-item"
              draggable="true"
              @dragstart="startDrag($event, resource)"
              @click="() => ElMessage.info(`点击了 ${resource.name}，请拖拽到地图上使用`)"
            >
              <div class="resource-icon">{{ resource.icon }}</div>
              <div class="resource-name">{{ resource.name }}</div>
              <div class="resource-type">{{ resource.type }}</div>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-if="filteredResources.length === 0" class="empty-state">
            <div class="empty-icon">📭</div>
            <div class="empty-text">没有找到匹配的资源</div>
          </div>
        </el-tab-pane>
        
        <!-- 文件系统 -->
        <el-tab-pane label="文件系统" name="files">
          <div class="file-browser">
            <div class="file-info">
              <p>虚拟文件系统浏览器</p>
              <p class="text-secondary">功能待实现</p>
            </div>
          </div>
        </el-tab-pane>
        
        <!-- 我的收藏 -->
        <el-tab-pane label="我的收藏" name="favorites">
          <div class="favorites">
            <div class="file-info">
              <p>收藏的标绘资源</p>
              <p class="text-secondary">功能待实现</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
.resource-panel {
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

.search-section {
  margin-bottom: 16px;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}

.resource-item {
  background-color: #3c3c3c;
  border: 1px solid #555555;
  border-radius: 6px;
  padding: 12px 8px;
  text-align: center;
  cursor: grab;
  transition: all 0.2s;
  user-select: none;
}

.resource-item:hover {
  background-color: #4a4a4a;
  border-color: #007acc;
  transform: translateY(-2px);
}

.resource-item:active {
  cursor: grabbing;
  transform: translateY(0);
}

.resource-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.resource-name {
  font-size: 12px;
  color: #ffffff;
  margin-bottom: 2px;
  font-weight: 500;
}

.resource-type {
  font-size: 10px;
  color: #aaaaaa;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #888888;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
}

.file-browser,
.favorites {
  padding: 20px;
  text-align: center;
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

:deep(.el-input__wrapper) {
  background-color: #3c3c3c;
  border-color: #555555;
}

:deep(.el-input__inner) {
  color: #ffffff;
}

:deep(.el-button) {
  background-color: #007acc;
  border-color: #007acc;
  color: #ffffff;
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
