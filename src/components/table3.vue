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
                        resourceName: '张三',
                        resourceId: '1',
                        groupItem: [
                            {
                                id: '11',
                                orderNumber: '2014',
                                startTime: '2014-12-24 23:12:00',
                                endTime: '2014-12-26 21:00:00',
                                completedResourceNumber: '12'
                            },
                            {
                                id: '12',
                                orderNumber: '2015',
                                startTime: '2015-12-24 23:12:00',
                                endTime: '2015-12-26 21:00:00',
                                completedResourceNumber: '12'
                            },
                            {
                                id: '13',
                                orderNumber: '2016',
                                startTime: '2016-12-24 23:12:00',
                                endTime: '2016-12-26 21:00:00',
                                completedResourceNumber: '12'
                            },
                        ],
                    },
                    {
                        resourceName: '李四',
                        resourceId: '2',
                        groupItem: [
                            {
                                id: '21',
                                orderNumber: '2017',
                                startTime: '2017-12-24 23:12:00',
                                endTime: '2017-12-26 21:00:00',
                                completedResourceNumber: '34'
                            },
                            {
                                id: '22',
                                orderNumber: '2018',
                                startTime: '2018-12-24 23:12:00',
                                endTime: '2018-12-26 21:00:00',
                                completedResourceNumber: '34'
                            },
                            {
                                id: '23',
                                orderNumber: '2019',
                                startTime: '2019-12-24 23:12:00',
                                endTime: '2019-12-26 21:00:00',
                                completedResourceNumber: '34'
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
        methods:{
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