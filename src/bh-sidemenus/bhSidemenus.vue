<template>
    <div></div>
</template>

<script>
    var _init = (menus) => {
        $.bhAsideNav.init(menus);
    };

    export default {
        props: ['source'],
        mounted () {
            let vm = this;

            vm.$nextTick(() => {
                _init(vm.source);

                // listen for change
                vm.$watch('source', (menus) => {
                    _init(menus);
                });
            });
        }
    };
</script>
