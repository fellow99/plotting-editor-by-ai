/**
 * 几何工具函数
 * 基于Cesium的几何体创建和操作工具
 */
import * as Cesium from 'cesium';

/**
 * 创建标准几何体选项
 */
export const GEOMETRY_TYPES = {
  POINT: 'point',
  POLYLINE: 'polyline',
  POLYGON: 'polygon',
  CIRCLE: 'circle',
  RECTANGLE: 'rectangle',
  ELLIPSE: 'ellipse',
  BOX: 'box',
  CYLINDER: 'cylinder',
  ELLIPSOID: 'ellipsoid',
  WALL: 'wall',
  CORRIDOR: 'corridor'
};

/**
 * 创建点几何体配置
 */
export function createPointGeometry(options = {}) {
  return {
    pixelSize: options.pixelSize || 10,
    heightReference: options.heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
    color: options.color || Cesium.Color.YELLOW,
    outlineColor: options.outlineColor || Cesium.Color.BLACK,
    outlineWidth: options.outlineWidth || 2,
    show: options.show !== false,
    distanceDisplayCondition: options.distanceDisplayCondition,
    scaleByDistance: options.scaleByDistance,
    translucencyByDistance: options.translucencyByDistance,
    disableDepthTestDistance: options.disableDepthTestDistance
  };
}

/**
 * 创建线几何体配置
 */
export function createPolylineGeometry(options = {}) {
  return {
    width: options.width || 2,
    clampToGround: options.clampToGround !== false,
    material: options.material || Cesium.Color.CYAN,
    show: options.show !== false,
    followSurface: options.followSurface !== false,
    granularity: options.granularity || Cesium.Math.RADIANS_PER_DEGREE,
    shadows: options.shadows || Cesium.ShadowMode.DISABLED,
    distanceDisplayCondition: options.distanceDisplayCondition,
    classificationType: options.classificationType,
    arcType: options.arcType || Cesium.ArcType.GEODESIC
  };
}

/**
 * 创建面几何体配置
 */
export function createPolygonGeometry(options = {}) {
  return {
    material: options.material || Cesium.Color.BLUE.withAlpha(0.5),
    outline: options.outline !== false,
    outlineColor: options.outlineColor || Cesium.Color.BLUE,
    outlineWidth: options.outlineWidth || 1,
    height: options.height || 0,
    heightReference: options.heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
    extrudedHeight: options.extrudedHeight,
    extrudedHeightReference: options.extrudedHeightReference,
    show: options.show !== false,
    fill: options.fill !== false,
    shadows: options.shadows || Cesium.ShadowMode.DISABLED,
    distanceDisplayCondition: options.distanceDisplayCondition,
    classificationType: options.classificationType,
    stRotation: options.stRotation || 0.0,
    granularity: options.granularity || Cesium.Math.RADIANS_PER_DEGREE
  };
}

/**
 * 创建圆形几何体配置
 */
export function createCircleGeometry(options = {}) {
  return {
    semiMajorAxis: options.radius || 100000,
    semiMinorAxis: options.radius || 100000,
    material: options.material || Cesium.Color.GREEN.withAlpha(0.5),
    outline: options.outline !== false,
    outlineColor: options.outlineColor || Cesium.Color.GREEN,
    outlineWidth: options.outlineWidth || 1,
    height: options.height || 0,
    heightReference: options.heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
    extrudedHeight: options.extrudedHeight,
    extrudedHeightReference: options.extrudedHeightReference,
    show: options.show !== false,
    fill: options.fill !== false,
    shadows: options.shadows || Cesium.ShadowMode.DISABLED,
    distanceDisplayCondition: options.distanceDisplayCondition,
    classificationType: options.classificationType,
    granularity: options.granularity || Cesium.Math.RADIANS_PER_DEGREE,
    stRotation: options.stRotation || 0.0
  };
}

/**
 * 创建矩形几何体配置
 */
