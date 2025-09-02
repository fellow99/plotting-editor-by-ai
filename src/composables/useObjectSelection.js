/**
 * 对象选择功能
 * 基于Cesium的实体选择、高亮显示和管理
 * 使用新版Cesium 1.132.0 API，不依赖ready和readyPromise
 */
import { ref, shallowRef, computed, onUnmounted } from 'vue';

// 全局选择状态 - 使用shallowRef以符合Cesium对象引用规范
const selectedObjects = shallowRef(new Set());
const selectedObjectIds = ref(new Set());

// 选择高亮存储 - 存储原始材质信息用于恢复
const selectionStore = new Map();

// 选择变化回调列表
const selectionCallbacks = new Set();

/**
 * 对象选择管理组合式函数
 */
export function useObjectSelection() {
  /**
   * 选择单个对象
   */
  function selectObject(entity) {
    if (!entity) return;
    
    // 清除之前的选择
    clearSelection();
    
    // 添加到选择集合
    selectedObjects.value.add(entity);
    selectedObjectIds.value.add(entity.id);
    
    // 应用选择高亮
    applySelectionHighlight(entity);
    
    // 触发选择变化回调
    notifySelectionChange();
  }
  
  /**
   * 添加对象到选择（多选）
   */
  function addToSelection(entity) {
    if (!entity || selectedObjects.value.has(entity)) return;
    
    selectedObjects.value.add(entity);
    selectedObjectIds.value.add(entity.id);
    
    // 应用选择高亮
    applySelectionHighlight(entity);
    
    // 触发选择变化回调
    notifySelectionChange();
  }
  
  /**
   * 从选择中移除对象
   */
  function removeFromSelection(entity) {
    if (!entity || !selectedObjects.value.has(entity)) return;
    
    selectedObjects.value.delete(entity);
    selectedObjectIds.value.delete(entity.id);
    
    // 移除选择高亮
    removeSelectionHighlight(entity);
    
    // 触发选择变化回调
    notifySelectionChange();
  }
  
  /**
   * 清除所有选择
   */
  function clearSelection() {
    // 移除所有高亮
    selectedObjects.value.forEach(entity => {
      removeSelectionHighlight(entity);
    });
    
    // 清空选择集合
    selectedObjects.value.clear();
    selectedObjectIds.value.clear();
    
    // 触发选择变化回调
    notifySelectionChange();
  }
  
  /**
   * 切换对象选择状态
   */
  function toggleSelection(entity) {
    if (!entity) return;
    
    if (selectedObjects.value.has(entity)) {
      removeFromSelection(entity);
    } else {
      addToSelection(entity);
    }
  }
  
  /**
   * 应用选择高亮效果
   */
  function applySelectionHighlight(entity) {
    if (!entity) return;
    
    const entityId = entity.id;
    
    // 如果已经有高亮，先移除
    if (selectionStore.has(entityId)) {
      removeSelectionHighlight(entity);
    }
    
    // 存储原始状态
    const originalState = {
      outlineColor: null,
      outlineWidth: null
    };
    
    try {
      // 根据实体类型应用不同的高亮效果
      if (entity.billboard) {
        // Billboard高亮
        originalState.outlineColor = entity.billboard.outlineColor;
        originalState.outlineWidth = entity.billboard.outlineWidth;
        
        entity.billboard.outlineColor = Cesium.Color.CYAN;
        entity.billboard.outlineWidth = 3.0;
      } else if (entity.point) {
        // Point高亮
        originalState.outlineColor = entity.point.outlineColor;
        originalState.outlineWidth = entity.point.outlineWidth;
        
        entity.point.outlineColor = Cesium.Color.CYAN;
        entity.point.outlineWidth = 3.0;
      } else if (entity.polygon) {
        // Polygon高亮
        originalState.outlineColor = entity.polygon.outlineColor;
        originalState.outlineWidth = entity.polygon.outlineWidth;
        
        entity.polygon.outlineColor = Cesium.Color.CYAN;
        entity.polygon.outlineWidth = 3.0;
      } else if (entity.polyline) {
        // Polyline高亮
        originalState.outlineColor = entity.polyline.material;
        
        // 创建高亮材质
        entity.polyline.material = Cesium.Color.CYAN;
      } else if (entity.box || entity.cylinder || entity.ellipsoid) {
        // 3D几何体高亮
        const geometry = entity.box || entity.cylinder || entity.ellipsoid;
        originalState.outlineColor = geometry.outlineColor;
        originalState.outlineWidth = geometry.outlineWidth;
        
        geometry.outline = true;
        geometry.outlineColor = Cesium.Color.CYAN;
        geometry.outlineWidth = 3.0;
      }
      
      // 存储原始状态用于恢复
      selectionStore.set(entityId, originalState);
      
    } catch (error) {
      console.warn('应用选择高亮时出错:', error);
    }
  }
  
  /**
   * 移除选择高亮效果
   */
  function removeSelectionHighlight(entity) {
    if (!entity) return;
    
    const entityId = entity.id;
    const originalState = selectionStore.get(entityId);
    
    if (!originalState) return;
    
    try {
      // 根据实体类型恢复原始状态
      if (entity.billboard) {
        entity.billboard.outlineColor = originalState.outlineColor;
        entity.billboard.outlineWidth = originalState.outlineWidth;
      } else if (entity.point) {
        entity.point.outlineColor = originalState.outlineColor;
        entity.point.outlineWidth = originalState.outlineWidth;
      } else if (entity.polygon) {
        entity.polygon.outlineColor = originalState.outlineColor;
        entity.polygon.outlineWidth = originalState.outlineWidth;
      } else if (entity.polyline) {
        entity.polyline.material = originalState.outlineColor || Cesium.Color.WHITE;
      } else if (entity.box || entity.cylinder || entity.ellipsoid) {
        const geometry = entity.box || entity.cylinder || entity.ellipsoid;
        geometry.outlineColor = originalState.outlineColor;
        geometry.outlineWidth = originalState.outlineWidth;
        if (originalState.outlineColor === null) {
          geometry.outline = false;
        }
      }
      
      // 从存储中移除
      selectionStore.delete(entityId);
      
    } catch (error) {
      console.warn('移除选择高亮时出错:', error);
    }
  }
  
  /**
   * 添加选择变化回调
   */
  function onSelectionChange(callback) {
    selectionCallbacks.add(callback);
    
    // 返回移除回调的函数
    return () => {
      selectionCallbacks.delete(callback);
    };
  }
  
  /**
   * 触发选择变化回调
   */
  function notifySelectionChange() {
    selectionCallbacks.forEach(callback => {
      try {
        callback(selectedObjects.value, selectedObjectIds.value);
      } catch (error) {
        console.error('选择变化回调执行出错:', error);
      }
    });
  }
  
  /**
   * 检查对象是否被选中
   */
  function isSelected(entity) {
    return entity ? selectedObjects.value.has(entity) : false;
  }
  
  // 计算属性
  const hasSelection = computed(() => selectedObjects.value.size > 0);
  const selectionCount = computed(() => selectedObjects.value.size);
  
  // 组件卸载时清理
  onUnmounted(() => {
    clearSelection();
    selectionCallbacks.clear();
  });
  
  return {
    // 状态
    selectedObjects,
    selectedObjectIds,
    hasSelection,
    selectionCount,
    
    // 方法
    selectObject,
    addToSelection,
    removeFromSelection,
    clearSelection,
    toggleSelection,
    isSelected,
    onSelectionChange
  };
}

// 导出全局状态用于跨组件访问
export { selectedObjects, selectedObjectIds };
