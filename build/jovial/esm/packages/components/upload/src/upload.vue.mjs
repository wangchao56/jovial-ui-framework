import { createCommentVNode, createElementBlock, createElementVNode, createTextVNode, Fragment, openBlock, renderList, toDisplayString, withModifiers } from 'vue'
import _export_sfc from '../../../../_virtual/_plugin-vue_export-helper.mjs'
import _sfc_main from './upload.vue2.mjs'
import './upload.vue3.mjs'

const _hoisted_1 = { key: 0 }
const _hoisted_2 = ['onClick']
const _hoisted_3 = ['disabled']
const _hoisted_4 = { key: 1 }
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    'div',
    {
      class: 'file-upload',
      onDragover: _cache[4] || (_cache[4] = withModifiers(() => {
      }, ['prevent'])),
      onDrop: _cache[5] || (_cache[5] = withModifiers((...args) => _ctx.handleDrop && _ctx.handleDrop(...args), ['prevent'])),
    },
    [
      createElementVNode(
        'input',
        {
          ref: 'fileInput',
          type: 'file',
          multiple: '',
          webkitdirectory: '',
          directory: '',
          style: { display: 'none' },
          onChange: _cache[0] || (_cache[0] = (...args) => _ctx.handleFileChange && _ctx.handleFileChange(...args)),
        },
        null,
        544,
        /* NEED_HYDRATION, NEED_PATCH */
      ),
      createElementVNode('button', {
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.triggerFileInput && _ctx.triggerFileInput(...args)),
      }, '\u9009\u62E9\u6587\u4EF6'),
      createElementVNode('span', {
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.triggerFileInput && _ctx.triggerFileInput(...args)),
      }, '\u6216\u62D6\u62FD\u6587\u4EF6/\u6587\u4EF6\u5939\u5230\u8FD9\u91CC'),
      _ctx.files.length ? (openBlock(), createElementBlock('ul', _hoisted_1, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.files, (file, index) => {
            return openBlock(), createElementBlock('li', { key: index }, [
              createTextVNode(
                `${toDisplayString(file.name)} `,
                1,
                /* TEXT */
              ),
              createElementVNode('button', {
                onClick: $event => _ctx.removeFile(index),
              }, '\u5220\u9664', 8, _hoisted_2),
            ])
          }),
          128,
          /* KEYED_FRAGMENT */
        )),
      ])) : createCommentVNode('v-if', true),
      createElementVNode('button', {
        disabled: _ctx.files.length === 0,
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.uploadFiles && _ctx.uploadFiles(...args)),
      }, ' \u4E0A\u4F20\u6587\u4EF6 ', 8, _hoisted_3),
      _ctx.uploadProgress !== null ? (openBlock(), createElementBlock(
        'div',
        _hoisted_4,
        `\u4E0A\u4F20\u8FDB\u5EA6: ${toDisplayString(_ctx.uploadProgress)}%`,
        1,
        /* TEXT */
      )) : createCommentVNode('v-if', true),
    ],
    32,
    /* NEED_HYDRATION */
  )
}
const _upload = /* @__PURE__ */ _export_sfc(_sfc_main, [['render', _sfc_render], ['__scopeId', 'data-v-5e0ffdb3']])

export { _upload as default }
// # sourceMappingURL=upload.vue.mjs.map
