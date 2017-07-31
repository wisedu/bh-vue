<template>
    <div v-el:treeroot></div>
</template>

<script>
    /**
     * 树
     *
     * @module BhTree
     * @fires check-change - 选择的元素列表发生变化(需要支持多选: checkboxes = true)
     * @fires select - 当前元素发生变化(鼠标点击)
     * @example
     *     <bh-tree v-ref:tree3 :source='treeData' :selected-item.sync='selItem'></bh-tree>
     */
    var getAll = (el) => {
        return el.jqxTree('getItems');
    };
    var getSelectedItem = (el) => {
        return el.jqxTree('getSelectedItem');
    };

    var getCheckedItems = (el) => {
        return el.jqxTree('getCheckedItems');
    };

    var getItem = (el, element) => {
        return el.jqxTree('getItem', element);
    };

    var selectItem = (el, item) => {
        return el.jqxTree('selectItem', item);
    };

    var checkAll = (el) => {
        return el.jqxTree('checkAll');
    };

    var uncheckAll = (el) => {
        return el.jqxTree('uncheckAll');
    };

    var addChild = (el, child, parent) => {
        if (!child) {
            console.log('add child failed, invalid inupt');
            return false;
        }

        if (!$.isArray(child)) {
            child = [child];
        }

        $.each(child, (i, item) => {
            el.jqxTree('addTo', item, parent, false);
        });

        el.jqxTree('render');

        return true;
    };

    var remove = (el, item) => {
        if (!item) {
            console.log('remove item failed, invalid inupt');
            return false;
        }

        if (!$.isArray(item)) {
            item = [item];
        }

        $.each(item, (i, node) => {
            el.jqxTree('removeItem', node.element);
        });

        el.jqxTree('render');
    };

    var addEvents = (vm) => {
        var self = vm;
        var el = $(self.$el);

        el.on('select', (event) => {
            var args = event.args;
            var item = getItem(el, args.element);

            self.selectedItem = item;
            //在选中项的li元素上增加select选中class(首先去除其它的)
            el.find('li').removeClass('edit-tree-li-select');
            $(item.element).addClass('edit-tree-li-select');
            self.$dispatch('select', item);
        });

        el.on('checkChange', (event) => {
            var args = event.args;

            self.checkedItems = getCheckedItems(el);
            var item = getItem(el, args.element);

            if (!item) {
                return;
            }

            self.$dispatch('check-change', {
                item: item,
                checked: args.checked
            });
        });

        el.on('expand', function (event) {
            var args = event.args;
            var item = getItem(el, args.element);

            self.$dispatch('expand', item);
        });
    };

    var addDefaultSelectEvents = (vm) => {
        var self = vm;
        var el = $(vm.$els.treeroot);

        if(!vm.defaultSelect) {
            return;
        }

        vm.$nextTick(function () {
            var items = getAll(el);
            if( ! items.length > 0 ) {
                return;
            }

            let _item = items[0];
            if(vm.defaultSelectLeaf === true) {
                //后台返回第一个选中的节点
                for(var i = 0; i < items.length; i++) {
                    if(items[i].hasItems === false) {
                        _item = items[i];
                        break;
                    }
                }
            }
            selectItem(el, _item);

            self.selectedItem = _item;
            self.$dispatch('select', _item);
            self.$dispatch('initialized');
        })
    };

    var _addOperations = (vm) => {
        let operations = vm.operations;
        if (!operations) {
            return;
        }

        let root = $(vm.$el);
        root.addClass('has-opt').on('mouseenter', '.jqx-tree-item', function(event) {
            // debugger;
            root.find('.opt-panel').remove(); // 先清一把
            let target = $(event.target);
            let li = target.parent();
            li.addClass('edit-tree-item-hover');
            let item = getItem(root, li[0]);
            let opts = null;
            if (typeof operations === 'function') {
                opts = operations(item) || [];
            } else {
                opts = operations;
            }

            let rootOffset = root.offset();
            let liOffset = target.offset();

            let optHtml = $('<div>').addClass('opt-panel').css({
                top: liOffset.top - rootOffset.top,
                right: 0,
                position: 'absolute'
            });

            opts.forEach(opt => {
                $('<a>').text(opt.title)
                    .data('action', opt.name)
                    .data('item', item)
                    .addClass('opt-btn bh-mh-4')
                    .appendTo(optHtml);
            });

            li.append(optHtml);

            //隐藏超长，悬浮显示
            let targetDiv = root.find('.opt-panel').parent().find('.jqx-tree-item');
            let useWidth = $('.opt-panel').width();
            let originWidth = targetDiv.width();
            let desc = targetDiv.text();
            targetDiv.css('padding-right', useWidth + 'px').addClass('bh-str-cut').attr('title', desc);

        }).on('mouseleave', '.jqx-tree-item-li', function(event) {
            //移除事件
            root.find('.opt-panel').parent().find('.jqx-tree-item').css('padding-right', '').removeClass('bh-str-cut');
            root.find('.opt-panel').remove();
            $(this).removeClass('edit-tree-item-hover');
        }).on('click', '.opt-btn', function(event) {
            let target = $(event.target);
            vm.$dispatch(target.data('action'), target.data('item'));
        });
    };

    var _removeOperations = (vm) => {
        let root = $(vm.$els.treeroot);
        root.off('mouseenter').off('mouseleave').off('click');
        root.find('.opt-panel').remove();
    };

    var createTree = (vm, options) => {
        _removeOperations(vm);
        var el = $(vm.$els.treeroot);

        vm.jqxObj = el.jqxTree(options);
        addDefaultSelectEvents(vm);
        vm.selectedItem = getSelectedItem(el);
        vm.checkedItems = getCheckedItems(el);

        _addOperations(vm);

        return vm.jqxObj;
    };

    var prepareSource = (vm) => {
        return preprocessSource(vm, vm.source);
    };


    var preprocessSource = (vm, dataSource) => {
        var fields = vm.fields;

        if ($.isEmptyObject(fields)) {
            return dataSource;
        }

        var params = $.extend({}, vm.defaultFields, fields);

        var mapper = [];
        var dataFields = [];
        $.each(fields, (key, val) => {
            if ($.isArray(val)) {
                mapper.push({name: val[0], map: key});
                dataFields.push({name: val[0], type: val[1]});
            } else {
                if ($.inArray(val, ['expanded', 'selected']) > -1) {
                    dataFields.push({name: val, type: 'bool'});
                } else {
                    dataFields.push({name: val});
                }

                mapper.push({name: val, map: key});
            }
        });

        var source = {
            datatype: 'array',
            id: params.id,
            datafields: dataFields,
            localdata: dataSource
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        dataAdapter.dataBind();
        var ret = dataAdapter.getRecordsHierarchy(params.id, params.pid, 'items', mapper);

        mapper = null;
        source = null;

        return ret || [];
    };

    export default {
        data () {
            return {
                jqxObj: null,
                defaultOpts: {
                    hasThreeStates: false,
                    checkboxes: false
                },
                defaultFields: {
                    id: 'id',
                    pid: 'parentid',
                    label: 'label'
                }
            };
        },
        /**
         * @property {Object}  source - 数据源，发生变化时会重新渲染当前组件
         * @example
         *     source: [
         *      {
         *          icon: "resources/img/icon/tree/mailIcon.png", label: "Mail", expanded: true, items: [
         *            { icon: "resources/img/icon/tree/calendarIcon.png", label: "Calendar" },
         *            { icon: "resources/img/icon/tree/contactsIcon.png", label: "Contacts", selected: true }
         *          ]
         *      },
         *      {
         *          icon: "resources/img/icon/tree/folder.png", label: "Inbox", expanded: true, items: [
         *           { icon: "resources/img/icon/tree/folder.png", label: "Admin" },
         *           { icon: "resources/img/icon/tree/folder.png", label: "Corporate" },
         *           { icon: "resources/img/icon/tree/folder.png", label: "Finance" },
         *           { icon: "resources/img/icon/tree/folder.png", label: "Other" },
         *          ]
         *      },
         *      { icon: "resources/img/icon/tree/recycle.png", label: "Deleted Items" },
         *      { icon: "resources/img/icon/tree/notesIcon.png", label: "Notes" },
         *      { iconsize: 14, icon: "resources/img/icon/tree/settings.png", label: "Settings" },
         *      { icon: "resources/img/icon/tree/favorites.png", label: "Favorites" }
         *  ];
         * @property {Object}  [selectedItem] - 当前选中的节点数据（鼠标点击）
         * @property {Array}  [checkedItems] - 当前选中的节点数据（复选框选中）
         * @property {Object}  [options] - 其他参数
         * @property {Boolean}  options.hasThreeStates=false - 三种状态展示是否选中
         * @property {Boolean}  options.checkboxes=false - 是否支持复选
         * @property {Boolean}  [fields={ id: 'id', pid: 'parentid', label: 'label'}] - 字段定义
         */
        props: {
            options: Object,
            selectedItem: Object,
            checkedItems: Array,
            fields: Object,
            operations: [Array, Function],
            source: {
                type: Array,
                default () {
                    return [];
                }
            },
            defaultSelect: {
                type: Boolean,
                default: false
            },
            defaultSelectLeaf: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            /**
             * 获取全部节点数据
             * @return {Array} 数据列表
             */
            getAll () {
                return getAll($(this.$el));
            },
            /**
             * 全选
             */
            checkAll () {
                return checkAll($(this.$el));
            },
            /**
             * 反选
             */
            uncheckAll () {
                return uncheckAll($(this.$el));
            },
            /**
             * 增加子节点
             * @param {Object} child 子节点数据
             * @param {Object} parent 父节点
             */
            addChild (child, parent) {
                return addChild($(this.$el), child, parent);
            },
            /**
             * 在元素之前增加新节点
             * @param {Object} item 新节点数据
             * @param {Object} elem 原有元素
             */
            addBefore (item, elem) {
                return $(this.$el).jqxTree('addBefore', item, elem);
            },
            /**
             * 在元素之下增加新子节点
             * @param {Object} item 新节点数据
             * @param {Object} elem 原有元素
             */
            addTo (item, elem) {
                //return $(this.$el).jqxTree('addBefore', item, elem);
                let el = $(this.$el);
                let ret = el.jqxTree('addTo', item, elem, false);
                el.jqxTree('render');
                return ret;
            },
            /**
             * 在元素之后增加新节点
             * @param {Object} item 新节点数据
             * @param {Object} elem 原有元素
             */
            addAfter (item, elem) {
                return $(this.$el).jqxTree('addAfter', item, elem);
            },
            /**
             * 移除节点
             */
            remove (item) {
                return remove($(this.$el), item);
            },
            /**
             * 收起节点
             * @param  {Object} item 元素节点（li 标签）
             */
            collapseItem (item) {
                return $(this.$el).jqxTree('collapseItem', item);
            },
            /**
             * 展开节点
             * @param  {Object} item 元素节点（li 标签）
             */
            expandItem (item) {
                return $(this.$el).jqxTree('expandItem', item);
            },
            /**
             * 选择节点
             * @param  {Object} item 元素节点（li 标签）
             */
            selectItem (item) {
                return $(this.$el).jqxTree('selectItem', item);
            },
            /**
             * 获取当前选择节点
             */
            getSelectedItem () {
                return getSelectedItem($(this.$el));
            },
            /**
             * 获取当前选择节点
             */
            getItem (item) {
                return getItem($(this.$el), item);
            },
            /**
             * 更新节点
             * @param  {Object} item 元素节点
             * @param  {Object} newItem 更新后的元素数据
             */
            updateItem (item, newItem) {
                return $(this.$el).jqxTree('updateItem', item, newItem);
            },
            preprocessSource (source) {
                return preprocessSource(this, source);
            },
            getPrevItem (item) {
                return $(this.$el).jqxTree('getPrevItem', item.element);
            },
            getNextItem (item) {
                return $(this.$el).jqxTree('getNextItem', item.element);
            }
            // ,
            // addTo (item, parentItem) {
            //     return $(this.$el).jqxTree('addTo', item, parentItem.element);
            // }
        },
        ready () {
            var self = this;

            var options = self.options = $.extend(self.defaultOpts, self.options);
            options.source = prepareSource(self);

            createTree(self, options);

            addEvents(this);

            self.$watch('source', (newVal) => {
                createTree(self, {source: prepareSource(self)});
            });
        },
        /**
         * 销毁释放
         * @inner
         */
        beforeDestroy () {
            _removeOperations(this);
            var el = $(this.$el);
            el.off('checkChange');
            el.off('select');
            el.off('itemClick');
            el.jqxTree('destroy');
        }
    };
</script>

<style lang="less">
    .jqx-tree.has-opt {
        .jqx-tree-item-li {
            // width: 100%;

            .opt-panel {
                padding: 3px;

                .opt-btn {
                    cursor: pointer;
                }
            }
        }
    }
</style>
