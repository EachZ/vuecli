<template>
    <div>
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
                target: 'http://123.57.239.79:3180',
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
            //请求后端的获取生产单-资源关系表
            //要需要传首尾日期？？？
            // console.log("生产单-资源关系表get请求");
            this.$axios.get(this.target+'/resource/productionForm',{
                params:{
                    startDate: "2018/11/20 00:00:00",
                    endDate: "2018/11/26 00:00:00"
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