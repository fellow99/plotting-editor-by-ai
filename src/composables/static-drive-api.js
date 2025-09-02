/**
 * 静态文件系统封装
 * 虚拟文件系统 API 封装
 */

// 驱动器存储
const drives = new Map()

/**
 * 设置驱动器
 * @param {string} driveName - 驱动器名称
 * @param {Object} driveData - 驱动器数据
 */
export function setDrive(driveName, driveData) {
  drives.set(driveName, driveData)
  console.log(`驱动器 ${driveName} 已注册`)
}

/**
 * 获取驱动器
 * @param {string} driveName - 驱动器名称
 */
export function getDrive(driveName) {
  return drives.get(driveName)
}

/**
 * 获取所有驱动器名称
 */
export function getDriveNames() {
  return Array.from(drives.keys())
}

/**
 * 获取文件夹列表
 * @param {string} driveName - 驱动器名称
 * @param {string} path - 路径
 */
export function getFolders(driveName = 'default', path = '/') {
  const drive = getDrive(driveName)
  if (!drive) return []
  
  if (path === '/') {
    return drive.folders || []
  }
  
  // 查找子文件夹
  const pathParts = path.split('/').filter(p => p)
  let currentFolder = null
  
  for (const folder of drive.folders || []) {
    if (folder.name === pathParts[0]) {
      currentFolder = folder
      break
    }
  }
  
  if (!currentFolder) return []
  
  // 递归查找深层文件夹
  for (let i = 1; i < pathParts.length; i++) {
    const subFolder = currentFolder.folders?.find(f => f.name === pathParts[i])
    if (!subFolder) return []
    currentFolder = subFolder
  }
  
  return currentFolder.folders || []
}

/**
 * 获取文件列表
 * @param {string} driveName - 驱动器名称
 * @param {string} path - 路径
 */
export function getFiles(driveName = 'default', path = '/') {
  const drive = getDrive(driveName)
  if (!drive) return []
  
  if (path === '/') {
    return drive.files || []
  }
  
  // 查找子文件夹中的文件
  const pathParts = path.split('/').filter(p => p)
  let currentFolder = null
  
  for (const folder of drive.folders || []) {
    if (folder.name === pathParts[0]) {
      currentFolder = folder
      break
    }
  }
  
  if (!currentFolder) return []
  
  // 递归查找深层文件夹
  for (let i = 1; i < pathParts.length; i++) {
    const subFolder = currentFolder.folders?.find(f => f.name === pathParts[i])
    if (!subFolder) return []
    currentFolder = subFolder
  }
  
  return currentFolder.files || []
}

/**
 * 获取文件信息
 * @param {string} driveName - 驱动器名称
 * @param {string} filePath - 文件路径
 */
export function getFileInfo(driveName = 'default', filePath) {
  const pathParts = filePath.split('/').filter(p => p)
  const fileName = pathParts.pop()
  const folderPath = '/' + pathParts.join('/')
  
  const files = getFiles(driveName, folderPath)
  return files.find(file => file.name === fileName)
}

/**
 * 检查文件是否存在
 * @param {string} driveName - 驱动器名称
 * @param {string} filePath - 文件路径
 */
export function fileExists(driveName = 'default', filePath) {
  return !!getFileInfo(driveName, filePath)
}

/**
 * 获取文件 URL
 * @param {string} driveName - 驱动器名称
 * @param {string} filePath - 文件路径
 */
export function getFileUrl(driveName = 'default', filePath) {
  const fileInfo = getFileInfo(driveName, filePath)
  if (!fileInfo) return null
  
  return fileInfo.url || `/vfs${filePath}`
}

/**
 * 递归获取所有文件
 * @param {string} driveName - 驱动器名称
 * @param {string} path - 起始路径
 */
export function getAllFiles(driveName = 'default', path = '/') {
  const allFiles = []
  
  // 获取当前路径的文件
  const files = getFiles(driveName, path)
  files.forEach(file => {
    allFiles.push({
      ...file,
      path: path === '/' ? `/${file.name}` : `${path}/${file.name}`
    })
  })
  
  // 递归获取子文件夹的文件
  const folders = getFolders(driveName, path)
  folders.forEach(folder => {
    const subPath = path === '/' ? `/${folder.name}` : `${path}/${folder.name}`
    const subFiles = getAllFiles(driveName, subPath)
    allFiles.push(...subFiles)
  })
  
  return allFiles
}

/**
 * 根据扩展名过滤文件
 * @param {Array} files - 文件列表
 * @param {Array} extensions - 允许的扩展名列表
 */
export function filterFilesByExtension(files, extensions) {
  if (!extensions || extensions.length === 0) return files
  
  return files.filter(file => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    return extensions.includes(ext)
  })
}

/**
 * 搜索文件
 * @param {string} driveName - 驱动器名称
 * @param {string} query - 搜索关键词
 * @param {Array} extensions - 限制扩展名（可选）
 */
export function searchFiles(driveName = 'default', query, extensions = null) {
  const allFiles = getAllFiles(driveName)
  let filteredFiles = allFiles
  
  // 根据扩展名过滤
  if (extensions) {
    filteredFiles = filterFilesByExtension(filteredFiles, extensions)
  }
  
  // 根据查询关键词过滤
  if (query) {
    const lowerQuery = query.toLowerCase()
    filteredFiles = filteredFiles.filter(file => 
      file.name.toLowerCase().includes(lowerQuery)
    )
  }
  
  return filteredFiles
}
