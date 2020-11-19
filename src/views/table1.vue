<template>
    <div>
<!--        <h1>1. 订单计划表</h1>-->
        <a-button size="small" type="primary" icon="download" @click="exportExcel" style="float:right;margin-right: 10px;background-color: #42b983;border:none">导出订单计划表</a-button>
        <div id="loadingDiv">
            <a-button type="primary" shape="circle" id="loading" loading/>
        </div>
        <br/>
        <br/>
        <a-table :pagination=pagination
                 :columns="outColumns" :dataSource="dataGroups" :rowKey="item => item.orderId"
                 :rowClassName="rowClassName"
                 :defaultExpandedRowKeys="tempIDs"
                 id="exportXlsx"
        >
            <a-table :pagination=pagination1
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
    import XLSX from "xlsx";
    import FileSaver from "file-saver";

    export default {
        data() {
            return {
                target: 'http://123.57.239.79:3180',
                tempIDs:[],
                pagination: {
                    total: 0,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                    // defaultPageSize: 999, hideOnSinglePage: true
                },
                pagination1: {
                    total: 0,
                    pageSize: 4,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["2", "4", "6", "8", "10"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                    // defaultPageSize: 999, hideOnSinglePage: true
                },
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
                    //             endTime: '2019-12-26 21:00:0cue0',
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
            },
            exportExcel() {
                //取消分页，获取表格全部数据
                this.pagination.pageSize=this.tempIDs.length;
                this.pagination1.pageSize=10000;
                this.$nextTick(function () {
                    //根据给的id获取table表，选取元素的时候加上，{raw:true}可以使表格正常导出，消除科学计数法
                    let wb = XLSX.utils.table_to_book(document.getElementById('exportXlsx'), {
                        raw: true
                    });

                    let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
                    try {
                        //给xlsx文件赋值名字
                        FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '订单计划表.xlsx')
                    } catch (e) {
                        if (typeof console !== 'undefined') console.log(e, wbout)
                    }
                    //恢复分页
                    this.pagination.pageSize = 10;
                    this.pagination1.pageSize= 5;
                    return wbout
                })
            },
        },
        mounted() {
            //请求后端的获取订单计划表
            console.log("==============订单计划表get请求");
            this.$axios.get(this.target+'/orderScheduleForm').then(response => {
                console.log("GET订单计划表请求发出了");
                if (response.data) {
                    document.getElementById("loading").style.display="none";
                    console.log("订单计划表数据:");
                    // console.log(response.data);
                    this.dataGroups=response.data.data;
                    console.log(this.dataGroups);
                    for(let i=0;i<this.dataGroups.length;i++){
                        this.tempIDs.push(Number(this.dataGroups[i].orderId));
                    }
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
    #loading{
        background-color: crimson;
        border: none;
    }
    #loadingDiv{
        width: 5px;
        height:5px;
        margin: 0 auto;
    }
</style>
