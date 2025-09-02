/**
 * 编辑器配置可组合函数
 * 编辑器配置响应式状态与操作方法
 */

import { ref, reactive, watch } from 'vue'

// 默认配置
const defaultConfig = {
  // 视图配置
  view: {
    showGrid: false,
    showAxis: false,
    backgroundColor: '#1e1e1e',
    wireframe: false
  },
  
  // 渲染配置
  render: {
    shadows: true,
    fog: true,
    antialias: true,
    physicallyCorrectLights: true
  },
  
  // 控制器配置
  controls: {
    enableDamping: true,
    dampingFactor: 0.1,
    enableZoom: true,
    enableRotate: true,
    enablePan: true,
    autoRotate: false,
    autoRotateSpeed: 2.0
  },
  
  // 性能配置
  performance: {
    enableStats: false,
    maxFPS: 60,
    renderOnDemand: false
  },
  
  // 地图配置
  map: {
    terrain: true,
    atmosphere: true,
    lighting: true,
    underground: false,
    depthTest: true
  }
}

// 全局配置状态
const editorConfig = reactive({ ...defaultConfig })

/**
 * 编辑器配置可组合函数
 */
export function useEditorConfig() {
  
  /**
   * 更新配置
   * @param {string} category - 配置分类
   * @param {string} key - 配置键
   * @param {any} value - 配置值
   */
  const updateConfig = (category, key, value) => {
    if (editorConfig[category] && key in editorConfig[category]) {
      editorConfig[category][key] = value
      console.log(`配置更新: ${category}.${key} = ${value}`)
    } else {
      console.warn(`配置键不存在: ${category}.${key}`)
    }
  }

  /**
   * 批量更新配置
   * @param {Object} config - 配置对象
   */
  const updateConfigs = (config) => {
    Object.keys(config).forEach(category => {
      if (editorConfig[category]) {
        Object.keys(config[category]).forEach(key => {
          updateConfig(category, key, config[category][key])
        })
      }
    })
  }

  /**
   * 重置配置到默认值
   * @param {string} category - 配置分类（可选）
   */
  const resetConfig = (category = null) => {
    if (category) {
      if (defaultConfig[category]) {
        Object.assign(editorConfig[category], defaultConfig[category])
        console.log(`配置重置: ${category}`)
      }
    } else {
      Object.assign(editorConfig, JSON.parse(JSON.stringify(defaultConfig)))
      console.log('所有配置已重置')
    }
  }

  /**
   * 获取配置值
   * @param {string} category - 配置分类
   * @param {string} key - 配置键
   */
  const getConfig = (category, key = null) => {
    if (key) {
      return editorConfig[category]?.[key]
    }
    return editorConfig[category]
  }

  /**
   * 导出配置
   */
  const exportConfig = () => {
    return JSON.parse(JSON.stringify(editorConfig))
  }

  /**
   * 导入配置
   * @param {Object} config - 配置对象
   */
  const importConfig = (config) => {
    try {
      // 验证配置结构
      const validCategories = Object.keys(defaultConfig)
      const importCategories = Object.keys(config)
      
      importCategories.forEach(category => {
        if (validCategories.includes(category)) {
          Object.assign(editorConfig[category], config[category])
        }
      })
      
      console.log('配置导入成功')
      return true
    } catch (error) {
      console.error('配置导入失败:', error)
      return false
    }
  }

  /**
   * 保存配置到本地存储
   */
  const saveConfigToLocal = () => {
    try {
      const configData = exportConfig()
      localStorage.setItem('plotting-editor-config', JSON.stringify(configData))
      console.log('配置已保存到本地存储')
      return true
    } catch (error) {
      console.error('配置保存失败:', error)
      return false
    }
  }

  /**
   * 从本地存储加载配置
   */
  const loadConfigFromLocal = () => {
    try {
      const configData = localStorage.getItem('plotting-editor-config')
      if (configData) {
        const config = JSON.parse(configData)
        importConfig(config)
        console.log('配置已从本地存储加载')
        return true
      }
      return false
    } catch (error) {
      console.error('配置加载失败:', error)
      return false
    }
  }

  // 监听配置变化并自动保存
  watch(
    () => editorConfig,
    () => {
      // 延迟保存，避免频繁写入
      setTimeout(() => {
        saveConfigToLocal()
      }, 1000)
    },
    { deep: true }
  )

  // 初始加载本地配置
  loadConfigFromLocal()

  return {
    // 状态
    editorConfig,
    
    // 方法
    updateConfig,
    updateConfigs,
    resetConfig,
    getConfig,
    exportConfig,
    importConfig,
    saveConfigToLocal,
    loadConfigFromLocal
  }
}
