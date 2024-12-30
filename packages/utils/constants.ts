import Mock from 'mockjs'

const virtualDataTemplate = {
  'list|1000': [
    {
      id: '@increment',
      name: '@cname',
      'children|1-3': [
        {
          id: '@increment',
          name: '@cname'
        }
      ]
    }
  ]
}

export const virtualDataTemp = Mock.mock(virtualDataTemplate)
