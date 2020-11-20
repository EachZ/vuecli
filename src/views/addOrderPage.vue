<template>
    <div>
        <a-button size="small" type="primary" icon="plus" @click="handleAdd" style="background-color: #42b983;border:none">新增订单</a-button>
        <br/>
        <br/>
        <a-table bordered
                 :data-source="dataSource"
                 :columns="columns"
                 :rowKey="item => item.key"
        >
            <template slot="orderNumber" slot-scope="text, record">
                <editable-cell :text="text" @change="onCellChange(record.key, 'orderNumber', $event)" />
            </template>
            <template slot="materialCoding" slot-scope="text, record">
                <editable-cell :text="String(text)" @change="onCellChange(record.key, 'materialCoding', $event)" />
            </template>
            <template slot="count" slot-scope="text, record">
                <editable-cell :text="String(text)" @change="onCellChange(record.key, 'count', $event)" />
            </template>
            <template slot="deadline" slot-scope="text, record">
                <editable-cell :text="String(text)" @change="onCellChange(record.key, 'deadline', $event)" />
            </template>
            <template slot="remainingCount" slot-scope="text, record">
                <editable-cell :text="String(text)" @change="onCellChange(record.key, 'remainingCount', $event)" />
            </template>
            <template slot="state" slot-scope="text, record">
                <editable-cell :text="String(text)" @change="onCellChange(record.key, 'state', $event)" />
            </template>

            <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                        v-if="dataSource.length"
                        title="确定删除？"
                        @confirm="() => onDelete(record.key)"
                >
                    <a href="javascript:;">删除</a>
                </a-popconfirm>
            </template>
        </a-table>

        <a-button type="primary" style="margin-right: 30px" @click="axiosToBackend">确定</a-button>
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
                newDate: moment(new Date(this.$route.query.year,this.$route.query.month-1,this.$route.query.day)).format("YYYY-MM-DD"),
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
                    },{
                        key:6,
                        value:"6"
                    },{
                        key:7,
                        value:"7"
                    },
                ],
                dataSource: [
                    // {
                    //     key: '0',
                    //     resourceId : 0,
                    //     name: "5组-童玲 (5)",
                    //     workShift: 90,
                    //     manpower: 5,
                    //     category: 1,
                    //     workDate: [ 1, 2, 3, 4, 5 ],
                    //     ability: [ 4, 5, 9 ]
                    // }, {
                    //     key: '1',
                    //     resourceId: 0,
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
            //把新增的多组数据传给后端
            axiosToBackend(){
                console.log(this.dataSource);
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
            //要把选择的值存进dataSource里
            handleSelectChange(value,key,dataIndex) {
                console.log(`selectedWeekDay ${value}`);
                console.log(key);
                const dataSource = [...this.dataSource];
                const target = dataSource.find(item => item.key === key);
                if (target) {
                    target[dataIndex] = value;
                    this.dataSource = dataSource;
                }
            },
            onCellChange(key, dataIndex, value) {
                const dataSource = [...this.dataSource];
                const target = dataSource.find(item => item.key === key);
                if (target) {
                    target[dataIndex] = value;
                    this.dataSource = dataSource;
                }
            },
            onDelete(key) {
                const dataSource = [...this.dataSource];
                this.dataSource = dataSource.filter(item => item.key !== key);
            },
            handleAdd() {
                const { count, dataSource } = this;
                const newData = {
                    key: count,
                    orderId: 0,
                    orderNumber: 0,
                    materialCoding: "",
                    count: 0,
                    state:0,
                    deadline: "",
                    remainingCount: "",
                };
                this.dataSource = [...dataSource, newData];
                this.count = count + 1;
            },
        },
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
