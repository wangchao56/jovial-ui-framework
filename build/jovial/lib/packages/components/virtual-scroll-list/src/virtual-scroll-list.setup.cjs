'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var props = require('./props.cjs');
var virtual = require('./virtual.cjs');
var create = require('../../../utils/create.cjs');
var virtualItem_setup = require('./virtual-item.setup.cjs');
var core_esm = require('../../../../node_modules/.pnpm/@better-scroll_core@2.5.1/node_modules/@better-scroll/core/dist/core.esm.cjs');
var mouseWheel_esm = require('../../../../node_modules/.pnpm/@better-scroll_mouse-wheel@2.5.1/node_modules/@better-scroll/mouse-wheel/dist/mouse-wheel.esm.cjs');
var scrollBar_esm = require('../../../../node_modules/.pnpm/@better-scroll_scroll-bar@2.5.1/node_modules/@better-scroll/scroll-bar/dist/scroll-bar.esm.cjs');

core_esm.default.use(mouseWheel_esm.default);
core_esm.default.use(scrollBar_esm.default);
var _VirtualScrollList = vue.defineComponent({
  name: "jv-virtual-scroll-list",
  props: props.virtualProps,
  components: {
    VirtualItemSetup: virtualItem_setup.default
  },
  emits: ["scroll"],
  setup(props, { expose, slots }) {
    const bem = create.createNamespace("virtual-scroll-list");
    const range = ref(null);
    const rootDomRef = ref(null);
    const bscrollRef = ref(null);
    const update = (newRange) => {
      range.value = newRange;
    };
    const bscrollOptions = {
      probeType: 3,
      scrollY: true,
      scrollbar: {
        fade: false,
        interactive: true,
        scrollbarTrackClickable: true
      },
      mouseWheel: {
        speed: 10,
        invert: false,
        easeTime: 300
      }
    };
    function initScroll() {
      bscrollRef.value = new core_esm.default(rootDomRef.value, bscrollOptions);
      bscrollRef.value.on("scroll", handleScroll);
    }
    const getUniqueKeyFormDataSource = () => {
      const { dataSource, dataKey } = props;
      return dataSource.map((source) => source[dataKey]).filter(Boolean);
    };
    let virtual$1 = null;
    const installVirtual = () => {
      virtual$1 = virtual.initVirtual(
        {
          keeps: props.keeps,
          buffer: 1,
          uniqueIds: getUniqueKeyFormDataSource(),
          estimateSize: props.estimateSize
        },
        update
      );
    };
    function genRenderComponent() {
      let slots2 = [];
      if (!virtual$1) return /* @__PURE__ */ React.createElement("div", null, "\u6682\u65E0\u6570\u636E");
      const { start, end } = range.value;
      const { dataSource, dataComponent, isDynamic, dataKey } = props;
      if (!dataSource) {
        return /* @__PURE__ */ React.createElement("div", null, "\u6682\u65E0\u6570\u636E");
      }
      if (!dataComponent) {
        return /* @__PURE__ */ React.createElement("div", null, "\u6682\u65E0\u6570\u636E");
      }
      for (let i = start; i <= end; i++) {
        const source = dataSource[i];
        const uniqueKey = source[dataKey];
        if (!source) continue;
        if (isDynamic) {
          slots2.push(
            /* @__PURE__ */ React.createElement(
              virtualItem_setup.default,
              {
                class: "scroll-item",
                key: uniqueKey,
                source,
                component: dataComponent,
                uniqueKey: String(uniqueKey),
                estimateSize: props.estimateSize,
                index: i,
                onItemResize: virtual$1.handleResize
              }
            )
          );
          continue;
        } else {
          slots2.push(
            /* @__PURE__ */ React.createElement("dataComponent", { key: uniqueKey, source: { ...source, index: i } })
          );
        }
      }
      return slots2;
    }
    function handleScroll(params) {
      console.log("scrolling-", params);
      if (!virtual$1) return;
      const offsetTop = params.y > 0 ? 0 : Math.abs(params.y);
      virtual$1.handleScroll(offsetTop);
    }
    onBeforeMount(() => {
      installVirtual();
    });
    onMounted(() => {
      initScroll();
    });
    onUnmounted(() => {
      var _a, _b;
      (_a = bscrollRef.value) == null ? undefined : _a.off("scroll", handleScroll);
      (_b = bscrollRef.value) == null ? undefined : _b.destroy();
    });
    const handleScrollTo = (options) => {
      console.log("scrollTo", options);
      if (!bscrollRef.value) {
        return;
      }
      let keys = Object.keys(options);
      if (keys.includes("x") || keys.includes("y")) {
        bscrollRef.value.scrollTo(options.x || 0, options.y || 0);
        return;
      }
      if (keys.includes("position")) {
        bscrollRef.value.scrollTo(
          0,
          options.position === "top" ? 0 : bscrollRef.value.maxScrollY
        );
        return;
      }
      if (keys.includes("index") && options.index !== undefined) {
        if (!virtual$1) return;
        bscrollRef.value.scrollTo(0, -options.index * props.estimateSize);
        virtual$1.handleScroll(options.index * props.estimateSize);
        return;
      }
      if (keys.includes("key")) {
        const index = props.dataSource.findIndex(
          (item) => item[props.dataKey] === options.key
        );
        bscrollRef.value.scrollTo(0, -index * props.estimateSize);
        return;
      }
      if (keys.includes("left") || keys.includes("top")) {
        bscrollRef.value.scrollTo(
          options.left || 0,
          -Math.abs(options.top || 0)
        );
        if (!virtual$1) return;
        virtual$1.handleScroll(Math.abs(options.top || 0));
        return;
      }
    };
    expose({
      scrollTo: handleScrollTo
    });
    return () => {
      const { start, end, padFront, padBehind } = range.value;
      const paddingStyle = {
        padding: `${padFront}px 0 ${padBehind}px 0`
      };
      return /* @__PURE__ */ React.createElement("section", { class: [bem.b(), "core-container"] }, /* @__PURE__ */ React.createElement(
        "div",
        {
          class: [bem.e("wrapper"), "scroll-wrapper"],
          ref: rootDomRef
        },
        /* @__PURE__ */ React.createElement("div", { class: [bem.e("content")], style: paddingStyle }, genRenderComponent())
      ));
    };
  }
});

exports.default = _VirtualScrollList;
//# sourceMappingURL=virtual-scroll-list.setup.cjs.map
