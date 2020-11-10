<template>
    <div>
<!--        <h1>2. 订单-生产单关系表</h1>-->
        <a-button size="small" type="primary" icon="download" @click="exportExcel" style="float:right;margin-right: 10px;background-color: cornflowerblue">导出订单-生产单关系表</a-button>
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
                     :dataSource="parentData.secondOrderList" :rowKey="item => item.id"
                     :locale="{emptyText: '该类别 暂无节点'}"
                     :rowClassName="rowClassName"
            >
                <!--                <template slot="sex" slot-scope="text">{{text || '你是太监吗'}}</template>-->
            </a-table>
        </a-table>
        <!--        <div v-if="!repositoryUrl">loading...</div>-->
        <!--        <div v-else>most star repository is <a :href="repositoryUrl">{{repositoryName}}</a></div>-->
    </div>
</template>

<script>
    import XLSX from "xlsx";
    import FileSaver from "file-saver";

    export default {
        name: "page6",
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
                    pageSize: 5,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["2", "4", "6", "8", "10"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                    // defaultPageSize: 999, hideOnSinglePage: true
                },
                dataGroups: [
                    // {
                    //     orderId: '1',
                    //     orderNumber: '2013',
                    //     secondOrderList: [
                    //         {
                    //             id: '11',
                    //             secondaryProductionNumbers: '2014',
                    //         },
                    //         {
                    //             id: '12',
                    //             secondaryProductionNumbers: '2015',
                    //
                    //         },
                    //         {
                    //             id: '13',
                    //             secondaryProductionNumbers: '2016',
                    //
                    //         },
                    //     ],
                    // },
                    // {
                    //     orderId: '2',
                    //     orderNumber: '2224',
                    //     secondOrderList: [
                    //         {
                    //             id: '21',
                    //             secondaryProductionNumbers: '2017',
                    //         },
                    //         {
                    //             id: '22',
                    //             secondaryProductionNumbers: '2018',
                    //         },
                    //         {
                    //             id: '23',
                    //             secondaryProductionNumbers: '2019',
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
                    }
                ],
                columns: [
                    {
                        title: '二级生产单号',
                        dataIndex: 'secondaryProductionNumbers',
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
                        FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '订单-生产单关系表.xlsx')
                    } catch (e) {
                        if (typeof console !== 'undefined') console.log(e, wbout)
                    }
                    //恢复分页
                    this.pagination.pageSize = 10;
                    this.pagination1.pageSize= 5;
                    return wbout
                })
            },
            turnIntoStandardData(oldData) {
                console.log(oldData);
                for(let i=0;i<oldData.length;i++){
                    let orderId=oldData[i].orderId;
                    let orderNumber=oldData[i].orderNumber;
                    let secondOrderList=oldData[i].secondaryProductionNumbers;
                    // console.log(orderId);
                    // console.log(orderNumber);
                    // console.log(secondOrderList);
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
                for(let i=0;i<this.dataGroups.length;i++){
                    this.tempIDs.push(Number(this.dataGroups[i].orderId));
                }
            }
        },
        mounted() {
            this.$axios.get(this.target+'/orders/productionForm',{
                params:{
                    startDate: "2018/11/19 00:00:00",
                    endDate: "2018/11/21 00:00:00"
                }
            }).then(response => {
                // console.log("GET请求发出了");
                if (response.data) {
                    // console.log("订单-生产单关系表数据:");
                    // console.log(response.data);
                    // this.dataGroups=response.data.data;
                    console.log(response.data.data);
                    this.turnIntoStandardData(response.data.data);
                }
            }).catch(err => {
                alert('订单-生产单关系表请求失败')
            })
        }

    }
</script>

<style scoped>
    .light-row {background-color: #fff;}
    .dark-row {background-color: #f2f4f5;}
</style>