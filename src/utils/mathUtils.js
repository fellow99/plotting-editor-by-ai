/**
 * 数学工具函数
 * 基于Cesium的地理坐标和数学计算工具
 */
import * as Cesium from 'cesium';

/**
 * 角度转弧度
 */
export function degreesToRadians(degrees) {
  return Cesium.Math.toRadians(degrees);
}

/**
 * 弧度转角度
 */
export function radiansToDegrees(radians) {
  return Cesium.Math.toDegrees(radians);
}

/**
 * 限制数值在指定范围内
 */
export function clamp(value, min, max) {
  return Cesium.Math.clamp(value, min, max);
}

/**
 * 线性插值
 */
export function lerp(start, end, t) {
  return Cesium.Math.lerp(start, end, t);
}

/**
 * 计算两个地理坐标之间的距离（米）
 */
export function calculateDistance(lon1, lat1, lon2, lat2) {
  const point1 = Cesium.Cartesian3.fromDegrees(lon1, lat1);
  const point2 = Cesium.Cartesian3.fromDegrees(lon2, lat2);
  return Cesium.Cartesian3.distance(point1, point2);
}

/**
 * 计算两个地理坐标之间的方位角（度）
 */
export function calculateBearing(lon1, lat1, lon2, lat2) {
  const point1 = Cesium.Cartographic.fromDegrees(lon1, lat1);
  const point2 = Cesium.Cartographic.fromDegrees(lon2, lat2);
  
  const deltaLon = point2.longitude - point1.longitude;
  const y = Math.sin(deltaLon) * Math.cos(point2.latitude);
  const x = Math.cos(point1.latitude) * Math.sin(point2.latitude) - 
            Math.sin(point1.latitude) * Math.cos(point2.latitude) * Math.cos(deltaLon);
  
  const bearing = Math.atan2(y, x);
  return radiansToDegrees(bearing);
}

/**
 * 计算地理坐标的中心点
 */
export function calculateCenter(coordinates) {
  if (!coordinates || coordinates.length === 0) {
    return null;
  }

  let totalLon = 0;
  let totalLat = 0;
  let totalHeight = 0;

  coordinates.forEach(coord => {
    if (Array.isArray(coord)) {
      totalLon += coord[0];
      totalLat += coord[1];
      totalHeight += coord[2] || 0;
    } else if (typeof coord === 'object') {
      totalLon += coord.longitude || coord.lon || coord.x || 0;
      totalLat += coord.latitude || coord.lat || coord.y || 0;
      totalHeight += coord.height || coord.alt || coord.z || 0;
    }
  });

  const count = coordinates.length;
  return {
    longitude: totalLon / count,
    latitude: totalLat / count,
    height: totalHeight / count
  };
}

/**
 * 计算多边形的面积（平方米）
 */
export function calculatePolygonArea(coordinates) {
  if (!coordinates || coordinates.length < 3) {
    return 0;
  }

  // 将地理坐标转换为笛卡尔坐标
  const cartesianPoints = coordinates.map(coord => {
    if (Array.isArray(coord)) {
      return Cesium.Cartesian3.fromDegrees(coord[0], coord[1], coord[2] || 0);
    } else {
      return Cesium.Cartesian3.fromDegrees(
        coord.longitude || coord.lon,
        coord.latitude || coord.lat,
        coord.height || coord.alt || 0
      );
    }
  });

  // 使用Cesium的多边形面积计算
  return Cesium.PolygonGeometry.computeArea2D(cartesianPoints);
}

/**
 * 计算线段的长度（米）
 */
export function calculateLineLength(coordinates) {
  if (!coordinates || coordinates.length < 2) {
    return 0;
  }

  let totalLength = 0;

  for (let i = 1; i < coordinates.length; i++) {
    const prev = coordinates[i - 1];
    const curr = coordinates[i];

    let lon1, lat1, lon2, lat2;

    if (Array.isArray(prev)) {
      lon1 = prev[0];
      lat1 = prev[1];
    } else {
      lon1 = prev.longitude || prev.lon;
      lat1 = prev.latitude || prev.lat;
    }

    if (Array.isArray(curr)) {
      lon2 = curr[0];
      lat2 = curr[1];
    } else {
      lon2 = curr.longitude || curr.lon;
      lat2 = curr.latitude || curr.lat;
    }

    totalLength += calculateDistance(lon1, lat1, lon2, lat2);
  }

  return totalLength;
}

/**
 * 在指定距离和方位角上计算新的地理坐标
 */
