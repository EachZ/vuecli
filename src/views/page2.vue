<template>
    <div>
        <!--        <a-button @click="freshPage">返回</a-button>-->
        <div id="high">
            <highcharts :options="chartOptions" :highcharts="hcInstance"></highcharts>
        </div>
        <!--        <div>-->
        <!--            <img alt="Vue logo" src="../assets/logo.png">-->
        <!--        </div>-->
    </div>

</template>

<script>
    import Highcharts from 'highcharts'
    export default {
        name: "page2",
        data(){
            return{
                //可以用于处理的数据
                standardData:[],
                //甘特图实例？？
                hcInstance: Highcharts,
                //甘特图渲染选项
                chartOptions:{},
                //纵坐标数据，存放资源名
                categoryData:[],
                //图例数据，存放产品名
                productionsData:[],
                //后端提供的json数据
                providedData:
                    [
                        // {
                        //     productionOrderNumber: "Production1",
                        //     resourceName: "5组-童玲",
                        //     resourceId: 1,
                        //     productAndTime: [
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 12:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-05 12:00:00",
                        //             endTime: "2008-11-05 13:00:00",
                        //             orderId: 36,
                        //             orderNumber: 764098
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 13:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-05 13:00:00",
                        //             endTime: "2008-11-05 14:00:00",
                        //             orderId: 36,
                        //             orderNumber: 764098
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 14:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-05 14:00:00",
                        //             endTime: "2008-11-05 15:00:00",
                        //             orderId: 36,
                        //             orderNumber: 764098
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 15:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-05 15:00:00",
                        //             endTime: "2008-11-05 16:00:00",
                        //             orderId: 36,
                        //             orderNumber: 764098
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 16:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 16:00:00",
                        //             endTime: "2008-11-05 17:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 17:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 17:00:00",
                        //             endTime: "2008-11-05 18:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 18:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 18:00:00",
                        //             endTime: "2008-11-05 19:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-06 07:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-06 07:00:00",
                        //             endTime: "2008-11-06 08:00:00",
                        //             orderId: 75,
                        //             orderNumber: 762485
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-06 08:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-06 08:00:00",
                        //             endTime: "2008-11-06 09:00:00",
                        //             orderId: 75,
                        //             orderNumber: 762485
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-06 09:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-06 09:00:00",
                        //             endTime: "2008-11-06 10:00:00",
                        //             orderId: 75,
                        //             orderNumber: 762485
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-06 10:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-06 10:00:00",
                        //             endTime: "2008-11-06 11:00:00",
                        //             orderId: 75,
                        //             orderNumber: 762485
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-06 11:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-06 11:00:00",
                        //             endTime: "2008-11-06 12:00:00",
                        //             orderId: 75,
                        //             orderNumber: 762485
                        //         }
                        //     ]
                        // },
                        // {
                        //     productionOrderNumber: "Production1",
                        //     resourceName: "6组-李  倩（4）",
                        //     resourceId: 1,
                        //     productAndTime: [
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 12:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-05 12:00:00",
                        //             endTime: "2008-11-05 13:00:00",
                        //             orderId: 36,
                        //             orderNumber: 764098
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 13:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-05 13:00:00",
                        //             endTime: "2008-11-05 14:00:00",
                        //             orderId: 36,
                        //             orderNumber: 764098
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 14:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-05 14:00:00",
                        //             endTime: "2008-11-05 15:00:00",
                        //             orderId: 36,
                        //             orderNumber: 764098
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 15:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-05 15:00:00",
                        //             endTime: "2008-11-05 16:00:00",
                        //             orderId: 36,
                        //             orderNumber: 764098
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 16:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 16:00:00",
                        //             endTime: "2008-11-05 17:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 17:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 17:00:00",
                        //             endTime: "2008-11-05 18:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-05 18:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 18:00:00",
                        //             endTime: "2008-11-05 19:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-06 07:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-06 07:00:00",
                        //             endTime: "2008-11-06 08:00:00",
                        //             orderId: 75,
                        //             orderNumber: 762485
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-06 08:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-06 08:00:00",
                        //             endTime: "2008-11-06 09:00:00",
                        //             orderId: 75,
                        //             orderNumber: 762485
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-06 09:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-06 09:00:00",
                        //             endTime: "2008-11-06 10:00:00",
                        //             orderId: 75,
                        //             orderNumber: 762485
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-06 10:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-06 10:00:00",
                        //             endTime: "2008-11-06 11:00:00",
                        //             orderId: 75,
                        //             orderNumber: 762485
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_1_2008-11-06 11:00:00.0",
                        //             materialCoding: "3209248",
                        //             startTime: "2008-11-06 11:00:00",
                        //             endTime: "2008-11-06 12:00:00",
                        //             orderId: 75,
                        //             orderNumber: 762485
                        //         }
                        //     ]
                        // },
                        // {
                        //     productionOrderNumber: "Production2",
                        //     resourceName: "6组-李  倩（4）",
                        //     resourceId: 2,
                        //     productAndTime: [
                        //         {
                        //             secondaryProductionNumber: "production_2_2008-11-05 19:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 18:00:00",
                        //             endTime: "2008-11-05 20:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_2_2008-11-05 20:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 20:00:00",
                        //             endTime: "2008-11-05 21:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_2_2008-11-05 21:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 21:00:00",
                        //             endTime: "2008-11-05 22:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_2_2008-11-05 22:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 22:00:00",
                        //             endTime: "2008-11-05 23:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_2_2008-11-05 23:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 23:00:00",
                        //             endTime: "2008-11-06 00:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         }
                        //     ]
                        // },
                        // {
                        //     productionOrderNumber: "Production3",
                        //     resourceName: "7组-黄娣（4）",
                        //     resourceId: 3,
                        //     productAndTime: [
                        //         {
                        //             secondaryProductionNumber: "production_3_2008-11-05 16:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 16:00:00",
                        //             endTime: "2008-11-05 17:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_3_2008-11-05 17:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 17:00:00",
                        //             endTime: "2008-11-05 18:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         },
                        //         {
                        //             secondaryProductionNumber: "production_3_2008-11-05 18:00:00.0",
                        //             materialCoding: "3059786",
                        //             startTime: "2008-11-05 18:00:00",
                        //             endTime: "2008-11-05 19:00:00",
                        //             orderId: 74,
                        //             orderNumber: 417174
                        //         }
                        //     ]
                        // }
                    ],
                colors: ['#058DC7',
                    '#50B432',
                    '#ED561B',
                    '#DDDF00',
                    '#24CBE5',
                    '#64E572',
                    '#FF9655',
                    '#FFF263',
                    '#6AF9C4'
                ],


                /////
            }
        },
        methods: {
            //刷新页面
            freshPage(){
                window.location.reload();
            },
            //将后端传回来的数据providedData转为渲染甘特图需要的标准数据
            turnIntoStandardData(oldData){
                console.log("后端传过来的数据:");
                console.log(oldData);
                //提取所有资源
                this.categoryData=[];
                for(let i=0;i<oldData.length;i++){
                    //不存放重复资源名
                    if(this.categoryData.indexOf(oldData[i].resourceName)===-1){
                        this.categoryData.push(oldData[i].resourceName);
                    }
                }
                console.log(this.categoryData);

                //提取所有产品
                this.productionsData=[];
                for(let i=0;i<oldData.length;i++){
                    //不存放重复产品名
                    if(this.productionsData.indexOf(oldData[i].productionOrderNumber)===-1){
                        this.productionsData.push(oldData[i].productionOrderNumber);
                    }
                }
                console.log(this.productionsData);

                //存放最终的标准数据中的productionList
                let finalDataArr=[];
                for(let i=0;i<this.productionsData.length;i++){
                    //产品名
                    let pName=this.productionsData[i];
                    let jsonArr=[];
                    for(let j=0;j<oldData.length;j++){
                        if(oldData[j].productionOrderNumber===pName){
                            //资源名
                            let rName=oldData[j].resourceName;
                            //资源名对应下标
                            let rIndex=this.categoryData.indexOf(rName);
                            //原始数据里最里面的数组
                            let ptArr=oldData[j].productAndTime;
                            for(let k=0;k<ptArr.length;k++){
                                let sTime=ptArr[k].startTime;
                                let eTime=ptArr[k].endTime;
                                let tempJSON={
                                    startTime: sTime,
                                    endTime: eTime,
                                    resourceIndex: rIndex
                                };
                                jsonArr.push(tempJSON);
                            }
                        }
                    }
                    let tempJSON={
                        productionName: pName,
                        timeList: jsonArr
                    };
                    console.log(tempJSON);
                    finalDataArr.push(tempJSON);
                }

                // console.log("finalDataArr:");
                // console.log(finalDataArr);

                this.standardData=finalDataArr;
            },
            handleStandardData(data){
                console.log("标准化数据为");
                console.log(data);
                //有多少产品就有多少颜色
                let colors=this.colors;

                let mySeries=[];

                for(let i=0;i<data.length;i++){
                    let pName=data[i].productionName;
                    let tList=data[i].timeList;
                    let dataArr=[];
                    for(let j=0;j<tList.length;j++){
                        let rIndex=tList[j].resourceIndex;
                        let sTime=new Date(tList[j].startTime);
                        let eTime=new Date(tList[j].endTime);
                        let tempDataJSON={
                            //童玲，产品1开始日期
                            x: Date.UTC(sTime.getFullYear(), sTime.getMonth(), sTime.getDate(),sTime.getHours(),sTime.getMinutes(),sTime.getSeconds()),
                            //童玲，产品1结束日期
                            x2: Date.UTC(eTime.getFullYear(), eTime.getMonth(), eTime.getDate(),eTime.getHours(),eTime.getMinutes(),eTime.getSeconds()),
                            // x2: Date.UTC(2008, 11, 5,13,0,0),
                            //y: 0表示是童玲
                            y: rIndex,
                            color:colors[i],
                        };
                        dataArr.push(tempDataJSON);
                    }
                    let tempSeriesJSONs={
                        name: pName,
                        borderRadius: 0,
                        pointWidth: 5,
                        data:dataArr
                    };
                    mySeries.push(tempSeriesJSONs);
                }


                let chartO={
                    chart: {
                        type: 'xrange',
                    },
                    title: {
                        text: '资源甘特图'
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            day: '%Y-%m-%d %H:%M:%S',
                        }
                    },
                    yAxis: {
                        title: '资源名',
                        categories:this.categoryData,
                        labels:{
                            step:1,
                            rotation: -45,
                            style: {
                                // color: '#19a0f5',//颜色bai
                                fontSize:'4px'  //字体du
                            }
                        },
                        // gridLineWidth:10,
                        // min: 0,
                        // max: 2
                    },
                    legend: {
                        // align: 'left', //水平方向位置
                        // verticalAlign: 'bottom', //垂直方向位置
                        // x: 0, //距离x轴的距离
                        // y: 0,//距离Y轴的距离
                        // labelFormatter: function() { return this.name+"xx"; },
                        itemHiddenStyle: {
                            color: 'white',
                        },
                        // itemHoverStyle: {
                        //     color: 'black'
                        // },
                        // itemStyle: {
                        //     color: ['grey'],
                        // },
                        // backgroundColor:'black',
                        // floating:true,
                    },
                    colors: this.colors,
                    series: mySeries,
                    plotOptions: {
                        series: {
                            events: {
                                legendItemClick: function(e) {
                                    /*
                                    * 默认实现是显示或隐藏当前数据列，e 代表事件， this 为当前数据列
                                     */
                                    let index = this.index;

                                    let series = this.chart.series;

                                    console.log(index);
                                    console.log(series);

                                    console.log(series[index].visible);

                                    if (series[index].visible) {

                                        for (let i = 0; i < series.length; i++) {

                                            let s = series[i];

                                            i === index ? s.show() : s.hide();
                                        }
                                    }

                                    return false;

                                    // console.log(this);
                                    // let series = mySeries;
                                    // let count = 0;
                                    // console.log(this.visible);
                                    // this.setVisible(!this.visible);
                                    // console.log(this.visible);
                                    // for(let i=0;i<series.length;i++) {
                                    //     // if(series[i].visible) {
                                    //     console.log(series[i].visible);
                                    //     // series[i].setVisible(series[i].visible);
                                    //     console.log(series[i].visible);
                                    //
                                    //     // }
                                    // }
                                    // console.log(series);
                                    // 计算图例点击事件执行后的数量
                                    // if(this.visible) {
                                    //     this.setVisible(false);
                                    // } else {
                                    //     this.setVisible(true);
                                    // }
                                }
                            }
                        }
                    },
                    // series: [{
                    //     name: 'Production1',
                    //     // pointPadding: 0,
                    //     // groupPadding: 0,
                    //     borderRadius: 0,
                    //     pointWidth: 10,
                    //     data: [
                    //         {
                    //             //童玲，产品1开始日期
                    //             x: Date.UTC(2008, 11, 5,12,0,0),
                    //             //童玲，产品1结束日期
                    //             x2: Date.UTC(2008, 11, 5,13,0,0),
                    //             //y: 0表示是童玲
                    //             y: 0,
                    //             color:'red',
                    //         },
                    //         {
                    //             //童玲，产品1开始日期
                    //             x: Date.UTC(2008, 11, 5,13,0,0),
                    //             //童玲，产品1结束日期
                    //             x2: Date.UTC(2008, 11, 5,14,0,0),
                    //             //y: 0表示是童玲
                    //             y: 0,
                    //             color:'red',
                    //         },
                    //         {
                    //             //童玲，产品1开始日期
                    //             x: Date.UTC(2008, 11, 5,14,0,0),
                    //             //童玲，产品1开始日期
                    //             x2: Date.UTC(2008, 11, 5,15,0,0),
                    //             //y: 0表示是童玲
                    //             y: 0,
                    //             color:'red',
                    //         },
                    //     ]
                    // },
                    //     {
                    //         name: '产品2',
                    //         // pointPadding: 0,
                    //         // groupPadding: 0,
                    //         borderRadius: 0,
                    //         pointWidth: 10,
                    //         data: [{
                    //             x: Date.UTC(2008, 11, 2,12,0,0),
                    //             x2: Date.UTC(2008, 11, 3,12,0,0),
                    //             y: 0,
                    //             color:'blue'
                    //         }, {
                    //             x: Date.UTC(2008, 11, 2,12,0,0),
                    //             x2: Date.UTC(2008, 11, 5,12,0,0),
                    //             y: 1,
                    //             color:'blue'
                    //         }, {
                    //             x: Date.UTC(2008, 11, 8,12,0,0),
                    //             x2: Date.UTC(2008, 11, 9,12,0,0),
                    //             y: 2,
                    //             color:colors[0]
                    //         }, {
                    //             x: Date.UTC(2008, 11, 9,12,0,0),
                    //             x2: Date.UTC(2008, 11, 19,12,0,0),
                    //             y: 1,
                    //             color:'blue'
                    //         }, {
                    //             x: Date.UTC(2008, 11, 10,2,0,0),
                    //             x2: Date.UTC(year, month, day,hour,minute,second),
                    //             y: 2,
                    //             color:'green'
                    //
                    //         }]
                    //     }
                    // ]
                };
                this.chartOptions=chartO;

                // console.log(Highcharts.getOptions());
            },
            //随机生成很多颜色
            createdRandomManyColors(){
                let i = 0;
                let str = "#";
                let random = 0;
                let aryNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

                for(i = 0; i < 6; i++)
                {
                    random = parseInt(Math.random() * 16);

                    str += aryNum[random];
                }
                //colors里没有重复的颜色
                if(this.colors.indexOf(str)===-1){
                    this.colors.push(str);
                }
            },
            renderHighchart(H){
                let defaultPlotOptions = H.getOptions().plotOptions,
                    columnType = H.seriesTypes.column,
                    each = H.each,
                    extendClass = H.extendClass,
                    Point = H.Point;
                defaultPlotOptions.xrange = H.merge(defaultPlotOptions.column, {
                    tooltip: {
                        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.yCategory}</b><br/>'
                    }
                });
                H.seriesTypes.xrange = H.extendClass(columnType, {
                    pointClass: extendClass(Point, {
                        // Add x2 and yCategory to the available properties for tooltip formats
                        getLabelConfig: function () {
                            let cfg = Point.prototype.getLabelConfig.call(this);
                            cfg.x2 = this.x2;
                            cfg.yCategory = this.yCategory = this.series.yAxis.categories && this.series.yAxis.categories[this.y];
                            return cfg;
                        }
                    }),
                    type: 'xrange',
                    parallelArrays: ['x', 'x2', 'y'],
                    requireSorting: false,
                    animate: H.seriesTypes.line.prototype.animate,
                    /**
                     * Borrow the column series metrics, but with swapped axes. This gives free access
                     * to features like groupPadding, grouping, pointWidth etc.
                     */
                    getColumnMetrics: function () {
                        let metrics,
                            chart = this.chart;
                        function swapAxes() {
                            each(chart.series, function (s) {
                                let xAxis = s.xAxis;
                                s.xAxis = s.yAxis;
                                s.yAxis = xAxis;
                            });
                        }
                        swapAxes();
                        this.yAxis.closestPointRange = 1;
                        metrics = columnType.prototype.getColumnMetrics.call(this);
                        swapAxes();
                        return metrics;
                    },
                    translate: function () {
                        columnType.prototype.translate.apply(this, arguments);
                        let series = this,
                            xAxis = series.xAxis,
                            metrics = series.columnMetrics;
                        H.each(series.points, function (point) {
                            let barWidth = xAxis.translate(H.pick(point.x2, point.x + (point.len || 0))) - point.plotX;
                            point.shapeArgs = {
                                x: point.plotX,
                                y: point.plotY + metrics.offset,
                                width: barWidth,
                                height: metrics.width
                            };
                            point.tooltipPos[0] += barWidth / 2;
                            point.tooltipPos[1] -= metrics.width / 2;
                        });
                    }
                });
                /**
                 * Max x2 should be considered in xAxis extremes
                 */
                // H.wrap(H.Axis.prototype, 'getSeriesExtremes', function (proceed) {
                //     let axis = this,
                //         dataMax = Number.MIN_VALUE;
                //     proceed.call(this);
                //     if (this.isXAxis) {
                //         each(this.series, function (series) {
                //             each(series.x2Data || [], function (val) {
                //                 if (val > dataMax) {
                //                     dataMax = val;
                //                 }
                //             });
                //         });
                //         if (dataMax > Number.MIN_VALUE) {
                //             axis.dataMax = dataMax;
                //         }
                //     }
                // });
            }
        },
        mounted(){
            //随机生成colorNum个颜色
            let colorNum=1000;
            this.colors=[];
            for(let i=0;i<colorNum;i++){
                this.createdRandomManyColors();
            }
            // console.log("资源甘特图get请求");

            this.$axios.get('/resource/gantt/running',{
                params:{
                    startDate: "2018/11/19 00:00:00",
                    endDate: "2018/11/21 00:00:00"
                }
            }).then(response => {
                // console.log("GET请求发出了");
                if (response.data) {
                    console.log("资源甘特图数据:");
                    // console.log(response.data.data);
                    //res应该是providedData格式
                    console.log(response.data.data);
                    //将从后端传回来的数据标准化
                    this.turnIntoStandardData(response.data.data);
                    //将已经标准化的数据渲染进甘特图里
                    this.handleStandardData(this.standardData);
                }
            }).catch(err => {
                alert('资源甘特图数据请求失败');
            })



            // Highcharts.setOptions(this.chartOptions);
            // this.renderHighchart(this.hcInstance);
        },
    }
</script>

<style scoped>
    #high{
        wdith:100%
    }
</style>