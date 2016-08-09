<template>
    <div></div>
</template>

<script>
    /**
     * 下拉树
     * @module EmapDdTree
     * @example
     *     <caption>html</caption>
     *     <!-- 异步加载数据 -->
     *     <emap-dd-tree :options='options1'></emap-dd-tree>
     *     <!-- 同步数据 -->
     *     <emap-dd-tree :options='options2'></emap-dd-tree>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *      data: function() {
     *          return {
     *              options1: {
     *                  checkboxes:true,
     *                  url: 'http://localhost:3000/mock/emap/ddtree.json',
     *                  params: {}
     *              },
     *              options2: {
     *                  checkboxes:true,
     *                  datas: [{
     *                      "id": "1",
     *                      "name": "党群组织",
     *                      "pId": "0"
     *                  }, {
     *                      "id": "000010",
     *                      "name": "党群组织\/工会",
     *                      "pId": "1"
     *                  }, {
     *                      "id": "000012",
     *                      "name": "党群组织\/宣传",
     *                      "pId": "1"
     *                  }]
     *              }
     *          }
     *      },
     *      components: {EmapDdTree}
     *  }
     */
    export default {
        /**
         * @property {Object} options 参数配置
         * @property {String} [options.url] 异步数据源地址（服务器返回的数据参考EMAP格式）
         * @property {Object} [options.params] 请求时附加的参数
         * @property {Array} [options.datas] 同步树数据，格式为树型结构[{id:"",name:"",pId:""}]，与url参数必选其一
         * @property {Boolean} [options.checkboxes=false] 是否显示复选框支持多选
         */
        props: {
            options: Object
        },
        methods: {
            /**
             * 获取选择值
             * @return {String} 以逗号分隔的id字符串，如 '000010,000012'
             */
            getValue () {
                return $(this.$el).emapDropdownTree('getValue');
            },
            /**
             * 获取选择的文本
             * @return {String} 以逗号分隔的文本字符串，如 '党群组织\/工会, 党群组织\/宣传'
             */
            getText () {
                return $(this.$el).emapDropdownTree('getText');
            },
            /**
             * 设置选择值
             * @param {Array} val 这个参数有点奇怪，格式为[value, descripton]，如 ['000010', '党群组织\/工会']，与当前加载的列表完全没有关系
             */
            setValue (val) {
                $(this.$el).emapDropdownTree('setValue', val);
            },
            /**
             * 禁用
             */
            disable () {
                $(this.$el).emapDropdownTree('disable');
            },
            /**
             * 启用
             */
            enable () {
                $(this.$el).emapDropdownTree('enable');
            }
        },
        ready () {
            $(this.$el).emapDropdownTree(this.options);
        }
    };
</script>
