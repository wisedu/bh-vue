<template>
    <div class='bh-step-flow'>
        <slot></slot>
    </div>
</template>

<script>
    /**
     * 竖向步骤条
     *
     * @module bhStepFlow
     *
     * @example
     * <caption>html</caption>
     * <bh-step-flow ref=sf>
     *     <bh-flow-node num='5' title='新增用户' :auto-hide='true'>
     *         <p>新增新增新增新增新增新增</p>
     *         <p>新增新增新增新增新增新增新增</p>
     *         <bh-button type='warning' @click.stop='hideAdd'>关闭</bh-button>
     *     </bh-flow-node>
     *     <bh-flow-node num='4' title='订单管理' caption='2015/12/26 09:00-10:00' tag='资料'>
     *         这是4节点\节点\节点
     *     </bh-flow-node>
     * </bh-step-flow>
     */

    import eventHub from './bhStepFlowEH';

    export default {
        data: () => ({
            eventHub: eventHub.instance() // 当前实例的 event hub
        }),
        methods: {
            /**
             * 展开某个节点
             * @param  {String} num 节点编码
             */
            expand (num) {
                this.eventHub.$emit('expand-flow-node', num);
            },
            /**
             * 收缩某个节点
             * @param  {String} num 节点编码
             */
            collapse (num) {
                this.eventHub.$emit('collapse-flow-node', num);
            },
            /**
             * 隐藏某个节点
             * @param  {String} num 节点编码
             */
            hide (num) {
                this.eventHub.$emit('hide-flow-node', num);
            }
        }
        // events: {
        //     'toggle-flow-node' (num, expanded) {
        //         if (expanded) {
        //             this.expand(num);
        //         }
        //     }
        // }
    };
</script>

<style lang="less">
    .bh-step-flow {
        .scenes-cbrt-record {
            &:first-child {
                &:before {
                    height: 0;
                }

                .scenes-cbrt-no {
                    margin-top: 6px;
                }
            }
        }
    }
</style>
