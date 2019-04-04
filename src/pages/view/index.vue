<template>
  <div :class="{
    black: dark
  }">
    <div class="viewWrap globalBg">
      <draggable
        class="list-group"
        tag="div"
        v-model="config"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <template v-for="(item, index) in config">
            <component
              :is="item.component"
              v-bind="item.props"
              :key="index"
              @click.native.stop="handleChangeProps(index)"
              :class="{
                'viewCptItem': edit,
                'active': activeIndex === index
              }"
            ></component>
          </template>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'ViewPage',
  components: {
    draggable
  },
  data () {
    return {
      drag: false,
      config: [],
      activeIndex: -1,
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
  watch: {
    drag: function (newVal) {
      if (newVal) {
        this.activeIndex = -1
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
          this.config.push(data.data)
          break
        case 'getConfig':
          this.pushMsg({
            type: 'getConfig',
            data: {
              config: this.config
            }
          })
          break
        case 'changeProps':
          const newConfig = JSON.parse(JSON.stringify(this.config))
          newConfig[data.data.index].props = data.data.props
          this.config = newConfig
          break
        case 'delCpt':
          if (this.activeIndex >= 0) {
            this.drag = true
            this.config.splice(this.activeIndex, 1)
            this.activeIndex = -1
            this.pushMsg({
              type: 'handleDelCpt'
            })
          }
          break
        case 'changeTheme':
          this.dark = data.data.dark
          break
        case 'changeEditStatus':
          this.edit = data.data.edit
          if (!data.data.edit) {
            this.activeIndex = -1
            this.pushMsg({
              type: 'handleCloseEdit'
            })
          }
          break
        default:
          break
      }
    },

    /**
     * 向父级发送消息
     */
    pushMsg: function (data) {
      top.postMessage(data, location.href.replace('view', ''))
    },

    /**
     * 修改 props
     */
    handleChangeProps: function (index) {
      if (!this.edit) return
      this.activeIndex = index
      this.pushMsg({
        type: 'changeProps',
        data: {
          index,
          props: this.config[index].props
        }
      })
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>
