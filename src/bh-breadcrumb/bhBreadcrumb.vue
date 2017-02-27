<template>
        <template v-for="path in breadCrumb.parents">
            <a v-link="path.url">{{path.title}}</a>
            {{breadCrumb.parents.length > 0 ? '>' : ''}}
        </template>
        {{breadCrumb.title}}
</template>
<style>

</style>
<script>

    export default{
        data(){
            return {
                breadCrumb: {}
            }
        },
        activate (done) {
            // debugger;
            //读取面包屑，构建动态页头导航
            let params = this.$route.params;
            let parents = this.$route.parents;
            if(parents) {
                for (let i = parents.length - 1; i >= 0; i--) {
                    let parent = parents[i];
                    for(let param_key in params) {
                        parent.url = parent.url.replace('/:' + param_key, '/' + params[param_key]);
                
                    }
                }
            }
            this.breadCrumb = {
                title: this.$route.title,
                parents: this.$route.parents
            };
            done();
        }
    }
</script>
