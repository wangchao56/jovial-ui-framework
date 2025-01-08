'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const vue = require('vue')
const upload_vue_vue_type_script_lang = require('./upload.vue2.cjs')
require('./upload.vue3.cjs')
const _pluginVue_exportHelper = require('../../../../_virtual/_plugin-vue_export-helper.cjs')

const _hoisted_1 = { key: 0 }
const _hoisted_2 = ['onClick']
const _hoisted_3 = ['disabled']
const _hoisted_4 = { key: 1 }
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    'div',
    {
      class: 'file-upload',
      onDragover: _cache[4] || (_cache[4] = vue.withModifiers(() => {
      }, ['prevent'])),
      onDrop: _cache[5] || (_cache[5] = vue.withModifiers((...args) => _ctx.handleDrop && _ctx.handleDrop(...args), ['prevent'])),
    },
    [
      vue.createElementVNode(
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
      vue.createElementVNode('button', {
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.triggerFileInput && _ctx.triggerFileInput(...args)),
      }, '\u9009\u62E9\u6587\u4EF6'),
      vue.createElementVNode('span', {
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.triggerFileInput && _ctx.triggerFileInput(...args)),
      }, '\u6216\u62D6\u62FD\u6587\u4EF6/\u6587\u4EF6\u5939\u5230\u8FD9\u91CC'),
      _ctx.files.length ? (vue.openBlock(), vue.createElementBlock('ul', _hoisted_1, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.files, (file, index) => {
            return vue.openBlock(), vue.createElementBlock('li', { key: index }, [
              vue.createTextVNode(
                `${vue.toDisplayString(file.name)} `,
                1,
                /* TEXT */
              ),
              vue.createElementVNode('button', {
                onClick: $event => _ctx.removeFile(index),
              }, '\u5220\u9664', 8, _hoisted_2),
            ])
          }),
          128,
          /* KEYED_FRAGMENT */
        )),
      ])) : vue.createCommentVNode('v-if', true),
      vue.createElementVNode('button', {
        disabled: _ctx.files.length === 0,
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.uploadFiles && _ctx.uploadFiles(...args)),
      }, ' \u4E0A\u4F20\u6587\u4EF6 ', 8, _hoisted_3),
      _ctx.uploadProgress !== null ? (vue.openBlock(), vue.createElementBlock(
        'div',
        _hoisted_4,
        `\u4E0A\u4F20\u8FDB\u5EA6: ${vue.toDisplayString(_ctx.uploadProgress)}%`,
        1,
        /* TEXT */
      )) : vue.createCommentVNode('v-if', true),
    ],
    32,
    /* NEED_HYDRATION */
  )
}
const _upload = /* @__PURE__ */ _pluginVue_exportHelper.default(upload_vue_vue_type_script_lang.default, [['render', _sfc_render], ['__scopeId', 'data-v-5e0ffdb3']])

exports.default = _upload
// # sourceMappingURL=upload.vue.cjs.map
