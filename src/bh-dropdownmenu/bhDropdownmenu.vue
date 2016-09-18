<template>
    <div class="bh-dropdown bh-l-inline" bh-dropdown-role="bhDropdown">
        <button class="bh-btn bh-btn-default waves-effect" type="button" bh-dropdown-role="bhDropdownBtn">
            <i class='iconfont icon-{{icon}}'></i>
            {{title}}
        </button>
        <ul class="bh-dropdown-menu" bh-dropdown-role="bhDropdownMenu">
            <li v-for="item in source" :class="{'bh-disabled': item.disable}" >
                <a :href="type==='button' ? '#' : item.hreff" @click="click">{{item[displayMember]}}</a>
            </li>

            <!--<li class="bh-dropdown-divider"></li> 暂不支持divider -->
        </ul>
    </div>
</template>

<script>
    /**
     * 简单下拉列表组件
     * @module BhDropdown
     *
     * @fires change - 选择项发生变化的时候触发，参数为数据对象
     *
     * @example
     *     <caption>html</caption>
     *     <bh-dropdown :source='words' :current.sync='dditem' display-member='name' value-member='sid' @change='onselect'></bh-dropdown>
     * @example
     *     <caption>javascript</caption>
     *     var words = [{name: 'allow', sid: 1}, {name: 'abc', sid: 2}, {name: 'badf', sid: 3}, {name: 'best world', sid: 4}, {name: 'car', sid: 5}, {name: 'choice', sid: 6}];
     *     export default {
     *         data: function() {
     *             return {
     *                 words: words,
     *                 dditem: 3
     *             }
     *         },
     *         methods: {
     *             onselect: function(item) {
     *                 console.log(item);
     *             }
     *         }
     *     }
     */

//    var createAdapter = (vm) => {
//        return new $.jqx.dataAdapter({
//            url: vm.url,
//            root: vm.root,
//            datatype: 'json'
//        });
//    };

    export default {
        data () {
            return {

            };
        },
        /**
         * @property {Object} [current] 默认选择项（对象，优先级高于 selectedIndex），此属性变化会触发选择项改变
         * @property {Number} [selectedIndex] 默认选择项（索引）
         * @property {Object} source 数据源，可以为普通对象数组，此属性变化会触发重新渲染
         * @property {String} [placeholder=请选择] 提示输入文字
         * @property {Number} [width] 宽度
         * @property {Number} [height] 高度
         * @property {String} [displayMember] 显示字段的名称
         * @property {String} [valueMember] 取值字段的名称
         * @property {Boolean} [checkable=false] 是否允许多选
         * @property {Array} [checkedIndexes] 默认选择的索引列表[多选]
         * @property {String} [url] 从服务器加载数据时需要设置此属性，则不需要设置source属性
         */
        props: {
            title: String,
            displayMember: {
                default: 'name'
            },
            valueMember: {
                default: 'sid'
            },
            type: {
                default: 'button'
            },
            source: {
                default: []
            },
            icon: {
                default: ''
            },

            url: String,
            root: String,
            width: Number,
            height: Number
        },
        methods: {
            /**
             * 单击事件
             *
             */
            click(e) {
                let index = $(e.target).parent('li').index();
                let item = this.source[index];
                if(item.disable === true){
                    e.preventDefault();
                    return;
                }

                if(this.type === 'button') {
                    this.$dispatch('clickitem', item);
                    e.preventDefault();
                }else{
                    window.location.href = item.hreff;
                }
            }
        },
        ready () {
//            var self = this;
//            var el = $(this.$el);
//
//            var opts = {
//                source: this.source ? this.source : createAdapter(self),
//                width: this.width,
//                height: this.height,
//            };
//
//            if (this.displayMember || this.valueMember) {
//                $.extend(opts, {
//                    displayMember: this.displayMember,
//                    valueMember: this.valueMember
//                });
//            }
        },
        beforeDestroy () {
//            var el = $(this.$el);
//            el.jqxDropDownList('destroy');
        },
        computed: {
//            iconClassObj () {
//                var cls = {
//                    'bh-btn': true,
//                    'bh-btn-small': this.small,
//                    'waves-effect': this.waves,
//                    'icon-right': this.iconDir !== 'left'
//                };
//
//                cls['bh-btn-' + this.type] = true;
//
//                return cls;
//            }
        }
    };
</script>

<style scoped>

</style>
