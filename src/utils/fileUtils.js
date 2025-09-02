/**
 * 文件处理工具函数
 * 基于Web API的文件读取、导出和格式转换工具
 */

/**
 * 支持的文件类型
 */
export const FILE_TYPES = {
  // 地图数据
  KML: 'kml',
  KMZ: 'kmz',
  CZML: 'czml',
  GEOJSON: 'geojson',
  JSON: 'json',
  
  // 3D模型
  GLTF: 'gltf',
  GLB: 'glb',
  OBJ: 'obj',
  FBX: 'fbx',
  DAE: 'dae',
  
  // 图像
  JPG: 'jpg',
  JPEG: 'jpeg',
  PNG: 'png',
  GIF: 'gif',
  BMP: 'bmp',
  WEBP: 'webp',
  SVG: 'svg',
  
  // 纹理
  KTX: 'ktx',
  KTX2: 'ktx2',
  DDS: 'dds',
  
  // 文档
  TXT: 'txt',
  CSV: 'csv',
  XML: 'xml'
};

/**
 * MIME类型映射
 */
export const MIME_TYPES = {
  [FILE_TYPES.JSON]: 'application/json',
  [FILE_TYPES.GEOJSON]: 'application/geo+json',
  [FILE_TYPES.KML]: 'application/vnd.google-earth.kml+xml',
  [FILE_TYPES.KMZ]: 'application/vnd.google-earth.kmz',
  [FILE_TYPES.CZML]: 'application/json',
  [FILE_TYPES.GLTF]: 'model/gltf+json',
  [FILE_TYPES.GLB]: 'model/gltf-binary',
  [FILE_TYPES.OBJ]: 'text/plain',
  [FILE_TYPES.FBX]: 'application/octet-stream',
  [FILE_TYPES.DAE]: 'model/vnd.collada+xml',
  [FILE_TYPES.JPG]: 'image/jpeg',
  [FILE_TYPES.JPEG]: 'image/jpeg',
  [FILE_TYPES.PNG]: 'image/png',
  [FILE_TYPES.GIF]: 'image/gif',
  [FILE_TYPES.BMP]: 'image/bmp',
  [FILE_TYPES.WEBP]: 'image/webp',
  [FILE_TYPES.SVG]: 'image/svg+xml',
  [FILE_TYPES.TXT]: 'text/plain',
  [FILE_TYPES.CSV]: 'text/csv',
  [FILE_TYPES.XML]: 'application/xml'
};

/**
 * 获取文件扩展名
 */
export function getFileExtension(filename) {
  if (!filename || typeof filename !== 'string') {
    return '';
  }
  
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
    return '';
  }
  
  return filename.substring(lastDotIndex + 1).toLowerCase();
}

/**
 * 获取文件类型
 */
export function getFileType(filename) {
  const extension = getFileExtension(filename);
  return Object.values(FILE_TYPES).includes(extension) ? extension : 'unknown';
}

/**
 * 获取文件MIME类型
 */
export function getMimeType(filename) {
  const fileType = getFileType(filename);
  return MIME_TYPES[fileType] || 'application/octet-stream';
}

/**
 * 检查文件类型是否支持
 */
export function isFileTypeSupported(filename) {
  const fileType = getFileType(filename);
  return fileType !== 'unknown';
}

/**
 * 检查是否为图像文件
 */
export function isImageFile(filename) {
  const fileType = getFileType(filename);
  return [
    FILE_TYPES.JPG,
    FILE_TYPES.JPEG,
    FILE_TYPES.PNG,
    FILE_TYPES.GIF,
    FILE_TYPES.BMP,
    FILE_TYPES.WEBP,
    FILE_TYPES.SVG
  ].includes(fileType);
}

/**
 * 检查是否为3D模型文件
 */
export function isModelFile(filename) {
  const fileType = getFileType(filename);
  return [
    FILE_TYPES.GLTF,
    FILE_TYPES.GLB,
    FILE_TYPES.OBJ,
    FILE_TYPES.FBX,
    FILE_TYPES.DAE
  ].includes(fileType);
}

/**
 * 检查是否为地图数据文件
 */
export function isGeoDataFile(filename) {
  const fileType = getFileType(filename);
  return [
    FILE_TYPES.KML,
    FILE_TYPES.KMZ,
    FILE_TYPES.CZML,
    FILE_TYPES.GEOJSON,
    FILE_TYPES.JSON
  ].includes(fileType);
}

/**
 * 读取文件为文本
 */
export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('文件对象不能为空'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    
    reader.onerror = (event) => {
      reject(new Error(`文件读取失败: ${event.target.error.message}`));
    };
    
    reader.readAsText(file, 'UTF-8');
  });
}

/**
 * 读取文件为JSON
 */
export async function readFileAsJSON(file) {
  try {
    const text = await readFileAsText(file);
    return JSON.parse(text);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('JSON格式错误: ' + error.message);
    }
    throw error;
  }
}

/**
 * 读取文件为ArrayBuffer
 */
export function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('文件对象不能为空'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    
    reader.onerror = (event) => {
      reject(new Error(`文件读取失败: ${event.target.error.message}`));
    };
    
    reader.readAsArrayBuffer(file);
  });
}

/**
 * 读取文件为Data URL
 */
