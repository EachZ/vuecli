<template>
    <div>
<!--        <h1>2. 订单-生产单关系表</h1>-->
        <a-table :pagination="{defaultPageSize: 999, hideOnSinglePage: true }"
                 :columns="outColumns" :dataSource="dataGroups" :rowKey="item => item.orderId"
                 :rowClassName="rowClassName"
        >
            <a-table :pagination="{defaultPageSize: 999, hideOnSinglePage: true }"
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
    export default {
        name: "page6",
        data() {
            return {
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
            turnIntoStandardData(oldData) {
                console.log(oldData);
                for(let i=0;i<oldData.length;i++){
                    let orderId=oldData[i].orderId;
                    let orderNumber=oldData[i].orderNumber;
                    let secondOrderList=oldData[i].secondaryProductionNumbers;
                    console.log(orderId);
                    console.log(orderNumber);
                    console.log(secondOrderList);
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
            }
        },
        mounted() {
            this.$axios.get('/orders/productionForm',{
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