<template>
    <div>
        <button @click="testAxios">TestAxios</button>

        <br/>
        <div v-if="!repositoryUrl">loading...</div>
        <div v-else>most star repository is <a :href="repositoryUrl">{{repositoryName}}</a></div>
    </div>
</template>

<script>
    export default {
        name: "page6",
        data() {
            return {
                repositoryUrl : '',
                repositoryName : ''
            }
        },
        methods: {
            testAxios() {
                // 由于 main.js 里全局定义的 axios,此处直接使用 $axios 即可。
                // 由于 main.js 里定义了每个请求前缀，此处的 / 即为 /api/，
                // 经过 vue.config.js 配置文件的代理设置，会自动转为 https://www.baidu.com/，从而解决跨域问题
                this.$axios.get('/').then(response => {
                    if (response.data) {
                        console.log(response.data)
                    }
                }).catch(err => {
                    alert('请求失败')
                })
            }
        },
        mounted() {
            // 发ajax请求，用以获取数据，此处地址意思是查询 github中 vue 星数最高的项目
            const url = 'https://api.github.com/search/repositories?q=vue&sort=stars';
            this.$http.get(url).then(
                response => {
                    const result = response.data.items[0];
                    console.log(result);
                    this.repositoryUrl = result.html_url;
                    this.repositoryName = result.name;
                },

                response => {
                    alert('请求失败');
                },
            );
        }

    }
</script>

<style scoped>

</style>