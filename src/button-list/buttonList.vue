<template>
  <div class="opt-buttons bh-mv-16">
    <a href="javascript:void(0);" class="bh-btn bh-btn-{{item.primary?'primary':'default'}} waves-effect" @click='click(item.clickEvent)' v-for="item in buttonList">
      <i class="iconfont icon-{{item.icon}}" v-if="item.icon"></i> {{item.text}}
    </a>
  </div>
</template>
<style scoped lang="sass">
.opt-buttons {
  margin-left: -4px;
  clear: both;
}
</style>
<script>
export default {
  props: ['name', 'buttonList'],
  data: function() {
    return {}
  },
  created() {
    if (!this.buttonList) {
      this.buttonList = this.$parent.pageopt[this.name ? this.name : 'buttonList']
    }
  },
  methods: {
    click(click) {
      this.$dispatch(click)
    }
  }
}
</script>
