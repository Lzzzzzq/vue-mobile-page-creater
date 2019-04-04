<template>
  <div class="changePropsWrap">
    <div class="changePropsTitle">
      <span>组件配置</span>
      <a-button type="danger" @click="handleDelCpt">删除组件</a-button>
    </div>
    <div class="changePropsCont">
      <div class="changePropsItem" v-for="(value, key) in editProps" :key="key">
        <ItemCpt v-model="editProps[key]" :name="key"></ItemCpt>
      </div>
    </div>
  </div>
</template>

<script>
import './index.less'
import ItemCpt from './item'

export default {
  name: 'ChangeProps',
  components: {
    ItemCpt
  },
  props: {
    handleChangeProps: {
      type: Function
    },
    editProps: {
      type: Object,
      default: () => ({})
    },
    pushMsg: {
      type: Function
    }
  },
  watch: {
    editProps: {
      handler: function (newProps) {
        this.handleChangeProps(newProps)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /**
     * 删除组件
     */
    handleDelCpt: function () {
      this.pushMsg({
        type: 'delCpt'
      })
    }
  }
}
</script>
