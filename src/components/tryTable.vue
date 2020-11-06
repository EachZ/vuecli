<template>
    <div>
        <h1>实验表格</h1>
        <a-table :pagination="{defaultPageSize: 999, hideOnSinglePage: true }"
                 :columns="outColumns" bordered :dataSource="dataGroups" :rowKey="item => item.groupId"
        >
            <a-table :pagination="{defaultPageSize: 999, hideOnSinglePage: true }"
                     :columns="columns"
                     slot="expandedRowRender" slot-scope="AAAAAAAAAAAA"
                     :dataSource="AAAAAAAAAAAA.groupItem" :rowKey="item => item.pushuserName"
                     :locale="{emptyText: '该类别 暂无节点'}"
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
                        groupName: '张三',
                        groupId: 'abc001',
                        groupItem: [
                            {
                                id: 'aa3r',
                                orderNumber: '2014',
                                startTime: '2014-12-24 23:12:00',
                                endTime: '2014-12-26 21:00:00',
                                completedResourceNumber: '12'
                            },
                            {
                                id: 'sadfv',
                                orderNumber: '2014',
                                startTime: '2014-12-24 23:12:00',
                                endTime: '2014-12-26 21:00:00',
                                completedResourceNumber: '12'
                            },
                            {
                                id: 'adbrb',
                                orderNumber: '2014',
                                startTime: '2014-12-24 23:12:00',
                                endTime: '2014-12-26 21:00:00',
                                completedResourceNumber: '12'
                            },
                        ],
                    },
                    {
                        groupName: '李四',
                        groupId: 'abc002',
                        groupItem: [
                            {
                                id: 'ewtgfc',
                                orderNumber: '2015',
                                startTime: '2015-12-24 23:12:00',
                                endTime: '2015-12-26 21:00:00',
                                completedResourceNumber: '34'
                            },
                            {
                                id: 'adsbvx',
                                orderNumber: '2015',
                                startTime: '2015-12-24 23:12:00',
                                endTime: '2015-12-26 21:00:00',
                                completedResourceNumber: '34'
                            },
                            {
                                id: 'abazx',
                                orderNumber: '2015',
                                startTime: '2015-12-24 23:12:00',
                                endTime: '2015-12-26 21:00:00',
                                completedResourceNumber: '34'
                            },
                        ],
                    },
                ],
                outColumns: [
                    {
                        title: '资源名称',
                        dataIndex: 'groupName',
                    }
                ],
                columns: [
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
            }
        },
    }
</script>
