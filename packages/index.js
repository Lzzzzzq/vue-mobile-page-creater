const registerComponents = (Vue) => {
  Vue.component('c-area-wrap', () => import('./area-wrap'))
  Vue.component('c-white-space', () => import('./white-space'))
  Vue.component('c-art-list', () => import('./art-list'))
}

export default registerComponents
