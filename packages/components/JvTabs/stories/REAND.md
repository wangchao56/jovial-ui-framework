```vue
两种使用方式

用法一：通过items属性传入标签页配置
const tabsItem = reactive([
  {
    label: '标签1',
    name: '1',
    content: '内容1',
  },
  {
    label: '标签2',
    name: '2',
    content: '内容2',
  },
  {
    label: '标签3',
    name: '3',
    content: h('div', {
      style: {
        width: '1000px',
        height: '1000px',
      },
    }, '内容3'),
  },
])
<JvTabs :items="tabsItem" />

用法二：通过插槽方式使用
<JvTabs>
  <JvTabPane name="one" label="标签1" content="内容1" />
  <JvTabPane name="two" label="标签2" content="内容2" />
  <JvTabPane name="three" label="标签3" content="内容3" />
</JvTabs>
```
