<template>
    <div>
        <h3>修改订单</h3>
        <div id="loadingDiv">
            <a-button type="primary" shape="circle" id="loading" loading/>
        </div>
        <br/>
        <br/>
        <a-table bordered
                 :data-source="dataSource"
                 :columns="columns"
                 :rowKey="item => item.orderId"
        >
            <template slot="orderNumber" slot-scope="text, record">
                <editable-cell :text="String(text)" @change="onCellChange(record.orderId, 'orderNumber', $event)" />
            </template>
            <template slot="materialCoding" slot-scope="text, record">
                <editable-cell :text="String(text)" @change="onCellChange(record.orderId, 'materialCoding', $event)" />
            </template>
            <template slot="count" slot-scope="text, record">
                <editable-cell :text="String(text)" @change="onCellChange(record.orderId, 'count', $event)" />
            </template>
            <template slot="deadline" slot-scope="text, record">
                <a-date-picker show-time placeholder="选择时间" :defaultValue="dataSource.find(nub => nub.orderId === record.orderId).deadline" @change="onChange" @ok="onOk(record.orderId,'deadline',$event)" />
            </template>
            <template slot="remainingCount" slot-scope="text, record">
                <editable-cell :text="String(text)" @change="onCellChange(record.orderId, 'remainingCount', $event)" />
            </template>
            <template slot="state" slot-scope="text, record">
                <editable-cell :text="String(text)" @change="onCellChange(record.orderId, 'state', $event)" />
            </template>

            <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                        v-if="dataSource.length"
                        title="确定删除？"
                        @confirm="() => onDelete(record.orderId)"
                >
                    <a href="javascript:;">删除</a>
                </a-popconfirm>
            </template>
            
        </a-table>

        <a-button id="yesModifyOrder" type="primary" style="margin-right: 30px" @click="axiosToBackend">确定</a-button>
        <a-button @click="backToOrderPage">取消</a-button>
    </div>
