<template>
    <div>
        <h3>修改人员</h3>
        <div id="loadingDiv">
            <a-button type="primary" shape="circle" id="loading" loading/>
        </div>
        <br/>
        <br/>
        <a-table bordered
                 :data-source="dataSource"
                 :columns="columns"
                 :rowKey="item => item.resourceId"
        >
            <template slot="name" slot-scope="text, record">
                <editable-cell :text="text" @change="onCellChange(record.resourceId, 'name', $event)" />
            </template>
            <template slot="workShift" slot-scope="text, record">
                <editable-cell :text="String(text)" @change="onCellChange(record.resourceId, 'workShift', $event)" />
            </template>
            <template slot="manpower" slot-scope="text, record">
                <editable-cell :text="String(text)" @change="onCellChange(record.resourceId, 'manpower', $event)" />
            </template>
            <!--            多选下拉-->
            <!--            工作日期-->
            <template slot="workDate" slot-scope="text, record">
                <a-select
                        mode="multiple"
                        :default-value="dataSource.find(nub => nub.resourceId === record.resourceId).workDate"
                        style="width: 100%"
                        placeholder="请选择工作日期"
                        @change="handleSelectChange($event, record.resourceId,'workDate')"
                >
                    <a-select-option v-for="item in weekDays" :key="item.key">
                        {{item.value}}
                    </a-select-option>
                </a-select>
            </template>

            <template slot="ability" slot-scope="text, record">
                <a-select
                        mode="multiple"
                        :default-value="dataSource.find(nub => nub.resourceId === record.resourceId).ability"
                        style="width: 100%"
                        placeholder="请选择工艺路线"
                        @change="handleSelectChange($event, record.resourceId,'ability')"
                >
                    <a-select-option v-for="item in abilities" :key="item.key">
                        {{item.value}}
                    </a-select-option>
                </a-select>
            </template>

            <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                        v-if="dataSource.length"
                        title="确定删除？"
                        @confirm="() => onDelete(record.resourceId)"
                >
                    <a href="javascript:;">删除</a>
                </a-popconfirm>
            </template>
        </a-table>

        <a-button id="yesModifyStaff" type="primary" style="margin-right: 30px" @click="axiosToBackend">确定</a-button>
        <a-button @click="backToStaffPage">取消</a-button>
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
                        title: '小组ID',
                        dataIndex: 'resourceId',
                        key: 'resourceId',
                        // width: '30%',
                        //下面这行很重要
                        scopedSlots: { customRender: 'resourceId' },
                    },{
                        title: '小组名称',
                        dataIndex: 'name',
                        key: 'name',
                        scopedSlots: { customRender: 'name' },
                    },{
                        title: '工作班次',
                        dataIndex: 'workShift',
                        key: 'workShift',
                        scopedSlots: { customRender: 'workShift' },
                    },{
                        title: '人力数量',
                        dataIndex: 'manpower',
                        key: 'manpower',
                        scopedSlots: { customRender: 'manpower' },
                    },{
                        title: '工作日期',
                        dataIndex: 'workDate',
                        key: 'workDate',
                        scopedSlots: { customRender: 'workDate' },
                    },{
                        title: '工作能力',
                        dataIndex: 'ability',
                        key: 'ability',
                        scopedSlots: { customRender: 'ability' },
                    }, {
                        title: '操作',
                        dataIndex: 'operation',
                        scopedSlots: { customRender: 'operation' },
                    },
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
                    postData[i].date=sDateString;
                    postData[i].category=1;
                    postData[i].manpower=Number(postData[i].manpower);
                    postData[i].workShift=Number(postData[i].workShift);

                }
                console.log(postData);

                document.getElementById("loading").style.display="inline";
                this.$axios.put(this.target+'/resources',
                    {
                        resourceInfoParams:postData
                    },
                ).then(response => {
                    if(response.data){
                        console.log("修改成功");
                        console.log(response);
                        document.getElementById("loading").style.display="none";
                        this.backToStaffPage();
                    }
                }).catch(err => {
                    alert('修改一组人员资源失败');
                })
            },
            //返回查看人员界面
            backToStaffPage(){
                let tempDate= new Date(this.newDate);

                let DateYear=tempDate.getFullYear();
                let DateMonth=tempDate.getMonth()+1;
                let DateDay=tempDate.getDate();
                let DateString="?year="+DateYear+"&month="+DateMonth+"&day="+DateDay;
                //?year=2020&month=11&day=19
                this.$router.replace('/staffPage'+DateString);
            },
            //要把选择的值存进dataSource里
            handleSelectChange(value,key,dataIndex) {
                console.log(`selectedWeekDay ${value}`);
                console.log(key);
                const dataSource = [...this.dataSource];
                const target = dataSource.find(item => item.resourceId === key);
                if (target) {
                    target[dataIndex] = value;
                    this.dataSource = dataSource;
                }
            },
            onCellChange(key, dataIndex, value) {
                const dataSource = [...this.dataSource];
                const target = dataSource.find(item => item.resourceId === key);
                if (target) {
                    target[dataIndex] = value;
                    this.dataSource = dataSource;
                }
            },
            onDelete(key) {
                const dataSource = [...this.dataSource];
                this.dataSource = dataSource.filter(item => item.resourceId !== key);
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
                    document.getElementById("yesModifyStaff").removeAttribute("disabled");
                }else{
                    document.getElementById("yesModifyStaff").setAttribute("disabled","disabled");
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
