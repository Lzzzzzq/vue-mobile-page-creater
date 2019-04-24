export default [
  {
    name: '布局组件',
    child: [
      {
        name: '区块容器',
        component: 'c-area-wrap',
        container: true
      }, {
        name: '区块标题',
        component: 'c-area-title'
      }, {
        name: '辅助空白',
        component: 'c-white-space'
      }
    ]
  }, {
    name: '功能组件',
    child: [
      {
        name: '文章列表',
        component: 'c-art-list'
      }
    ]
  }
]
