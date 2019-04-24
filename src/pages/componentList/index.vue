<template>
  <div class="componentListWrap">
      <a-card :title="typeItem.name" v-for="typeItem in components" :key="typeItem.name">
        <a-card-grid
          v-for="cptItem in typeItem.child"
          :key="cptItem.name"
          class="componentListItem"
          @click.native="handleAddComponent(cptItem)"
        >
          {{cptItem.name}}
        </a-card-grid>
      </a-card>
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
    /**
     * 添加组件
     */
    handleAddComponent: function ({ component, container }) {
      const componentInfo = {
        component
      }
      if (container) {
        componentInfo.child = []
      }
      this.pushMsg({
        type: 'addCpt',
        data: componentInfo
      })
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>