export function createRectangleGeometry(options = {}) {
  return {
    material: options.material || Cesium.Color.RED.withAlpha(0.5),
    outline: options.outline !== false,
    outlineColor: options.outlineColor || Cesium.Color.RED,
    outlineWidth: options.outlineWidth || 1,
    height: options.height || 0,
    heightReference: options.heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
    extrudedHeight: options.extrudedHeight,
    extrudedHeightReference: options.extrudedHeightReference,
    show: options.show !== false,
    fill: options.fill !== false,
    shadows: options.shadows || Cesium.ShadowMode.DISABLED,
    distanceDisplayCondition: options.distanceDisplayCondition,
    classificationType: options.classificationType,
    granularity: options.granularity || Cesium.Math.RADIANS_PER_DEGREE,
    stRotation: options.stRotation || 0.0
  };
}

/**
 * 创建椭圆几何体配置
 */
export function createEllipseGeometry(options = {}) {
  return {
    semiMajorAxis: options.semiMajorAxis || 100000,
    semiMinorAxis: options.semiMinorAxis || 50000,
    material: options.material || Cesium.Color.ORANGE.withAlpha(0.5),
    outline: options.outline !== false,
    outlineColor: options.outlineColor || Cesium.Color.ORANGE,
    outlineWidth: options.outlineWidth || 1,
    height: options.height || 0,
    heightReference: options.heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
    extrudedHeight: options.extrudedHeight,
    extrudedHeightReference: options.extrudedHeightReference,
    show: options.show !== false,
    fill: options.fill !== false,
    shadows: options.shadows || Cesium.ShadowMode.DISABLED,
    distanceDisplayCondition: options.distanceDisplayCondition,
    classificationType: options.classificationType,
    granularity: options.granularity || Cesium.Math.RADIANS_PER_DEGREE,
    stRotation: options.stRotation || 0.0,
    rotation: options.rotation || 0.0
  };
}

/**
 * 创建盒子几何体配置
 */
export function createBoxGeometry(options = {}) {
  return {
    dimensions: options.dimensions || new Cesium.Cartesian3(400000, 300000, 500000),
    material: options.material || Cesium.Color.BLUE.withAlpha(0.5),
    outline: options.outline !== false,
    outlineColor: options.outlineColor || Cesium.Color.BLUE,
    outlineWidth: options.outlineWidth || 1,
    show: options.show !== false,
    fill: options.fill !== false,
    shadows: options.shadows || Cesium.ShadowMode.ENABLED,
    distanceDisplayCondition: options.distanceDisplayCondition,
    heightReference: options.heightReference || Cesium.HeightReference.NONE
  };
}

/**
 * 创建圆柱几何体配置
 */
export function createCylinderGeometry(options = {}) {
  return {
    length: options.length || 400000,
    topRadius: options.topRadius || 200000,
    bottomRadius: options.bottomRadius || 200000,
    material: options.material || Cesium.Color.YELLOW.withAlpha(0.5),
    outline: options.outline !== false,
    outlineColor: options.outlineColor || Cesium.Color.YELLOW,
    outlineWidth: options.outlineWidth || 1,
    show: options.show !== false,
    fill: options.fill !== false,
    shadows: options.shadows || Cesium.ShadowMode.ENABLED,
    distanceDisplayCondition: options.distanceDisplayCondition,
    heightReference: options.heightReference || Cesium.HeightReference.NONE,
    numberOfVerticalLines: options.numberOfVerticalLines || 16,
    slices: options.slices || 128
  };
}

/**
 * 创建椭球几何体配置
 */
export function createEllipsoidGeometry(options = {}) {
  return {
    radii: options.radii || new Cesium.Cartesian3(300000, 300000, 300000),
    material: options.material || Cesium.Color.PURPLE.withAlpha(0.5),
    outline: options.outline !== false,
    outlineColor: options.outlineColor || Cesium.Color.PURPLE,
    outlineWidth: options.outlineWidth || 1,
    show: options.show !== false,
    fill: options.fill !== false,
    shadows: options.shadows || Cesium.ShadowMode.ENABLED,
    distanceDisplayCondition: options.distanceDisplayCondition,
    heightReference: options.heightReference || Cesium.HeightReference.NONE,
    subdivisions: options.subdivisions || 128,
    stackPartitions: options.stackPartitions || 64,
    slicePartitions: options.slicePartitions || 64
  };
}

