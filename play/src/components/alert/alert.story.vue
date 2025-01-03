<script setup lang="ts">
import JvAlert from '@jovial/components/alert'
import { ref, watchEffect } from 'vue'
</script>
<template>
  <Story title="alert组件">
    <Variant title="Default">
      <jv-alert
        type="warning"
        title="警告"
        message="这是一个警告提示，请留意信息准确性。请注意，此消息仅为示例，并非真实情况。感谢您的关注与配合！"
      ></jv-alert>
      <JvAlert
        type="info"
        message="这是一个警告提示，请留意信息准确性。请注意，此消息仅为示例，并非真实情况。感谢您的关注与配合！"
      ></JvAlert>
      <JvAlert
        type="success"
        title="成功"
        message="这是一个成功提示，请留意信息准确性。请注意，此消息仅为示例，并非真实情况。感谢您的关注与配合！"
        :closable="true"
        :show-icon="true"
        @close="console.log('关闭')"
      />
      <JvAlert
        type="danger"
        title="错误"
        message="这是一个成功提示，请留意信息准确性。请注意，此消息仅为示例，并非真实情况。感谢您的关注与配合！"
        :closable="true"
        :show-icon="true"
        @close="console.log('关闭')"
      />
    </Variant>
  </Story>
</template>
<docs lang="md"></docs>
