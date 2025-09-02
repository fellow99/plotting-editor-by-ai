/**
 * 资源管理组合式函数
 * 基于Cesium的地图标绘编辑器资源加载、缓存与管理
 * 支持GLTF、KML、CZML、GeoJSON等格式
 */
import { ref, shallowRef } from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

// 资源库 - 使用shallowRef以符合Cesium对象引用规范
const assetLibrary = shallowRef(new Map());
const loadingAssets = ref(new Set());

/**
 * 资源管理组合式函数
 */
export function useAssets() {
  /**
   * 生成资源缓存键
   */
  function generateCacheKey(url, size = null) {
    return size ? `${url}#${size}` : url;
  }
  
  /**
   * 检查资源是否已缓存
   */
  function isCached(url, size = null) {
    const key = generateCacheKey(url, size);
    return assetLibrary.value.has(key);
  }
  
  /**
   * 获取缓存的资源
   */
  function getCached(url, size = null) {
    const key = generateCacheKey(url, size);
    return assetLibrary.value.get(key);
  }
  
  /**
   * 缓存资源
   */
  function setCached(url, asset, size = null) {
    const key = generateCacheKey(url, size);
    assetLibrary.value.set(key, {
      asset,
      url,
      size,
      loadTime: Date.now(),
      type: getAssetType(url)
    });
  }
  
  /**
   * 获取资源类型
   */
  function getAssetType(url) {
    const ext = url.toLowerCase().split('.').pop();
    const typeMap = {
      'gltf': 'model',
      'glb': 'model',
      'kml': 'kml',
      'kmz': 'kmz',
      'czml': 'czml',
      'geojson': 'geojson',
      'json': 'json',
      'jpg': 'image',
      'jpeg': 'image',
      'png': 'image',
      'gif': 'image',
      'webp': 'image'
    };
    return typeMap[ext] || 'unknown';
  }
  
  /**
   * 加载GLTF/GLB模型
   */
  async function loadModel(url, options = {}) {
    const cacheKey = generateCacheKey(url);
    
    // 检查缓存
    if (isCached(url)) {
      return getCached(url).asset;
    }
    
    // 检查是否正在加载
    if (loadingAssets.value.has(url)) {
      return new Promise((resolve, reject) => {
        const checkLoading = setInterval(() => {
          if (!loadingAssets.value.has(url)) {
            clearInterval(checkLoading);
            if (isCached(url)) {
              resolve(getCached(url).asset);
            } else {
              reject(new Error('加载失败'));
            }
          }
        }, 100);
      });
    }
    
    loadingAssets.value.add(url);
    
    try {
      // 使用Cesium新版API加载模型
      const modelGraphics = {
        uri: url,
        scale: options.scale || 1.0,
        minimumPixelSize: options.minimumPixelSize || 64,
        maximumScale: options.maximumScale || 200000,
        incrementallyLoadTextures: true,
        runAnimations: options.runAnimations !== false,
        clampAnimations: options.clampAnimations !== false,
        shadows: options.shadows || Cesium.ShadowMode.ENABLED,
        heightReference: options.heightReference || Cesium.HeightReference.NONE,
        silhouetteColor: options.silhouetteColor,
        silhouetteSize: options.silhouetteSize || 0.0,
        color: options.color,
        colorBlendMode: options.colorBlendMode,
        colorBlendAmount: options.colorBlendAmount || 0.5
      };
      
      // 缓存模型配置
      setCached(url, modelGraphics);
      
      return modelGraphics;
      
    } catch (error) {
      console.error('加载模型失败:', error);
      ElMessage.error(`模型加载失败: ${error.message}`);
      throw error;
    } finally {
      loadingAssets.value.delete(url);
    }
  }
  
  /**
   * 加载KML数据
   */
  async function loadKML(url, options = {}) {
    const cacheKey = generateCacheKey(url);
    
    // 检查缓存
    if (isCached(url)) {
      return getCached(url).asset;
    }
    
    if (loadingAssets.value.has(url)) {
      return new Promise((resolve, reject) => {
        const checkLoading = setInterval(() => {
          if (!loadingAssets.value.has(url)) {
            clearInterval(checkLoading);
            if (isCached(url)) {
              resolve(getCached(url).asset);
            } else {
              reject(new Error('加载失败'));
            }
          }
        }, 100);
      });
    }
    
    loadingAssets.value.add(url);
    
    try {
      // 使用Cesium KmlDataSource加载KML
      const kmlDataSource = await Cesium.KmlDataSource.load(url, {
        camera: options.camera,
        canvas: options.canvas,
        clampToGround: options.clampToGround || false,
        ellipsoid: options.ellipsoid
      });
      
      setCached(url, kmlDataSource);
      
      return kmlDataSource;
      
    } catch (error) {
      console.error('加载KML失败:', error);
      ElMessage.error(`KML加载失败: ${error.message}`);
      throw error;
    } finally {
      loadingAssets.value.delete(url);
    }
  }
  
  /**
   * 加载CZML数据
   */
  async function loadCZML(url, options = {}) {
    const cacheKey = generateCacheKey(url);
    
    // 检查缓存
    if (isCached(url)) {
      return getCached(url).asset;
    }
    
    if (loadingAssets.value.has(url)) {
      return new Promise((resolve, reject) => {
        const checkLoading = setInterval(() => {
          if (!loadingAssets.value.has(url)) {
            clearInterval(checkLoading);
            if (isCached(url)) {
              resolve(getCached(url).asset);
            } else {
              reject(new Error('加载失败'));
            }
          }
        }, 100);
      });
    }
    
    loadingAssets.value.add(url);
    
    try {
      // 使用Cesium CzmlDataSource加载CZML
      const czmlDataSource = await Cesium.CzmlDataSource.load(url, {
        sourceUri: options.sourceUri
      });
      
      setCached(url, czmlDataSource);
      
      return czmlDataSource;
      
    } catch (error) {
      console.error('加载CZML失败:', error);
      ElMessage.error(`CZML加载失败: ${error.message}`);
      throw error;
    } finally {
      loadingAssets.value.delete(url);
    }
  }
  
  /**
   * 加载GeoJSON数据
   */
  async function loadGeoJSON(url, options = {}) {
    const cacheKey = generateCacheKey(url);
    
    // 检查缓存
    if (isCached(url)) {
      return getCached(url).asset;
    }
    
    if (loadingAssets.value.has(url)) {
      return new Promise((resolve, reject) => {
        const checkLoading = setInterval(() => {
          if (!loadingAssets.value.has(url)) {
            clearInterval(checkLoading);
            if (isCached(url)) {
              resolve(getCached(url).asset);
            } else {
              reject(new Error('加载失败'));
            }
          }
        }, 100);
      });
    }
    
    loadingAssets.value.add(url);
    
    try {
      // 使用Cesium GeoJsonDataSource加载GeoJSON
      const geoJsonDataSource = await Cesium.GeoJsonDataSource.load(url, {
        stroke: options.stroke || Cesium.Color.HOTPINK,
        fill: options.fill || Cesium.Color.PINK.withAlpha(0.5),
        strokeWidth: options.strokeWidth || 3,
        markerSymbol: options.markerSymbol || '?',
        markerColor: options.markerColor || Cesium.Color.YELLOW,
        markerSize: options.markerSize || 48,
        clampToGround: options.clampToGround || false
      });
      
      setCached(url, geoJsonDataSource);
      
      return geoJsonDataSource;
      
    } catch (error) {
      console.error('加载GeoJSON失败:', error);
      ElMessage.error(`GeoJSON加载失败: ${error.message}`);
      throw error;
    } finally {
      loadingAssets.value.delete(url);
    }
  }
  
  /**
   * 加载图像纹理
   */
  async function loadTexture(url, options = {}) {
    const cacheKey = generateCacheKey(url);
    
    // 检查缓存
    if (isCached(url)) {
      return getCached(url).asset;
    }
    
    if (loadingAssets.value.has(url)) {
      return new Promise((resolve, reject) => {
        const checkLoading = setInterval(() => {
          if (!loadingAssets.value.has(url)) {
            clearInterval(checkLoading);
            if (isCached(url)) {
              resolve(getCached(url).asset);
            } else {
              reject(new Error('加载失败'));
            }
          }
        }, 100);
      });
    }
    
    loadingAssets.value.add(url);
    
    try {
      // 创建图像材质
      const imageMaterial = new Cesium.ImageMaterialProperty({
        image: url,
        transparent: options.transparent !== false,
        color: options.color || Cesium.Color.WHITE,
        repeat: options.repeat || new Cesium.Cartesian2(1.0, 1.0)
      });
      
      setCached(url, imageMaterial);
      
      return imageMaterial;
      
    } catch (error) {
      console.error('加载纹理失败:', error);
      ElMessage.error(`纹理加载失败: ${error.message}`);
      throw error;
    } finally {
      loadingAssets.value.delete(url);
    }
  }
  
  /**
   * 通用资源加载函数
   */
  async function loadAsset(url, options = {}) {
    const type = getAssetType(url);
    
    switch (type) {
      case 'model':
        return await loadModel(url, options);
      case 'kml':
      case 'kmz':
        return await loadKML(url, options);
      case 'czml':
        return await loadCZML(url, options);
      case 'geojson':
        return await loadGeoJSON(url, options);
      case 'image':
        return await loadTexture(url, options);
      default:
        throw new Error(`不支持的资源类型: ${type}`);
    }
  }
  
  /**
   * 清理资源缓存
   */
  function clearCache() {
    assetLibrary.value.clear();
    ElMessage.success('资源缓存已清理');
  }
  
  /**
   * 获取缓存统计信息
   */
  function getCacheStats() {
    const stats = {
      totalAssets: assetLibrary.value.size,
      typeCount: {},
      totalSize: 0
    };
    
    assetLibrary.value.forEach(item => {
      const type = item.type;
      stats.typeCount[type] = (stats.typeCount[type] || 0) + 1;
      if (item.size) {
        stats.totalSize += item.size;
      }
    });
    
    return stats;
  }
  
  return {
    // 状态
    assetLibrary,
    loadingAssets,
    
    // 方法
    loadAsset,
    loadModel,
    loadKML,
    loadCZML,
    loadGeoJSON,
    loadTexture,
    clearCache,
    getCacheStats,
    isCached,
    getCached
  };
}
