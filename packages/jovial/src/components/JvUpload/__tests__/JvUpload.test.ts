import JvUpload from '@components/JvUpload/src/JvUpload.vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

describe('jvUpload', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(JvUpload)
  })

  it('应该正确渲染组件', () => {
    expect(wrapper.find('.file-upload').exists()).toBe(true)
    expect(wrapper.find('input[type="file"]').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('选择文件')
  })

  it('应该能够添加文件', async () => {
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
    const input = wrapper.find('input[type="file"]')

    await input.trigger('change', {
      target: {
        files: [file],
      },
    })

    expect(wrapper.vm.files).toHaveLength(1)
    expect(wrapper.vm.files[0].name).toBe('test.txt')
  })

  it('应该能够删除文件', async () => {
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
    const input = wrapper.find('input[type="file"]')

    await input.trigger('change', {
      target: {
        files: [file],
      },
    })

    expect(wrapper.vm.files).toHaveLength(1)

    await wrapper.find('button[type="button"]').trigger('click')
    expect(wrapper.vm.files).toHaveLength(0)
  })

  it('应该能够处理文件拖放', async () => {
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' })

    await wrapper.trigger('drop', {
      dataTransfer: {
        files: [file],
      },
    })

    expect(wrapper.vm.files).toHaveLength(1)
    expect(wrapper.vm.files[0].name).toBe('test.txt')
  })

  it('应该能够模拟上传过程', async () => {
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
    await wrapper.setData({ files: [file] })

    const uploadButton = wrapper.findAll('button').at(-1)
    await uploadButton?.trigger('click')

    expect(wrapper.vm.uploadProgress).toBe(0)

    // 等待上传完成
    await new Promise(resolve => setTimeout(resolve, 1100))

    expect(wrapper.vm.uploadProgress).toBe(null)
    expect(wrapper.vm.files).toHaveLength(0)
  })
})
