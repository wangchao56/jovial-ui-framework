import JvLink from '@components/Typography/src/JvLink.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/test',
      name: 'test',
      component: { template: '<div>Test Page</div>' },
    },
  ],
})

describe('jvLink', () => {
  it('renders external link correctly', () => {
    const wrapper = mount(JvLink, {
      props: {
        to: 'https://example.com',
      },
      slots: {
        default: '外部链接',
      },
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('renders router link for internal paths', () => {
    const wrapper = mount(JvLink, {
      global: {
        plugins: [router],
      },
      props: {
        to: '/test',
      },
      slots: {
        default: '内部链接',
      },
    })

    expect(wrapper.findComponent({ name: 'RouterLink' }).exists()).toBe(true)
  })

  it('handles disabled state', () => {
    const wrapper = mount(JvLink, {
      props: {
        to: '/test',
        disabled: true,
      },
    })

    expect(wrapper.classes()).toContain('jv-link--disabled')
  })
})
