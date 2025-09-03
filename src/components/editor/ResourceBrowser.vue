<!--
  标绘资源浏览组件
  功能：展示标绘资源，点击资源后设置当前绘制类型
  新语法：Vue3 <script setup>
  每个shallowRef变量均有用途注释，每个函数均有功能注释
  plottingResources已抽取到src/constants/RESOURCES.json
-->
<script setup>
import plottingResources from '../../constants/RESOURCES.json'
import { useDrawing } from '../../composables/useDrawing'

/**
 * 资源点击事件
 * @param {object} resource 标绘资源对象
 * 设置当前绘制资源
 */
const { setCurrentDrawing } = useDrawing()
function handleResourceClick(resource) {
  setCurrentDrawing(resource)
}
</script>

<template>
  <div class="feature-browser">
    <div class="resource-grid">
      <div
        v-for="resource in plottingResources"
        :key="resource.id"
        class="resource-item"
        @click="() => handleResourceClick(resource)"
      >
        <div class="resource-icon">{{ resource.icon }}</div>
        <div class="resource-name">{{ resource.name }}</div>
        <div class="resource-type">{{ resource.type }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-browser {
  padding: 8px;
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
