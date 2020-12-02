<template>
    <div>
        <div>
            <a-button size="small" type="primary" icon="plus" @click="goToAddPage" style="background-color: #42b983;border:none;margin-right: 20px">新增订单</a-button>
            <a-button size="small" type="primary" icon="edit" :disabled="!hasSelected" @click="goToModifyPage" style="background-color: #42b983;border:none;margin-right: 20px">修改订单</a-button>
            <a-button size="small" type="primary" icon="minus" :disabled="!hasSelected" @click="goToDeletePage" style="background-color: #42b983;border:none">删除订单</a-button>

            <!--            <collection-create-form-->
            <!--                    ref="collectionForm"-->
            <!--                    :visible="visible"-->
            <!--                    @cancel="handleCancel"-->
            <!--                    @create="handleCreate"-->
            <!--            />-->
        </div>
        <div style="margin-bottom: 16px;margin-left: 10px;float: left">
            <a-button size="small" type="primary" style="background-color: #e86680;border:none" :disabled="!hasSelected" :loading="loading" @click="start">
                重置
            </a-button>
            <span style="margin-left: 8px">
                <template v-if="hasSelected">
                  {{ `已选择 ${selectedRowKeys.length} 个订单` }}
                </template>
             </span>
        </div>
        <a-button size="small" type="primary" icon="download" @click="exportExcel" style="float:right;margin-right: 10px;background-color: #42b983;border:none">导出订单表</a-button>
        <div id="loadingDiv">
            <a-button type="primary" shape="circle" id="loading" loading/>
        </div>
        <br/>
        <br/>

        <a-table :columns="columns" :data-source="data" :rowClassName="rowClassName"
                 :rowKey="item => item.orderId"
                 id="exportXlsx"
                 :pagination="pagination"
                 :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"

        >
            <!--            ↓是每一行第一列的内容-->
            <!--            <span slot="secondaryProductionNumber" slot-scope="text">{{ text }}</span>-->
            <!--            <span slot="customTitle">二级生产单号</span>-->
            <!--            <span slot="manpower" slot-scope="manpower">{{manpower}}</span>-->
        </a-table>
        <!--        <ModifyStaffPage :selectedData="selectedData"/>-->
        <!--        <DeleteStaffPage :selectedData="selectedData"/>-->

    </div>
</template>

<script>
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    import moment from "moment";
    const columns = [
        {
            title: '订单ID',
            dataIndex: 'orderId',
            key: 'orderId',
        }, {
            title: '订单号',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },{
            title: '生产目标编码',
            dataIndex: 'materialCoding',
            key: 'materialCoding',
        },{
            title: '订单数量',
            dataIndex: 'count',
            key: 'count',
        },{
            title: '订单状态',
            dataIndex: 'state',
            key: 'state',
            scopedSlots: { customRender: 'state' },
        },{
            title: '交期',
            dataIndex: 'deadline',
            key: 'deadline',
            scopedSlots: { customRender: 'deadline' },
        },{
            title: '剩余各个步骤数量',
            dataIndex: 'remainingCount',
            key: 'remainingCount',
            scopedSlots: { customRender: 'remainingCount' },
        }
    ];

    //每一行的内容
    const data = [
    ];

    // import CollectionCreateForm from '../components/CollectionCreateForm'

    // import ModifyStaffPage from './modifyStaffPage'
    // import DeleteStaffPage from './deleteStaffPage'

    export default {
        // components: { CollectionCreateForm },
        // components:{},
        name: "orderPage",
        data() {
            return {
                target: 'http://123.57.239.79:3180',
                data,
                columns,
                selectedRowKeys: [], // Check here to configure the default column
                //被选中的行的数据
                selectedData:[],
                loading: false,
                visible: false,
                newDate: moment(new Date(this.$route.query.year,this.$route.query.month-1,this.$route.query.day)).format("YYYY-MM-DD"),
                pagination: {
                    total: 0,
                    pageSize: 10,//每页中显示10条数据
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
                    showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
                },
            };
        },
        computed: {
            hasSelected() {
                return this.selectedRowKeys.length > 0;
            },
        },
        methods:{
            start() {
                this.loading = true;
                // ajax request after empty completing
                setTimeout(() => {
                    this.loading = false;
                    this.selectedRowKeys = [];
                }, 1000);
            },
            onSelectChange(selectedRowKeys) {
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
                this.selectedData=[];
                for(let i=0;i<selectedRowKeys.length;i++){
                    let temp;
                    for(let j=0;j<this.data.length;j++){
                        if(selectedRowKeys[i]===this.data[j].orderId){
                            temp=this.data[j];
                            break;
                        }
                    }
                    this.selectedData.push(temp);
                }
                console.log('selectedData: ', this.selectedData)
            },
            goToAddPage(){
                let tempDate= new Date(this.newDate);

                let DateYear=tempDate.getFullYear();
                let DateMonth=tempDate.getMonth()+1;
                let DateDay=tempDate.getDate();
                let DateString="?year="+DateYear+"&month="+DateMonth+"&day="+DateDay;
                //?year=2020&month=11&day=19
                this.$router.replace('/addOrderPage'+DateString);
            },
            goToModifyPage(){
                let tempDate= new Date(this.newDate);

                let DateYear=tempDate.getFullYear();
                let DateMonth=tempDate.getMonth()+1;
                let DateDay=tempDate.getDate();
                // let DateString="?year="+DateYear+"&month="+DateMonth+"&day="+DateDay;
                //?year=2020&month=11&day=19
                // this.$router.replace('/modifyStaffPage'+DateString);
                this.$router.replace({path:'/modifyOrderPage',query:{
                        year:DateYear,
                        month:DateMonth,
                        day:DateDay,
                        selectedData:this.selectedData
                    }});
            },
            goToDeletePage(){
                let tempDate= new Date(this.newDate);

                let DateYear=tempDate.getFullYear();
                let DateMonth=tempDate.getMonth()+1;
                let DateDay=tempDate.getDate();
                // let DateString="?year="+DateYear+"&month="+DateMonth+"&day="+DateDay;
                //?year=2020&month=11&day=19
                // this.$router.replace('/deleteStaffPage'+DateString);

                this.$router.replace({path:'/deleteOrderPage',query:{
                        year:DateYear,
                        month:DateMonth,
                        day:DateDay,
                        selectedData:this.selectedData
                    }});
            },
            axiosDateToBackend(){
                this.$axios.get(this.target+'/orders').then(response => {
                    if (response.data) {
                        document.getElementById("loading").style.display="none";
                        this.data=response.data.data;
                        for(let i=0;i<this.data.length;i++){
                            this.data[i].deadline = moment(new Date(this.data[i].deadline)).format("YYYY/MM/DD HH:mm:ss");
                        }
                    }
                }).catch(err => {
                    alert('请求失败');
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
                        FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '订单表.xlsx')
                    } catch (e) {
                        if (typeof console !== 'undefined') console.log(e, wbout)
                    }
                    //恢复分页
                    this.pagination.pageSize = 10;
                    return wbout
                })
            },
            showModal() {
                this.visible = true;
            },
            handleCancel() {
                this.visible = false;
            },
            handleCreate() {
                const form = this.$refs.collectionForm.form;
                form.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    console.log('Received values of form: ', values);
                    form.resetFields();
                    this.visible = false;
                });
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