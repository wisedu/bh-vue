<template>
    <div></div>
</template>

<script>
    /**
     * 基于EMAP的卡片列表
     * @module EmapCard
     *
     * @example
     *     <caption>html</caption>
     *     <emap-card :options='options'></emap-card>
     * @example
     *     <caption>javascript</caption>
     *     import EmapCard from 'components/emap-card/emapCard.vue'
     *     export default {
     *         data: function() {
     *             return {
     *                 options: {
     *                     pagePath: 'http://localhost:3000/mock/emap/major-model.json',
     *                     action: 'TABLE',
     *                     template: require('./cardTpl.html')
     *                 }
     *             }
     *         },
     *         ready: function() {
     *         },
     *         components: {EmapCard}
     *     }
     *  @example
     *      <caption>cardTpl.html</caption>
     *      <div class="sc-panel-thingNoImg-1 bh-mh-8 bh-mb-16">
     *         <div class="sc-panel-thingNoImg-1-container bh-animate-all bh-animate-fast">
     *             <div class="sc-panel-thingNoImg-1-description" data-id={{id}}>
     *                 <div class="sc-panel-thingNoImg-1-header">
     *                     <div class="sc-panel-thingNoImg-1-title">{{name}}</div>
     *                 </div>
     *                 <div class="sc-panel-thingNoImg-1-subject">
     *                     <div class="sc-panel-thingNoImg-1-subjectKey sc-width-50">所属院系</div>
     *                     <div class="sc-panel-thingNoImg-1-subjectValue">{{depart}}</div>
     *                 </div>
     *                 <div class="sc-panel-thingNoImg-1-subject">
     *                     <div class="sc-panel-thingNoImg-1-subjectKey sc-width-50">负责人</div>
     *                     <div class="sc-panel-thingNoImg-1-subjectValue">{{manager}}</div>
     *                 </div>
     *                 <div class="sc-panel-thingNoImg-1-subject">
     *                     <div class="sc-panel-thingNoImg-1-subjectKey sc-width-50">专业描述</div>
     *                     <div class="sc-panel-thingNoImg-1-subjectValue">{{description}}</div>
     *                 </div>
     *             </div>
     *             <div class="sc-panel-thingNoImg-1-operate bh-animate-bottom bh-animate-fast">
     *                 <span class="bh-mh-4" data-action="apply">申请</span> | <span class="bh-mh-4" data-action="view-detail">查看详情</span>
     *             </div>
     *         </div>
     *     </div>
     */
    export default {
        /**
         * @property {Object} options 控件选项
         * @property {String} options.pagePath 请求表格数据页面地址
         * @property {String} options.action emap 动作名
         * @property {String} options.template 卡片渲染模板
         * @property {String} [options.pageMode=advanced] 分页模式，支持'simple'/'advanced'
         * @property {Array} [options.pageSizeOptions=[12, 24, 48, 96]] 分页大小的列表选项
         * @property {Number} [options.pageSize=12] 分页大小
         * @property {Function} [options.cardBeforeRender] 每个卡片渲染前执行的回调
         * @property {Function} [options.cardAfterRender] 卡片渲染结束执行的回调
         * @property {Object} [options.params] 请求时附加的参数
         */
        props: {
            options: Object
        },
        ready () {
            var self = this;
            var el = $(self.$el);

            el.emapCard(self.options);
        },
        methods: {
            /**
             * 重新加载数据
             * @param  {Object} params 刷新表格时需要传递的参数
             */
            reload (params) {
                $(this.$el).emapCard('reload', params);
            },
            /**
             * 重新加载数据并跳转到第一页
             * @param  {Object} params 刷新表格时需要传递的参数
             */
            reloadFirstPage (params) {
                $(this.$el).emapCard('reloadFirstPage', params);
            },
            /**
             * 获取数据条数
             * @return {Number} 数据条数
             */
            getTotalRecords () {
                return $(this.$el).emapCard('getTotalRecords');
            }
        }
    };
</script>
