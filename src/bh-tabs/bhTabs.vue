<template>
    <div class='bh-tabs'>
        <slot></slot>
    </div>
</template>

<script>
    /**
     * Tab控件
     * @module BhTabs
     * @fires selected - tab页被选中时触发，参数为选中tab的索引
     * @fires unselected - tab页被取消选中时触发，参数为取消选中tab的索引
     *
     * @example
     *     <caption>html</caption>
     *     <bh-tabs @selected='selectTab' @unselected='unselectTab'>
     *         <ul>
     *             <li>Node.js</li>
     *             <li>JavaServer Pages</li>
     *             <li>Active Server Pages</li>
     *             <li>Python</li>
     *             <li>Perl</li>
     *         </ul>
     *         <div>
     *             tab1
     *         </div>
     *         <div>
     *             tab2
     *         </div>
     *         <div>
     *             tab3
     *         </div>
     *         <div>
     *             tab4
     *         </div>
     *         <div>
     *             tab5
     *         </div>
     *     </bh-tabs>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *          methods: {
     *              selectTab: function(index) {
     *                  console.log('selected tab: ' + index);
     *              },
     *              unselectTab: function(index) {
     *                  console.log('unselected tab: ' + index);
     *              }
     *          },
     *          components: {BhTabs}
     *     }
     */
    export default {
        /**
         * @property {String} width 宽度，默认为 '100%'
         * @property {String} height 高度，默认为 'auto'
         * @property {String} position tab头部的位置，默认为 'top', 可选 'top'/'bottom'
         * @property {Function} [unselecting]取消选择时的处理，若显式返回false可以取消当前的切换操作
         */
        props: {
            width: {
                default: '100%'
            },
            height: {
                default: 'auto'
            },
            position: {
                default: 'top'
            },
            unselecting: Function
        },
        methods: {
            /**
             * 选择某一个tab页
             * @param  {Number} index tab页的索引
             */
            select (index) {
                $(this.$el).jqxTabs('select', index);
            },
            /**
             * 增加一个tab页
             * @param {Number} index   增加到的位置
             * @param {String} title   tab页标题
             * @param {String} content tab页内容
             */
            add (index, title, content) {
                $(this.$el).jqxTabs('addAt', index, title, content);
            },
            /**
             * 删除一个tab页
             * @param  {Number} index tab页的索引
             */
            remove (index) {
                $(this.$el).jqxTabs('removeAt', index);
            }
        },
        ready () {
            var self = this;
            var el = $(self.$el);

            el.jqxTabs({
                width: self.width,
                height: self.height,
                position: self.position
            });

            el.on('selected', function (event) {
                var selectedTab = event.args.item;
                self.$dispatch('selected', selectedTab);
            });

            el.on('unselected', function (event) {
                var selectedTab = event.args.item;
                self.$dispatch('unselected', selectedTab);
            });

            el.on('unselecting', function (event) {
                var selectedTab = event.args.item;
                if (self.unselecting && self.unselecting(selectedTab) === false) {
                    event.cancel = true;
                }
            });
        },
        beforeDestroy () {
            var el = $(this.$el);
            el.off('unselected');
            el.off('selected');
            el.jqxTabs('destroy');
        }
    };
</script>
