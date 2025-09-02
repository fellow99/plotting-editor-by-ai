/**
 * 虚拟文件系统服务
 * 基于静态文件和动态API的虚拟文件系统封装
 * 用于地图标绘编辑器的文件管理
 */
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

// VFS服务状态
const isConnected = ref(false);
const currentDrive = ref('local');
const serverConfig = ref({});

/**
 * VFS服务组合式函数
 */
export function useVfsService() {
  /**
   * 初始化VFS服务
   */
  async function initVfsService() {
    try {
      // 尝试加载VFS服务配置
      const response = await fetch('/vfs/.all.json');
      if (response.ok) {
        const config = await response.json();
        serverConfig.value = config;
        isConnected.value = true;
        console.log('VFS服务已连接:', config);
      } else {
        console.warn('VFS服务配置文件未找到，使用本地模式');
        isConnected.value = false;
      }
    } catch (error) {
      console.warn('初始化VFS服务失败:', error);
      isConnected.value = false;
    }
  }
  
  /**
   * 获取目录列表
   */
  async function listDirectory(path = '/') {
    try {
      // 标准化路径
      const normalizedPath = path.startsWith('/') ? path : '/' + path;
      const folderPath = normalizedPath.endsWith('/') ? normalizedPath : normalizedPath + '/';
      
      // 构建请求URL
      const requestUrl = `/vfs${folderPath}.folder.json`;
      
      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const folderData = await response.json();
      
      // 转换为标准格式
      const result = {
        path: normalizedPath,
        files: [],
        folders: []
      };
      
      // 处理文件
      if (folderData.files && Array.isArray(folderData.files)) {
        result.files = folderData.files.map(file => ({
          name: file.name,
          path: folderPath + file.name,
          size: file.size || 0,
          type: getFileType(file.name),
          lastModified: file.lastModified || null,
          url: `/vfs${folderPath}${file.name}`
        }));
      }
      
      // 处理子目录
      if (folderData.folders && Array.isArray(folderData.folders)) {
        result.folders = folderData.folders.map(folder => ({
          name: folder.name,
          path: folderPath + folder.name + '/',
          type: 'folder'
        }));
      }
      
      return result;
      
    } catch (error) {
      console.error('获取目录列表失败:', error);
      ElMessage.error(`获取目录列表失败: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * 获取文件信息
   */
  async function getFileInfo(filePath) {
    try {
      const response = await fetch(`/vfs${filePath}`, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error(`文件不存在: ${filePath}`);
      }
      
      const contentLength = response.headers.get('content-length');
      const lastModified = response.headers.get('last-modified');
      const contentType = response.headers.get('content-type');
      
      return {
        path: filePath,
        size: contentLength ? parseInt(contentLength) : 0,
        lastModified: lastModified ? new Date(lastModified) : null,
        contentType: contentType || 'application/octet-stream',
        type: getFileType(filePath),
        url: `/vfs${filePath}`
      };
      
    } catch (error) {
      console.error('获取文件信息失败:', error);
      throw error;
    }
  }
  
  /**
   * 读取文件内容
   */
  async function readFile(filePath, responseType = 'text') {
    try {
      const response = await fetch(`/vfs${filePath}`);
      if (!response.ok) {
        throw new Error(`读取文件失败: ${response.statusText}`);
      }
      
      switch (responseType) {
        case 'json':
          return await response.json();
        case 'blob':
          return await response.blob();
        case 'arrayBuffer':
          return await response.arrayBuffer();
        case 'text':
        default:
          return await response.text();
      }
      
    } catch (error) {
      console.error('读取文件失败:', error);
      ElMessage.error(`读取文件失败: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * 检查文件是否存在
   */
  async function fileExists(filePath) {
    try {
      const response = await fetch(`/vfs${filePath}`, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }
  
  /**
   * 搜索文件
   */
  async function searchFiles(query, path = '/', recursive = true) {
    try {
      const results = [];
      
      // 获取当前目录内容
      const directory = await listDirectory(path);
      
      // 搜索文件
      directory.files.forEach(file => {
        if (file.name.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            ...file,
            matchType: 'file'
          });
        }
      });
      
      // 递归搜索子目录
      if (recursive) {
        for (const folder of directory.folders) {
          try {
            const subResults = await searchFiles(query, folder.path, true);
            results.push(...subResults);
          } catch (error) {
            console.warn(`搜索子目录失败: ${folder.path}`, error);
          }
        }
      }
      
      return results;
      
    } catch (error) {
      console.error('搜索文件失败:', error);
      ElMessage.error(`搜索失败: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * 获取文件类型
   */
  function getFileType(fileName) {
    const ext = fileName.toLowerCase().split('.').pop();
    const typeMap = {
      // 地图数据
      'kml': 'kml',
      'kmz': 'kmz',
      'czml': 'czml',
      'geojson': 'geojson',
      'json': 'json',
      
      // 3D模型
      'gltf': 'gltf',
      'glb': 'glb',
      'obj': 'obj',
      'fbx': 'fbx',
      'dae': 'dae',
      
      // 图像
      'jpg': 'image',
      'jpeg': 'image',
      'png': 'image',
      'gif': 'image',
      'bmp': 'image',
      'webp': 'image',
      'svg': 'image',
      
      // 纹理
      'ktx': 'texture',
      'ktx2': 'texture',
      'dds': 'texture',
      
      // 压缩档案
      'zip': 'archive',
      'rar': 'archive',
      '7z': 'archive',
      'tar': 'archive',
      'gz': 'archive',
      
      // 文档
      'txt': 'text',
      'md': 'text',
      'xml': 'text',
      'csv': 'text',
      
      // 其他
      'bin': 'binary',
      'dat': 'binary'
    };
    
    return typeMap[ext] || 'unknown';
  }
  
  /**
   * 获取文件URL
   */
  function getFileUrl(filePath) {
    return `/vfs${filePath.startsWith('/') ? filePath : '/' + filePath}`;
  }
  
  /**
   * 获取目录的面包屑导航
   */
  function getBreadcrumbs(path) {
    const parts = path.split('/').filter(p => p);
    const breadcrumbs = [{ name: '根目录', path: '/' }];
    
    let currentPath = '';
    parts.forEach(part => {
      currentPath += '/' + part;
      breadcrumbs.push({
        name: part,
        path: currentPath + '/'
      });
    });
    
    return breadcrumbs;
  }
  
  /**
   * 格式化文件大小
   */
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  // 自动初始化
  initVfsService();
  
  return {
    // 状态
    isConnected,
    currentDrive,
    serverConfig,
    
    // 方法
    initVfsService,
    listDirectory,
    getFileInfo,
    readFile,
    fileExists,
    searchFiles,
    getFileType,
    getFileUrl,
    getBreadcrumbs,
    formatFileSize
  };
}