/**
 * 创建墙几何体配置
 */
export function createWallGeometry(options = {}) {
  return {
    material: options.material || Cesium.Color.RED.withAlpha(0.5),
    outline: options.outline !== false,
    outlineColor: options.outlineColor || Cesium.Color.RED,
    outlineWidth: options.outlineWidth || 1,
    show: options.show !== false,
    fill: options.fill !== false,
    shadows: options.shadows || Cesium.ShadowMode.DISABLED,
    distanceDisplayCondition: options.distanceDisplayCondition,
    granularity: options.granularity || Cesium.Math.RADIANS_PER_DEGREE,
    maximumHeights: options.maximumHeights,
    minimumHeights: options.minimumHeights
  };
}

/**
 * 创建走廊几何体配置
 */
export function createCorridorGeometry(options = {}) {
  return {
    width: options.width || 200000,
    material: options.material || Cesium.Color.CYAN.withAlpha(0.5),
    outline: options.outline !== false,
    outlineColor: options.outlineColor || Cesium.Color.CYAN,
    outlineWidth: options.outlineWidth || 1,
    height: options.height || 0,
    heightReference: options.heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
    extrudedHeight: options.extrudedHeight,
    extrudedHeightReference: options.extrudedHeightReference,
    show: options.show !== false,
    fill: options.fill !== false,
    shadows: options.shadows || Cesium.ShadowMode.DISABLED,
    distanceDisplayCondition: options.distanceDisplayCondition,
    classificationType: options.classificationType,
    granularity: options.granularity || Cesium.Math.RADIANS_PER_DEGREE,
    cornerType: options.cornerType || Cesium.CornerType.ROUNDED
  };
}

/**
 * 创建标签几何体配置
 */
export function createLabelGeometry(options = {}) {
  return {
    font: options.font || '16pt sans-serif',
    style: options.style || Cesium.LabelStyle.FILL_AND_OUTLINE,
    fillColor: options.fillColor || Cesium.Color.WHITE,
    outlineColor: options.outlineColor || Cesium.Color.BLACK,
    outlineWidth: options.outlineWidth || 2,
    horizontalOrigin: options.horizontalOrigin || Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: options.verticalOrigin || Cesium.VerticalOrigin.BOTTOM,
    pixelOffset: options.pixelOffset || new Cesium.Cartesian2(0, -40),
    heightReference: options.heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
    show: options.show !== false,
    scale: options.scale || 1.0,
    distanceDisplayCondition: options.distanceDisplayCondition,
    scaleByDistance: options.scaleByDistance,
    translucencyByDistance: options.translucencyByDistance,
    disableDepthTestDistance: options.disableDepthTestDistance,
    eyeOffset: options.eyeOffset || Cesium.Cartesian3.ZERO,
    showBackground: options.showBackground || false,
    backgroundColor: options.backgroundColor || Cesium.Color.BLACK.withAlpha(0.7),
    backgroundPadding: options.backgroundPadding || new Cesium.Cartesian2(7, 5)
  };
}

/**
 * 创建模型几何体配置
 */
export function createModelGeometry(options = {}) {
  return {
    scale: options.scale || 1.0,
    minimumPixelSize: options.minimumPixelSize || 64,
    maximumScale: options.maximumScale || 200000,
    incrementallyLoadTextures: options.incrementallyLoadTextures !== false,
    runAnimations: options.runAnimations !== false,
    clampAnimations: options.clampAnimations !== false,
    shadows: options.shadows || Cesium.ShadowMode.ENABLED,
    heightReference: options.heightReference || Cesium.HeightReference.NONE,
    silhouetteColor: options.silhouetteColor,
    silhouetteSize: options.silhouetteSize || 0.0,
    color: options.color,
    colorBlendMode: options.colorBlendMode || Cesium.ColorBlendMode.HIGHLIGHT,
    colorBlendAmount: options.colorBlendAmount || 0.5,
    show: options.show !== false,
    distanceDisplayCondition: options.distanceDisplayCondition,
    imageBasedLightingFactor: options.imageBasedLightingFactor || new Cesium.Cartesian2(1.0, 1.0),
    lightColor: options.lightColor
  };
}

