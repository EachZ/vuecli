<template>
    <div>
<!--        <h1>1. 订单计划表</h1>-->
        <a-table :pagination="{defaultPageSize: 999, hideOnSinglePage: true }"
                 :columns="outColumns" :dataSource="dataGroups" :rowKey="item => item.orderId"
                 :rowClassName="rowClassName"
        >
            <a-table :pagination="{defaultPageSize: 999, hideOnSinglePage: true }"
                     :columns="columns"
                     slot="expandedRowRender" slot-scope="parentData"
                     :dataSource="parentData.orderSchedulesVOList" :rowKey="item => item.id"
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
                    // {
                    //     orderId: '1',
                    //     orderNumber: '2013',
                    //     startTime: '2013-12-24 23:12:00',
                    //     endTime: '2013-12-26 21:00:00',
                    //     count: '212',
                    //     orderSchedulesVOList: [
                    //         {
                    //             id: '11',
                    //             craft: '2014',
                    //             startTime: '2014-12-24 23:12:00',
                    //             endTime: '2014-12-26 21:00:00',
                    //             count: '12'
                    //         },
                    //         {
                    //             id: '12',
                    //             craft: '2015',
                    //             startTime: '2015-12-24 23:12:00',
                    //             endTime: '2015-12-26 21:00:00',
                    //             count: '12'
                    //         },
                    //         {
                    //             id: '13',
                    //             craft: '2016',
                    //             startTime: '2016-12-24 23:12:00',
                    //             endTime: '2016-12-26 21:00:00',
                    //             count: '12'
                    //         },
                    //     ],
                    // },
                    // {
                    //     orderId: '2',
                    //     orderNumber: '2224',
                    //     startTime: '2224-12-24 23:12:00',
                    //     endTime: '2224-12-26 21:00:00',
                    //     count: '1322',
                    //     orderSchedulesVOList: [
                    //         {
                    //             id: '21',
                    //             craft: '2017',
                    //             startTime: '2017-12-24 23:12:00',
                    //             endTime: '2017-12-26 21:00:00',
                    //             count: '34'
                    //         },
                    //         {
                    //             id: '22',
                    //             craft: '2018',
                    //             startTime: '2018-12-24 23:12:00',
                    //             endTime: '2018-12-26 21:00:00',
                    //             count: '34'
                    //         },
                    //         {
                    //             id: '23',
                    //             craft: '2019',
                    //             startTime: '2019-12-24 23:12:00',
                    //             endTime: '2019-12-26 21:00:00',
                    //             count: '34'
                    //         },
                    //     ],
                    // },
                ],
                outColumns: [
                    {
                        title:'订单ID',
                        dataIndex: 'orderId',
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
                        title: '订单数量',
                        dataIndex: 'count'
                    }
                ],
                columns: [
                    {
                        title: '子订单工艺',
                        dataIndex: 'craft',
                    }, {
                        title: '子订单开始时间',
                        dataIndex: 'startTime',
                        // scopedSlots: { customRender: 'sex' },
                    }, {
                        title: '子订单结束时间',
                        dataIndex: 'endTime',
                    },{
                        title: '子订单完成订单数量',
                        dataIndex: 'count'
                    }
                ],
            }
        },
        methods: {
            rowClassName(record,index) {
                let className = "light-row";
                if (index % 2 === 1) className = "dark-row";
                return className;
            }
        },
        mounted() {
            //请求后端的获取订单计划表
            console.log("==============订单计划表get请求");
            this.$axios.get('/orderScheduleForm').then(response => {
                console.log("GET订单计划表请求发出了");
                if (response.data) {
                    console.log("订单计划表数据:");
                    // console.log(response.data);
                    this.dataGroups=response.data.data;
                    console.log(response.data.data);
                }
            }).catch(err => {
                alert('订单计划表请求失败')
            })
        }
    }
</script>


<style>
    .light-row {background-color: #fff;}
    .dark-row {background-color: #f2f4f5;}
</style>
