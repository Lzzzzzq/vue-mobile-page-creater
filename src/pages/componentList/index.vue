<template>
  <div class="componentListWrap">
    <div class="cptListWrap">
      <div class="cptListWrapTitle">组件</div>
      <div class="cptList">
        <div class="cptItemWrap" v-for="(item, index) in components.container" :key="index" @click="handleAddComponent(item)">
          <div class="cptItemCont">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import components from '../../../packages/components'

export default {
  name: 'ComponentListWrap',
  props: {
    pushMsg: {
      type: Function
    }
  },
  computed: {
    components: function () {
      return components
    }
  },
  methods: {
    handleAddComponent: function ({ component, props }) {
      this.pushMsg({
        type: 'addCpt',
        data: {
          component,
          props: props || {}
        }
      })
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>
