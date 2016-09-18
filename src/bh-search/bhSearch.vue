<template>
    <div class="search-box">
        <input type="text" v-model="value" class="bh-form-control" @keyup.enter="search" :maxlength="maxlength" :minlength="minlength" :placeholder='placeholder'>
        <i class="iconfont icon-search"></i>
        <a v-if='showButton' class="bh-btn bh-btn-primary bh-btn-small j-search-btn" href="javascript:void(0);" @click='search'>{{btnText}}</a>
    </div>
</template>

<script>
    /**
     * 搜索框
     * @module BhSearch
     *
     * @fires search - 点击搜索按钮或回车时触发，参数为输入的value
     *
     * @example
     * <caption>html</caption>
     * <bh-search @search='search' :value.sync='val' placeholder='随便输入，长度小于10' :maxlength='maxlength' :source='candidates'></bh-search>
     */
    export default {
        data () {
            return {
                jqxObj: null
            };
        },
        /**
         * @property {String} value 输入值
         * @property {Boolean} [showButton=true] 是否显示搜索按钮
         * @property {String} [btnText=搜索] 搜索按钮的文字
         * @property {Array} source 输入自动提示
         * @property {String} [placeholder=输入要搜索的关键字] placeholder
         * @property {Number} [maxlength=20] 输入最大长度
         * @property {Number} [minlength=0] 输入最小长度
         */
        props: {
            'value': {
                default: ''
            },
            'showButton': {
                type: Boolean,
                default: true
            },
            'source': {
                default: () => []
            },
            'placeholder': {
                default: '输入要搜索的关键字'
            },
            'btnText': {
                default: '搜索'
            },
            'maxlength': {
                type: Number,
                default: 20
            },
            'minlength': {
                type: Number,
                default: 0
            }
        },
        methods: {
            search () {
                this.$dispatch('search', this.value);
            }
        },
        ready () {
            // var self = this;
            var el = $(this.$el);

            this.jqxObj = el.jqxInput({
                source: this.source
            });
        },
        beforeDestroy () {
            var el = $(this.$el);
            el.jqxInput('destroy');
        }
    };
</script>

<style scoped>
    @icon-color: #999;

    .search-box {
        display: -webkit-flex;
        display: flex;
        position: relative;
    }
    .search-box input {
        text-indent: 33px;
        flex-grow: 1;
        width: auto;
    }
    .search-box .icon-search {
        left: 0;
        position: absolute;
        padding: 5px 6px;
        color: @icon-color;
    }
    .search-box a {
        border: none;
        margin-left: -1px;
    }
</style>
