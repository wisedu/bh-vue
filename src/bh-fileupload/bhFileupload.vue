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
        props: ['url'],
        mounted () {
            var self = this;

            self.$nextTick(() => {
                var el = $(self.$el);

                self.jqxObj = el.fileupload({
                    autoUpload: true,
                    url: this.url
                });
            });
        }
    };
</script>
