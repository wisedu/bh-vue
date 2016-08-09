<template>
    <div class="nav" style="height: {{height}}; width: {{width}}">
        <ul class="bh-nav bh-card bh-card-lv1" style="height: 100%">
            <bh-nav-item v-for='item in compiledSource' :nav-item.sync='item' :active-item-id='activeItemId' @trigger="activeItem"></bh-nav-item>
        </ul>
    </div>
</template>

<script>
    /**
     * 树形导航菜单，可支持树形结构和平铺结构的数据
     * @module BhNav
     *
     * @example
     *     <caption>html</caption>
     *     <bh-nav :source='navMenus' @trigger='navClick'></bh-nav>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *        data: function() {
     *          return {
     *              // 包含层级关系的数据源
     *              navMenus: [
     *                  {id: 1, name: '首页应用', icon: 'iconfont icon-home', type: 'link', url: '/nav', active: true},
     *                  {id: 8, name: '消息', icon: 'icon-envelope', type: 'link', url: '/nav/msg'},
     *                  {id: 2, name: '云端中心', icon: 'iconfont icon-cloud', expand: false, children: [
     *                      {id: 21, name: '收到的消息', type: 'link', url: '/nav/cloud/receive', children: [
     *                          {id: 211, name: '消息1', type: 'trigger'},
     *                          {id: 212, name: '消息2', type: 'trigger'}
     *                      ]},
     *                      {id: 22, name: '发出的消息', type: 'link', url: '/nav/cloud/send'},
     *                      {id: 23, name: '收藏的消息', type: 'link', url: '/nav/cloud/favorite'},
     *                  ]},
     *                  {id: 3, name: '运营数据中心', icon: 'icon-moon', expand: false, children: [
     *                      {id: 31, name: '收到的消息', type: 'link', url: '/nav/data/receive'},
     *                      {id: 32, name: '发出的消息', type: 'link', url: '/nav/data/send'},
     *                      {id: 33, name: '收藏的消息', type: 'link', url: '/nav/data/favorite'},
     *                  ]},
     *                  {id: 4, name: '打印模板', icon: 'iconfont icon-print', type: 'trigger'},
     *                  {id: 5, name: '权限管理', icon: 'iconfont icon-lock', type: 'trigger'},
     *                  {id: 6, name: '用户角色', icon: 'icon-user', type: 'trigger'},
     *                  {id: 7, name: '帮助与支持', icon: 'icon-question-sign', type: 'trigger'}
     *              ],
     *              // 平铺关系的数据源
     *              flatMenus: [
     *                  {id: 1, name: '首页应用', icon: 'iconfont icon-home', type: 'link', url: '/nav', active: true},
     *                  {id: 2, name: '云端中心', icon: 'iconfont icon-cloud', expand: false},
     *                  {id: 21, name: '收到的消息', parentId: 2},
     *                  {id: 211, name: '消息1', type: 'trigger', parentId: 21},
     *                  {id: 212, name: '消息2', type: 'trigger', parentId: 21},
     *                  {id: 22, name: '发出的消息', type: 'link', url: '/nav/cloud/send', parentId: 2},
     *                  {id: 23, name: '收藏的消息', type: 'link', url: '/nav/cloud/favorite', parentId: 2},
     *                  {id: 3, name: '运营数据中心', icon: 'icon-moon', expand: false},
     *                  {id: 31, name: '收到的消息', type: 'link', url: '/nav/data/receive', parentId: 3},
     *                  {id: 32, name: '发出的消息', type: 'link', url: '/nav/data/send', parentId: 3},
     *                  {id: 33, name: '收藏的消息', type: 'link', url: '/nav/data/favorite', parentId: 3},
     *                  {id: 4, name: '打印模板', icon: 'iconfont icon-print', type: 'trigger'},
     *                  {id: 5, name: '权限管理', icon: 'iconfont icon-lock', type: 'trigger'},
     *                  {id: 6, name: '用户角色', icon: 'icon-user', type: 'trigger'},
     *                  {id: 7, name: '帮助与支持', icon: 'icon-question-sign', type: 'trigger'},
     *                  {id: 8, name: '消息', icon: 'icon-envelope', type: 'link', url: '/nav/msg'}
     *              ]
     *          }
     *      },
     *      methods: {
     *          navClick: function(item) {
     *              console.log(item.name + " selected!");
     *          }
     *      },
     *      components: {BhNav}
     *  }
     */

    import BhNavItem from './bhNavItem';

    var setProperty = (data, propName, value) => {
        // Vue.set(data, propName, value);
        data[propName] = value;
    };

    var setExpand = (data, value) => {
        setProperty(data, 'expand', value);
    };

    /**
     * 遍历树结构，callback返回false则全部停止
     */
    var loopTree = (tree, callback, level) => {
        if (!tree || tree.length === 0) {
            return;
        }

        if (level === undefined) {
            level = 1;
        }

        var quit = false;

        $.each(tree, (i, item) => {
            if ((callback(item, level) === false) || (loopTree(item.children, callback, level + 1) === true)) {
                quit = true;
                return false;
            }
        });

        return quit;
    };

    /**
     * 树节点转换为平铺对象
     */
    var convertMap = (tree) => {
        var map = {};

        loopTree(tree, (item, level) => {
            // item.depth = level;
            Vue.set(item, 'depth', level);
            map[item.id] = item;
        });

        return map;
    };

    var activeMenu = (tree, key, value, cacheMap, vm) => {
        loopTree(tree, (item) => {
            var bActive = (item[key] === value);
            // setActive(item, bActive);

            // extend parents
            if (bActive) {
                var menuId = item.id;
                vm.activeItemId = item.id;
                var parents = $('li.bh-nav-item[menu-id=' + menuId + ']').parents('.bh-nav-dropdown[menu-id]');
                parents.each(function () {
                    var pid = $(this).attr('menu-id');
                    if (cacheMap[pid]) {
                        setExpand(cacheMap[pid], true);
                    }
                });
            }
        });
    };

    var activeMenuByUrl = (tree, url, cacheMap, vm) => {
        activeMenu(tree, 'url', url, cacheMap, vm);
    };

    /**
     * 将平铺数组 (parent id) 转为树形结构 (children)
     *
     * @param data [Array] 节点数组，平铺结构
     * @return {Array} 节点数组，树形结构
     */
    var hierarchy = (data, pidName) => {
        if ((!data) || (data.length === 0)) {
            return [];
        }

        // data = $.map(data, function(obj){ // 深拷贝
        //     return $.extend(true,{},obj);
        // });

        var tempMap = {};
        for (var i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            tempMap[item.id] = item;
        }

        // 构建树
        for (var id in tempMap) {
            let item = tempMap[id];
            if (item[pidName] !== undefined) {
                var pid = item[pidName];
                var parent = tempMap[pid];
                if (parent) { // 找到父元素
                    item.__is_child__ = true;
                    if (parent.children) {
                        parent.children.push(item);
                    } else {
                        parent.children = [item];
                    }
                }
            }
        }

        // 清理数据
        return $.grep(data, (item, i) => {
            if (item.__is_child__) {
                item.__is_child__ = undefined;
                return false;
            } else {
                return true;
            }
        });
    };

    export default {
        name: 'bh-nav',
        data () {
            return {
                cacheMap: {},
                activeItemId: null
            };
        },
        computed: {
            compiledSource () {
                if (this.sourceType === 'flat') {
                    $.each(this.source, (i, item) => {
                        item.children && (item.children = undefined);
                    });
                    return hierarchy(this.source, this.pid);
                } else {
                    return this.source;
                }
            }
        },
        /**
         * @property {Array} source 数据源
         * @property {String} [sourceType] 数据源结构类型，设置为 'flat' 的话则为平铺结构，否则为树形结构
         * @property {String} [pid=parentId] 当平铺结构的时候，此属性为子元素引用父元素的属性名称
         * @property {String} width 宽度
         */
        props: {
            source: Array,
            sourceType: String,
            pid: {
                default: 'parentId'
            },
            width: {
                default: 'auto'
            },
            height: {
                default: '100%'
            }

        },
        // created: function() {
        //     if (this.sourceType === 'flat') {
        //         this.source = hierarchy(this.source, this.pid);
        //     }
        // },
        ready () {
            var vm = this;
            var source = vm.source;
            var cacheMap = vm.cacheMap = convertMap(vm.compiledSource);
            activeMenuByUrl(source, vm.$router._currentTransition.to.path, cacheMap, vm);
            vm.$router.afterEach((transition) => { // 监听路由变化
                activeMenuByUrl(vm.source, transition.to.path, cacheMap, vm);
            });
        },
        methods: {
            activeItem (item) {
                this.activeItemId = item.id;
                return true;
            }
        },
        components: {BhNavItem}
    };
</script>

<style>
    .bh-nav > li {
        overflow: hidden;
    }
</style>
