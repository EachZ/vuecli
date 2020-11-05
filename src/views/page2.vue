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
        name: "page2",
        // components: {Gantt},
        data() {
            return {
                // tasks: {
                //     data: [
                //         {id: 1, text: 'Task #1', start_date: '2020-01-17', duration: 3, progress: 0.6},
                //         {id: 2, text: 'Task #2', start_date: '2020-01-20', duration: 3, progress: 0.4}
                //     ],
                //     links: [
                //         {id: 1, source: 1, target: 2, type: '0'}
                //     ]
                // },


            };
        },
        mounted(){
            this.getData();
        },
        methods: {
            getData(){
                let data1={
                    product:["产品1", "产品2", "产品3", "产品4", "产品5", "产品6"],
                    yAxis:["line1", "line2", "张三"],
                    series:[{
                        name: "产品1",
                        type: "bar",
                        stack: "总量0",
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
                            new Date("2020-10-01"),
                            new Date("2020-03-14"),
                            new Date("2020-05-01")]
                    },
                        {
                            name: "产品1",
                            type: "bar",
                            stack: "总量0",
                            itemStyle: {
                                normal: {
                                    color: "white",
                                }
                            },
                            zlevel: -1,
                            z: 3,
                            data: [
                                new Date("2020-01-01"),
                                new Date("2020-01-01"),
                                new Date("2020-03-15")]
                        },
                        {
                            name: "产品2",
                            type: "bar",
                            stack: "总量2",
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
                            stack: "总量2",
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
                            stack: "总量3",
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
                            stack: "总量3",
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
                            stack: "总量4",
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
                            stack: "总量4",
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
                            stack: "总量5",
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
                            stack: "总量5",
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
                            stack: "总量6",
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
                            stack: "总量6",
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
                        top: 50
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
                                var last = "";
                                var max = 5;
                                var len = value.length;
                                var hang = Math.ceil(len / max);
                                if (hang > 1) {
                                    for (var i = 0; i < hang; i++) {
                                        var start = i * max;
                                        var end = start + max;
                                        var temp = value.substring(start, end) + "\n";
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
                            var res = "";
                            var name = "";
                            var start0 = "";
                            var start = "";
                            var end0 = "";
                            var end = "";
                            for (var i in params) {
                                var k = i % 2;
                                if (!k) { //偶数
                                    start0 = params[i].data;
                                    console.log(start0)
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



                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'));
                // 绘制图表
                myChart.setOption({
                    // title: {text: '在Vue中使用echarts'},
                    // tooltip: {},
                    // xAxis: {
                    //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    // },
                    // yAxis: {},
                    // series: [{
                    //     name: '销量',
                    //     type: 'bar',
                    //     data: [5, 20, 36, 10, 10, 20]
                    // }]
                    title: {
                        text: '阶梯瀑布图',
                        subtext: 'From ExcelHome',
                        sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function (params) {
                            var tar;
                            if (params[1].value !== '-') {
                                tar = params[1];
                            }
                            else {
                                tar = params[0];
                            }
                            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                        }
                    },
                    legend: {
                        data: ['支出', '收入']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {show: false},
                        data: function () {
                            var list = [];
                            for (var i = 1; i <= 11; i++) {
                                list.push('11月' + i + '日');
                            }
                            return list;
                        }()
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '辅助',
                            type: 'bar',
                            stack: '总量',
                            itemStyle: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                color: 'rgba(0,0,0,0)'
                            },
                            emphasis: {
                                itemStyle: {
                                    barBorderColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(0,0,0,0)'
                                }
                            },
                            data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
                        },
                        {
                            name: '收入',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'top'
                            },
                            data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
                        },
                        {
                            name: '支出',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'bottom'
                            },
                            data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
                        }
                    ]
                });
            }
        }
    };

</script>

<style lang="less" scoped>

</style>