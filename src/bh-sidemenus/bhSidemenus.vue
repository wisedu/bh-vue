<template>
    <div></div>
</template>

<script>
    var _init = (menus) => {
        $.bhAsideNav.init(menus);
    };

    export default {
        props: ['source'],
        ready () {
            // init
            _init(this.source);

            // listen for change
            this.$watch('source', (menus) => {
                _init(menus);
            });
        }
    };
</script>