export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('文件对象不能为空'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    
    reader.onerror = (event) => {
      reject(new Error(`文件读取失败: ${event.target.error.message}`));
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * 下载文件
 */
export function downloadFile(data, filename, mimeType = null) {
  try {
    // 确定MIME类型
    const finalMimeType = mimeType || getMimeType(filename);
    
    // 创建Blob
    let blob;
    if (typeof data === 'string') {
      blob = new Blob([data], { type: finalMimeType });
    } else if (data instanceof ArrayBuffer) {
      blob = new Blob([data], { type: finalMimeType });
    } else if (data instanceof Blob) {
      blob = data;
    } else if (typeof data === 'object') {
      // 假设是需要JSON序列化的对象
      blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    } else {
      throw new Error('不支持的数据类型');
    }

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 清理URL
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

  } catch (error) {
    console.error('下载文件失败:', error);
    throw new Error(`下载失败: ${error.message}`);
  }
}

/**
 * 导出JSON文件
 */
export function exportJSON(data, filename = 'data.json') {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    downloadFile(jsonString, filename, 'application/json');
  } catch (error) {
    throw new Error(`导出JSON失败: ${error.message}`);
  }
}

/**
 * 导出CSV文件
 */
export function exportCSV(data, filename = 'data.csv', headers = null) {
  try {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('数据必须是非空数组');
    }

    let csvContent = '';

    // 添加表头
    if (headers) {
      csvContent += headers.join(',') + '\n';
    } else if (typeof data[0] === 'object') {
      csvContent += Object.keys(data[0]).join(',') + '\n';
    }

    // 添加数据行
    data.forEach(row => {
      if (typeof row === 'object') {
        const values = Object.values(row).map(value => {
          // 处理包含逗号、引号或换行的字段
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csvContent += values.join(',') + '\n';
      } else {
        csvContent += row + '\n';
      }
    });

    downloadFile(csvContent, filename, 'text/csv');

  } catch (error) {
    throw new Error(`导出CSV失败: ${error.message}`);
  }
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 验证文件大小
 */
export function validateFileSize(file, maxSizeInMB = 100) {
  if (!file) return false;
  
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
}

/**
 * 验证文件类型
 */
export function validateFileType(file, allowedTypes = []) {
  if (!file) return false;
  
  if (allowedTypes.length === 0) return true;
  
  const fileType = getFileType(file.name);
  return allowedTypes.includes(fileType);
}

/**
 * 创建文件选择器
 */
export function createFilePicker(options = {}) {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    
    // 设置接受的文件类型
    if (options.accept) {
      if (Array.isArray(options.accept)) {
        input.accept = options.accept.map(type => `.${type}`).join(',');
      } else {
        input.accept = options.accept;
      }
    }
    
    // 设置是否允许多选
    if (options.multiple) {
      input.multiple = true;
    }

    input.onchange = (event) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        resolve(options.multiple ? Array.from(files) : files[0]);
      } else {
        reject(new Error('未选择文件'));
      }
      document.body.removeChild(input);
    };

    input.oncancel = () => {
      reject(new Error('用户取消选择'));
      document.body.removeChild(input);
    };

    document.body.appendChild(input);
    input.click();
  });
}

/**
 * 批量处理文件
 */
export async function processFiles(files, processor, options = {}) {
  const results = [];
  const errors = [];
  
  const {
    maxConcurrent = 3,
    onProgress = null,
    onError = null
  } = options;

  // 分批处理文件
  for (let i = 0; i < files.length; i += maxConcurrent) {
    const batch = files.slice(i, i + maxConcurrent);
    
    const batchPromises = batch.map(async (file, batchIndex) => {
      try {
        const result = await processor(file, i + batchIndex);
        results[i + batchIndex] = result;
        
        if (onProgress) {
          onProgress(i + batchIndex + 1, files.length, file, result);
        }
        
        return result;
      } catch (error) {
        const fileError = {
          file,
          index: i + batchIndex,
          error
        };
        errors.push(fileError);
        
        if (onError) {
          onError(fileError);
        }
        
        throw error;
      }
    });

    // 等待当前批次完成
    await Promise.allSettled(batchPromises);
  }

  return {
    results: results.filter(r => r !== undefined),
    errors,
    success: errors.length === 0
  };
}

/**
 * 压缩图像文件
 */
export function compressImage(file, options = {}) {
  return new Promise((resolve, reject) => {
    if (!isImageFile(file.name)) {
      reject(new Error('不是有效的图像文件'));
      return;
    }

    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.8,
      format = 'image/jpeg'
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // 计算新尺寸
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      // 设置画布尺寸
      canvas.width = width;
      canvas.height = height;

      // 绘制图像
      ctx.drawImage(img, 0, 0, width, height);

      // 转换为Blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('图像压缩失败'));
        }
      }, format, quality);
    };

    img.onerror = () => {
      reject(new Error('图像加载失败'));
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * 获取文件信息
 */
export function getFileInfo(file) {
  if (!file) return null;

  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified ? new Date(file.lastModified) : null,
    extension: getFileExtension(file.name),
    fileType: getFileType(file.name),
    mimeType: getMimeType(file.name),
    isImage: isImageFile(file.name),
    isModel: isModelFile(file.name),
    isGeoData: isGeoDataFile(file.name),
    formattedSize: formatFileSize(file.size)
  };
}
