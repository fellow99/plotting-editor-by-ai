<!--
 * 主编辑器组件
 * 基于 Cesium 的地图标绘编辑器主界面，包含全部业务与UI
-->
<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue'

// 导入组件
import Toolbar from './components/editor/Toolbar.vue'
import ResourcePanel from './components/editor/ResourcePanel.vue'
import PropertyPanel from './components/editor/PropertyPanel.vue'
import EditorFooter from './components/editor/EditorFooter.vue'
import CesiumViewer from './components/cesium/CesiumViewer.vue'

// 导入可组合函数
import { useEditorConfig } from './composables/useEditorConfig'
import { useViewer } from './composables/useViewer'
import { useObjectSelection } from './composables/useObjectSelection'

// 响应式数据
const leftPanelVisible = ref(true)
const rightPanelVisible = ref(true)

// 标绘环境和对象选择 provide 注入
const plotApi = useViewer()
const objectSelectionApi = useObjectSelection()
provide('plot', plotApi)
provide('objectSelection', objectSelectionApi)

// 使用可组合函数
const {
  editorConfig,
  updateConfig
} = useEditorConfig()

// 生命周期
onMounted(() => {
  // 标绘环境初始化由PlotViewer组件自己处理
})

onUnmounted(() => {
  // 标绘环境销毁由PlotViewer组件自己处理
})

// 方法
/**
 * 切换左侧面板显示状态
 */
const toggleLeftPanel = () => {
  leftPanelVisible.value = !leftPanelVisible.value
}

/**
 * 切换右侧面板显示状态
 */
const toggleRightPanel = () => {
  rightPanelVisible.value = !rightPanelVisible.value
}

/**
 * 处理文件拖拽
 */
const handleFileDrop = (event) => {
  event.preventDefault()
  // TODO: 实现文件拖拽处理逻辑
}

/**
 * 处理拖拽悬停
 */
const handleDragOver = (event) => {
  event.preventDefault()
}
</script>

<template>
  <div class="editor-container" @drop="handleFileDrop" @dragover="handleDragOver">
    <!-- 工具栏 -->
    <Toolbar 
      @toggle-left-panel="toggleLeftPanel"
      @toggle-right-panel="toggleRightPanel"
    />
    
    <!-- 主内容区域 -->
    <div class="editor-main">
      <!-- 左侧资源面板 -->
      <div v-show="leftPanelVisible" class="left-panel">
        <ResourcePanel />
      </div>
      
      <!-- 中央地图容器 -->
      <div class="map-container">
        <CesiumViewer />
      </div>
      
      <!-- 右侧属性面板 -->
      <div v-show="rightPanelVisible" class="right-panel">
        <PropertyPanel />
      </div>
    </div>
    
    <!-- 底部状态栏 -->
    <EditorFooter />
  </div>
</template>

<style scoped>
.editor-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
}

.editor-main {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.left-panel {
  width: 300px;
  background-color: #252525;
  border-right: 1px solid #404040;
  transition: width 0.3s ease;
}

.right-panel {
  width: 300px;
  background-color: #252525;
  border-left: 1px solid #404040;
  transition: width 0.3s ease;
}

.map-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}
</style>
