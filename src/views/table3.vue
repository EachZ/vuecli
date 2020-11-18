<template>
    <div>
<!--        <h1>3. 生产单</h1>-->
        <div class="block datePick">
            <a-range-picker
                    :placeholder="['开始日期','结束日期']"
                    :value="[newStartDate,newEndDate]"
                    @change="pickDate"
            />
<!--            <span class="demonstration">开始日期 </span>-->
<!--            <a-date-picker-->
<!--                    class="right-pick-btn"-->
<!--                    :clearable="false"-->
<!--                    @change="pickStartDate"-->
<!--                    v-model="newStartDate"-->
<!--                    type="date"-->
<!--                    placeholder="开始日期"-->
<!--            />-->
<!--            <span class="demonstration"> 结束日期 </span>-->
<!--            <a-date-picker-->
<!--                    class="right-pick-btn"-->
<!--                    :clearable="false"-->
<!--                    @change="pickEndDate"-->
<!--                    v-model="newEndDate"-->
<!--                    type="date"-->
<!--                    placeholder="结束日期"-->
<!--            />-->
        </div>
        <a-button size="small" type="primary" icon="download" @click="exportExcel" style="float:right;margin-right: 10px;background-color: #42b983;border:none">导出生产单表</a-button>
        <div id="loadingDiv">
            <a-button type="primary" shape="circle" id="loading" loading/>
        </div>
        <br/>
        <br/>
        <a-table :pagination="pagination"
                 :columns="outColumns"
                 :dataSource="dataGroups"
                 :rowKey="item => item.resourceId"
                 :rowClassName="rowClassName"
                 :defaultExpandedRowKeys="tempIDs"
                 id="exportXlsx"

        >
            <a-table :pagination="pagination1"
                     :columns="columns"
                     slot="expandedRowRender" slot-scope="parentData"
                     :dataSource="parentData.productAndTimeVO" :rowKey="item => item.id"
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
    import moment from "moment";

    export default {
        data() {
            return {
                target: 'http://123.57.239.79:3180',
                newStartDate: moment(new Date(this.$route.query.year,this.$route.query.month-1,this.$route.query.day)).format("YYYY-MM-DD"),
                newEndDate: moment(new Date(this.$route.query.year,this.$route.query.month-1,this.$route.query.day)).format("YYYY-MM-DD"),
                IDs:[],
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
                    pageSize: 2,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["2", "4", "6", "8", "10"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                    // defaultPageSize: 999, hideOnSinglePage: true
                },
                dataGroups: [
                    // {
                    //     resourceName: '张三',
                    //     resourceId: '1',
                    //     productAndTime: [
                    //         {
                    //             id: '11',
                    //             secondaryProductionNumber: 'po',
                    //             orderId: '21',
                    //             orderNumber: '2014',
                    //             startTime: '2014-12-24 23:12:00',
                    //             endTime: '2014-12-26 21:00:00',
                    //             materialCoding: '12'
                    //         },
                    //         {
                    //             id: '12',
                    //             secondaryProductionNumber: 'po',
                    //             orderId: '21',
                    //             orderNumber: '2015',
                    //             startTime: '2015-12-24 23:12:00',
                    //             endTime: '2015-12-26 21:00:00',
                    //             materialCoding: '12'
                    //         },
                    //         {
                    //             id: '13',
                    //             secondaryProductionNumber: 'po',
                    //             orderId: '21',
                    //             orderNumber: '2016',
                    //             startTime: '2016-12-24 23:12:00',
                    //             endTime: '2016-12-26 21:00:00',
                    //             materialCoding: '12'
                    //         },
                    //     ],
                    // },
                    // {
                    //     resourceName: '李四',
                    //     resourceId: '2',
                    //     productAndTime: [
                    //         {
                    //             id: '21',
                    //             secondaryProductionNumber: 'po',
                    //             orderId: '21',
                    //             orderNumber: '2017',
                    //             startTime: '2017-12-24 23:12:00',
                    //             endTime: '2017-12-26 21:00:00',
                    //             materialCoding: '34'
                    //         },
                    //         {
                    //             id: '22',
                    //             secondaryProductionNumber: 'po',
                    //             orderId: '21',
                    //             orderNumber: '2018',
                    //             startTime: '2018-12-24 23:12:00',
                    //             endTime: '2018-12-26 21:00:00',
                    //             materialCoding: '34'
                    //         },
                    //         {
                    //             id: '23',
                    //             secondaryProductionNumber: 'po',
                    //             orderId: '21',
                    //             orderNumber: '2019',
                    //             startTime: '2019-12-24 23:12:00',
                    //             endTime: '2019-12-26 21:00:00',
                    //             materialCoding: '34'
                    //         },
                    //     ],
                    // },
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
            pickDate(date,dateString){
                let that = this;
                that.newStartDate = date[0];
                that.newEndDate = date[1];
                //将选的时间传给后端
                this.axiosDateToBackend();
                document.getElementById("loading").style.display="inline";
            },
            // pickStartDate(date){
            //     let that = this;
            //     that.newStartDate = moment(date).format("YYYY-MM-DD");
            //     //将选的时间传给后端
            //     this.axiosDateToBackend();
            //     document.getElementById("loading").style.display="inline";
            // },
            // pickEndDate(date){
            //     let that = this;
            //     that.newEndDate = moment(date).format("YYYY-MM-DD");
            //     //将选的时间传给后端
            //     this.axiosDateToBackend();
            //     document.getElementById("loading").style.display="inline";
            // },
            axiosDateToBackend(){
                let tempStartDate= new Date(this.newStartDate);
                let tempEndDate= new Date(this.newEndDate);

                let sDateYear=tempStartDate.getFullYear();
                let sDateMonth=tempStartDate.getMonth()+1;
                let sDateDay=tempStartDate.getDate();
                let sDateString=sDateYear+"/"+sDateMonth+"/"+sDateDay+" 00:00:00";

                let eDateYear=tempEndDate.getFullYear();
                let eDateMonth=tempEndDate.getMonth()+1;
                let eDateDay=tempEndDate.getDate();
                let eDateString=eDateYear+"/"+eDateMonth+"/"+eDateDay+" 00:00:00";

                //请求后端的获取生产单
                console.log("生产单get请求");
                this.$axios.get(this.target+'/productionForm',{
                    params:{
                        startDate:sDateString,
                        endDate:eDateString
                        // startDate: "2018/11/20 00:00:00",
                        // endDate: "2018/11/26 00:00:00"
                    }
                }).then(response => {
                    // console.log("GET请求发出了");
                    if (response.data) {
                        console.log("生产单数据:");
                        console.log(response.data.data);
                        document.getElementById("loading").style.display="none";
                        this.dataGroups=response.data.data;

                        for(let i=0;i<this.dataGroups.length;i++){
                            this.tempIDs.push(Number(this.dataGroups[i].resourceId));
                        }
                        // console.log(this.IDs);
                    }
                }).catch(err => {
                    alert('生产单请求失败')
                });
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
                        FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '生产单.xlsx')
                    } catch (e) {
                        if (typeof console !== 'undefined') console.log(e, wbout)
                    }
                    //恢复分页
                    this.pagination.pageSize = 10;
                    this.pagination1.pageSize= 2;
                    return wbout
                })
            },
        },
        mounted() {
            let tempEndDate= new Date(this.newEndDate);

            let eDateYear=tempEndDate.getFullYear();
            let eDateMonth=tempEndDate.getMonth()+1;
            let eDateDay=tempEndDate.getDate()+6;
            let eDateString=eDateYear+"/"+eDateMonth+"/"+eDateDay;
            this.newEndDate=moment(new Date(eDateString)).format("YYYY-MM-DD");
            this.axiosDateToBackend();
        }
    }
</script>


<style>
    .light-row {background-color: #fff;}
    .dark-row {background-color: #f2f4f5;}
</style>