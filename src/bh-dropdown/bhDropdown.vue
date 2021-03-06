<template>
    <div></div>
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

    var createAdapter = (vm) => {
        return new $.jqx.dataAdapter({
            url: vm.url,
            root: vm.root,
            type: vm.type,
            datatype: 'json'
        }, {
            contentType: vm.contentType,
            formatData: function (data) {
                if(vm.type.toLowerCase() === 'post') {
                    return JSON.stringify(data);
                }
                return data;
            }
        });
    };

    /**
     * 设置当前选择的对象，转换为用索引设置，防止诡异的问题
     */
    var _setCurrentItem = (vm, item) => {
        if (item === null || item === undefined) {
            return;
        }

        let source = vm.source;
        let valueMember = vm.valueMember;
        for (let i = 0, len = source.length; i < len; i++) {
            var temp = source[i];
            if (typeof item === 'object') {
                if (temp[valueMember] === item[valueMember]) {
                    vm.jqxObj.jqxDropDownList('selectIndex', i);
                    return;
                }
            } else {
                if (temp === item) {
                    vm.jqxObj.jqxDropDownList('selectIndex', i);
                    return;
                }
            }
        }
    };

    export default {
        data () {
            return {
                jqxObj: null
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
            current: {
                default: null
            },
            placeholder: {
                default: '请选择'
            },
            selectedIndex: Number,
            source: {
                default: null
            },
            displayMember: {
                default: undefined
            },
            valueMember: {
                default: undefined
            },
            url: String,
            type: {
                type: String,
                default: 'GET'
            },
            contentType: {
                type: String,
                default: 'application/json'
            },
            root: String,
            checkable: {
                type: Boolean,
                default: false
            },
            checkedIndexes: Array,
            width: Number,
            height: Number,
            filterable:{
                type:Boolean,
                default:false
            },
            filterPlaceHolder:{
                type:String,
                default:"请选择"
            }   
        },
        methods: {
            /**
             * 获取当前选择的列表【多选模式】
             * @return {Array} 已选择列表
             */
            getCheckedItems () {
                return $(this.$el).jqxDropDownList('getCheckedItems');
            },
            /**
             * 获取当前选择的元素【单选模式】
             * @return {Object} 已选择元素
             */
            getSelectedItem () {
                return $(this.$el).jqxDropDownList('getSelectedItem');
            },
            /**
             * 设置选择项【单选模式】
             * @param  {String/Object} item 列表中某一个元素，若为string，则当成value处理
             */
            selectItem (item) {
                if (typeof item !== 'object') {
                    return $(this.$el).jqxDropDownList('val', item);
                }

                return $(this.$el).jqxDropDownList('selectItem', item);
            },
            /**
             * 设置选择项【多选模式】
             * @param  {String/Object} item 列表中某一个元素，若为string，则当成value处理
             */
            checkItem (item) {
                if (typeof item !== 'object') {
                    item = $(this.$el).jqxDropDownList('getItemByValue', item);
                }

                return $(this.$el).jqxDropDownList('checkItem', item);
            },
            /**
             * 取消选择项【多选模式】
             * @param  {String/Object} item 列表中某一个元素，若为string，则当成value处理
             */
            uncheckItem (item) {
                if (typeof item !== 'object') {
                    item = $(this.$el).jqxDropDownList('getItemByValue', item);
                }

                return $(this.$el).jqxDropDownList('uncheckItem', item);
            },
            /**
             * 全选
             */
            checkAll () {
                return $(this.$el).jqxDropDownList('checkAll');
            },
            /**
             * 取消全选
             */
            uncheckAll () {
                return $(this.$el).jqxDropDownList('uncheckAll');
            },
            /**
             * 重置列表为未选择状态
             */
            reset () {
                if (this.checkable) {
                    $(this.$el).jqxDropDownList('uncheckAll');
                } else {
                    var selectedItem = this.getSelectedItem();
                    $(this.$el).jqxDropDownList('unselectItem', selectedItem);
                }

                this.current = null
            },
            /**
             * 清除所有元素
             */
            clear () {
                $(this.$el).jqxDropDownList('clear');
            },
            /**
             * 多选模式下选择item,value为字符串
             */
            checkMultiItems(value){
                let valueArray=value.split(',')
                valueArray.forEach(item=>{
                    $(this.$el).jqxDropDownList('checkItem', item);
                })
            }

    },
        ready () {
            var self = this;
            var el = $(this.$el);

            var opts = {
                source: this.source ? this.source : createAdapter(self),
                selectedIndex: this.selectedIndex,
                placeHolder: this.placeholder,
                width: this.width,
                height: this.height,
                checkboxes: this.checkable,
                filterable:this.filterable,
                filterPlaceHolder:this.filterPlaceHolder
            };

            if (this.displayMember || this.valueMember) {
                $.extend(opts, {
                    displayMember: this.displayMember,
                    valueMember: this.valueMember
                });
            }

            var jqxObj = this.jqxObj = el.jqxDropDownList(opts);

            if (this.current) {
                _setCurrentItem(this, this.current);
                // jqxObj.jqxDropDownList('selectItem', this.current);
            }

            if (this.checkedIndexes && this.checkedIndexes.length > 0) {
                $.each(this.checkedIndexes, (i, index) => {
                    jqxObj.jqxDropDownList('checkIndex', index);
                });
            }

            jqxObj.on('select', (event) => {
                if (event.args) {
                    var item = event.args.item;
                    if (item) {
                        self.current = item;
                        self.$dispatch('change', item);
                    }
                }
            });

            this.$watch('current', (item) => {
                _setCurrentItem(this, this.current);
                // jqxObj.jqxDropDownList('selectItem', item);
            });

            this.$watch('source', (data) => {
                jqxObj.jqxDropDownList('source', data);
            });
        },
        beforeDestroy () {
            var el = $(this.$el);
            el.jqxDropDownList('destroy');
        }
    };
</script>

<style scoped>
    input {
        width: 100%;
    }
</style>
