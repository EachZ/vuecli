<template>
    <div>
        <h1>测试与后端交互</h1>
        <button @click="testAxiosGET">TestAxiosGET</button>
        <button @click="testAxiosPOST">TestAxiosPOST </button>
        <p>{{GETcontent}}</p>
        <p>{{POSTcontent}}</p>

<!--        <div v-if="!repositoryUrl">loading...</div>-->
<!--        <div v-else>most star repository is <a :href="repositoryUrl">{{repositoryName}}</a></div>-->
    </div>
</template>

<script>

    export default {
        name: "page6",
        data() {
            return {
                target: 'http://123.57.239.79:3180',
                // repositoryUrl : '',
                // repositoryName : ''
                GETcontent: '',
                POSTcontent: '',
            }
        },
        methods: {
            testAxiosGET() {
                // 由于 main.js 里全局定义的 axios,此处直接使用 $axios 即可。
                // 由于 main.js 里定义了每个请求前缀，此处的 / 即为 /api/，
                // 经过 vue.config.js 配置文件的代理设置，会自动转为 target中的网址，从而解决跨域问题
                // get方法
                this.$axios.get(this.target+'/orderScheduleForm').then(response => {
                    console.log("GET请求发出了");
                    if (response.data) {
                        console.log(response.data);
                        this.GETcontent=response.data;
                    }
                }).catch(err => {
                    alert('请求失败')
                })
            },
            testAxiosPOST() {
                // 由于 main.js 里全局定义的 axios,此处直接使用 $axios 即可。
                // 由于 main.js 里定义了每个请求前缀，此处的 / 即为 /api/，
                // 经过 vue.config.js 配置文件的代理设置，会自动转为 target中的网址，从而解决跨域问题
                let form={
                    startDate: "2008-11-05 19:00:00",
                    endDate: "2008-11-07 19:00:00",
                    frequency :1

                };
                this.$axios.get(this.target+'/resourceById',{
                    params:{
                        id:16
                    }
                }).then(response => {
                    console.log("get传参数");
                    if (response.data) {
                        console.log(response.data);
                        this.POSTcontent=response.data;
                    }
                }).catch(err => {
                    alert('请求失败')
                })
            }
        },
        mounted() {
                //请求后端的获取订单-生产单关系表
                //要需要传首尾日期？？？
                // console.log("订单-生产单关系表get请求");
                this.$axios.get(this.target+'/orders/productionForm',{
                    params:{
                        startDate: "2018/11/19 00:00:00",
                        endDate: "2018/11/21 00:00:00"
                    }
                }).then(response => {
                    // console.log("GET请求发出了");
                    if (response.data) {
                        // console.log("订单-生产单关系表数据:");
                        // console.log(response.data);
                        this.data=response.data.data;
                        // console.log(response.data.data);
                    }
                }).catch(err => {
                    alert('订单-生产单关系表请求失败')
                })
            }
        //     // 发ajax请求，用以获取数据，此处地址意思是查询 github中 vue 星数最高的项目
        //     const url = 'https://api.github.com/search/repositories?q=vue&sort=stars';
        //     this.$http.get(url).then(
        //         response => {
        //             const result = response.data.items[0];
        //             console.log(result);
        //             this.repositoryUrl = result.html_url;
        //             this.repositoryName = result.name;
        //         },
        //
        //         response => {
        //             alert('请求失败');
        //         },
        //     );
    }
</script>

<style scoped>
</style>