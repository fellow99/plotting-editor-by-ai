<!--
  编辑器配置对话框
  用于修改编辑器的视图、地图、控制器、渲染等配置项
  采用 element-plus 组件，所有配置项可视化编辑
  新语法说明：使用<script setup>，组合式API，严格遵循Vue文件结构规范
-->

<script setup>
import { ref, watch } from 'vue';
import { ElDialog, ElForm, ElFormItem, ElInputNumber, ElSwitch, ElSelect, ElOption, ElColorPicker, ElButton, ElDivider } from 'element-plus';
import { useEditorConfig } from '../../composables/useEditorConfig.js';

/**
 * 对话框显示状态，由父组件通过 v-model:visible 控制
 */
const props = defineProps({
  modelValue: { type: Boolean, required: true }
});
const emit = defineEmits(['update:modelValue']);

/**
 * 编辑器配置响应式对象
 */
const {
  editorConfig,
  updateConfig,
  updateConfigs,
  resetConfig
} = useEditorConfig();

/**
 * 临时表单数据，避免直接修改响应式状态
 * 每个ref变量都加注释，说明用途
 */
const form = ref({
  // 视图配置
  baseLayerPicker: editorConfig.view.baseLayerPicker,
  // 地图配置
  imagery: editorConfig.map.imagery,
  terrain: editorConfig.map.terrain,
  skybox: editorConfig.map.skybox,
  atmosphere: editorConfig.map.atmosphere,
  lighting: editorConfig.map.lighting,
  underground: editorConfig.map.underground,
  depthTest: editorConfig.map.depthTest,
  // 控制器配置
  zoomEventType: editorConfig.controls.zoomEventType,
  tiltEventType: editorConfig.controls.tiltEventType,
  rotateEventType: editorConfig.controls.rotateEventType,
  // 渲染配置
  alpha: editorConfig.webgl.alpha,
  depth: editorConfig.webgl.depth,
  stencil: editorConfig.webgl.stencil,
  antialias: editorConfig.webgl.antialias
});

/**
 * 打开时同步配置
 */
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      form.value.baseLayerPicker = editorConfig.view.baseLayerPicker;
      form.value.imagery = editorConfig.map.imagery;
      form.value.terrain = editorConfig.map.terrain;
      form.value.skybox = editorConfig.map.skybox;
      form.value.atmosphere = editorConfig.map.atmosphere;
      form.value.lighting = editorConfig.map.lighting;
      form.value.underground = editorConfig.map.underground;
      form.value.depthTest = editorConfig.map.depthTest;
      form.value.zoomEventType = editorConfig.controls.zoomEventType;
      form.value.tiltEventType = editorConfig.controls.tiltEventType;
      form.value.rotateEventType = editorConfig.controls.rotateEventType;
      form.value.alpha = editorConfig.webgl.alpha;
      form.value.depth = editorConfig.webgl.depth;
      form.value.stencil = editorConfig.webgl.stencil;
      form.value.antialias = editorConfig.webgl.antialias;
    }
  }
);

/**
 * 保存配置
 * @description 将表单数据同步到响应式配置对象
 */
function handleSave() {
  updateConfigs({
    view: {
      baseLayerPicker: form.value.baseLayerPicker
    },
    map: {
      imagery: form.value.imagery,
      terrain: form.value.terrain,
      skybox: form.value.skybox,
      atmosphere: form.value.atmosphere,
      lighting: form.value.lighting,
      underground: form.value.underground,
      depthTest: form.value.depthTest
    },
    controls: {
      zoomEventType: form.value.zoomEventType,
      tiltEventType: form.value.tiltEventType,
      rotateEventType: form.value.rotateEventType
    },
    webgl: {
      alpha: form.value.alpha,
      depth: form.value.depth,
      stencil: form.value.stencil,
      antialias: form.value.antialias
    }
  });
  emit('update:modelValue', false);
}

/**
 * 关闭对话框
 */
function handleClose() {
  emit('update:modelValue', false);
}

/**
 * 重置为默认配置
 */
