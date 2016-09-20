<template>
    <div class='bh-grid-container'>
        <div class='bh-switch-card-view'>
            <span v-if='columnSetting' class='bh-switch-item bh-switch-setting bh-mr-8' @click='openSetting'>
                <i class='iconfont icon-settings'></i>
                <span>设置</span>
            </span>
            <span class='bh-switch-item bh-switch-list' :class='{"bh-active": type == "list"}' @click='showList'>
                <i class='iconfont icon-viewlist'></i>
                <span>列表</span>
            </span>
            <span class='bh-switch-item bh-switch-card' :class='{"bh-active": type == "card"}' @click='showCard'>
                <i class='iconfont icon-viewmodule'></i>
                <span>卡片</span>
            </span>
        </div>
        <div>
            <component v-ref:grid :is='compName' :options='compOpts' keep-alive></component>
        </div>
    </div>
</template>

<script>
    /**
     * 基于EMAP的高级列表，支持list和card两种模式
     * 传入参数可以参考{@link module:EmapDatatable EmapDatatable} 和 {@link module:EmapCard EmapCard}
     * 需要注意的是pageSize参数要是一个数组，比如[10, 15]，分别表示列表和卡片形态时的分页数。
     * @module EmapGrid
     *
     * @example
     *     <caption>html</caption>
     *     <emap-grid :options='options'></emap-grid>
     *
     */
    import EmapDatatable from '../emap-datatable/emapDatatable.vue';
    import EmapCard from '../emap-card/emapCard.vue';

    const COMP_NAME = {
        'list': 'EmapDatatable',
        'card': 'EmapCard'
    };

    const DEFAULT_OPTS = {pageSize: [10, 12]};

    // 组件参数预处理
    const _getCompOpts = (type, options) => {
        // clone使用，防止被污染
        let opts = $.extend({}, DEFAULT_OPTS, options);

        switch (type) {
            case 'list': {
                opts.pageSize = opts.pageSize[0];
                // 假如高级表格不支持多选，与卡片列表保持统一，禁止多选
                // opts.checkable = false;
                 // 列表不需要卡片模板参数以及回调
                opts.template = undefined;
                opts.cardBeforeRender = undefined;
                opts.cardAfterRender = undefined;
                return opts;
            }
            case 'card': {
                opts.pageSize = opts.pageSize[1];
                return options;
            }
        }
    };

    const _sendSwitch = (vm, type) => {
        vm.$dispatch('grid:switch', type);
    };

    export default {
        /**
         * @property {Boolean} [columnSetting=true] 是否显示自定义列设置
         * @property {String} [type=list] 当前展示类型，支持'list/card'
         * @property {Object} options 表格参数
         * @property {Array} [options.pageSize=[10, 12]] 显示条数（[列表,卡片]）
         */
        props: {
            columnSetting: {
                default: true,
                type: Boolean
            },
            type: {
                default: 'list'
            },
            options: {
                default: () => ({}),
                type: Object
            }
        },
        computed: {
            compName () {
                return COMP_NAME[this.type];
            },
            compOpts () {
                return _getCompOpts(this.type, this.options);
            }
        },
        methods: {
            /**
             * 刷新表格数据
             * @param  {Object} params 刷新表格时需要传递的参数
             */
            reload (params) {
                this.$refs.grid.reload(params);
            },
            /**
             * 重新加载数据并跳转到第一页
             * @param  {Object} params 刷新表格时需要传递的参数
             */
            reloadFirstPage (params) {
                this.$refs.grid.reloadFirstPage(params);
            },
            /**
             * 获取数据条数
             * @return {Number} 数据条数
             */
            getTotalRecords () {
                return this.$refs.grid.getTotalRecords();
            },
            /**
             * 显示为列表
             */
            showList () {
                this.type = 'list';
                _sendSwitch(this, 'list');
            },
            /**
             * 显示为卡片
             */
            showCard () {
                this.type = 'card';
                _sendSwitch(this, 'card');
            },
            /**
             * 打开自定义列设置（列表模式下可用）
             */
            openSetting () {
                let grid = this.$refs.grid;
                grid.selectToShowColumns && grid.selectToShowColumns();
            },
            /**
             * 根据当前type获取列表(EmapDatatable)或者卡片(EmapCard)组件实例
             * @return {Object} 当前切换的组件实例
             */
            getGrid () {
                return this.$refs.grid;
            }
        },
        components: {EmapDatatable, EmapCard}
    };
</script>
