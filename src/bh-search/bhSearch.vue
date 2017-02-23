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

    /**
     * 去除字符串两端空格
     */
    const _trim = (val) => {
        if (! val) {
            return '';
        }

        return val.trim();
    };

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
                type: String,
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
        /**
         * 获取输入值
         * @return {String} 经过trim处理的输入字符串
         */
        getValue () {
            return _trim(this.value);
        },
        search () {
            this.$dispatch('search', _trim(this.value));
        }
    },
    ready () {
        // var self = this;
        var el = $(this.$el);

        this.jqxObj = el.jqxInput({
            source: this.source
        });

        this.$nextTick(() => {
            el.find('input.jqx-input-group-addon').css('border-right-width', '1px');
    });
    },
    beforeDestroy () {
        var el = $(this.$el);
        el.jqxInput('destroy');
    }
    };
</script>

<style scoped>
    .search-box {
        display: block;
        position: relative;
    }
    .search-box input {
        padding-left: 33px;
        width: auto;
    }
    .search-box .icon-search {
        left: 0;
        position: absolute;
        padding: 5px 6px;
        color: #999;
    }
    .search-box a {
        border: none;
        margin-left: -1px;
    }
</style>
