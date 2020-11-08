<template>
    <div>
        <h1>4. 生产单-资源关系表</h1>
        <a-table :columns="columns" :data-source="data" :rowClassName="rowClassName">
<!--            ↓是每一行第一列的内容-->
<!--            <span slot="secondaryProductionNumber" slot-scope="text">{{ text }}</span>-->
<!--            <span slot="customTitle">二级生产单号</span>-->
            <span slot="manpower" slot-scope="manpower">{{manpower}}</span>

        </a-table>
    </div>
</template>

<script>
    //一共有4列
    const columns = [
        //第一列:资源
        {
            title: '二级生产单号',
            dataIndex: 'secondaryProductionNumber',
            key: 'secondaryProductionNumber',
        },
        //第二列:资源名称
        {
            title: '资源名称',
            dataIndex: 'resourceName',
            key: 'resourceName',
        },
        //第三列:人力
        {
            title: '人力',
            key: 'manpower',
            dataIndex: 'manpower',
            scopedSlots: { customRender: 'manpower' },
        },
        //第四列:资源类型
        {
            title: '资源类型',
            dataIndex: 'category',
            key: 'category',
        },

    ];

    //每一行的内容
    const data = [
        {
            key: '1',
            secondaryProductionNumber: '123',
            resourceName: 'line1',
            category: '设备',
            manpower:123,
        },
        {
            key: '2',
            secondaryProductionNumber: '123',
            resourceName: 'line2',
            category: '设备',
            manpower:544,
        },
        {
            key: '3',
            secondaryProductionNumber: '123',
            resourceName: '张三',
            category: '人员',
            manpower:2,
        },
        {
            key: '4',
            secondaryProductionNumber: '123',
            resourceName: '李四',
            category: '人员',
            manpower:5,
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
            //请求后端的获取生产单-资源关系表
            //要需要传首尾日期？？？
            // console.log("生产单-资源关系表get请求");
            this.$axios.get('/resource/productionForm',{
                params:{
                    startDate: "2018/11/19 12:00:00",
                    endDate: "2018/11/21 12:00:00"
                }
            }).then(response => {
                // console.log("GET请求发出了");
                if (response.data) {
                    // console.log("生产单-资源关系表数据:");
                    // console.log(response.data.data);
                    this.data=response.data.data;
                }
            }).catch(err => {
                alert('生产单-资源关系表请求失败');
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