export function calculateDestination(longitude, latitude, distance, bearing) {
  const startPoint = Cesium.Cartographic.fromDegrees(longitude, latitude);
  const bearingRad = degreesToRadians(bearing);
  
  const R = Cesium.Ellipsoid.WGS84.maximumRadius; // 地球半径
  const lat1 = startPoint.latitude;
  const lon1 = startPoint.longitude;
  
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(distance / R) +
    Math.cos(lat1) * Math.sin(distance / R) * Math.cos(bearingRad)
  );
  
  const lon2 = lon1 + Math.atan2(
    Math.sin(bearingRad) * Math.sin(distance / R) * Math.cos(lat1),
    Math.cos(distance / R) - Math.sin(lat1) * Math.sin(lat2)
  );
  
  return {
    longitude: radiansToDegrees(lon2),
    latitude: radiansToDegrees(lat2)
  };
}

/**
 * 判断点是否在多边形内
 */
export function isPointInPolygon(point, polygon) {
  if (!point || !polygon || polygon.length < 3) {
    return false;
  }

  let lon, lat;
  if (Array.isArray(point)) {
    lon = point[0];
    lat = point[1];
  } else {
    lon = point.longitude || point.lon;
    lat = point.latitude || point.lat;
  }

  const cartesianPoint = Cesium.Cartesian3.fromDegrees(lon, lat);
  const cartesianPolygon = polygon.map(coord => {
    if (Array.isArray(coord)) {
      return Cesium.Cartesian3.fromDegrees(coord[0], coord[1]);
    } else {
      return Cesium.Cartesian3.fromDegrees(
        coord.longitude || coord.lon,
        coord.latitude || coord.lat
      );
    }
  });

  // 使用射线投射算法
  let inside = false;
  const polygonPositions = cartesianPolygon.map(pos => {
    const cartographic = Cesium.Cartographic.fromCartesian(pos);
    return [
      radiansToDegrees(cartographic.longitude),
      radiansToDegrees(cartographic.latitude)
    ];
  });

  const x = lon;
  const y = lat;

  for (let i = 0, j = polygonPositions.length - 1; i < polygonPositions.length; j = i++) {
    const xi = polygonPositions[i][0];
    const yi = polygonPositions[i][1];
    const xj = polygonPositions[j][0];
    const yj = polygonPositions[j][1];

    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }

  return inside;
}

/**
 * 格式化距离显示
 */
export function formatDistance(meters) {
  if (meters < 1000) {
    return `${meters.toFixed(1)} m`;
  } else if (meters < 1000000) {
    return `${(meters / 1000).toFixed(2)} km`;
  } else {
    return `${(meters / 1000000).toFixed(1)} Mm`;
  }
}

/**
 * 格式化面积显示
 */
export function formatArea(squareMeters) {
  if (squareMeters < 1) {
    return `${(squareMeters * 10000).toFixed(1)} cm²`;
  } else if (squareMeters < 10000) {
    return `${squareMeters.toFixed(1)} m²`;
  } else if (squareMeters < 1000000) {
    return `${(squareMeters / 10000).toFixed(2)} ha`;
  } else {
    return `${(squareMeters / 1000000).toFixed(2)} km²`;
  }
}

/**
 * 格式化坐标显示
 */
export function formatCoordinate(longitude, latitude, precision = 6) {
  const lonStr = longitude >= 0 ? 'E' : 'W';
  const latStr = latitude >= 0 ? 'N' : 'S';
  
  return `${Math.abs(latitude).toFixed(precision)}°${latStr}, ${Math.abs(longitude).toFixed(precision)}°${lonStr}`;
}

/**
 * 格式化高程显示
 */
export function formatElevation(height) {
  if (Math.abs(height) < 1000) {
    return `${height.toFixed(1)} m`;
  } else {
    return `${(height / 1000).toFixed(2)} km`;
  }
}

/**
 * 生成随机颜色
 */
export function randomColor(alpha = 1.0) {
  return new Cesium.Color(
    Math.random(),
    Math.random(),
    Math.random(),
    alpha
  );
}

/**
 * 创建颜色渐变
 */
export function createColorGradient(startColor, endColor, steps) {
  const colors = [];
  
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const color = Cesium.Color.lerp(startColor, endColor, t, new Cesium.Color());
    colors.push(color);
  }
  
  return colors;
}

/**
 * 转换颜色格式
 */
export function colorToHex(cesiumColor) {
  const r = Math.round(cesiumColor.red * 255);
  const g = Math.round(cesiumColor.green * 255);
  const b = Math.round(cesiumColor.blue * 255);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * 从十六进制创建Cesium颜色
 */
export function colorFromHex(hex, alpha = 1.0) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return new Cesium.Color(
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255,
      alpha
    );
  }
  return Cesium.Color.WHITE;
}
