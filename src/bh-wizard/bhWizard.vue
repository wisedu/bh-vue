<template>
  <div>
    <div class="wizard-main"></div>
    <div class="wizard-content-{{item.stepId}}" v-for="item in wizards">
      <component :is="item.showComponent" keep-alive></component>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * bhWizard控件
   * @module bhWizard
   * @example
   *     <caption>html</caption>
   *     <bh-wizard :wizards="wizards" v-ref:wizard :current.sync="current" :is-add-click-event="false"></bh-wizard>
   * @example
   *     <caption>javascript</caption>
   *    export default {
   *     data: function () {
   *       return {
   *         wizards: [
   *           {stepId: 'deployTypeSetting', title: '发布方式配置', component: 'deployTypeSetting'},
   *           {stepId: 'runEnvSetting', title: '运行环境配置', component: 'runEnvSetting'}
   *         ],
   *         current:{}
   *       }
   *     }
   */
  export default {
    /**
     * @property {Array} wizards 构造bhWizard的选项设置
     * @property {String} isAddClickEvent 步骤条是否可点,默认值为true
     * @property {String} active 当前激活项的stepId 默认第一个
     * @property {Object} current.sync 当前选中的step对象
     */
    props: ['wizards', 'current', 'isAddClickEvent', 'active'],

    created() {
      var self = this
      this.wizards.forEach(function (wizard, index) {
        self.$set('wizards[' + index + '].showComponent', '')
        if (wizard.finished === undefined) {
          wizard.finished = false
        }
      })
      if (this.active) {
        this.wizards.forEach((wizard, index) => {
          if (wizard.stepId == this.active) {
            wizard.showComponent = wizard.component
          }
        })
      } else {
        this.wizards[0].showComponent = this.wizards[0].component
      }

    },

    ready(){
      this._renderWizard()
    },

    methods: {
      /***
       * 调用bhStepWizard提供的方法
       * @param {String} actionName bhStepWizard提供的方法名称
       * @param {String} arg1 actionName对应方法需要的参数1
       * @param {String} arg2 actionName对应方法需要的参数2
       */
      action(actionName, arg1, arg2, arg3){
        $(this.$el).find('.wizard-main').bhStepWizard(actionName, arg1, arg2, arg3)
      },

      _renderWizard(){
        var self = this
        $(this.$el).find('.wizard-main').data('bhStepWizard', '').empty()

        var finished = []

        var hasShow = false
        this.wizards.forEach((wizard, index) => {
          if (wizard.showComponent === undefined) {
            wizard.showComponent = ''
          }
          if (wizard.finished) {
            finished.push(wizard.stepId)
          }
        });

        this.current = this.wizards[0]

        $(this.$el).find('.wizard-main').bhStepWizard({
          items: this.wizards,
          active: this.active || this.wizards[0].stepId,
          finished: finished,
          isAddClickEvent: this.isAddClickEvent === false ? false : true,
          change: (current) => {
            this.$emit('change', current)
            self.current = current
            this.wizards.forEach(function (wizard, index) {
              wizard.showComponent = wizard.stepId === current.stepId ? wizard.component : ''
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .wizard-main {
    height: 32px;
  }
</style>
