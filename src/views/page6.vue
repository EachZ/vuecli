<template>
    <div>
        <h1>测试与后端交互</h1>
        <button @click="testAxiosGET">TestAxiosGET</button>
        <button @click="testAxiosPOST">TestAxiosPOST </button>
        <p>{{GETcontent}}</p>
        <p>{{POSTcontent}}</p>

        <br/>
        <h1>2. 订单-生产单关系表</h1>
        <a-table :columns="columns" :data-source="data" :rowClassName="rowClassName">
            <!--            ↓是每一行第一列的内容-->
            <span slot="resource" slot-scope="text">{{ text }}</span>
            <span slot="customTitle">资源</span>
            <span slot="secondaryProductionNumbers" slot-scope="secondaryProductionNumbers">{{secondaryProductionNumbers}}</span>

        </a-table>
<!--        <div v-if="!repositoryUrl">loading...</div>-->
<!--        <div v-else>most star repository is <a :href="repositoryUrl">{{repositoryName}}</a></div>-->
    </div>
</template>

<script>
    const columns = [
        {
            title: '订单ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: '订单号',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: '二级生产单号',
            key: 'secondaryProductionNumbers',
            dataIndex: 'secondaryProductionNumbers',
            scopedSlots: { customRender: 'secondaryProductionNumbers' },
        },
    ];

    //每一行的内容
    const data = [
        {
            key: '1',
            orderId: 1,
            orderNumber: 11,
            secondaryProductionNumbers:[1,2,3],
        },
        {
            key: '2',
            orderId: 2,
            orderNumber: 22,
            secondaryProductionNumbers:[1,2,3],
        },
        {
            key: '3',
            orderId: 3,
            orderNumber: 33,
            secondaryProductionNumbers:[1,2,3],
        },
        {
            key: '4',
            orderId: 4,
            orderNumber: 44,
            secondaryProductionNumbers:[1,2,3],
        },
    ];
    export default {
        name: "page6",
        data() {
            return {
                // repositoryUrl : '',
                // repositoryName : ''
                GETcontent: '',
                POSTcontent: '',
                data,
                columns
            }
        },
        methods: {
            rowClassName(record,index) {
                let className = "light-row";
                if (index % 2 === 1) className = "dark-row";
                return className;
            },
            turnIntoStandardData(oldData) {
                console.log(oldData);
                for(let i=0;i<oldData.length;i++){
                    let orderId=oldData[i].orderId;
                    let orderNumber=oldData[i].orderNumber;
                    let secondOrderList=oldData[i].secondaryProductionNumbers;
                    console.log(orderId);
                    console.log(orderNumber);
                    console.log(secondOrderList);
                    let tempArr=[];
                    for(let j=0;j<secondOrderList.length;j++){
                        let tempId=String(i)+String(j);
                        let tempJSON={
                            id: tempId,
                            secondaryProductionNumbers:secondOrderList[j]
                        };
                        tempArr.push(tempJSON)
                    }
                    let bigTempJSON={
                        orderId:orderId,
                        orderNumber:orderNumber,
                        secondOrderList:tempArr
                    };
                    this.dataGroups.push(bigTempJSON);
                }
                console.log(this.dataGroups);
            },
            testAxiosGET() {
                // 由于 main.js 里全局定义的 axios,此处直接使用 $axios 即可。
                // 由于 main.js 里定义了每个请求前缀，此处的 / 即为 /api/，
                // 经过 vue.config.js 配置文件的代理设置，会自动转为 target中的网址，从而解决跨域问题
                // get方法
                this.$axios.get('/orderScheduleForm').then(response => {
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
                this.$axios.get('/resourceById',{
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
                this.$axios.get('/orders/productionForm',{
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
    .light-row {background-color: #fff;}
    .dark-row {background-color: #f2f4f5;}
</style>