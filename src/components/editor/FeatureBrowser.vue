<!--
  标绘资源浏览组件
  功能：展示、搜索、拖拽标绘资源，供地图编辑器使用
  新语法：Vue3 <script setup>、ref/shallowRef、computed
  每个ref变量均有用途注释，每个函数均有功能注释
-->
<script setup>
import { ref, computed } from 'vue'

/**
 * 当前搜索关键词
 * @type {import('vue').Ref<string>}
 * 用于过滤标绘资源
 */
const searchKeyword = ref('')

/**
 * 标绘资源数据
 * 用于展示和拖拽
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
 * 实时根据搜索关键词过滤
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
 * @param {DragEvent} event 拖拽事件
 * @param {object} resource 标绘资源对象
 * 用于地图拖放
 */
function startDrag(event, resource) {
  event.dataTransfer.setData('application/json', JSON.stringify(resource))
  event.dataTransfer.effectAllowed = 'copy'
}

/**
 * 搜索资源（仅做提示，实际已实时过滤）
 */
function searchResources() {
  // 实际搜索已由filteredResources实现
}

/**
 * 清空搜索关键词
 */
function clearSearch() {
  searchKeyword.value = ''
}
</script>

<template>
  <div class="feature-browser">
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
</template>

<style scoped>
.feature-browser {
  padding: 0 0 16px 0;
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
</style>
