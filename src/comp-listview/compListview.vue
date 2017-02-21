<template>
    <div>
        <slot>

        </slot>
        <bh-pagination :pagenum.sync='pageNumber' :pagesize='pageSize' :mode='pageMode'
                       :total-size.sync='total' @page-change='_gotoPage' v-if="rows.length>0" class="bh-clearfix"></bh-pagination>
        <slot name="empty" v-if="rows.length == 0 && !loading"></slot>
    </div>
</template>
<script type="text/ecmascript-6">
    import bhPagination from '../bh-pagination/bhPagination.vue'

    /**
     * compListview控件
     * @module compListview控件
     * @fires ready - 数据请求完毕事件
     * @example
     *     <caption>html</caption>
     *     <comp-listview :url="listView.url" :rows.sync="listView.rows">
     *          <div v-for="item in listView.rows">
     *
     *          </div>
     *          <div slot="empty">
     *
     *          </div>
     *     </comp-listview>
     * @example
     *     <caption>javascript</caption>
     *    export default {
     *     data: function () {
     *       return {
     *         listView:{
     *          url: '',
     *          rows:[]
     *         }
     *        }
     *       }
     *     }
     */
    export default {
        /**
         * @property {string} url 请求数据url
         * @property {array} rows.sync 获取组件内请求的数据
         * @property {string} [pageMode] 分页模式 默认advanced， 可选simple，advanced
         * @property {Number} [pageSize] 分页大小 默认10
         * @property {Object} params 请求参数
         * @property {Boolean} loading 请求状态
         */
        components: {bhPagination},
        props: {
            'url': String,
            'rows': {type: Array, twoWay: true},
            'loading': {type: Boolean, twoWay: true, default: false},
            'pageMode': {
                type: String,
                default: 'advanced'
            },
            'pageSize': {
                type: Number,
                default: 10
            },
            'params': {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },

        data: function () {
            return {
                pageNumber: 0,
                total: 0,
                userParams: {}
            }
        },

        ready(){
            this._load()
        },

        methods: {
            _gotoPage(pagenum, pagesize, total){
                this.pageSize = parseInt(pagesize)
                this.pageNumber = parseInt(pagenum)
                this._load()
            },

            _load(){
                var params = $.extend({}, this.params, {
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber + 1
                }, this.userParams)
                this.loading = true

                BH_UTILS.doAjax(this.url, params, 'POST').done((res) => {
                    this.$emit('ready', res)
                    this.total = res.datas.totalSize
                    this.rows = res.datas.rows
                    this.loading = false
                }).fail(() => {
                    this.loading = false
                })
            },

            /**
            * 刷新方法
            * @param {Object} 传入的参数
            */
            reload(params){
                this.userParams = params
                this._load()
            }
        }

    }
</script>
