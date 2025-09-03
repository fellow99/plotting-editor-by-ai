<!--
  工具栏组件
  地图标绘编辑器顶部工具栏，分组为“文件”“编辑”“对象变换”“视图”“配置”，所有功能按钮均为预留
-->

<script setup>
import { ref } from 'vue'
import EditorConfigDialog from '../dialog/EditorConfigDialog.vue'

/**
 * 编辑器配置对话框显示状态
 * @type {import('vue').Ref<boolean>}
 */
const showEditorConfig = ref(false)

/**
 * 当前对象变换模式
 * @type {import('vue').Ref<string>}
 */
const transformMode = ref('translate')

/**
 * 是否有选中对象（预留）
 * @type {import('vue').Ref<boolean>}
 */
const hasSelection = ref(false)

/**
 * 是否可撤销（预留）
 * @type {import('vue').Ref<boolean>}
 */
const canUndo = ref(false)

/**
 * 是否可重做（预留）
 * @type {import('vue').Ref<boolean>}
 */
const canRedo = ref(false)

/**
 * 新建项目（预留功能）
 */
function newPlot() {
  // TODO: 实现新建项目
}

/**
 * 暂存项目到本地（预留功能）
 */
function saveLocal() {
  // TODO: 实现暂存到本地
}

/**
 * 保存项目（预留功能）
 */
function savePlot() {
  // TODO: 实现保存项目
}

/**
 * 加载项目（预留功能）
 */
function loadPlot() {
  // TODO: 实现加载项目
}

/**
 * 导出项目（预留功能）
 */
function exportPlot() {
  // TODO: 实现导出项目
}

/**
 * 导入项目（预留功能）
 */
function importPlot() {
  // TODO: 实现导入项目
}

/**
 * 撤销操作（预留功能）
 */
function undo() {
  // TODO: 实现撤销
}

/**
 * 重做操作（预留功能）
 */
function redo() {
  // TODO: 实现重做
}

/**
 * 复制选中对象（预留功能）
 */
function duplicateSelected() {
  // TODO: 实现复制
}

/**
 * 删除选中对象（预留功能）
 */
function deleteSelected() {
  // TODO: 实现删除
}

/**
 * 设置对象变换模式（预留功能）
 * @param {string} mode
 */
function setTransformMode(mode) {
  transformMode.value = mode
}

/**
 * 聚焦到选中对象（预留功能）
 */
function focusSelected() {
  // TODO: 实现聚焦
}

/**
 * 重置相机（预留功能）
 */
function resetCamera() {
  // TODO: 实现重置相机
}

/**
 * 打开编辑器配置（预留功能）
 */
function openEditorConfig() {
  showEditorConfig.value = true
}
</script>

