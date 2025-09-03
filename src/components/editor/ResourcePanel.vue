<!--
  资源面板组件
仅负责标签页切换与引用 ResourceBrowser、VfsFileBrowser、Inspector
标绘资源相关功能已抽取到 ResourceBrowser.vue
  Tabs: 标绘资源、文件系统、要素列表
  严格遵循 Vue 代码规范
-->
<script setup>
import { ref } from 'vue'
import ResourceBrowser from './ResourceBrowser.vue'
import VfsFileBrowser from './VfsFileBrowser.vue'
import Inspector from './Inspector.vue'

/**
 * 当前激活的标签页
 * @type {import('vue').Ref<string>}
 */
const activeTab = ref('plotting')
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
        @click="activeTab = 'inspector'"
        :class="['tab-btn', { active: activeTab === 'inspector' }]"
      >要素列表</button>
    </div>
    <div class="panel-content">
      <!-- 标绘资源 -->
      <div v-show="activeTab === 'plotting'">
        <ResourceBrowser />
      </div>
      <!-- 文件系统 -->
      <div v-show="activeTab === 'files'" class="file-browser">
        <VfsFileBrowser />
      </div>
      <!-- 要素列表 -->
      <div v-show="activeTab === 'inspector'" class="inspector-panel">
        <Inspector />
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
