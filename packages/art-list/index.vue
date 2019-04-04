<template>
  <div class="artListWrap itemBg">
    <div class="artListItem lineLightBd" v-for="(item, index) in list" :key="index">
      <div class="artListItemInfo">
        <div class="artListItemTitle textMain">{{item.title}}</div>
        <div class="artListItemDate textAss">{{item.date}}</div>
      </div>
      <div class="artListItemImg" v-if="item.img">
        <img :src="item.img" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>
