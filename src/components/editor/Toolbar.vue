<!--
 * 工具栏组件
 * 地图标绘编辑器顶部工具栏
-->
<script setup>
import { ref } from 'vue'
import { ElButton, ElButtonGroup, ElDropdown, ElDropdownMenu, ElDropdownItem, ElMessage } from 'element-plus'

// 定义事件
const emit = defineEmits(['toggle-left-panel', 'toggle-right-panel'])

// 响应式数据
const isFullscreen = ref(false)

// 方法
/**
 * 切换左侧面板
 */
const toggleLeftPanel = () => {
  emit('toggle-left-panel')
}

/**
 * 切换右侧面板
 */
const toggleRightPanel = () => {
  emit('toggle-right-panel')
}

/**
 * 新建项目
 */
const newProject = () => {
  ElMessage.info('新建项目功能待实现')
}

/**
 * 打开项目
 */
const openProject = () => {
  ElMessage.info('打开项目功能待实现')
}

/**
 * 保存项目
 */
const saveProject = () => {
  ElMessage.info('保存项目功能待实现')
}

/**
 * 导出项目
 */
const exportProject = () => {
  ElMessage.info('导出项目功能待实现')
}

/**
 * 撤销操作
 */
const undo = () => {
  ElMessage.info('撤销功能待实现')
}

/**
 * 重做操作
 */
const redo = () => {
  ElMessage.info('重做功能待实现')
}

/**
 * 切换全屏
 */
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

/**
 * 显示帮助信息
 */
const showHelp = () => {
  ElMessage.info('帮助功能待实现')
}

/**
 * 显示关于信息
 */
const showAbout = () => {
  ElMessage.info('关于 - 地图标绘编辑器 v1.0.0')
}
/**
 * 处理项目命令
 */
const handleProjectCommand = (command) => {
  switch (command) {
    case 'new':
      newProject()
      break
    case 'open':
      openProject()
      break
    case 'save':
      saveProject()
      break
    case 'export':
      exportProject()
      break
  }
}

/**
 * 处理帮助命令
 */
const handleHelpCommand = (command) => {
  switch (command) {
    case 'help':
      showHelp()
      break
    case 'about':
      showAbout()
      break
  }
}
</script>

<template>
  <div class="toolbar">
    <!-- 左侧按钮组 -->
    <div class="toolbar-left">
      <!-- 面板切换按钮 -->
      <el-button-group>
        <el-button 
          size="small" 
          @click="toggleLeftPanel"
          title="切换资源面板"
        >
          📁
        </el-button>
        <el-button 
          size="small" 
          @click="toggleRightPanel"
          title="切换属性面板"
        >
          ⚙️
        </el-button>
      </el-button-group>
      
      <!-- 项目操作 -->
      <el-dropdown trigger="click" @command="handleProjectCommand">
        <el-button size="small">
          项目 ▼
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="new">新建项目</el-dropdown-item>
            <el-dropdown-item command="open">打开项目</el-dropdown-item>
            <el-dropdown-item command="save">保存项目</el-dropdown-item>
            <el-dropdown-item command="export" divided>导出项目</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      
      <!-- 编辑操作 */
      <el-button-group>
        <el-button 
          size="small" 
          @click="undo"
          title="撤销 (Ctrl+Z)"
        >
          ↶
        </el-button>
        <el-button 
          size="small" 
          @click="redo"
          title="重做 (Ctrl+Y)"
        >
          ↷
        </el-button>
      </el-button-group>
    </div>
    
    <!-- 中央标题 -->
    <div class="toolbar-center">
      <span class="toolbar-title">地图标绘编辑器</span>
    </div>
    
    <!-- 右侧按钮组 -->
    <div class="toolbar-right">
      <!-- 视图操作 -->
      <el-button-group>
        <el-button 
          size="small" 
          @click="toggleFullscreen"
          :title="isFullscreen ? '退出全屏' : '进入全屏'"
        >
          {{ isFullscreen ? '🎯' : '⛶' }}
        </el-button>
      </el-button-group>
      
      <!-- 帮助菜单 -->
      <el-dropdown trigger="click" @command="handleHelpCommand">
        <el-button size="small">
          帮助 ▼
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="help">使用帮助</el-dropdown-item>
            <el-dropdown-item command="about" divided>关于</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  height: 50px;
  background-color: #2d2d2d;
  border-bottom: 1px solid #404040;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toolbar-title {
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  user-select: none;
}

/* Element Plus 按钮样式覆盖 */
:deep(.el-button) {
  border-color: #555555 !important;
  background-color: #3c3c3c !important;
  color: #ffffff !important;
}

:deep(.el-button:hover) {
  background-color: #4a4a4a !important;
  border-color: #666666 !important;
}

:deep(.el-button:active) {
  background-color: #2a2a2a !important;
}

:deep(.el-dropdown) {
  color: #ffffff !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .toolbar {
    padding: 0 8px;
  }
  
  .toolbar-center {
    display: none;
  }
  
  .toolbar-left,
  .toolbar-right {
    gap: 4px;
  }
}
</style>
