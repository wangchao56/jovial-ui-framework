import { defineComponent, provide, openBlock, createElementBlock, normalizeClass, unref, renderSlot } from 'vue';
import { isEmpty } from '../../../utils/common.mjs';
import { createNamespace } from '../../../utils/create.mjs';
import { formProps, formEmits, formProviderKey } from './form.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "JvForm" },
  __name: "form",
  props: formProps,
  emits: formEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const bem = createNamespace("form");
    const fieldsContext = /* @__PURE__ */ new Set();
    const addField = (context2) => {
      if (isEmpty(context2.prop)) return;
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
    provide(formProviderKey, context);
    __expose({
      validate
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "form",
        {
          class: normalizeClass(unref(bem).b())
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=form.vue2.mjs.map
