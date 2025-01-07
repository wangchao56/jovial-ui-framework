import { ref, onMounted, onUnmounted } from 'vue';
import BScroll from '../../node_modules/.pnpm/@better-scroll_core@2.5.1/node_modules/@better-scroll/core/dist/core.esm.mjs';
import MouseWheel from '../../node_modules/.pnpm/@better-scroll_mouse-wheel@2.5.1/node_modules/@better-scroll/mouse-wheel/dist/mouse-wheel.esm.mjs';
import ScrollBar from '../../node_modules/.pnpm/@better-scroll_scroll-bar@2.5.1/node_modules/@better-scroll/scroll-bar/dist/scroll-bar.esm.mjs';

BScroll.use(MouseWheel);
BScroll.use(ScrollBar);
function useBScroll(wrapper, options) {
  const bscroll = ref(null);
  onMounted(() => {
    if (wrapper.value) {
      console.log(2);
      bscroll.value = new BScroll(wrapper.value, options);
    }
  });
  onUnmounted(() => {
    if (bscroll.value) {
      bscroll.value.destroy();
    }
  });
  return {
    bscroll
  };
}

export { useBScroll };
//# sourceMappingURL=useBScroll.mjs.map
