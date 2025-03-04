import { createNamespace } from '@jienix/utils'
import { computed, type CSSProperties, defineComponent, Transition } from 'vue'
import { jvSkeletonProps } from './JvSkeleton'
import '../style/style.css'

export default defineComponent({
  name: 'JvSkeleton',
  props: jvSkeletonProps,
  setup(props, { slots }) {
    const bem = createNamespace('skeleton')

    const styles = computed<CSSProperties>(() => ({
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
      height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    }))

    const renderContent = () => {
      switch (props.type) {
        case 'text':
          return Array.from({ length: props.rows }).map((_, index) => (
            <div key={index} class={bem.e('text')} />
          ))
        case 'avatar':
          return <div class={bem.e('avatar')} />
        case 'button':
          return <div class={bem.e('button')} />
        case 'image':
          return <div class={bem.e('image')} />
        case 'card':
          return (
            <>
              <div class={bem.e('image')} />
              <div class={bem.e('content')}>
                <div class={bem.e('title')} />
                <div class={bem.e('text')} />
              </div>
            </>
          )
        case 'list':
          return Array.from({ length: props.rows }).map((_, index) => (
            <div key={index} class={bem.e('list-item')}>
              <div class={bem.e('avatar')} />
              <div class={bem.e('content')}>
                <div class={bem.e('title')} />
                <div class={bem.e('text')} />
              </div>
            </div>
          ))
        default:
          return null
      }
    }

    const renderSkeleton = () => (
      <div
        class={[
          bem.b(),
          bem.m(props.type),
          { [bem.m('animated')]: props.animated },
        ]}
        style={styles.value}
      >
        {renderContent()}
      </div>
    )

    return () => (
      <Transition
        name={bem.b()}
        mode="out-in"
      >
        {props.loading
          ? renderSkeleton()
          : slots.default?.()}
      </Transition>
    )
  },
})
