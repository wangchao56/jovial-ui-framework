'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var common = require('../../../utils/common.cjs');
var create = require('../../../utils/create.cjs');
var form = require('./form.cjs');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{ name: "JvForm" },
  __name: "form",
  props: form.formProps,
  emits: form.formEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const bem = create.createNamespace("form");
    const fieldsContext = /* @__PURE__ */ new Set();
    const addField = (context2) => {
      if (common.isEmpty(context2.prop)) return;
      fieldsContext.add(context2);
    };
    const handleValidationResults = (results, callback) => {
      let errors = {};
      results.forEach((result) => {
        console.log("result", result);
        if (result.status === "rejected") {
          console.log("err", result.reason);
          errors = { ...errors, ...result.reason };
        } else {
          console.log("ok", result.value);
        }
      });
      if (Object.keys(errors).length > 0) {
        if (callback) {
          callback(false, errors);
        } else {
          Promise.reject(errors);
        }
      } else {
        if (callback) {
          callback(true, {});
        } else {
          Promise.resolve(true);
        }
      }
    };
    const validate = async (callback) => {
      const results = await Promise.allSettled(
        Array.from(fieldsContext).map((context2) => context2.validate(""))
      );
      handleValidationResults(results, callback);
    };
    const context = {
      ...props,
      addField
    };
    vue.provide(form.formProviderKey, context);
    __expose({
      validate
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "form",
        {
          class: vue.normalizeClass(vue.unref(bem).b())
        },
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=form.vue2.cjs.map
