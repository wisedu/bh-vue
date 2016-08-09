<template>
    <input type="file">
</template>

<script>
    export default {
        data () {
            return {
                jqxObj: null
            };
        },
        props: ['value'],
        ready () {
            // var self = this;
            var el = $(this.$el);

            this.jqxObj = el.fileupload({
                autoUpload: true,
                url: 'xxx.do'
            });
        }
    };
</script>
