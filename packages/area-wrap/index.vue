<template>
  <div class="areaWrap itemBg">
    <div class="areaTitleWrap">
      <div class="areaTitle lineLightBd textMain">{{title}}</div>
    </div>
    <div class="areaContWrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AreaWrap',
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
