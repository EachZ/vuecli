<template>
    <div>
        <h1>2. 订单-生产单关系表</h1>
        <a-table :columns="columns" :data-source="data" :rowClassName="rowClassName">
            <!--            ↓是每一行第一列的内容-->
            <span slot="resource" slot-scope="text">{{ text }}</span>
            <span slot="customTitle">资源</span>
            <span slot="secondaryProductionNumbers" slot-scope="secondaryProductionNumbers">{{secondaryProductionNumbers}}</span>

        </a-table>
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
            orderId: '设备',
            orderNumber: 'M0001',
            secondaryProductionNumbers:[1,2,3],
        },
        {
            key: '2',
            orderId: '设备',
            orderNumber: 'M0002',
            secondaryProductionNumbers:[1,2,3],
        },
        {
            key: '3',
            orderId: '人员',
            orderNumber: 'H0001',
            secondaryProductionNumbers:[1,2,3],
        },
        {
            key: '4',
            orderId: '人员',
            orderNumber: 'H0002',
            secondaryProductionNumbers:[1,2,3],
        },
    ];

    export default {
        name: "table4",
        data() {
            return {
                data,
                columns,
            };
        },
        methods:{
            rowClassName(record,index) {
                let className = "light-row";
                if (index % 2 === 1) className = "dark-row";
                return className;
            }
        },
        mounted() {
            //请求后端的获取订单-生产单关系表
            //要需要传首尾日期？？？
            this.$axios.get('/orders/productionForm').then(response => {
                console.log("GET请求发出了");
                if (response.data) {
                    console.log("订单-生产单关系表数据:");
                    console.log(response.data);
                    this.data=response.data.data;
                    console.log(response.data.data);
                }
            }).catch(err => {
                alert('订单-生产单关系表请求失败')
            })
        }
    };
</script>


<style>
    .ant-table-thead >tr >th{
        background-color: #c0ccda;
    }
    .light-row {background-color: #fff;}
    .dark-row {background-color: #f2f4f5;}
</style>
<!--<template>-->
<!--    <div>-->
<!--        <h1>2. 订单-生产单关系表</h1>-->
<!--        <a-table :columns="columns" :data-source="data" bordered :rowClassName="rowClassName"></a-table>-->

<!--    </div>-->
<!--</template>-->
<!--<script>-->
<!--    const renderContent = (value) => {-->
<!--        const obj = {-->
<!--            children: value,-->
<!--            attrs: {},-->
<!--        };-->
<!--        return obj;-->
<!--    };-->

<!--    const data = [-->
<!--        {-->
<!--            key: "1",-->
<!--            orderId:"1",-->
<!--            orderNumber: "order1",-->
<!--            secondaryProductionNumbers: "order1-production1",-->
<!--        },-->
<!--        {-->
<!--            key: "2",-->
<!--            orderId:"1",-->
<!--            orderNumber: "order1",-->
<!--            secondaryProductionNumbers: "order1-production2",-->
<!--        },-->
<!--        {-->
<!--            key: "3",-->
<!--            orderId:"1",-->
<!--            orderNumber: "order1",-->
<!--            secondaryProductionNumbers: "order1-production3",-->
<!--        },-->
<!--        {-->
<!--            key: "4",-->
<!--            orderId:"2",-->
<!--            orderNumber: "order2",-->
<!--            secondaryProductionNumbers: "order2-production1",-->
<!--        },-->
<!--        {-->
<!--            key: "5",-->
<!--            orderId:"3",-->
<!--            orderNumber: "order3",-->
<!--            secondaryProductionNumbers: "order3-production1",-->
<!--        },-->
<!--        {-->
<!--            key: "6",-->
<!--            orderId:"3",-->
<!--            orderNumber: "order3",-->
<!--            secondaryProductionNumbers: "order3-production2",-->
<!--        },-->
<!--        {-->
<!--            key: "7",-->
<!--            orderId:"3",-->
<!--            orderNumber: "order3",-->
<!--            secondaryProductionNumbers: "order3-production3",-->
<!--        },-->
<!--    ];-->

<!--    export default {-->
<!--        data() {-->
<!--            return {-->
<!--                data,-->
<!--                columns: [],-->
<!--            };-->
<!--        },-->
<!--        created() {-->
<!--            this.columns = [-->
<!--                {-->
<!--                    title: "订单ID",-->
<!--                    dataIndex: "orderId",-->
<!--                    customRender(_, row) {-->
<!--                        return {-->
<!--                            children: row.orderNumber,-->
<!--                            attrs: {-->
<!--                                rowSpan: row.orderNumberRowSpan,-->
<!--                            },-->
<!--                        };-->
<!--                    },-->
<!--                },-->
<!--                {-->
<!--                    title: "订单号",-->
<!--                    dataIndex: "orderNumber",-->
<!--                    key: "orderNumber",-->
<!--                    //customRender这个函数返回要合并的数据-->
<!--                    customRender(_, row) {-->
<!--                        return {-->
<!--                            children: row.orderNumber,-->
<!--                            attrs: {-->
<!--                                rowSpan: row.orderNumberRowSpan,-->
<!--                            },-->
<!--                        };-->
<!--                    },-->
<!--                },-->
<!--                {-->
<!--                    title: "生产单号",-->
<!--                    dataIndex: "secondaryProductionNumbers",-->
<!--                    key: "secondaryProductionNumbers",-->
<!--                    customRender: renderContent,-->
<!--                },-->
<!--            ];-->
<!--            this.rowSpan("orderNumber");-->
<!--        },-->
<!--        methods: {-->
<!--            // 合并单元格，这里我抽出了一个函数，调用的时候只需要将dataIndex作为参数传入即可-->
<!--            rowSpan(key) {-->
<!--                let arr = this.data-->
<!--                    .reduce((result, item) => {-->
<!--                        if (result.indexOf(item[key]) < 0) {-->
<!--                            result.push(item[key]);-->
<!--                        }-->
<!--                        return result;-->
<!--                    }, [])-->
<!--                    .reduce((result, keys) => {-->
<!--                        const children = this.data.filter((item) => item[key] === keys);-->
<!--                        result = result.concat(-->
<!--                            children.map((item, index) => ({-->
<!--                                ...item,-->
<!--                                [`${key}RowSpan`]: index === 0 ? children.length : 0,-->
<!--                            }))-->
<!--                        );-->
<!--                        return result;-->
<!--                    }, []);-->
<!--                this.data = arr;-->
<!--            },-->
<!--            rowClassName(record,index) {-->
<!--                let className = "light-row";-->
<!--                if (index % 2 === 1) className = "dark-row";-->
<!--                return className;-->
<!--            }-->
<!--        },-->
<!--    };-->
<!--</script>-->

<!--<style>-->
<!--    .light-row {background-color: #fff;}-->
<!--    .dark-row {background-color: #f2f4f5;}-->
<!--</style>-->
