<template>
    <div class="page2">
        <!--        <div class="container" >-->
        <!--            <gantt style="height: 1000px" :tasks="tasks"/>-->
        <!--        </div>-->
        <!--        <div id="myChart" :style="{width: '80%', height: '500%'}"></div>-->
        <div id="Gantt" :style="{width: '1000px', height: '500px'}"></div>


    </div>
</template>

<script>
    // import Gantt from '../components/Gantt.vue';

    export default {
        name: "page7",
        // components: {Gantt},
        data() {
            return {
                target: 'http://123.57.239.79:3180',
                //各种图例的颜色
                colorData:["red","yellow","green","blue","skyblue","black","pink","purple"],
                //产品，各种图例
                productData:["产品1", "产品2", "产品3", "产品4", "产品5", "产品6"],
                //资源（设备和人员）
                yAxisData:["line1", "line2", "李四"],
                //装【【设备数】个】起始时间,按顺序来
                startDateData:[],
                //装【【设备数】个】结束时间,按顺序来
                endDateData:[],

                //后端提供的json数据
                providedData:
                    [
                        {
                            productionOrderNumber: "Production1",
                            resourceName: "5组-童玲 (5)",
                            resourceId: 1,
                            productAndTime: [
                                {
                                    secondaryProductionNumber: "production_1_2008-11-05 12:00:00.0",
                                    materialCoding: "3209248",
                                    startTime: "2008-11-05 12:00:00",
                                    endTime: "2008-11-05 13:00:00",
                                    orderId: 36,
                                    orderNumber: 764098
                                },
                                {
                                    secondaryProductionNumber: "production_1_2008-11-05 13:00:00.0",
                                    materialCoding: "3209248",
                                    startTime: "2008-11-05 13:00:00",
                                    endTime: "2008-11-05 14:00:00",
                                    orderId: 36,
                                    orderNumber: 764098
                                },
                                {
                                    secondaryProductionNumber: "production_1_2008-11-05 14:00:00.0",
                                    materialCoding: "3209248",
                                    startTime: "2008-11-05 14:00:00",
                                    endTime: "2008-11-05 15:00:00",
                                    orderId: 36,
                                    orderNumber: 764098
                                },
                                {
                                    secondaryProductionNumber: "production_1_2008-11-05 15:00:00.0",
                                    materialCoding: "3209248",
                                    startTime: "2008-11-05 15:00:00",
                                    endTime: "2008-11-05 16:00:00",
                                    orderId: 36,
                                    orderNumber: 764098
                                },
                                {
                                    secondaryProductionNumber: "production_1_2008-11-05 16:00:00.0",
                                    materialCoding: "3059786",
                                    startTime: "2008-11-05 16:00:00",
                                    endTime: "2008-11-05 17:00:00",
                                    orderId: 74,
                                    orderNumber: 417174
                                },
                                {
                                    secondaryProductionNumber: "production_1_2008-11-05 17:00:00.0",
                                    materialCoding: "3059786",
                                    startTime: "2008-11-05 17:00:00",
                                    endTime: "2008-11-05 18:00:00",
                                    orderId: 74,
                                    orderNumber: 417174
                                },
                                {
                                    secondaryProductionNumber: "production_1_2008-11-05 18:00:00.0",
                                    materialCoding: "3059786",
                                    startTime: "2008-11-05 18:00:00",
                                    endTime: "2008-11-05 19:00:00",
                                    orderId: 74,
                                    orderNumber: 417174
                                },
                                {
                                    secondaryProductionNumber: "production_1_2008-11-06 07:00:00.0",
                                    materialCoding: "3209248",
                                    startTime: "2008-11-06 07:00:00",
                                    endTime: "2008-11-06 08:00:00",
                                    orderId: 75,
                                    orderNumber: 762485
                                },
                                {
                                    secondaryProductionNumber: "production_1_2008-11-06 08:00:00.0",
                                    materialCoding: "3209248",
                                    startTime: "2008-11-06 08:00:00",
                                    endTime: "2008-11-06 09:00:00",
                                    orderId: 75,
                                    orderNumber: 762485
                                },
                                {
                                    secondaryProductionNumber: "production_1_2008-11-06 09:00:00.0",
                                    materialCoding: "3209248",
                                    startTime: "2008-11-06 09:00:00",
                                    endTime: "2008-11-06 10:00:00",
                                    orderId: 75,
                                    orderNumber: 762485
                                },
                                {
                                    secondaryProductionNumber: "production_1_2008-11-06 10:00:00.0",
                                    materialCoding: "3209248",
                                    startTime: "2008-11-06 10:00:00",
                                    endTime: "2008-11-06 11:00:00",
                                    orderId: 75,
                                    orderNumber: 762485
                                },
                                {
                                    secondaryProductionNumber: "production_1_2008-11-06 11:00:00.0",
                                    materialCoding: "3209248",
                                    startTime: "2008-11-06 11:00:00",
                                    endTime: "2008-11-06 12:00:00",
                                    orderId: 75,
                                    orderNumber: 762485
                                }
                            ]
                        },
                        {
                            productionOrderNumber: "Production2",
                            resourceName: "6组-李  倩（4）",
                            resourceId: 2,
                            productAndTime: [
                                {
                                    secondaryProductionNumber: "production_2_2008-11-05 19:00:00.0",
                                    materialCoding: "3059786",
                                    startTime: "2008-11-05 19:00:00",
                                    endTime: "2008-11-05 20:00:00",
                                    orderId: 74,
                                    orderNumber: 417174
                                },
                                {
                                    secondaryProductionNumber: "production_2_2008-11-05 20:00:00.0",
                                    materialCoding: "3059786",
                                    startTime: "2008-11-05 20:00:00",
                                    endTime: "2008-11-05 21:00:00",
                                    orderId: 74,
                                    orderNumber: 417174
                                },
                                {
                                    secondaryProductionNumber: "production_2_2008-11-05 21:00:00.0",
                                    materialCoding: "3059786",
                                    startTime: "2008-11-05 21:00:00",
                                    endTime: "2008-11-05 22:00:00",
                                    orderId: 74,
                                    orderNumber: 417174
                                },
                                {
                                    secondaryProductionNumber: "production_2_2008-11-05 22:00:00.0",
                                    materialCoding: "3059786",
                                    startTime: "2008-11-05 22:00:00",
                                    endTime: "2008-11-05 23:00:00",
                                    orderId: 74,
                                    orderNumber: 417174
                                },
                                {
                                    secondaryProductionNumber: "production_2_2008-11-05 23:00:00.0",
                                    materialCoding: "3059786",
                                    startTime: "2008-11-05 23:00:00",
                                    endTime: "2008-11-06 00:00:00",
                                    orderId: 74,
                                    orderNumber: 417174
                                }
                            ]
                        },
                        {
                            productionOrderNumber: "Production3",
                            resourceName: "7组-黄娣（4）",
                            resourceId: 3,
                            productAndTime: [
                                {
                                    secondaryProductionNumber: "production_3_2008-11-05 16:00:00.0",
                                    materialCoding: "3059786",
                                    startTime: "2008-11-05 16:00:00",
                                    endTime: "2008-11-05 17:00:00",
                                    orderId: 74,
                                    orderNumber: 417174
                                },
                                {
                                    secondaryProductionNumber: "production_3_2008-11-05 17:00:00.0",
                                    materialCoding: "3059786",
                                    startTime: "2008-11-05 17:00:00",
                                    endTime: "2008-11-05 18:00:00",
                                    orderId: 74,
                                    orderNumber: 417174
                                },
                                {
                                    secondaryProductionNumber: "production_3_2008-11-05 18:00:00.0",
                                    materialCoding: "3059786",
                                    startTime: "2008-11-05 18:00:00",
                                    endTime: "2008-11-05 19:00:00",
                                    orderId: 74,
                                    orderNumber: 417174
                                }
                            ]
                        }
                    ]
            };
        },
        mounted(){
            console.log("资源甘特图get请求");
            this.$axios.get(this.target+'/resource/gantt/running',{
                params:{
                    startDate: "2008/11/05 12:00:00",
                    endDate: "2008/11/07 12:00:00"
                }
            }).then(response => {
                console.log("GET请求发出了");
                if (response.data) {
                    console.log("资源甘特图数据:");
                    console.log(response.data.data);
                    let res=response.data.data;
                    //把数据放进图里
                    for(let i=0;i<res.length;i++){
                        console.log(res[i]);

                    }
                }
            }).catch(err => {
                alert('资源甘特图数据请求失败');
            })

            this.getData();
        },
        methods: {
            getData(){
                let data1={
                    product:this.productData,
                    yAxis:this.yAxisData,
                    series:[
                        // {
                        //     name: "产品1",
                        //     type: "bar",
                        //     stack: "产品1",
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             color: "#000",
                        //             position: "right",
                        //             formatter: function(params) {
                        //                 return params.seriesName
                        //             }
                        //         }
                        //     },
                        //     itemStyle: {
                        //         normal: {
                        //             color: "skyblue",
                        //             borderColor: "#fff",
                        //             borderWidth: 2
                        //         }
                        //     },
                        //     zlevel: -1,
                        //     data: [
                        //         //产品1的结束时间
                        //         //line1的产品1的结束时间
                        //         new Date("2020-10-17"),
                        //         new Date("2020-10-30")
                        //     ]
                        // },
                        // {
                        //     name: "产品1",
                        //     type: "bar",
                        //     stack: "产品1",
                        //     itemStyle: {
                        //         normal: {
                        //             color: "white",
                        //         }
                        //     },
                        //     zlevel: -1,
                        //     z: 3,
                        //     data: [
                        //         //产品1的起始时间
                        //         new Date("2020-10-03"),
                        //         new Date("2020-10-14")
                        //
                        //     ]
                        // },
                        //==================================================================
                        //-------------
                        {
                            name: "产品1",
                            type: "bar",
                            stack: "产品1",
                            label: {
                                normal: {
                                    show: true,
                                    color: "#000",
                                    position: "right",
                                    formatter: function(params) {
                                        return params.seriesName
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "skyblue",
                                    borderColor: "#fff",
                                    borderWidth: 2
                                }
                            },
                            zlevel: -1,
                            data: [
                                //产品1的结束时间
                                //line1的产品1的结束时间
                                new Date("2020-10-01"),
                                //line2的产品1的结束时间
                                new Date("2020-03-14"),
                                //李四的产品1的结束时间
                                new Date("2020-05-01")
                            ]
                        },
                        {
                            name: "产品1",
                            type: "bar",
                            stack: "产品1",
                            itemStyle: {
                                normal: {
                                    color: "white",
                                }
                            },
                            zlevel: -1,
                            z: 3,
                            data: [
                                //产品1的起始时间
                                new Date("2020-01-01"),
                                new Date("2020-01-01"),
                                new Date("2020-03-15")]
                        },
                        {
                            name: "产品2",
                            type: "bar",
                            stack: "产品2",
                            label: {
                                normal: {
                                    show: true,
                                    color: "#000",
                                    position: "right",
                                    formatter: function(params) {
                                        return params.seriesName
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "green",
                                    borderColor: "#fff",
                                    borderWidth: 2
                                }
                            },
                            zlevel: -1,
                            data: [
                                new Date("2020-01-10"),
                                new Date("2020-01-10"),
                                new Date("2020-03-30")]
                        },
                        {
                            name: "产品2",
                            type: "bar",
                            stack: "产品2",
                            itemStyle: {
                                normal: {
                                    color: "white",
                                }
                            },
                            zlevel: -1,
                            z: 3,
                            data: [
                                new Date("2020-01-02"),
                                new Date("2020-01-02"),
                                new Date("2020-03-16")]
                        },
                        {
                            name: "产品3",
                            type: "bar",
                            stack: "产品3",
                            label: {
                                normal: {
                                    show: true,
                                    color: "#000",
                                    position: "right",
                                    formatter: function(params) {
                                        return params.seriesName
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "red",
                                    borderColor: "#fff",
                                    borderWidth: 2
                                }
                            },
                            zlevel: -1,
                            data: [
                                new Date("2020-02-20"),
                                new Date("2020-01-20"),
                                new Date("2020-04-10")]
                        },
                        {
                            name: "产品3",
                            type: "bar",
                            stack: "产品3",
                            itemStyle: {
                                normal: {
                                    color: "white"
                                }
                            },
                            zlevel: -1,
                            z: 3,
                            data: [
                                new Date("2020-02-01"),
                                new Date("2020-01-12"),
                                new Date("2020-04-01")]
                        },
                        {
                            name: "产品4",
                            type: "bar",
                            stack: "产品4",
                            label: {
                                normal: {
                                    show: true,
                                    color: "#000",
                                    position: "right",
                                    formatter: function(params) {
                                        return params.seriesName
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "brown",
                                    borderColor: "#fff",
                                    borderWidth: 2
                                }
                            },
                            zlevel: -1,
                            data: [
                                //终止时间
                                new Date("2020-03-09"),
                                new Date("2020-01-25"),
                                new Date("2020-04-20")]
                        },
                        {
                            name: "产品4",
                            type: "bar",
                            stack: "产品4",
                            itemStyle: {
                                normal: {
                                    color: "white",
                                }
                            },
                            zlevel: -1,
                            z: 3,
                            data: [
                                //起始时间，还要可以按照小时
                                new Date("2020-02-25"),
                                new Date("2020-01-21"),
                                new Date("2020-04-11")]
                        },
                        {
                            name: "产品5",
                            type: "bar",
                            stack: "产品5",
                            label: {
                                normal: {
                                    show: true,
                                    color: "#000",
                                    position: "right",
                                    formatter: function(params) {
                                        return params.seriesName
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "yellow",
                                    borderColor: "#fff",
                                    borderWidth: 2
                                }
                            },
                            zlevel: -1,
                            data: [
                                new Date("2020-03-12"),
                                new Date("2020-02-15"),
                                new Date("2020-04-30")]
                        },
                        {
                            name: "产品5",
                            type: "bar",
                            stack: "产品5",
                            itemStyle: {
                                normal: {
                                    color: "white",
                                }
                            },
                            zlevel: -1,
                            z: 3,
                            data: [
                                new Date("2020-03-10"),
                                new Date("2020-01-26"),
                                new Date("2020-04-21")]
                        },
                        {
                            name: "产品6",
                            type: "bar",
                            stack: "产品6",
                            label: {
                                normal: {
                                    show: true,
                                    color: "#000",
                                    position: "right",
                                    formatter: function(params) {
                                        return params.seriesName
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'orange',
                                    borderColor: "#fff",
                                    borderWidth: 2
                                }
                            },
                            zlevel: -1,
                            data: [
                                new Date("2020-03-30"),
                                new Date("2020-03-13"),
                                new Date("2020-05-01")]
                        },
                        {
                            name: "产品6",
                            type: "bar",
                            stack: "产品6",
                            itemStyle: {
                                normal: {
                                    color: 'white',
                                }
                            },
                            zlevel: -1,
                            z: 3,
                            data: [
                                new Date("2020-03-15"),
                                new Date("2020-02-16"),
                                new Date("2020-04-30")]
                        },
                    ]
                };
                //上面的小方块的数组、y轴的数组、产品的series数组
                this.drawLine(data1);
            },
            drawLine(data1) {
                console.log(data1);
                let Gantt=this.$echarts.init(document.getElementById('Gantt'));
                Gantt.setOption({
                    backgroundColor: "#fff",
                    title: {
                        text: "资源甘特图",
                        padding: 20,
                        textStyle: {
                            fontSize: 17,
                            fontWeight: "bolder",
                            color: "#333"
                        },
                        subtextStyle: {
                            fontSize: 13,
                            fontWeight: "bolder"
                        }
                    },
                    legend: {
                        data: data1.product,
                        align: "right",
                        right: 80,
                        top: 50,
                    },
                    grid: {
                        containLabel: true,
                        show: false,
                        right: 130,
                        left: 40,
                        bottom: 40,
                        top: 90
                    },
                    xAxis: {
                        type: "time",
                        axisLabel: {
                            "show": true,
                            "interval": 0
                        }
                    },
                    yAxis: {
                        axisLabel: {
                            show: true,
                            interval: 0,
                            formatter: function(value) {
                                let last = "";
                                let max = 5;
                                let len = value.length;
                                let hang = Math.ceil(len / max);
                                if (hang > 1) {
                                    for (let i = 0; i < hang; i++) {
                                        let start = i * max;
                                        let end = start + max;
                                        let temp = value.substring(start, end) + "\n";
                                        last += temp; //凭借最终的字符串
                                    }
                                    return last;
                                } else {
                                    return value;
                                }
                            }
                        },
                        data: data1.yAxis
                    },
                    tooltip: {
                        trigger: "axis",
                        formatter: function(params) {
                            let res = "";
                            let name = "";
                            let start0 = "";
                            let start = "";
                            let end0 = "";
                            let end = "";
                            for (let i in params) {
                                let k = i % 2;
                                if (!k) { //偶数
                                    start0 = params[i].data;
                                    // console.log(start0)
                                    start = start0.getFullYear() + "-" + (start0.getMonth() + 1) + "-" + start0.getDate();
                                }
                                if (k) { //奇数
                                    name = params[i].seriesName;
                                    end0 = params[i].data;
                                    end = end0.getFullYear() + "-" + (end0.getMonth() + 1) + "-" + end0.getDate();
                                    res += name + " : " + end + "~" + start + "</br>";

                                }
                            }
                            return res;
                        }
                    },
                    series: data1.series

                });

                console.log("qqq");
                //点了图例才会调用以下方法
                Gantt.on('legendselectchanged', function(obj) {
                    //所有的图例的被点击情况
                    let selected = obj.selected;
                    //点的图例的名字
                    let name = obj.name; // current clicked one
                    // if all legends are selected, only enable clicked legend, others are toggled to false.
                    // other situation, do what is default.
                    // console.log("name:");
                    // console.log(name);
                    // console.log("selected:");
                    // console.log(selected);

                    //一个都没选，就是true
                    let allIsFalse=true;
                    let setLegend={};
                    //有一个图例被选中了，就设置allIsFalse为false
                    for (let item in selected) {
                        if (selected[item]) {
                            allIsFalse=false;
                        }
                    }
                    //一个图例没都选，就默认选全部图例
                    if(allIsFalse){
                        for(let item in selected){
                            setLegend[item]=true;
                            Gantt.setOption({
                                legend: {
                                    selected:setLegend
                                }
                            })
                        }
                    }

                    //如果点击了图例
                    if (selected !== undefined) {

                        if ((isOnlyClickedOneIsUnSelected(name, selected))) {
                            // all legend are selected except current clicked one
                            onlyEnableCurrentSelectedLegend(name, selected, Gantt);
                        }
                    }

                    function isOnlyClickedOneIsUnSelected(name, selected){
                        // console.log('onlyClickOne');
                        let unSelectedCount = 0;
                        for ( let item in selected) {
                            // console.log("item:");
                            // console.log(item);
                            // console.log("hasOwnProperty");
                            // console.log(Object.prototype.hasOwnProperty.call(selected, item));
                            // console.log("================");
                            //例如，foo.hasOwnProperty("bar") 应该替换为 Object.prototype.hasOwnProperty.call(foo, "bar")。
                            // if (!selected.hasOwnProperty(item)) {
                            //     continue;
                            // }

                            //如果，就跳出循环，从下一个item开始
                            // if (!Object.prototype.hasOwnProperty.call(selected, item)) {
                            //     continue;
                            // }

                            if (selected[item] === false) {
                                ++unSelectedCount;
                            }
                        }
                        // console.log("~~~~~~~~~");
                        // console.log(unSelectedCount);
                        //只点击了name的图例
                        return unSelectedCount===1 && selected[name] === false;
                    }
                    function onlyEnableCurrentSelectedLegend(name, selected, echartInstance) {
                        // console.log("onlyEnable");
                        // console.log(name);
                        // console.log(selected);
                        let legend = {};
                        for (let item in selected) {
                            if (selected[item]) {
                                legend[item]=false;
                                continue;
                            }

                            legend[item]=true;

                            // console.log("&&&&&&&&&&&&&");
                            // console.log(legend);
                            // if (!Object.prototype.hasOwnProperty.call(selected, item)) {
                            //     continue;
                            // }
                            //只显示选中的图例
                            // legend.push({'name': item});
                            //
                            //
                            // echartInstance.dispatchAction({
                            //     type: 'legendToggleSelect',
                            //     batch: legend
                            // });
                        }
                        echartInstance.setOption({
                            legend: {
                                selected:legend
                            }
                        })
                    }
                });


            },
        },

    };

</script>

<style lang="less" scoped>

</style>