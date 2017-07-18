<template>
    <div>
        <ul>
            <li v-for="item in tabs">{{{item.title}}}</li>
        </ul>
        <div v-for="item in tabs" class="bh-mt-16">
            <component :is="item.showComponent"></component>
        </div>
    </div>
</template>
<style scoped lang="sass">
</style>
<script  type="text/ecmascript-6">
    /**
     * compTab控件
     * @module compTab
     * @fires selected - tab项的点击事件
     * @example
     *     <caption>html</caption>
     *     <comp-tab :tabs="tabs"></comp-tab>
     * @example
     *     <caption>javascript</caption>
     *    export default {
     *     data: function () {
     *       return {
     *         tabs:
     *         [
     *             {title: 'tab1', component: 'instance'},
     *             {title: 'tab2', component: 'appList'}]
     *           }
     *       }
     *     }
     */
    export default {
        /**
         * @property {Array} tabs tab项配置
         */
        props: ['name', 'tabs','currentIndex'],
        data: function () {
            return {}
        },

        created(){
            this.tabs.forEach((tab, index)=> {
                this.$set('tabs[' + index + '].showComponent', '')
            })
        },

        ready() {
            var self = this
            var el = $(this.$el)

            el.jqxTabs({
                width: '100%',
                selectedItem:this.currentIndex || 0,

            })
            if(this.currentIndex){
                this.initTabContent(parseInt(this.currentIndex))
            }else{
                this.initTabContent(0)
            }

            el.on('tabclick', function (event) {
                var tabIndex = event.args.item;
                self.initTabContent(tabIndex)
            });
        },

        methods:{
            initTabContent(tabIndex){
                this.tabs[tabIndex].showComponent = ''
                this.$nextTick(function () {
                    this.tabs[tabIndex].showComponent = this.tabs[tabIndex].component
                    this.$emit('selected', tabIndex);
                })
            }
        }
    }
</script>
