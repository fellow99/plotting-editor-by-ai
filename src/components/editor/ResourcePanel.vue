<!--
  资源面板组件
  参考 three-editor-by-ai 工程，采用 button tabs 实现方式和深色 UI 风格
  Tabs: 标绘资源、文件系统、我的收藏
  严格遵循 Vue 代码规范
-->
<script setup>
import { ref, computed } from 'vue'
import VfsFilePanel from './VfsFilePanel.vue'

/**
 * 当前激活的标签页
 * @type {import('vue').Ref<string>}
 */
const activeTab = ref('plotting')

/**
 * 搜索关键词
 * @type {import('vue').Ref<string>}
 */
const searchKeyword = ref('')

/**
 * 标绘资源数据
 */
const plottingResources = [
  { id: 'point', name: '点标绘', type: 'point', icon: '📍', category: 'basic' },
  { id: 'line', name: '线标绘', type: 'line', icon: '📏', category: 'basic' },
  { id: 'polygon', name: '面标绘', type: 'polygon', icon: '🔷', category: 'basic' },
  { id: 'circle', name: '圆形', type: 'circle', icon: '⭕', category: 'geometry' },
  { id: 'rectangle', name: '矩形', type: 'rectangle', icon: '⬜', category: 'geometry' },
  { id: 'text', name: '文本标注', type: 'text', icon: '📝', category: 'annotation' }
]

/**
 * 过滤后的资源列表
 */
const filteredResources = computed(() => {
  if (!searchKeyword.value.trim()) return plottingResources
  const keyword = searchKeyword.value.toLowerCase()
  return plottingResources.filter(r =>
    r.name.toLowerCase().includes(keyword) ||
    r.type.toLowerCase().includes(keyword)
  )
})

/**
 * 开始拖拽资源
 * @param {DragEvent} event
 * @param {object} resource
 */
function startDrag(event, resource) {
  event.dataTransfer.setData('application/json', JSON.stringify(resource))
  event.dataTransfer.effectAllowed = 'copy'
}

/**
 * 搜索资源
 */
function searchResources() {
  // 仅做提示，实际搜索已实时过滤
}

/**
 * 清空搜索
 */
function clearSearch() {
  searchKeyword.value = ''
}
</script>

<template>
  <div class="resource-panel">
    <!-- 标签页头部 -->
    <div class="panel-tabs">
      <button
        @click="activeTab = 'plotting'"
        :class="['tab-btn', { active: activeTab === 'plotting' }]"
      >标绘资源</button>
      <button
        @click="activeTab = 'files'"
        :class="['tab-btn', { active: activeTab === 'files' }]"
      >文件系统</button>
      <button
        @click="activeTab = 'favorites'"
        :class="['tab-btn', { active: activeTab === 'favorites' }]"
      >我的收藏</button>
    </div>
    <div class="panel-content">
      <!-- 标绘资源 -->
      <div v-show="activeTab === 'plotting'">
        <div class="search-section">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索标绘资源..."
            class="search-input"
            @keyup.enter="searchResources"
          />
          <button class="search-btn" @click="searchResources">🔍</button>
          <button class="clear-btn" @click="clearSearch" v-if="searchKeyword">✖</button>
        </div>
        <div class="resource-grid">
          <div
            v-for="resource in filteredResources"
            :key="resource.id"
            class="resource-item"
            draggable="true"
            @dragstart="startDrag($event, resource)"
            @click="() => $emit('resource-click', resource)"
          >
            <div class="resource-icon">{{ resource.icon }}</div>
            <div class="resource-name">{{ resource.name }}</div>
            <div class="resource-type">{{ resource.type }}</div>
          </div>
        </div>
        <div v-if="filteredResources.length === 0" class="empty-state">
          <div class="empty-icon">📭</div>
          <div class="empty-text">没有找到匹配的资源</div>
        </div>
      </div>
      <!-- 文件系统 -->
      <div v-show="activeTab === 'files'" class="file-browser">
        <VfsFilePanel />
      </div>
      <!-- 我的收藏 -->
      <div v-show="activeTab === 'favorites'" class="favorites">
        <div class="file-info">
          <p>收藏的标绘资源</p>
          <p class="text-secondary">功能待实现</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resource-panel {
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
}
.search-section {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.search-input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #555;
  border-radius: 4px;
  background: #333;
  color: #fff;
  font-size: 12px;
  outline: none;
}
.search-btn {
  margin-left: 6px;
  padding: 6px 10px;
  background: #007acc;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
.clear-btn {
  margin-left: 4px;
  padding: 6px 8px;
  background: #444;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}
.resource-item {
  background: #3c3c3c;
  border: 1px solid #555;
  border-radius: 6px;
  padding: 12px 8px;
  text-align: center;
  cursor: grab;
  transition: all 0.2s;
  user-select: none;
}
.resource-item:hover {
  background: #4a4a4a;
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
  color: #fff;
  margin-bottom: 2px;
  font-weight: 500;
}
.resource-type {
  font-size: 10px;
  color: #aaa;
}
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #888;
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
  text-align: center;
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
