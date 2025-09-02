export default {
    animation: false, // 是否创建动画小器件，左下角仪表
    baseLayerPicker: false, // 是否显示图层选择器
    fullscreenButton: false, // 是否显示全屏按钮
    geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
    homeButton: false, // 是否显示Home按钮
    infoBox: false, // 是否显示信息框
    sceneModePicker: false, // 是否显示3D/2D选择器
    selectionIndicator: false, // 是否显示选取指示器组件
    timeline: false, // 是否显示时间轴
    navigationHelpButton: false, // 是否显示右上角的帮助按钮
    scene3DOnly: true, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    useDefaultRenderLoop: true, // 如果需要控制渲染循环，则设为true
    targetFrameRate: undefined, // 使用默认render loop时的帧率
    showRenderLoopErrors: false, // 如果设为true，将在一个HTML面板中显示错误信息
    automaticallyTrackDataSourceClocks: true, // 自动追踪最近添加的数据源的时钟设置
    contextOptions: { // 传递给Scene对象的上下文参数（scene.options） 截图需要的
        webgl: {
            alpha: true, // 是否包含alpha通道
            depth: true, // 是否包含深度缓冲区
            stencil: true, // 是否包含模板缓冲区
            antialias: true, // 是否执行抗锯齿
            premultipliedAlpha: true, // 是否将颜色缓冲区预乘alpha
            // 通过canvas.toDataURL()实现截图需要将该项设置为true
            preserveDrawingBuffer: true, // 是否保存绘图缓冲区
            failIfMajorPerformanceCaveat: true // 如果系统性能低下则创建失败
        }
    }
};
