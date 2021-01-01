<template>
    <div>
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
        <a-button size="small" type="primary" icon="download" @click="exportExcel" style="float:right;margin-right: 10px;background-color: #42b983;border:none">导出生产单-资源关系表</a-button>
        <div id="loadingDiv">
            <a-button type="primary" shape="circle" id="loading" loading/>
        </div>
        <br/>
        <br/>
        <a-table :columns="columns" :data-source="data" :rowClassName="rowClassName"
                 id="exportXlsx"
                 :pagination="pagination"
        >
<!--            ↓是每一行第一列的内容-->
<!--            <span slot="secondaryProductionNumber" slot-scope="text">{{ text }}</span>-->
<!--            <span slot="customTitle">二级生产单号</span>-->
            <span slot="manpower" slot-scope="manpower">{{manpower}}</span>

        </a-table>
    </div>
</template>

<script>
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    import moment from "moment";
    //一共有4列
    const columns = [
        //第一列:资源
        {
            title: '二级生产单号',
            dataIndex: 'secondaryProductionNumber',
            key: 'secondaryProductionNumber',
        },
        //第二列:资源名称
        {
            title: '资源名称',
            dataIndex: 'resourceName',
            key: 'resourceName',
        },
        //第三列:人力
        {
            title: '资源量',
            key: 'manpower',
            dataIndex: 'manpower',
            scopedSlots: { customRender: 'manpower' },
        },
        //第四列:资源类型
        {
            title: '资源类型',
            dataIndex: 'category',
            key: 'category',
        },

    ];

    //每一行的内容
    const data = [
        // {
        //     key: '1',
        //     secondaryProductionNumber: '123',
        //     resourceName: 'line1',
        //     category: '设备',
        //     manpower:123,
        // },
        // {
        //     key: '2',
        //     secondaryProductionNumber: '123',
        //     resourceName: 'line2',
        //     category: '设备',
        //     manpower:544,
        // },
        // {
        //     key: '3',
        //     secondaryProductionNumber: '123',
        //     resourceName: '张三',
        //     category: '人员',
        //     manpower:2,
        // },
        // {
        //     key: '4',
        //     secondaryProductionNumber: '123',
        //     resourceName: '李四',
        //     category: '人员',
        //     manpower:5,
        // },
    ];

    export default {
        name: "table4",
        data() {
            return {
                target: 'http://172.17.237.22:3180',
                newStartDate: moment(new Date(this.$route.query.year,this.$route.query.month-1,this.$route.query.day)).format("YYYY-MM-DD"),
                newEndDate: moment(new Date(this.$route.query.year,this.$route.query.month-1,this.$route.query.day)).format("YYYY-MM-DD"),
                data,
                columns,
                pagination: {
                    total: 0,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
            };
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

                console.log("table4");
                console.log(sDateString);
                console.log(eDateString);
                this.$axios.get(this.target+'/resource/productionForm',{
                    params:{
                        startDate:sDateString,
                        endDate:eDateString
                        // startDate: "2018/11/20 00:00:00",
                        // endDate: "2018/11/26 00:00:00"
                    }
                }).then(response => {
                    // console.log("GET请求发出了");
                    if (response.data) {
                        // console.log("生产单-资源关系表数据:");
                        // console.log(response.data.data);
                        document.getElementById("loading").style.display="none";
                        this.data=response.data.data;
                    }
                }).catch(err => {
                    alert('生产单-资源关系表请求失败');
                })
            },
            rowClassName(record,index) {
                let className = "light-row";
                if (index % 2 === 1) className = "dark-row";
                return className;
            },
            exportExcel() {
                //取消分页，获取表格全部数据
                this.pagination.pageSize=10000;
                this.$nextTick(function () {
                    //根据给的id获取table表，选取元素的时候加上，{raw:true}可以使表格正常导出，消除科学计数法
                    let wb = XLSX.utils.table_to_book(document.getElementById('exportXlsx'), {
                        raw: true
                    });

                    let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
                    try {
                        //给xlsx文件赋值名字
                        FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '生产单-资源关系表.xlsx')
                    } catch (e) {
                        if (typeof console !== 'undefined') console.log(e, wbout)
                    }
                    //恢复分页
                    this.pagination.pageSize = 10;
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
    };
</script>


<style>
    .ant-table-thead >tr >th{
        background-color: lightsteelblue;
        /*background-color: #b9c2d7;*/
    }
    .light-row {background-color: #fff;}
    .dark-row {background-color: #f2f4f5;}
</style>