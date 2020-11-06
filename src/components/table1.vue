<template>
    <div>
        <h1>1. 订单计划表</h1>
        <a-table :pagination="{defaultPageSize: 999, hideOnSinglePage: true }"
                 :columns="outColumns" :dataSource="dataGroups" :rowKey="item => item.orderId"
                 :rowClassName="rowClassName"
        >
            <a-table :pagination="{defaultPageSize: 999, hideOnSinglePage: true }"
                     :columns="columns"
                     slot="expandedRowRender" slot-scope="parentData"
                     :dataSource="parentData.groupItem" :rowKey="item => item.id"
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
                        orderId: '1',
                        orderNumber: '2013',
                        startTime: '2013-12-24 23:12:00',
                        endTime: '2013-12-26 21:00:00',
                        completedResourceNumber: '212',
                        groupItem: [
                            {
                                id: '11',
                                childOrderNumber: '2014',
                                childStartTime: '2014-12-24 23:12:00',
                                childEndTime: '2014-12-26 21:00:00',
                                childCompletedResourceNumber: '12'
                            },
                            {
                                id: '12',
                                childOrderNumber: '2015',
                                childStartTime: '2015-12-24 23:12:00',
                                childEndTime: '2015-12-26 21:00:00',
                                childCompletedResourceNumber: '12'
                            },
                            {
                                id: '13',
                                childOrderNumber: '2016',
                                childStartTime: '2016-12-24 23:12:00',
                                childEndTime: '2016-12-26 21:00:00',
                                childCompletedResourceNumber: '12'
                            },
                        ],
                    },
                    {
                        orderId: '2',
                        orderNumber: '2224',
                        startTime: '2224-12-24 23:12:00',
                        endTime: '2224-12-26 21:00:00',
                        completedResourceNumber: '1322',
                        groupItem: [
                            {
                                id: '21',
                                childOrderNumber: '2017',
                                childStartTime: '2017-12-24 23:12:00',
                                childEndTime: '2017-12-26 21:00:00',
                                childCompletedResourceNumber: '34'
                            },
                            {
                                id: '22',
                                childOrderNumber: '2018',
                                childStartTime: '2018-12-24 23:12:00',
                                childEndTime: '2018-12-26 21:00:00',
                                childCompletedResourceNumber: '34'
                            },
                            {
                                id: '23',
                                childOrderNumber: '2019',
                                childStartTime: '2019-12-24 23:12:00',
                                childEndTime: '2019-12-26 21:00:00',
                                childCompletedResourceNumber: '34'
                            },
                        ],
                    },
                ],
                outColumns: [
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
                        title: '完成资源数',
                        dataIndex: 'completedResourceNumber'
                    }
                ],
                columns: [
                    {
                        title: '子订单号',
                        dataIndex: 'childOrderNumber',
                    }, {
                        title: '子订单开始时间',
                        dataIndex: 'childStartTime',
                        // scopedSlots: { customRender: 'sex' },
                    }, {
                        title: '子订单结束时间',
                        dataIndex: 'childEndTime',
                    },{
                        title: '子订单完成资源数',
                        dataIndex: 'childCompletedResourceNumber'
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
        }
    }
</script>


<style>
    .light-row {background-color: #fff;}
    .dark-row {background-color: #f2f4f5;}
</style>
