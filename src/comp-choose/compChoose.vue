<template>
  <div></div>
</template>
<script>
  /**
   * compChoose控件
   * @module compChoose
   * @example
   *     <caption>html</caption>
   *     <comp-choose :options="options" v-ref:choose></comp-choose>
   * @example
   *     <caption>javascript</caption>
   *    export default {
   *     data: function () {
   *       return {
   *         options: {
   *           leftSourceUrl: '/wec-devops-deploy/deployManage/list',
   *           placeholder: '搜索应用名称',
   *           id: 'deployId',
   *           type: 'post',
   *           multiSelect: true,//是否支持多选
   *           maxSelect: 3,//设置最多显示的条数
   *           params:{},
   *           rightcellsRenderer: function (row, column, value, rowData) {
   *             var html = '<p class="gm-member-row bh-clearfix" >' +
   *               '<span class=" bh-col-md-9" row="' + row + '">' + rowData.XM +
   *               '</span>' +
   *               '</p>';
   *             return html;
   *           },
   *           leftcellsRenderer: function (row, column, value, rowData) {
   *             var html = '<p class="gm-member-row bh-clearfix" >' +
   *               '<span class=" bh-col-md-9" row="' + row + '">' + rowData.XM +
   *               '</span>' +
   *               '</p>';
   *             return html;
   *           }
   *         }
   *       }
   *     }
   */
  export default {
    /**
     * @property {Object} options 构造bhchoose的选项设置
     * @property {String} options.leftSourceUrl 左侧表格数据源
     * @property {String} options.id 左侧表格数据源的主键名称
     * @property {String} [options.placeholder] 搜索框placeholder信息
     * @property {Object} [options.params] 左侧表格带入参数
     * @property {String} [options.type] 左侧表格ajax请求类型 post或get
     * @property {Boolean} [options.multiSelect] 是否需要多选 默认为true
     * @property {number} [options.maxSelect] 支持多选时 设置最多选中的条数
     * @property {String} [options.rightcellsRenderer] 左侧表格渲染方法
     * @property {String} [options.leftcellsRenderer] 右侧表格渲染方法
     */
    props: ['options'],
    ready(){
      var options = this.options
      this.win = $.bh_choose({
        insertContainer: $(this.$el),
        leftSourceUrl: options.leftSourceUrl,
        leftSourceAction: options.leftSourceAction,
        placeholder: options.placeholder || '搜索应用名称',
        id: options.id,
        type: options.type || 'post',
        params: options.params,
        multiSelect: options.multiSelect,//是否支持多选
        maxSelect: options.maxSelect,//设置最多显示的条数
        rightcellsRenderer: options.rightcellsRenderer,
        leftcellsRenderer: options.leftcellsRenderer
      });

      this.win.show();
    },

    methods: {
      /***
       * 获取选中记录
       * @return {Array} 右侧选中的记录
       */
      getSelectedRecords(){
        return this.win.getSelectedRecords()
      },

      /***
       * 刷新左侧表格
       * @param {Object} 传入的参数
       */
      reloadLeftTable(params){
        this.win.options.params = params
        this.win.reloadLeftTable()
      }
    }
  }
</script>
