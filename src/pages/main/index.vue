<template>
  <div class="mainWrap">
    <div class="mainLeftWrap">
      <ComponentList :pushMsg="pushMsg"></ComponentList>
    </div>
    <div class="mainCenterWrap">
      <ViewPageWrap :handleOnLoad="handleOnLoad" :pushMsg="pushMsg"></ViewPageWrap>
    </div>
    <div class="mainRightWrap">
      <ChangeProps v-if="edit" :handleChangeProps="handleChangeProps" :editProps="editProps" :pushMsg="pushMsg"></ChangeProps>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  components: {
    ComponentList: () => import('../componentList'),
    ViewPageWrap: () => import('../viewPageWrap'),
    ChangeProps: () => import('../changePropsWrap')
  },
  data () {
    return {
      onload: false,
      viewFrame: null,
      edit: false,
      editIndex: -1,
      editProps: {}
    }
  },
  mounted: function () {
    window.addEventListener('message', this.receiveMsg)
  },
  beforeDestroy: function () {
    window.removeEventListener('message', this.receiveMsg)
  },
  methods: {
    /**
     * 发送消息
     */
    pushMsg: function (data) {
      if (!this.viewFrame) return
      this.viewFrame.contentWindow.postMessage(data, `${location.href}view`)
    },

    /**
     * 接收消息
     */
    receiveMsg: function ({ data }) {
      const { type } = data
      console.group('Main 收到消息')
      console.log(data)
      console.groupEnd()

      switch (type) {
        case 'getConfig':
          /**
           * 获取配置
           */
          break
        case 'changeProps':
          /**
           * 修改组件配置
           */
          this.edit = true
          this.editIndex = data.data.index
          this.editProps = data.data.props
          break
        case 'handleDelCpt':
          /**
           * 删除了选中组件
           */
          this.edit = false
          this.editIndex = -1
          break
        case 'handleCloseEdit':
          /**
           * 关闭了编辑模式
           */
          this.edit = false
          this.editIndex = -1
          break
        default:
          break
      }
    },

    /**
     * iframe 加载完毕
     */
    handleOnLoad: function (frame) {
      this.onload = true
      this.viewFrame = frame
    },

    /**
     * 修改 props
     */
    handleChangeProps: function (cont) {
      this.pushMsg({
        type: 'changeProps',
        data: {
          index: this.editIndex,
          props: cont
        }
      })
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>
