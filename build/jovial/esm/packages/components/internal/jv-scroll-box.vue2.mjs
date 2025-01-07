import { defineComponent, openBlock, createElementBlock, createElementVNode, renderSlot, createCommentVNode, unref } from 'vue';
import BScroll from '../../../node_modules/.pnpm/@better-scroll_core@2.5.1/node_modules/@better-scroll/core/dist/core.esm.mjs';
import ScrollBar from '../../../node_modules/.pnpm/@better-scroll_scroll-bar@2.5.1/node_modules/@better-scroll/scroll-bar/dist/scroll-bar.esm.mjs';
import MouseWheel from '../../../node_modules/.pnpm/@better-scroll_mouse-wheel@2.5.1/node_modules/@better-scroll/mouse-wheel/dist/mouse-wheel.esm.mjs';

const _hoisted_1 = { class: "custom-scrollbar-container" };
const _hoisted_2 = { class: "custom-scrollbar-content" };
var _sfc_main = /* @__PURE__ */ defineComponent({
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
    BScroll.use(ScrollBar);
    BScroll.use(MouseWheel);
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
        bscroll.value = new BScroll(wrapperRef.value, {
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
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode(
          "div",
          {
            ref_key: "wrapperRef",
            ref: wrapperRef,
            class: "custom-scrollbar-wrapper"
          },
          [
            createElementVNode("div", _hoisted_2, [
              renderSlot(_ctx.$slots, "default", {}, undefined, true)
            ]),
            createCommentVNode(" custom-vertical-scrollbar"),
            unref(scrollmode).vertical ? (openBlock(), createElementBlock(
              "div",
              {
                key: 0,
                class: "custom-vertical-scrollbar",
                ref_key: "verticalRef",
                ref: verticalRef
              },
              _cache[0] || (_cache[0] = [
                createElementVNode(
                  "div",
                  { class: "custom-vertical-indicator" },
                  null,
                  -1
                  /* HOISTED */
                )
              ]),
              512
              /* NEED_PATCH */
            )) : createCommentVNode("v-if", true),
            createCommentVNode(" custom-horizontal-scrollbar"),
            unref(scrollmode).horizontal ? (openBlock(), createElementBlock(
              "div",
              {
                key: 1,
                class: "custom-horizontal-scrollbar",
                ref_key: "horizontalRef",
                ref: horizontalRef
              },
              _cache[1] || (_cache[1] = [
                createElementVNode(
                  "div",
                  { class: "custom-horizontal-indicator" },
                  null,
                  -1
                  /* HOISTED */
                )
              ]),
              512
              /* NEED_PATCH */
            )) : createCommentVNode("v-if", true)
          ],
          512
          /* NEED_PATCH */
        )
      ]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=jv-scroll-box.vue2.mjs.map
