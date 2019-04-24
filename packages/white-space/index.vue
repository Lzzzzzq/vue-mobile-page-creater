<template>
  <div :class="{
    'itemBg': !transparent
  }" :style="{
    height: height
  }"></div>
</template>

<script>
export default {
  name: 'WhiteSpace',
  props: {
    height: {
      type: String,
      default: '10px'
    },
    transparent: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getConfig: function () {
      return {
        height: this.height,
        transparent: this.transparent
      }
    }
  }
}
</script>
