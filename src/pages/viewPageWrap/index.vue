<template>
  <div class="viewPageWrap">
    <div class="viewWrap">
      <iframe :src="url" frameborder="0" class="viewContent" @load="onLoad" ref="frame"></iframe>
      <div class="viewPageBtnWrap">
        <div class="viewPageBtn" @click="handleGetConfig">获取配置</div>
        <div class="viewPageBtn" @click="handleChangeTheme">{{dark ? '白版' : '黑版'}}</div>
        <div class="viewPageBtn" @click="handleChangeEditStatus">{{edit ? '预览' : '编辑'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewPageWrap',
  props: {
    handleOnLoad: {
      type: Function
    },
    pushMsg: {
      type: Function
    }
  },
  computed: {
    url: function () {
      return `${window.location.protocol}//${window.location.host + window.location.pathname}#/view`
    }
  },
  data () {
    return {
      dark: false,
      edit: true
    }
  },
  methods: {
    /**
     * iframe 加载后执行
     */
    onLoad: function () {
      this.handleOnLoad(this.$refs.frame)
    },

    /**
     * 获取配置
     */
    handleGetConfig: function () {
      this.pushMsg({
        type: 'getConfig'
      })
    },

    /**
     * 切换主题
     */
    handleChangeTheme: function () {
      this.dark = !this.dark
      this.pushMsg({
        type: 'changeTheme',
        data: {
          dark: this.dark
        }
      })
    },

    /**
     * 开关预览模式
     */
    handleChangeEditStatus: function () {
      this.edit = !this.edit
      this.pushMsg({
        type: 'changeEditStatus',
        data: {
          edit: this.edit
        }
      })
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>