/**
 * 获取几何体默认名称
 */
export function getDefaultGeometryName(type) {
  const names = {
    [GEOMETRY_TYPES.POINT]: '点标记',
    [GEOMETRY_TYPES.POLYLINE]: '线标记',
    [GEOMETRY_TYPES.POLYGON]: '面标记',
    [GEOMETRY_TYPES.CIRCLE]: '圆形',
    [GEOMETRY_TYPES.RECTANGLE]: '矩形',
    [GEOMETRY_TYPES.ELLIPSE]: '椭圆',
    [GEOMETRY_TYPES.BOX]: '盒子',
    [GEOMETRY_TYPES.CYLINDER]: '圆柱',
    [GEOMETRY_TYPES.ELLIPSOID]: '椭球',
    [GEOMETRY_TYPES.WALL]: '墙体',
    [GEOMETRY_TYPES.CORRIDOR]: '走廊'
  };
  
  return names[type] || '几何体';
}

/**
 * 获取几何体图标
 */
export function getGeometryIcon(type) {
  const icons = {
    [GEOMETRY_TYPES.POINT]: '📍',
    [GEOMETRY_TYPES.POLYLINE]: '📏',
    [GEOMETRY_TYPES.POLYGON]: '🔷',
    [GEOMETRY_TYPES.CIRCLE]: '⭕',
    [GEOMETRY_TYPES.RECTANGLE]: '▭',
    [GEOMETRY_TYPES.ELLIPSE]: '🥚',
    [GEOMETRY_TYPES.BOX]: '📦',
    [GEOMETRY_TYPES.CYLINDER]: '🥫',
    [GEOMETRY_TYPES.ELLIPSOID]: '🌐',
    [GEOMETRY_TYPES.WALL]: '🧱',
    [GEOMETRY_TYPES.CORRIDOR]: '🛤️'
  };
  
  return icons[type] || '📄';
}

/**
 * 创建预设材质
 */
export function createMaterial(type, options = {}) {
  switch (type) {
    case 'color':
      return options.color || Cesium.Color.WHITE;
      
    case 'image':
      return new Cesium.ImageMaterialProperty({
        image: options.image,
        repeat: options.repeat || new Cesium.Cartesian2(1.0, 1.0),
        color: options.color || Cesium.Color.WHITE,
        transparent: options.transparent !== false
      });
      
    case 'grid':
      return new Cesium.GridMaterialProperty({
        color: options.color || Cesium.Color.CYAN,
        cellAlpha: options.cellAlpha || 0.1,
        lineCount: options.lineCount || new Cesium.Cartesian2(8, 8),
        lineThickness: options.lineThickness || new Cesium.Cartesian2(1.0, 1.0),
        lineOffset: options.lineOffset || new Cesium.Cartesian2(0.0, 0.0)
      });
      
    case 'stripe':
      return new Cesium.StripeMaterialProperty({
        evenColor: options.evenColor || Cesium.Color.WHITE,
        oddColor: options.oddColor || Cesium.Color.BLACK,
        offset: options.offset || 0.0,
        repeat: options.repeat || 16
      });
      
    case 'checkerboard':
      return new Cesium.CheckerboardMaterialProperty({
        evenColor: options.evenColor || Cesium.Color.WHITE,
        oddColor: options.oddColor || Cesium.Color.BLACK,
        repeat: options.repeat || new Cesium.Cartesian2(4, 4)
      });
      
    case 'polylineOutline':
      return new Cesium.PolylineOutlineMaterialProperty({
        color: options.color || Cesium.Color.ORANGE,
        outlineColor: options.outlineColor || Cesium.Color.BLACK,
        outlineWidth: options.outlineWidth || 2
      });
      
    case 'polylineGlow':
      return new Cesium.PolylineGlowMaterialProperty({
        color: options.color || Cesium.Color.CYAN,
        glowPower: options.glowPower || 0.25,
        taperPower: options.taperPower || 1.0
      });
      
    case 'polylineArrow':
      return new Cesium.PolylineArrowMaterialProperty(
        options.color || Cesium.Color.YELLOW
      );
      
    case 'polylineDash':
      return new Cesium.PolylineDashMaterialProperty({
        color: options.color || Cesium.Color.CYAN,
        dashLength: options.dashLength || 16.0,
        dashPattern: options.dashPattern || 255
      });
      
    default:
      return Cesium.Color.WHITE;
  }
}

