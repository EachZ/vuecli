<template>
    <div>
        <h1>3. 生产单</h1>
        <a-table :pagination="{defaultPageSize: 999, hideOnSinglePage: true }"
                 :columns="outColumns" :dataSource="dataGroups" :rowKey="item => item.resourceId"
                 :rowClassName="rowClassName"
        >
            <a-table :pagination="{defaultPageSize: 999, hideOnSinglePage: true }"
                     :columns="columns"
                     slot="expandedRowRender" slot-scope="parentData"
                     :dataSource="parentData.productAndTime" :rowKey="item => item.id"
                     :locale="{emptyText: '该类别 暂无节点'}"
                     :rowClassName="rowClassName"
            >
                <!--                <template slot="sex" slot-scope="text">{{text || '你是太监吗'}}</template>-->
            </a-table>
        </a-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataGroups: [
                    {
                        resourceName: '张三',
                        resourceId: '1',
                        productAndTime: [
                            {
                                id: '11',
                                secondaryProductionNumber: 'po',
                                orderId: '21',
                                orderNumber: '2014',
                                startTime: '2014-12-24 23:12:00',
                                endTime: '2014-12-26 21:00:00',
                                materialCoding: '12'
                            },
                            {
                                id: '12',
                                secondaryProductionNumber: 'po',
                                orderId: '21',
                                orderNumber: '2015',
                                startTime: '2015-12-24 23:12:00',
                                endTime: '2015-12-26 21:00:00',
                                materialCoding: '12'
                            },
                            {
                                id: '13',
                                secondaryProductionNumber: 'po',
                                orderId: '21',
                                orderNumber: '2016',
                                startTime: '2016-12-24 23:12:00',
                                endTime: '2016-12-26 21:00:00',
                                materialCoding: '12'
                            },
                        ],
                    },
                    {
                        resourceName: '李四',
                        resourceId: '2',
                        productAndTime: [
                            {
                                id: '21',
                                secondaryProductionNumber: 'po',
                                orderId: '21',
                                orderNumber: '2017',
                                startTime: '2017-12-24 23:12:00',
                                endTime: '2017-12-26 21:00:00',
                                materialCoding: '34'
                            },
                            {
                                id: '22',
                                secondaryProductionNumber: 'po',
                                orderId: '21',
                                orderNumber: '2018',
                                startTime: '2018-12-24 23:12:00',
                                endTime: '2018-12-26 21:00:00',
                                materialCoding: '34'
                            },
                            {
                                id: '23',
                                secondaryProductionNumber: 'po',
                                orderId: '21',
                                orderNumber: '2019',
                                startTime: '2019-12-24 23:12:00',
                                endTime: '2019-12-26 21:00:00',
                                materialCoding: '34'
                            },
                        ],
                    },
                ],
                outColumns: [
                    {
                        title: '资源名称',
                        dataIndex: 'resourceName',
                    }
                ],
                columns: [
                    {
                        title:'二级生产单ID',
                        dataIndex: 'secondaryProductionNumber',
                    },
                    {
                        title: '订单ID',
                        dataIndex: 'orderId'
                    },
                    {
                        title: '订单号',
                        dataIndex: 'orderNumber',
                    }, {
                        title: '开始时间',
                        dataIndex: 'startTime',
                        // scopedSlots: { customRender: 'sex' },
                    }, {
                        title: '结束时间',
                        dataIndex: 'endTime',
                    },{
                        title: '材料编码',
                        dataIndex: 'materialCoding'
                    }
                ],
            }
        },
        methods:{
            rowClassName(record,index) {
                let className = "light-row";
                if (index % 2 === 1) className = "dark-row";
                return className;
            }
        },
        mounted() {
            //请求后端的获取生产单
            //要需要传首尾日期？？？
            console.log("生产单get请求");
            this.$axios.get('/resource/gantt/running',{
                params:{
                    startDate: "2008/11/05 12:00:00",
                    endDate: "2008/11/07 12:00:00"
                }
            }).then(response => {
                // console.log("GET请求发出了");
                if (response.data) {
                    console.log("生产单数据:");
                    console.log(response.data.data);
                    this.dataGroups=response.data.data;
                }
            }).catch(err => {
                alert('生产单请求失败')
            })
        }
    }
</script>


<style>
    .light-row {background-color: #fff;}
    .dark-row {background-color: #f2f4f5;}
</style>