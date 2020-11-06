<template>
    <div>
        <h1>4. 生产单-资源关系表</h1>
        <a-table :columns="columns" :data-source="data" :rowClassName="rowClassName">
<!--            ↓是每一行第一列的内容-->
            <span slot="resource" slot-scope="text">{{ text }}</span>
            <span slot="customTitle">资源</span>
            <span slot="manpower" slot-scope="manpower">{{manpower}}</span>

        </a-table>
    </div>
</template>

<script>
    //一共有4列
    const columns = [
        //第一列:资源
        {
            dataIndex: 'resource',
            key: 'resource',
            slots: { title: 'customTitle' },
            scopedSlots: { customRender: 'resource' },
        },
        //第二列:资源种类
        {
            title: '资源种类',
            dataIndex: 'resourceSort',
            key: 'resourceSort',
        },
        //第三列:资源编号
        {
            title: '资源编号',
            dataIndex: 'resourceNumber',
            key: 'resourceNumber',
        },
        //第四列:人力???
        {
            title: '人力',
            key: 'manpower',
            dataIndex: 'manpower',
            scopedSlots: { customRender: 'manpower' },
        },
    ];

    //每一行的内容
    const data = [
        {
            key: '1',
            resource: 'line1',
            resourceSort: '设备',
            resourceNumber: 'M0001',
            manpower:123,
        },
        {
            key: '2',
            resource: 'line2',
            resourceSort: '设备',
            resourceNumber: 'M0002',
            manpower:544,
        },
        {
            key: '3',
            resource: '张三',
            resourceSort: '人员',
            resourceNumber: 'H0001',
            manpower:2,
        },
        {
            key: '4',
            resource: '李四',
            resourceSort: '人员',
            resourceNumber: 'H0002',
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