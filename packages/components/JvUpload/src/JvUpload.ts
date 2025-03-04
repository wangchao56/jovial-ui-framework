import type { Slot } from 'vue'

export {}
// 【阿里云的文件上传【渡一教育】】https://www.bilibili.com/video/BV181421q7fR?vd_source=2798d1c0a3d7776474c979018412363a
// 【Vue3+TS，搭建自己的组件库】https://www.bilibili.com/video/BV1LTB4YqE43?p=26&vd_source=2798d1c0a3d7776474c979018412363a

// 文件类型
export const fileType = {
  image: [
    'image/png', // PNG 文件
    'image/jpeg', // JPEG 文件
    'image/jpg', // JPG 文件
    'image/gif', // GIF 文件
    'image/webp', // WebP 文件
    'image/svg+xml', // SVG 文件
    'image/x-icon', // ICO 文件
  ],
  video: [
    'video/mp4', // MP4 文件
    'video/avi', // AVI 文件
    'video/mov', // MOV 文件
    'video/wmv', // WMV 文件
    'video/flv', // FLV 文件
    'video/mpeg', // MPEG 文件
    'video/mpg', // MPEG 文件
  ],
  audio: [
    'audio/mp3', // MP3 文件
    'audio/wav', // WAV 文件
    'audio/ogg', // OGG 文件
    'audio/m4a', // M4A 文件
    'audio/aac', // AAC 文件
  ],
  // 文档类型
  doc: [
    'application/pdf', // PDF 文件
    'application/msword', // Word 文件
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word 文件
    'application/vnd.ms-excel', // Excel 文件
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel 文件
    'application/vnd.ms-powerpoint', // PPT 文件
  ],
  // 其他类型
  other: [
    'application/octet-stream', // 二进制流
    'application/x-www-form-urlencoded', // 表单数据
    'application/json', // JSON 数据
    'application/xml', // XML 数据
    'application/x-javascript', // JavaScript 数据
    'application/x-msdownload', // 下载数据
    'application/x-ms-application', // 应用程序数据
  ],
}

export const jvUploadProps = {
  /** 是否多选 */
  multiple: {
    type: Boolean,
    default: false,
  },
  /** 文件类型 */
  accept: {
    type: String,
    default: '*',
  },
  /** 最大文件大小 */
  maxSize: {
    type: Number,
    default: 1024 * 1024 * 5,
  },
  /** 最大文件数量 */
  maxCount: {
    type: Number,
    default: 5,
  },
}

export type JvUploadProps = Partial<ExtractPropTypes<typeof jvUploadProps>>

export const jvUploadEmits = {
  success: (value: (string | number)[]) => value,
  error: (value: (string | number)[]) => value,
  progress: (value: (string | number)[]) => value,
  change: (value: (string | number)[]) => value,
}
// export type JvUploadEmits = Object as EmitOptions<typeof jvUploadEmits>
export interface JvUploadEmits {
  /** 上传成功 */
  (e: 'success', value: (string | number)[]): void
  /** 上传失败 */
  (e: 'error', value: (string | number)[]): void
  /** 上传进度 */
  (e: 'progress', value: (string | number)[]): void
  /** 上传改变 */
  (e: 'change', value: (string | number)[]): void
}

export interface JvUploadSlots {
  default: Slot
}

export interface JvUploadExpose {
  /** 清空上传列表 */
  clear: () => void
}
