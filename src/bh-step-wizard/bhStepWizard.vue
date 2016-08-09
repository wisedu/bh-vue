<template>
    <div></div>
</template>

<script>
    /**
     * 步骤向导
     *
     * @module bhStepWizard
     * @fires change - 焦点项变化的回调，参数包含stepId，如 {stepId: "step3"}
     *
     * @example
     * <caption>html</caption>
     * <bh-step-wizard :items='items' current='step2'></bh-step-wizard>
     * <div class='clearfix'></div>
     * <div>
     *     <div id="step1" class="bh-hide">
     *         步骤向导-1-内容
     *     </div>
     *     <div id="step2" class="bh-hide">
     *         步骤向导-2-内容
     *     </div>
     *     <div id="step3" class="bh-hide">
     *         步骤向导-3-内容
     *     </div>
     *     <div id="step4" class="bh-hide">
     *         步骤向导-4-内容
     *     </div>
     *     <div id="step5" class="bh-hide">
     *         步骤向导-5-内容
     *     </div>
     *     <div id="step6" class="bh-hide">
     *         步骤向导-6-内容
     *     </div>
     * </div>
     * @example
     * <caption>javascript</caption>
     * export default {
     *     data () {
     *         return {
     *             items: [
     *                 {stepId: "step1", title: "步骤向导-1"},
     *                 {stepId: "step2", title: "步骤向导-2"},
     *                 {stepId: "step3", title: "步骤向导-3"},
     *                 {stepId: "step4", title: "步骤向导-4"},
     *                 {stepId: "step5", title: "步骤向导-5"},
     *                 {stepId: "step6", title: "步骤向导-6"}
     *             ]
     *         };
     *     },
     *     components: {BhStepWizard}
     * };
     */

    var pushAfterCheck = (item, arr) => {
        if (!arr || !item) {
            return;
        }

        if ($.inArray(item, arr) === -1) {
            arr.push(item);
        }
    };

    export default {
        /**
         * @property {Array} items 步骤参数集合 可以有title,stepId,active,finished字段
         * @property {String} [current] 当前激活项的stepId
         * @property {Array} [finished=[]] 当前已完成项的stepId数组
         * @property {Object} [container=$("body")] 正文的容器选择器
         * @property {Boolean} [clickable=true] 步骤条是否可点
         */
        props: {
            items: Array,
            current: String,
            container: Object,
            finished: {
                type: Array,
                default () {
                    return [];
                }
            },
            clickable: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            /**
             * 后退一步
             */
            prev () {
                $(this.$el).bhStepWizard('activePrevItem');
            },
            /**
             * 前进一步
             */
            next () {
                $(this.$el).bhStepWizard('activeNextItem');
            },
            /**
             * 切换到某一步
             * @param  {String} stepId 步骤id
             */
            activate (stepId) {
                $(this.$el).bhStepWizard('changeToActive', stepId);
            },
            /**
             * 完成某一步
             * @param  {String} stepId 步骤id
             */
            finish (stepId) {
                $(this.$el).bhStepWizard('changeToFinished', stepId);
                pushAfterCheck(stepId, this.finished);
            },
            /**
             * 当前是否为最后一步
             * @return {Boolean} 若为最后一步返回true，否则返回false
             */
            isLast () {
                return $(this.$el).bhStepWizard('isLastStep');
            }
            // getFinishedIndexs () {
            //     return $(this.$el).bhStepWizard("getFinishedIndexs");
            // }
        },
        ready () {
            var self = this;
            var el = $(this.$el);

            el.bhStepWizard({
                items: self.items,
                active: self.current,
                container: self.container,
                finished: self.finished,
                isAddClickEvent: self.clickable,
                change (step) {
                    self.current = step.stepId;
                    self.$dispatch('change', step);
                }
            });
        }
    };
</script>
