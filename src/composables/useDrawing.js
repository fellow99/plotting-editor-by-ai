//
/**
 * useDrawing 组合式函数
 * 功能：管理当前正在绘制的资源（如点、线、面等），并提供相关操作方法
 * 新语法：Vue3 Composition API，shallowRef用于资源对象引用
 * 说明：currentDrawing为空表示非绘制状态
 */
import { shallowRef } from 'vue'

/**
 * 当前正在绘制的资源
 * @type {import('vue').ShallowRef<object|null>}
 * 用于存储当前选中的绘制资源，资源结构参考 RESOURCES.json
 */
const currentDrawing = shallowRef(null)

/**
 * 设置当前绘制资源
 * @param {object} resource 资源对象，参考 RESOURCES.json
 */
function setCurrentDrawing(resource) {
  currentDrawing.value = resource
}

/**
 * 清空当前绘制资源（退出绘制状态）
 */
function clearCurrentDrawing() {
  currentDrawing.value = null
}

/**
 * 是否处于绘制状态
 * @returns {boolean}
 */
function isDrawing() {
  return !!currentDrawing.value
}

export function useDrawing() {
  return {
    currentDrawing,
    setCurrentDrawing,
    clearCurrentDrawing,
    isDrawing
  }
}
