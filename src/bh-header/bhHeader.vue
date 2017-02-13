<template>
    <header></header>
</template>

<script>
    /**
     * 页头
     * @module BhHeader
     *
     * @example
     *     <caption>html</caption>
     *     <bh-header title='测试页面'></bh-header>
     */

    var _init = (vm) => {
        var el = $(vm.$el);
        el.bhHeader({
            'showAsideNav': vm.hasSidemenu,
            'logo': vm.logo,
            'title': vm.slogon,
            'isNavHide': vm.hideNav,
            'icons': vm.icons, // 传入的字体图标, 换肤图标不需要传，默认就有
            'nav': vm.navItems,
            'dropMenu': vm.dropMenus,
            'userImage': vm.userInfo.image,
            'userInfo': vm.userInfo
        });

        el.on('headerRoleChange', (e, text, $dom) => {
            vm.$emit('role-change', e, text, $dom);
        });
    };

    export default {
        /**
         * @property {Array} [hasSidemenu=false] 是否显示侧边栏导航菜单
         * @property {String} [logo] logo图片地址
         * @property {String} [slogon] 页面标题
         * @property {Boolean} [hideNav=false] 头部导航菜单是否隐藏
         * @property {Array} [navItems] 头部的导航菜单
         * @property {Object} [sideMenus] 侧栏导航菜单
         * @property {Array} [dropMenus] 头像下拉列表
         * @property {Array} [icons] 传入的字体图标, 换肤图标不需要传，默认就有
         * @property {Object} [userInfo={image: 'http://res.wisedu.com/scenes/public/images/demo/user1.png'}] 用户信息
         */
        props: {
            'hasSidemenu': Boolean,
            'logo': String,
            'slogon': String,
            'hideNav': {
                default: false
            },
            'navItems': Array,
            'sideMenus': Object,
            'dropMenus': Array,
            'icons': Array,
            'userInfo': {
                default () {
                    return {
                        image: 'http://res.wisedu.com/scenes/public/images/demo/user1.png'
                    };
                }
            }
        },
        mounted () {
            this.$nextTick(() => {
                _init(this);

                this.$watch('sideMenus', (newVal, oldVal) => {
                    $.bhAsideNav.init(this.sideMenus);
                });
            }); 
        }
    };
</script>