function handleReset() {
  resetConfig();
  form.value.baseLayerPicker = editorConfig.view.baseLayerPicker;
  form.value.imagery = editorConfig.map.imagery;
  form.value.terrain = editorConfig.map.terrain;
  form.value.skybox = editorConfig.map.skybox;
  form.value.atmosphere = editorConfig.map.atmosphere;
  form.value.lighting = editorConfig.map.lighting;
  form.value.underground = editorConfig.map.underground;
  form.value.depthTest = editorConfig.map.depthTest;
  form.value.zoomEventType = editorConfig.controls.zoomEventType;
  form.value.tiltEventType = editorConfig.controls.tiltEventType;
  form.value.rotateEventType = editorConfig.controls.rotateEventType;
  form.value.alpha = editorConfig.webgl.alpha;
  form.value.depth = editorConfig.webgl.depth;
  form.value.stencil = editorConfig.webgl.stencil;
  form.value.antialias = editorConfig.webgl.antialias;
}
</script>

<template>
  <ElDialog
    :model-value="props.modelValue"
    title="编辑器配置"
    width="520px"
    @close="handleClose"
  >
    <ElForm label-width="140px" size="small">
      <ElDivider content-position="left">视图配置</ElDivider>
      <ElFormItem label="图层选择器">
        <ElSwitch v-model="form.baseLayerPicker" />
      </ElFormItem>
      <ElDivider content-position="left">地图配置</ElDivider>
      <ElFormItem label="影像图层">
        <ElSwitch v-model="form.imagery" />
      </ElFormItem>
      <ElFormItem label="地形图层">
        <ElSwitch v-model="form.terrain" />
      </ElFormItem>
      <ElFormItem label="天空盒">
        <ElSwitch v-model="form.skybox" />
      </ElFormItem>
      <ElFormItem label="大气效果">
        <ElSwitch v-model="form.atmosphere" />
      </ElFormItem>
      <ElFormItem label="光照效果">
        <ElSwitch v-model="form.lighting" />
      </ElFormItem>
      <ElFormItem label="地下模式">
        <ElSwitch v-model="form.underground" />
      </ElFormItem>
      <ElFormItem label="深度测试">
        <ElSwitch v-model="form.depthTest" />
      </ElFormItem>
      <ElDivider content-position="left">控制器配置</ElDivider>
      <ElFormItem label="缩放事件类型">
        <ElSelect v-model="form.zoomEventType" style="width: 180px">
          <ElOption label="鼠标滚轮(WHEEL)" value="WHEEL" />
          <ElOption label="双指缩放(PINCH)" value="PINCH" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="倾斜事件类型">
        <ElSelect v-model="form.tiltEventType" style="width: 180px">
          <ElOption label="右键拖拽(RIGHT_DRAG)" value="RIGHT_DRAG" />
          <ElOption label="中键拖拽(MIDDLE_DRAG)" value="MIDDLE_DRAG" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="旋转事件类型">
        <ElSelect v-model="form.rotateEventType" style="width: 180px">
          <ElOption label="左键拖拽(LEFT_DRAG)" value="LEFT_DRAG" />
          <ElOption label="右键拖拽(RIGHT_DRAG)" value="RIGHT_DRAG" />
        </ElSelect>
      </ElFormItem>
      <ElDivider content-position="left">渲染配置</ElDivider>
      <ElFormItem label="Alpha通道">
        <ElSwitch v-model="form.alpha" />
      </ElFormItem>
      <ElFormItem label="深度缓冲区">
        <ElSwitch v-model="form.depth" />
      </ElFormItem>
      <ElFormItem label="模板缓冲区">
        <ElSwitch v-model="form.stencil" />
      </ElFormItem>
      <ElFormItem label="抗锯齿">
        <ElSwitch v-model="form.antialias" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton @click="handleReset" type="warning">重置默认</ElButton>
      <ElButton @click="handleClose">取消</ElButton>
      <ElButton @click="handleSave" type="primary">保存</ElButton>
    </template>
  </ElDialog>
</template>

<style scoped>
/* 编辑器配置对话框样式，可根据需要自定义 */
</style>
