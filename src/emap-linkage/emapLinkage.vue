<template>
    <div></div>
</template>

<script>
    /**
     * 级联下拉列表
     * @module EmapLinkage
     */
    export default {
        props: {
            options: Object
        },
        ready () {
            var self = this;
            var el = $(self.$el);

            el.emapLinkage(this.options);
        }
    };
</script>
