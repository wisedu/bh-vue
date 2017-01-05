<template>
    <div>
        <ul>
            <li v-for="item in tabs">{{{item.title}}}</li>
        </ul>
        <div v-for="item in tabs" class="bh-mt-16">
            <component :is="item.showComponent" keep-alive></component>
        </div>
    </div>
</template>
<style scoped lang="sass">
</style>
<script>
    /**
     * compTab控件
     * @module compTab
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
        props: ['name', 'tabs'],
        data: function () {
            return {}
        },

        ready() {
            var self = this
            this.tabs.forEach(function (tab, index) {
                self.$set('tabs[' + index + '].showComponent', '')
            })

            var el = $(this.$el)
            el.jqxTabs({
                width: '100%',
                initTabContent: function (tab) {
                    self.tabs[tab].showComponent = self.tabs[tab].component
                }
            })
        }
    }
</script>
