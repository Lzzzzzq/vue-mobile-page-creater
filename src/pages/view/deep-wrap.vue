<template>
  <div :class="{
    'black': dark
  }">
    <div class="viewWrap globalBg">
      <DeepItem
        :list="config"
        :edit="edit"
        :activeKey="activeKey"
        :select="handleSelectToChangeProps"
        :initKey="handleInitKey"
      ></DeepItem>
    </div>
  </div>
</template>

<script>
import DeepItem from './deep-item'

export default {
  name: 'DeepWrap',
  components: {
    DeepItem
  },
  data () {
    return {
      drag: false,
      config: [],
      activeKey: '',
      dark: false,
      edit: true
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: !this.edit,
        ghostClass: 'ghost'
      }
    }
  },
  mounted: function () {
    window.addEventListener('message', this.onMsg)
  },
  beforeDestroy: function () {
    window.removeEventListener('message', this.onMsg)
  },
  methods: {
    onMsg: function ({ data }) {
      const { type } = data
      console.group('View 收到消息')
      console.log(data)
      console.groupEnd()

      /**
       * 添加组件
       */
      switch (type) {
        case 'addCpt':
          this.handleAddCpt(data.data)
          break
        case 'getConfig':
          this.handleGetConfig()
          break
        case 'changeProps':
          this.handleChangeProps(data.data)
          break
        case 'delCpt':
          this.handleDelCpt()
          break
        case 'changeTheme':
          this.handleChangeTheme(data.data)
          break
        case 'changeEditStatus':
          this.handleChangeEditStatus(data.data)
          break
        default:
          break
      }
    },

    /**
     * 初始化 key
     */
    handleInitKey: function () {
      this.activeKey = ''
      this.pushMsg({
        type: 'initKey'
      })
    },

    /**
     * 向父级发送消息
     */
    pushMsg: function (data) {
      top.postMessage(data, location.href.replace('view', ''))
    },

    /**
     * 选择组件修改 props
     */
    handleSelectToChangeProps: function (key, props) {
      if (!this.edit) return
      this.activeKey = key
      this.pushMsg({
        type: 'changeProps',
        data: {
          key,
          props
        }
      })
    },

    /**
     * 添加组件
     */
    handleAddCpt: function (cpt) {
      this.config.push(cpt)
    },

    /**
     * 获取配置
     */
    handleGetConfig: function () {
      this.pushMsg({
        type: 'getConfig',
        data: {
          config: this.config
        }
      })
    },

    /**
     * 修改配置项
     */
    handleChangeProps: function ({ key, props }) {
      this.config = this.changeDeepIndex(this.config, key, props)
    },

    /**
     * 切换主题
     */
    handleChangeTheme: function ({ dark }) {
      this.dark = dark
    },

    /**
     * 切换编辑状态
     */
    handleChangeEditStatus: function ({ edit }) {
      this.edit = edit
      if (!edit) {
        this.handleInitKey()
        this.pushMsg({
          type: 'handleCloseEdit'
        })
      }
    },

    /**
     * 删除组件
     */
    handleDelCpt: function () {
      if (this.activeKey) {
        // this.config = common.delDeepKey(this.config, this.activeKey)
        this.config = this.delDeepIndex(this.config, this.activeKey)
        this.handleInitKey()
        this.pushMsg({
          type: 'handleDelCpt'
        })
      }
    },

    /**
   * 删除多维数组中指定 index 数组的项
   */
    delDeepIndex: function (arr, key, prevKey = '') {
      return arr.filter((item, index) => {
        let currentKey = prevKey !== '' ? prevKey + '-' + index : index.toString()
        if (currentKey === key) return false
        if (item.child && item.child.length > 0) item.child = this.delDeepIndex(item.child, key, currentKey)
        return true
      })
    },

    /**
     * 修改多维数组中指定 index 的值
     */
    changeDeepIndex: function (arr, key, res, prevKey = '') {
      return arr.map((item, index) => {
        let currentKey = prevKey !== '' ? prevKey + '-' + index : index.toString()
        if (currentKey === key) {
          item.props = res
        }
        if (item.child) item.child = this.changeDeepIndex(item.child, key, res, currentKey)
        return item
      })
    }
  }
}
</script>

<style lang="less">
.viewWrap > .dragArea {
  &:after {
    visibility: hidden;
  }
}
</style>
