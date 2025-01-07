'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core_esm = require('../../../node_modules/.pnpm/@better-scroll_core@2.5.1/node_modules/@better-scroll/core/dist/core.esm.cjs');
var scrollBar_esm = require('../../../node_modules/.pnpm/@better-scroll_scroll-bar@2.5.1/node_modules/@better-scroll/scroll-bar/dist/scroll-bar.esm.cjs');
var mouseWheel_esm = require('../../../node_modules/.pnpm/@better-scroll_mouse-wheel@2.5.1/node_modules/@better-scroll/mouse-wheel/dist/mouse-wheel.esm.cjs');

const _hoisted_1 = { class: "custom-scrollbar-container" };
const _hoisted_2 = { class: "custom-scrollbar-content" };
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "JvScrollBox"
  },
  __name: "jv-scroll-box",
  props: {
    scrollMode: {
      type: Object,
      default() {
        return {
          vertical: true,
          horizontal: false
        };
      }
    }
  },
  setup(__props) {
    core_esm.default.use(scrollBar_esm.default);
    core_esm.default.use(mouseWheel_esm.default);
    const props = __props;
    const wrapperRef = ref(null);
    const horizontalRef = ref();
    const verticalRef = ref();
    const bscroll = ref(null);
    const scrollmode = computed(() => {
      var _a, _b, _c, _d;
      return {
        vertical: (_b = (_a = props.scrollMode) == null ? undefined : _a.vertical) != null ? _b : true,
        horizontal: (_d = (_c = props.scrollMode) == null ? undefined : _c.horizontal) != null ? _d : false
      };
    });
    onMounted(() => {
      if (wrapperRef.value) {
        console.log(2);
        bscroll.value = new core_esm.default(wrapperRef.value, {
          freeScroll: true,
          click: true,
          scrollY: scrollmode.value.vertical,
          scrollX: scrollmode.value.horizontal,
          mouseWheel: {
            speed: 10,
            invert: false,
            easeTime: 300
          },
          scrollbar: {
            customElements: [horizontalRef.value, verticalRef.value],
            fade: false,
            interactive: true,
            scrollbarTrackClickable: true
          }
        });
      }
      nextTick(() => {
        console.log("nextTick");
        if (bscroll.value) {
          bscroll.value.refresh();
        }
      });
    });
    onUnmounted(() => {
      if (bscroll.value) {
        bscroll.value.destroy();
      }
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.createElementVNode(
          "div",
          {
            ref_key: "wrapperRef",
            ref: wrapperRef,
            class: "custom-scrollbar-wrapper"
          },
          [
            vue.createElementVNode("div", _hoisted_2, [
              vue.renderSlot(_ctx.$slots, "default", {}, undefined, true)
            ]),
            vue.createCommentVNode(" custom-vertical-scrollbar"),
            vue.unref(scrollmode).vertical ? (vue.openBlock(), vue.createElementBlock(
              "div",
              {
                key: 0,
                class: "custom-vertical-scrollbar",
                ref_key: "verticalRef",
                ref: verticalRef
              },
              _cache[0] || (_cache[0] = [
                vue.createElementVNode(
                  "div",
                  { class: "custom-vertical-indicator" },
                  null,
                  -1
                  /* HOISTED */
                )
              ]),
              512
              /* NEED_PATCH */
            )) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" custom-horizontal-scrollbar"),
            vue.unref(scrollmode).horizontal ? (vue.openBlock(), vue.createElementBlock(
              "div",
              {
                key: 1,
                class: "custom-horizontal-scrollbar",
                ref_key: "horizontalRef",
                ref: horizontalRef
              },
              _cache[1] || (_cache[1] = [
                vue.createElementVNode(
                  "div",
                  { class: "custom-horizontal-indicator" },
                  null,
                  -1
                  /* HOISTED */
                )
              ]),
              512
              /* NEED_PATCH */
            )) : vue.createCommentVNode("v-if", true)
          ],
          512
          /* NEED_PATCH */
        )
      ]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=jv-scroll-box.vue2.cjs.map
