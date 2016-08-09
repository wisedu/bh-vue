<template>
    <li class='bh-nav-item' :class="{'bh-active': navItem.id == activeItemId, 'bh-nav-dropdown': hasChildren, 'bh-open': expand}" menu-id='{{navItem.id}}'>
        <a href="javascript:void(0)" @click.stop='click'>
            <div>
                <i v-if='navItem.icon' class="{{navItem.icon}}"></i>{{navItem.name}}
            </div>
        </a>
        <ul class="bh-nav node-level-{{navItem.depth}}" v-if='hasChildren'>
            <bh-nav-item v-for='child in navItem.children' :nav-item='child' :active-item-id='activeItemId'></bh-nav-item>
        </ul>
    </li>
</template>

<script>
    var NAV_TYPE = {
        LINK: 'link',
        TRIGGER: 'trigger'
    };

    export default {
        name: 'bh-nav-item',
        data: function () {
            return {
                expandStatus: null
            };
        },
        computed: {
            hasChildren () {
                return this.navItem.children && (this.navItem.children.length > 0);
            },
            expand: {
                get () {
                    if (this.expandStatus == null) {
                        this.expandStatus = this.navItem.expand;
                    }
                    return this.expandStatus;
                },
                set (expand) {
                    this.expandStatus = expand;
                }
            }
        },
        methods: {
            toggle () {
                this.expand = !this.expand;
            },
            trigger () {
                this.$dispatch('trigger', this.navItem);
            },
            click () {
                var item = this.navItem;

                if (this.hasChildren) {
                    // 父节点，做toggle操作
                    this.toggle();
                    this.trigger();
                } else {
                    // 子节点
                    var type = item.action ? item.action.toLowerCase() : '';
                    switch (type) {
                        case NAV_TYPE.LINK: {
                            if (!item.url) {
                                console.log('ERROR: link menu without url !', item);
                                return;
                            }

                            this.$router.go(item.url);
                            break;
                        }
                        case NAV_TYPE.TRIGGER: {
                            this.trigger();
                            break;
                        }
                        default: {
                            console.log('no type specified on this menu !', item);
                            this.trigger();
                        }
                    }
                }
            }
        },
        props: ['navItem', 'activeItemId']
    };
</script>

<style scoped>
    .bh-nav .bh-nav-dropdown > .bh-nav.node-level-2 >  li > a {
        padding-left: 20px;
    }
    /*.bh-nav .node-level-2 > li > a > div:before {
        display: none;
        left: 60px;
    }*/

    .bh-nav .bh-nav-dropdown>.bh-nav {
        width: 100%;
        padding: 0;
        text-indent: 8px;
    }

    .bh-nav .bh-nav-dropdown>.bh-nav>li>a>div:before {
        display: none;
    }

</style>
