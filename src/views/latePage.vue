<template>
    <div>
        <span>订单ID:<b>{{orderId}}</b> | </span>
        <span>订单号:<b>{{orderNumber}}</b> | </span>
        <span>限制在<b>{{delayStep}}</b>步骤 | </span>
        <span>物料编码:<b>{{materialCoding}}</b> | </span>
        <span>步骤名称:<b>{{craft}}</b> | </span>
        <span>订单数量:<b>{{count}}</b> | </span>
        <span>交期:<b>{{deadline}}</b></span>
        <a-button size="small" type="primary" icon="download" @click="exportExcel" style="float:right;margin-right: 10px;background-color: #42b983;border:none">导出延期分析表</a-button>
        <div id="loadingDiv">
            <a-button type="primary" shape="circle" id="loading" loading/>
        </div>
        <br/>
        <br/>
        <a-table :pagination=pagination
                 :columns="outColumns" :dataSource="dataGroups" :rowKey="item => item.id"
                 :rowClassName="rowClassName"
                 :defaultExpandedRowKeys="tempIDs"
                 id="exportXlsx"
        >
            <a-table :pagination=pagination1
                     :columns="columns"
                     slot="expandedRowRender" slot-scope="parentData"
                     :dataSource="parentData.reasonInfo" :rowKey="item => item.id"
                     :locale="{emptyText: '该类别 暂无节点'}"
                     :rowClassName="rowClassName"
            >
            </a-table>
        </a-table>
    </div>
</template>

<script>
    import XLSX from "xlsx";
    import FileSaver from "file-saver";

    export default {
        name: "latePage",
        data() {
            return {
                target: 'http://172.17.237.22:3180',
                name:window.location.href.split("=")[1].split("&")[0],
                // name:100002,
                year:window.location.href.split("=")[2].split("&")[0],
                month:window.location.href.split("=")[3].split("&")[0],
                day:window.location.href.split("=")[4],
                tempIDs:[],
                orderId:0,
                orderNumber: window.location.href.split("=")[1].split("&")[0],
                delayStep: 0,
                materialCoding: "",
                craft: "",
                count: "",
                deadline: "",
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
                    pageSizeOptions: ["1", "5", "10", "15"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                    // defaultPageSize: 999, hideOnSinglePage: true
                },
                dataGroups: [],
                outColumns: [
                    {
                        title: '资源ID',
                        dataIndex: 'resourceId',
                    }, {
                        title: '资源名称',
                        dataIndex: 'name',
                    }
                    // ,{
                    //     title: '做了哪些订单',
                    //     dataIndex: 'orderIdList'
                    // },{
                    //     title: '原因',
                    //     dataIndex: 'reasonList'
                    // }
                ],
                columns: [
                    {
                        title: '订单',
                        dataIndex: 'orderId'
                    },{
                        title: '原因',
                        dataIndex: 'reason'
                    }
                ],
            };
        },
        methods:{
            axiosDateToBackend(){

                let sDateString=this.year+"/"+this.month+"/"+this.day+" 00:00:00";


                //请求后端的获取订单计划表
                this.$axios.get(this.target+'/order/delay',{
                    params:{
                        orderNumber:Number(this.name),
                        currentDate: sDateString,
                    }
                }).then(response => {
                    if (response.data) {
                        document.getElementById("loading").style.display="none";
                        console.log(response.data.data);
                        if(response.data.data!==null) {
                            this.orderId = response.data.data.orderId;
                            this.orderNumber = response.data.data.orderNumber;
                            this.delayStep = response.data.data.delayStep;
                            this.materialCoding = response.data.data.materialCoding;
                            this.craft = response.data.data.craft;
                            this.count = response.data.data.count;
                            this.deadline = response.data.data.deadline;

                            this.dataGroups = response.data.data.orderDelayReportItemVOList;
                            for (let i = 0; i < this.dataGroups.length; i++) {
                                let reasonInfo = [];
                                for (let j = 0; j < this.dataGroups[i].orderIdList.length; j++) {
                                    let tempJSON = {
                                        orderId: this.dataGroups[i].orderIdList[j],
                                        reason: this.dataGroups[i].reasonList[j]
                                    };
                                    reasonInfo.push(tempJSON);
                                }
                                this.dataGroups[i]["reasonInfo"] = reasonInfo;
                            }
                            console.log(this.dataGroups);
                        }
                    }
                }).catch(err => {
                    alert('请求延期分析失败')
                })
            },
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
                        FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '延期分析表.xlsx')
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
        mounted(){
            this.axiosDateToBackend();
        }
    }
</script>

<style scoped>

</style>