</template>
<script>
    import EditableCell from '../components/EditableCell'
    import moment from "moment";
    export default {
        components: {
            EditableCell,
        },
        data() {
            return {
                target: 'http://172.17.237.22:3180',
                newDate: moment(new Date(this.$route.query.year,this.$route.query.month-1,this.$route.query.day)).format("YYYY-MM-DD"),
                selectedData:this.$route.query.selectedData,
                value: [],
                weekDays:[
                    {
                        key:1,
                        value:"周一"
                    },{
                        key:2,
                        value:"周二"
                    },{
                        key:3,
                        value:"周三"
                    },{
                        key:4,
                        value:"周四"
                    },{
                        key:5,
                        value:"周五"
                    },{
                        key:6,
                        value:"周六"
                    },{
                        key:7,
                        value:"周日"
                    },
                ],
                abilities:[
                    {
                        key:1,
                        value:"1"
                    },{
                        key:2,
                        value:"2"
                    },{
                        key:3,
                        value:"3"
                    },{
                        key:4,
                        value:"4"
                    },{
                        key:5,
                        value:"5"
                    }
                ],
                dataSource: [
                    // {
                    //     key: '0',
                    //     orderId : 0,
                    //     name: "5组-童玲 (5)",
                    //     workShift: 90,
                    //     manpower: 5,
                    //     category: 1,
                    //     workDate: [ 1, 2, 3, 4, 5 ],
                    //     ability: [ 4, 5, 9 ]
                    // }, {
                    //     key: '1',
                    //     orderId: 0,
                    //     name: "6组-李  倩（4）",
                    //     workShift: 1,
                    //     manpower: 4,
                    //     category: 1,
                    //     workDate: [ 1, 2, 3, 4, 5 ],
                    //     ability: [ 4 ]
                    // }
                ],
                count: 1,
                columns: [
                    {
                        title: '订单ID',
                        dataIndex: 'orderId',
                        key: 'orderId',
                    }, {
                        title: '订单号',
                        dataIndex: 'orderNumber',
                        key: 'orderNumber',
                        scopedSlots: { customRender: 'orderNumber' },
                    },{
                        title: '生产目标编码',
                        dataIndex: 'materialCoding',
                        key: 'materialCoding',
                        scopedSlots: { customRender: 'materialCoding' },
                    },{
                        title: '订单数量',
                        dataIndex: 'count',
                        key: 'count',
                        scopedSlots: { customRender: 'count' },
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
                    }, {
                        title: '操作',
                        dataIndex: 'operation',
                        scopedSlots: { customRender: 'operation' },
                    }
                ],
            };
        },
        methods: {
            //把修改的多组数据传给后端
            axiosToBackend(){
                //要往后端传的数据
                let postData=this.dataSource;

                let tempStartDate= new Date(this.newDate);
                let sDateYear=tempStartDate.getFullYear();
                let sDateMonth=tempStartDate.getMonth()+1;
                let sDateDay=tempStartDate.getDate();
                let sDateString=sDateYear+"-"+sDateMonth+"-"+sDateDay+" 00:00:00";

                for(let i =0;i<postData.length;i++){
                    postData[i].dateParam=sDateString;
                    delete postData[i]["key"];
                }
                console.log(postData);

                document.getElementById("loading").style.display="inline";
                this.$axios.put(this.target+'/orders',
                    {
                        orderParams:postData
                    },
                ).then(response => {
                    if(response.data){
                        console.log("修改成功");
                        console.log(response);
                        document.getElementById("loading").style.display="none";
                        this.backToOrderPage();
                    }
                }).catch(err => {
                    alert('修改一组订单失败');
                })
            },
            //返回查看订单界面
            backToOrderPage(){
                let tempDate= new Date(this.newDate);

                let DateYear=tempDate.getFullYear();
                let DateMonth=tempDate.getMonth()+1;
                let DateDay=tempDate.getDate();
                let DateString="?year="+DateYear+"&month="+DateMonth+"&day="+DateDay;
                //?year=2020&month=11&day=19
                this.$router.replace('/OrderPage'+DateString);
            },
            onChange(value, dateString) {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
            },
            onOk(key, dataIndex, value) {
                const dataSource = [...this.dataSource];
                const target = dataSource.find(item => item.orderId === key);
                if (target) {
                    target[dataIndex] = value.format("YYYY-MM-DD HH:mm:ss");
                    this.dataSource = dataSource;
                }
                console.log("dataSource");
                console.log(this.dataSource);
            },
            //要把选择的值存进dataSource里
            handleSelectChange(value,key,dataIndex) {
                // console.log(`selectedWeekDay ${value}`);
                // console.log(key);
                const dataSource = [...this.dataSource];
                const target = dataSource.find(item => item.orderId === key);
                if (target) {
                    target[dataIndex] = value;
                    this.dataSource = dataSource;
                }
            },
            onCellChange(key, dataIndex, value) {
                const dataSource = [...this.dataSource];
                const target = dataSource.find(item => item.orderId === key);
                if (target) {
                    target[dataIndex] = value;
                    this.dataSource = dataSource;
                }
            },
            onDelete(key) {
                const dataSource = [...this.dataSource];
                this.dataSource = dataSource.filter(item => item.orderId !== key);
            },
        },
        mounted(){
            document.getElementById("loading").style.display="none";
            this.dataSource=this.selectedData;
            this.abilities=[];
            for(let i=1;i<=20;i++){
                let tempJSON={
                    key:i,
                    value:String(i)
                };
                this.abilities.push(tempJSON);
            }
            const timer=window.setInterval(() => {
                if(this.dataSource.length!==0){
                    document.getElementById("yesModifyOrder").removeAttribute("disabled");
                }else{
                    document.getElementById("yesModifyOrder").setAttribute("disabled","disabled");
                }
            }, 980);

            this.$once('hook:beforeDestroy', () => {
                clearInterval(timer);
            })
        }
    };
</script>
<style>
    .editable-cell {
        position: relative;
    }

    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
        padding-right: 24px;
    }

    .editable-cell-text-wrapper {
        padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
    }

    .editable-cell-icon {
        line-height: 18px;
        display: none;
    }

    .editable-cell-icon-check {
        line-height: 28px;
    }

    .editable-cell:hover .editable-cell-icon {
        display: inline-block;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
        color: #108ee9;
    }

    .editable-add-btn {
        margin-bottom: 8px;
    }
</style>
