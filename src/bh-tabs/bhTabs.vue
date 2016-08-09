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
        },
        beforeDestroy () {
            var el = $(this.$el);
            el.off('unselected');
            el.off('selected');
        }
    };
</script>
