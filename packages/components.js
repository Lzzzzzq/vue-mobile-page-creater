export default [
  {
    name: '布局组件',
    child: [
      {
        name: '区块标题',
        component: 'c-area-title',
        props: {
          title: '标题'
        }
      }, {
        name: '辅助空白',
        component: 'c-white-space',
        props: {
          height: '10px',
          transparent: true
        }
      }
    ]
  }, {
    name: '功能组件',
    child: [
      {
        name: '文章列表',
        component: 'c-art-list',
        props: {
          list: [
            {
              title: '标题',
              date: '2018-08-08'
            }, {
              title: '标题',
              date: '2018-08-08'
            }
          ]
        }
      }
    ]
  }
]
