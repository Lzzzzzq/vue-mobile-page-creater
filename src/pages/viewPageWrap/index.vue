<template>
  <div class="viewPageWrap">
    <div class="viewWrap">
      <iframe src="/#/view" frameborder="0" class="viewContent" @load="onLoad" ref="frame"></iframe>
      <div class="viewPageBtnWrap">
        <div class="viewPageBtn" @click="handleGetConfig">获取配置</div>
        <div class="viewPageBtn" @click="handleChangeTheme">切换主题</div>
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
  methods: {
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
      this.pushMsg({
        type: 'changeTheme'
      })
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>
