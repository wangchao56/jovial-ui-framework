import Mock from 'mockjs'

const virtualDataTemplate = {
  'list|1000': [
    {
      'id': '@increment',
      'name': '@cname',
      'children|1-3': [
        {
          id: '@increment',
          name: '@cname',
        },
      ],
    },
  ],
}

const virtualListTemplate = {
  'list|1000': [
    {
      id: '@increment',
      name: `@cparagraph(3)`,
    },
  ],
}

export const virtualDataTemp = Mock.mock(virtualDataTemplate)

export const virtualListTemp = Mock.mock(virtualListTemplate)