<template>
  <div class="ribbon-toolbar dark">
    <div class="ribbon-content">
      <!-- 文件分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">文件</div>
        <div class="ribbon-group-buttons">
          <button class="ribbon-btn" @click="newPlot" title="新建项目">
            <span class="icon">📄</span>
            <div>新建</div>
          </button>
          <button class="ribbon-btn" @click="saveLocal" title="暂存到本地">
            <span class="icon">🗄️</span>
            <div>暂存</div>
          </button>
          <button class="ribbon-btn" @click="savePlot" title="保存项目">
            <span class="icon">💾</span>
            <div>保存</div>
          </button>
          <button class="ribbon-btn" @click="loadPlot" title="加载项目">
            <span class="icon">📂</span>
            <div>加载</div>
          </button>
          <button class="ribbon-btn" @click="exportPlot" title="导出项目">
            <span class="icon">📤</span>
            <div>导出</div>
          </button>
          <button class="ribbon-btn" @click="importPlot" title="导入项目">
            <span class="icon">📥</span>
            <div>导入</div>
          </button>
        </div>
      </div>
      <!-- 编辑分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">编辑</div>
        <div class="ribbon-group-buttons">
          <button class="ribbon-btn" @click="undo" :disabled="!canUndo" title="撤销 (Ctrl+Z)">
            <span class="icon">↶</span>
            <div>撤销</div>
          </button>
          <button class="ribbon-btn" @click="redo" :disabled="!canRedo" title="重做 (Ctrl+Y)">
            <span class="icon">↷</span>
            <div>重做</div>
          </button>
          <button class="ribbon-btn" @click="duplicateSelected" :disabled="!hasSelection" title="复制 (Ctrl+D)">
            <span class="icon">📋</span>
            <div>复制</div>
          </button>
          <button class="ribbon-btn danger" @click="deleteSelected" :disabled="!hasSelection" title="删除 (Delete)">
            <span class="icon">🗑️</span>
            <div>删除</div>
          </button>
        </div>
      </div>
      <!-- 对象变换分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">对象变换</div>
        <div class="ribbon-group-buttons">
          <button
            class="ribbon-btn"
            :class="{ active: transformMode === 'translate' }"
            @click="setTransformMode('translate')"
            :disabled="!hasSelection"
            title="移动工具 (G)"
          >
            <span class="icon">↔️</span>
            <div>移动</div>
          </button>
          <button
            class="ribbon-btn"
            :class="{ active: transformMode === 'rotate' }"
            @click="setTransformMode('rotate')"
            :disabled="!hasSelection"
            title="旋转工具 (R)"
          >
            <span class="icon">🔄</span>
            <div>旋转</div>
          </button>
          <button
            class="ribbon-btn"
            :class="{ active: transformMode === 'scale' }"
            @click="setTransformMode('scale')"
            :disabled="!hasSelection"
            title="缩放工具 (S)"
          >
            <span class="icon">📏</span>
            <div>缩放</div>
          </button>
        </div>
      </div>
      <!-- 视图分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">视图</div>
        <div class="ribbon-group-buttons">
          <button
            class="ribbon-btn"
            @click="focusSelected"
            :disabled="!hasSelection"
            title="聚焦到选中对象 (F)"
          >
            <span class="icon">🎯</span>
            <div>聚焦</div>
          </button>
          <button
            class="ribbon-btn"
            @click="resetCamera"
            title="重置相机"
          >
            <span class="icon">📷</span>
            <div>重置相机</div>
          </button>
        </div>
      </div>
      <!-- 配置分组 -->
      <div class="ribbon-group">
        <div class="ribbon-group-title">配置</div>
        <div class="ribbon-group-buttons">
          <button class="ribbon-btn" @click="openEditorConfig" title="编辑器配置">
            <span class="icon">⚙️</span>
            <div>编辑器</div>
          </button>
        </div>
      </div>
    </div>
<!-- 编辑器配置对话框 -->
<EditorConfigDialog v-model="showEditorConfig" />
  </div>
</template>

<style lang="scss" scoped>
.ribbon-toolbar.dark {
  background: #23272e;
  color: #f3f3f3;
  border-bottom: 1.5px solid #2d323a;
  padding: 0 12px;
  box-shadow: 0 2px 8px #0006;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.ribbon-content {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: flex-end;
  padding: 4px;
  width: 100%;
  flex-wrap: wrap;
}

.ribbon-group {
  background: #282c34;
  border-radius: 8px 8px 0 0;
  border: 1.5px solid #353a42;
  box-shadow: 0 2px 8px #0003;
  padding: 4px;
  margin-right: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 120px;
  height: 80px;
  position: relative;
  box-sizing: border-box;
}

.ribbon-group-title {
  font-size: 13px;
  font-weight: bold;
  color: #7ecfff;
  margin-bottom: 4px;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px #0008;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

.ribbon-group-buttons {
  display: flex;
  flex-direction: row;
  gap: 4px;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-start;
}

.ribbon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px 7px;
  background: #23272e;
  border: 1px solid #353a42;
  border-radius: 5px;
  color: #f3f3f3;
  font-size: 11px;
  cursor: pointer;
  margin-bottom: 6px;
  min-width: 48px;
  transition: background 0.2s, border 0.2s, color 0.2s;
}

.ribbon-btn:hover:not(:disabled) {
  background: #2d323a;
  border-color: #7ecfff;
  color: #fff;
}

.ribbon-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ribbon-btn.active {
  background: #007acc;
  border-color: #0088dd;
  color: #fff;
}

.ribbon-btn.danger {
  background: #d73a49;
  border-color: #e85662;
  color: #fff;
}

.ribbon-btn.danger:hover:not(:disabled) {
  background: #e85662;
}

.icon {
  font-size: 18px;
  line-height: 1;
}

@media (max-width: 900px) {
  .ribbon-content {
    flex-wrap: wrap;
    gap: 12px;
  }
  .ribbon-group {
    min-width: 90px;
    padding: 8px 8px 10px 8px;
  }
  .ribbon-group-title {
    font-size: 12px;
    margin-bottom: 6px;
  }
  .ribbon-btn {
    min-width: 40px;
    font-size: 10px;
    padding: 5px 6px;
  }
  .icon {
    font-size: 15px;
  }
}
</style>
