<template>
  <div class="areaTitleWrap itemBg">
    <div class="areaTitle lineLightBd textMain">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'AreaTitle',
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  methods: {
    getConfig: function () {
      return {
        title: this.title
      }
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>
