<template>
    <div class="bh-dropdown bh-l-inline" bh-dropdown-role="bhDropdown">
        <button class="bh-btn bh-btn-default waves-effect" type="button" bh-dropdown-role="bhDropdownBtn">
            <i class='iconfont icon-{{icon}}'></i>
            {{title}}
        </button>
        <ul class="bh-dropdown-menu" bh-dropdown-role="bhDropdownMenu">
            <li v-for="item in source" :class="{'bh-disabled': item.disable}" >
                <a :href="type==='button' ? '#' : item.url" @click="click">{{item[displayMember]}}</a>
            </li>

            <!--<li class="bh-dropdown-divider"></li> 暂不支持divider -->
        </ul>
    </div>
</template>

<script>
    /**
     * 简单下拉按钮组件
     * @module BhDropdownmenu
     *
     * @fires clickitem - 单击某个下拉按钮时触发
     *
     * @example
     *     <caption>html</caption>
     *     <bh-dropdownmenu :source='btns' type='button' icon='clouddownload' title='批量下载' display-member='name' value-member='sid' @clickitem='openMultiDownload'></bh-dropdownmenu>
     * @example
     *     <caption>javascript</caption>
     *     var btns = [{name: 'allow', sid: 1}, {name: 'abc', sid: 2}, {name: 'badf', sid: 3}, {name: 'best world', sid: 4}, {name: 'car', sid: 5}, {name: 'choice', sid: 6}];
     *     export default {
     *         data: function() {
     *             return {
     *                 btns: btns
     *             }
     *         },
     *         methods: {
     *             openMultiDownload: function(item) {
     *                 console.log(item);
     *             }
     *         }
     *     }
     */


    export default {
        data () {
            return {

            };
        },
        /**
         * @property {String} title 外部按钮显示文字
         * @property {Array} source 数据源，可以为普通对象数组，此属性变化会触发重新渲染；{name: 'add', sid: 4, disable: false, url: 'http://www.baidu.com'}
         * @property {String} [displayMember] 显示字段的名称
         * @property {String} [valueMember] 取值字段的名称
         * @property {String} [type] 下拉按钮类型，分button和link两种类型，为button时表示普通按钮，单击触发clickitem事件；为link时表示超链接，单击跳转到相应url
         * @property {String} [icon] 外部按钮左侧显示的图标，默认不显示
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
            }
        },
        methods: {
            click (e) {
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
                    if(!item.url){
                        console.error('bh-dropdownmenu error: url must be given when the type is not button');
                    }
                    window.location.href = item.url;
                }
            }
        },
        ready () {
        },
        beforeDestroy () {
        },
        computed: {
        }
    };
</script>

<style scoped>

</style>
