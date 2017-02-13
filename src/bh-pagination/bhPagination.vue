<template>
    <div></div>
</template>

<script>
    /**
     * 分页
     * @module BhPagination
     *
     * @fires page-change -页码变化时触发，参数为 (pagenum, pagesize, total)
     *
     * @example
     *     <caption>html</caption>
     *     <bh-pagination :pagenum='pager.pagenum' :pagesize='20' :total-size='pager.total' @page-change='gotoPage'></bh-pagination>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *         data () {
     *             return {
     *                 pager: {
     *                     pagenum: 0,
     *                     total: 99
     *                 }
     *             }
     *         },
     *         methods: {
     *             gotoPage: function(pagenum, pagesize, total) {
     *                 console.log('go to page:' + pagenum + ', pagesize:' + pagesize + ', total:' + total);
     *             }
     *         },
     *         components: {BhPagination}
     *     }
     */

    export default {
        /**
         * @property {String} [mode=advanced] 分页模式 'advanced'/'simple'
         * @property {Number} [pagesize=10] 一页展示的数据，必须为 pageSizeOptions 中的一项
         * @property {Array} [pageSizeOptions=[10, 20, 50, 100]] 下拉框里面的数据
         * @property {Number} [selectedIndex=0] 下拉框的默认的index
         * @property {Number} [pagenum=0] 当前的页码
         * @property {Number} [totalSize=0] 总共多少条数据，当此属性变化时会自动重新渲染组件
         */
        props: {
            mode: {
                type: String,
                default: 'advanced'
            },
            pagesize: {
                type: Number,
                default: 10
            },
            pageSizeOptions: {
                type: Array,
                default () {
                    return [10, 20, 50, 100];
                }
            },
            selectedIndex: {
                type: Number,
                default: 0
            },
            pagenum: {
                type: Number,
                default: 0
            },
            totalSize: {
                type: Number,
                default: 0
            }
        },
        methods: {
            /**
             * 获取当前的页码
             * @return {Number} 当前的页码
             */
            getPagenum () {
                return $(this.$el).pagination('getPagenum');
            },
            /**
             * 获取每页大小
             * @return {Number} 每页大小
             */
            getPagesize () {
                return $(this.$el).pagination('getPagesize');
            },
            /**
             * 获取记录总条数
             * @return {Number} 记录总条数
             */
            getTotal () {
                return $(this.$el).pagination('getTotal');
            }
        },
        mounted () {
            var vm = this;

            vm.$nextTick(() => {
                var el = $(vm.$el);
                el.pagination({
                    mode: vm.mode,
                    pagesize: vm.pagesize,
                    pageSizeOptions: vm.pageSizeOptions,
                    selectedIndex: vm.selectedIndex,
                    pagenum: vm.pagenum,
                    totalSize: vm.totalSize
                });

                el.on('pagersearch', (e, pagenum, pagesize, total) => {
                    vm.$emit('page-change', pagenum, pagesize, total);
                });

                vm.$watch('totalSize', (newVal) => {
                    el.pagination('destroy');
                    el.pagination({
                        mode: vm.mode,
                        pagesize: vm.pagesize,
                        pageSizeOptions: vm.pageSizeOptions,
                        selectedIndex: vm.selectedIndex,
                        pagenum: vm.pagenum,
                        totalSize: newVal
                    });
                });
            });
        },
        beforeDestroy () {
            var el = $(this.$el);
            el.off('pagersearch');
        }
    };
</script>

<style>
    .bh-pager .bh-pager-label {
        text-indent: 10px;
        line-height: 26px;
    }
</style>
