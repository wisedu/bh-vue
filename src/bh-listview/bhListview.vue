<template>
    <div class='bh-list-view'>
        <template v-if='source && source.length > 0'>
            <div class='list-area'>
                <component v-for='item in source' :is='compName' :item='item'></component>
            </div>
            <div class='pager'>
                <bh-pagination :pagenum.sync='pageConf.pagenum' :pagesize='pageConf.pagesize' mode='advanced' :total-size.sync='pageConf.total' @page-change='gotoPage'></bh-pagination>
            </div>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>

<script>
    /**
     * 使用vue组件来自定义item的listview
     * @module BhListView
     *
     * @example
     * <caption>html</caption>
     * <list-view :page-path='pagePath'
     *      :params='options.params'
     *      :item-comp='compItem'>
     *      <div class='empty-page'>
     *          列表为空的时候展示这句话
     *      </div>
     *  </list-view>
     *
     * @example
     *  <caption>javascript</caption>
     *  // index.js
     *  import TaskItem from './taskItem.vue';
     *  export default {
     *      props: {
     *          compItem: TaskItem
     *      }
     *  }
     *  // taskItem.vue
     *  export default {
     *      props: {
     *          item: { // 此属性为每行数据的对象，可在template中随意渲染
     *              type: Object,
     *              default: () => ({})
     *          }
     *      }
     *  }
     */
    import BhPagination from '../bh-pagination/bhPagination.vue';
    import getList from './listService.js';

    let _itemCount = 0; // 每一个listview实例分配一个id，防止冲突
    const START_PAGE = 0; // 起始页码设置

    const _getItemName = () => {
        return 'bh-list-view-item-' + (_itemCount++);
    };

    const _pageConf = {
        pagenum: START_PAGE,
        pagesize: 10,
        mode: 'advanced',
        total: 0
    };

    const _loadList = (vm) => {
        let pageConf = vm.pageConf;
        getList(vm.pagePath, vm.params, pageConf.pagenum, pageConf.pagesize).then((response) => {
            if (response.datas) {
                let datas = response.datas;
                pageConf.total = datas.totalSize;
                vm.source = datas.rows || [];
            } else {
                pageConf.total = 0;
                vm.source = [];
            }
        });
    };

    export default {
        data: () => ({
            pageConf: {},
            source: [],
            compName: ''
        }),
        /**
         * @property {String} pagePath 获取列表的url地址，返回的数组路径为 [datas>rows]
         * @property {Object} [pager] 分页参数
         * @property {String} [pager.pagenum] 当前页码
         * @property {String} [pager.pagesize] 每页条数
         * @property {Object} [params] 查询参数
         * @property {Object} itemComp 渲染每行数据的vue组件，此组件中item属性为行数据对象
         */
        props: {
            pagePath: String,
            pager: Object,
            params: Object,
            itemComp: Object
        },
        methods: {
            gotoPage (pagenum, pagesize, total) {
                let pageConf = this.pageConf;
                pageConf.pagenum = pagenum;
                pageConf.pagesize = parseInt(pagesize || pageConf.pagesize);
                pageConf.total = total || pageConf.total;
                _loadList(this);
            },
            reload () {
                this.pageConf.pagenum = START_PAGE;
                _loadList(this);
            }
        },
        created () {
            this.pageConf = $.extend({}, _pageConf, this.pager);
            this.compName = _getItemName();
            Vue.component(this.compName, this.itemComp);
        },
        ready () {
            _loadList(this);
        },
        components: {BhPagination}
    };
</script>
