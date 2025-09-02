/**
 * 应用入口文件相关的功能函数
 * 虚拟文件系统注册等功能
 */

import { setDrive } from './composables/static-drive-api';

/**
 * 从URL注册虚拟文件系统
 * @param {string} url - VFS配置文件URL
 */
export async function registerVfsFromURL(url) {
  try {
    const response = await fetch(url);
    const vfsData = await response.json();
    
    // 注册驱动器
    setDrive('default', vfsData);
    
    console.log('虚拟文件系统注册成功:', url);
  } catch (error) {
    console.warn('虚拟文件系统注册失败:', error);
    // 设置默认空驱动器
    setDrive('default', { folders: [], files: [] });
  }
}
