<template>
    <div :class="'bh-card bh-card bh-card-lv' + level">
        <slot></slot>
    </div>
</template>

<script>
    /**
     * 卡片组件,可作为独立的元素容器。
     * @module BhCard
     *
     * @example
     *     <caption>html</caption>
     *     <bh-card :level='2'>
     *         <p>二级卡片</p>
     *     </bh-card>
     */
    export default {
        /**
         * @property {int} [level=1] 层级(类似z-index),数值越大越靠近顶部
         */
        props: {
            level: {
                default: 1
            }
        }
    };
</script>
