<template>
  <div
    :class="{
      [`flex-wrap`]: true,
      [`flex-wrap-dir-${direction}`]: direction,
      [`flex-wrap-${wrap}`]: wrap,
      [`flex-wrap-justify-${justify}`]: justify,
      [`flex-wrap-align-${align}`]: align,
      [`flex-wrap-align-content-${alignContent}`]: alignContent
    }"
  >
    <slot>
      <div style="width:100%; height: 100px">容器内部</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'FlexWrap',
  props: {
    direction: {
      type: String,
      default: () => ''
    },
    wrap: {
      type: String,
      default: () => ''
    },
    justify: {
      type: String,
      default: () => ''
    },
    align: {
      type: String,
      default: () => ''
    },
    alignContent: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    getConfig: function () {
      const { direction, wrap, justify, align, alignContent } = this
      return {
        direction,
        wrap,
        justify,
        align,
        alignContent
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