/**
 * 计算几何体边界框
 */
export function calculateBoundingBox(entity) {
  if (!entity) return null;

  try {
    // 获取实体的边界球
    const boundingSphere = entity.computeBoundingSphere(Cesium.JulianDate.now());
    if (!boundingSphere) return null;

    // 转换为边界框
    const boundingRectangle = Cesium.Rectangle.fromBoundingSphere(boundingSphere);
    
    return {
      west: Cesium.Math.toDegrees(boundingRectangle.west),
      south: Cesium.Math.toDegrees(boundingRectangle.south),
      east: Cesium.Math.toDegrees(boundingRectangle.east),
      north: Cesium.Math.toDegrees(boundingRectangle.north),
      center: {
        longitude: Cesium.Math.toDegrees((boundingRectangle.west + boundingRectangle.east) / 2),
        latitude: Cesium.Math.toDegrees((boundingRectangle.south + boundingRectangle.north) / 2)
      }
    };

  } catch (error) {
    console.warn('计算边界框失败:', error);
    return null;
  }
}

/**
 * 优化几何体性能
 */
export function optimizeGeometry(entity, options = {}) {
  if (!entity) return;

  try {
    // 设置距离显示条件
    if (options.maxDistance) {
      const distanceCondition = new Cesium.DistanceDisplayCondition(0.0, options.maxDistance);
      
      if (entity.point) entity.point.distanceDisplayCondition = distanceCondition;
      if (entity.label) entity.label.distanceDisplayCondition = distanceCondition;
      if (entity.model) entity.model.distanceDisplayCondition = distanceCondition;
      if (entity.billboard) entity.billboard.distanceDisplayCondition = distanceCondition;
    }

    // 设置按距离缩放
    if (options.scaleByDistance && entity.point) {
      entity.point.scaleByDistance = new Cesium.NearFarScalar(
        options.scaleByDistance.near || 1000,
        options.scaleByDistance.nearValue || 1.0,
        options.scaleByDistance.far || 1000000,
        options.scaleByDistance.farValue || 0.5
      );
    }

    // 设置按距离透明度
    if (options.translucencyByDistance) {
      const translucency = new Cesium.NearFarScalar(
        options.translucencyByDistance.near || 1000,
        options.translucencyByDistance.nearValue || 1.0,
        options.translucencyByDistance.far || 1000000,
        options.translucencyByDistance.farValue || 0.1
      );
      
      if (entity.point) entity.point.translucencyByDistance = translucency;
      if (entity.label) entity.label.translucencyByDistance = translucency;
      if (entity.billboard) entity.billboard.translucencyByDistance = translucency;
    }

    // 禁用深度测试距离
    if (options.disableDepthTestDistance) {
      if (entity.point) entity.point.disableDepthTestDistance = options.disableDepthTestDistance;
      if (entity.label) entity.label.disableDepthTestDistance = options.disableDepthTestDistance;
      if (entity.billboard) entity.billboard.disableDepthTestDistance = options.disableDepthTestDistance;
    }

  } catch (error) {
    console.warn('优化几何体失败:', error);
  }
}
