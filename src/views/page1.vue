<template>
    <div class="page1">
        <div class="item">
            <!--            按期交货率-->
            <h4>按期交货率</h4>
            <h5>2020年10月1日之前</h5>
            <el-progress type="circle" :percentage=percentages></el-progress>

        </div>
        <br/>
        <div>
            <div class="block datePick">
                <span class="demonstration">今天是</span>
                <el-date-picker
                        class="right-pick-btn"
                        :clearable="false"
                        @change="pickDate"
                        v-model="newDate"
                        type="date"
                        placeholder="按日期查询"
                />
            </div>
            <div class="late">
                红色表示延期订单
            </div>
        </div>
        <br/>
        <br/>
        <br/>

        <div id="Gantt" :style="{width: '1000px', height: '500px'}"></div>

    </div>
</template>

<script>
    /* eslint-disable */
    import moment from "moment";
    export default {
        name: "page1",
        props: {
            dateValue: {
                type: String,
                default: moment(new Date()).format("YYYY-MM-DD")
            },
            timeValue: {
                type: String,
                default: "00:00"
            }
        },
        data() {
            return {
                percentages:50,
                GETcontent :'',
                POSTcontent:'',
                currentYear: 1970, // 年份
                currentMonth: 1, // 月份
                currentDay: 1, // 日期
                currentWeek: 1, // 星期
                days: [],
                value1: "",
                tabIndex: null,
                newDate: moment(new Date(this.$route.query.year,this.$route.query.month-1,this.$route.query.day)).format("YYYY-MM-DD"),
                tabTimeIndex: 4,
                times: [
                    { time: "00:00:00~06:00:00", label: "00:00~06:00" },
                    { time: "06:00:00~12:00:00", label: "06:00~12:00" },
                    { time: "12:00:00~18:00:00", label: "12:00~18:00" },
                    { time: "18:00:00~24:00:00", label: "18:00~24:00" },
                    { time: "00:00:00~24:00:00", label: "今日全部" }
                ],
                percentage: 10,
                colors: [
                    {color: '#f56c6c', percentage: 20},
                    {color: '#e6a23c', percentage: 40},
                    {color: '#5cb87a', percentage: 60},
                    {color: '#1989fa', percentage: 80},
                    {color: '#6f7ad3', percentage: 100}
                ],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },

            };
        },
        filters: {
            dateFormat(date) {
                return moment(date).format("YYYY-MM-DD");
            },
            getWeekFormat(date) {
                const weeksObj = {
                    1: "周一",
                    2: "周二",
                    3: "周三",
                    4: "周四",
                    5: "周五",
                    6: "周六",
                    7: "周日"
                };
                let weekNumber = moment(date).isoWeekday();
                return weeksObj[weekNumber];
            }
        },
        mounted(){
            this.getData();
        },
        created() {
            this.initData(null);
        },
        methods: {
            testAxiosGET1() {
                let year1=(this.newDate.toString()).substring(0,4);
                let month1=(this.newDate.toString()).substring(5,7);
                let day1=(this.newDate.toString()).substring(8,10);
                let date1=year1+"/"+month1+"/"+day1;
                this.$axios.get("/rate/ontimeDelivery?currentDate="+date1).then(response => {
                    console.log("GET请求发出了");
                    if (response.data) {
                        console.log(response.data.data);
                        this.GETcontent=response.data.data;
                        let data=this.GETcontent;
                        if(isNaN(data))
                            this.percentages=100;
                        else{
                            this.percentages= parseFloat((data*100).toString()).toFixed(2);
                        }
                    }
                }).catch(err => {
                    alert('请求失败')
                })
            },
            testAxiosGET() {
                // 由于 main.js 里全局定义的 axios,此处直接使用 $axios 即可。
                // 由于 main.js 里定义了每个请求前缀，此处的 / 即为 /api/，
                // 经过 vue.config.js 配置文件的代理设置，会自动转为 target中的网址，从而解决跨域问题
                // get方法
                let year1=(this.newDate.toString()).substring(0,4);
                let month1=(this.newDate.toString()).substring(5,7);
                let day1=(this.newDate.toString()).substring(8,10);
                console.log(year1);
                console.log(month1);
                console.log(day1);
                let date1=year1+"/"+month1+"/"+day1;
                console.log(date1);

                this.$axios.get("/orders/gantt?date="+date1).then(response => {
                    console.log("GET请求发出了");
                    if (response.data) {
                        console.log(response.data.data);
                        this.GETcontent=response.data.data;
                        let data=this.GETcontent;
                        console.log(data[0])

                        // date: "2008-11-05 00:00:00"
                        // expectedDelivery: "2008-11-06 20:00:00"
                        // finishPercent: "100%;44.44%"
                        // orderId: 36
                        // orderNumber: 764098
                        // orderRecordId: 1
                        let orderList = data.map(function (item) {
                            return item.orderNumber;
                        });
                        let stateList=data.map(function (item) {
                            if(item.finishState===0){
                                return 0.1;
                            }else if(item.finishState===2){
                                return 0.2;
                            }
                            return 0.3;
                        });
                        let yanList=data.map(function (item) {
                            if(item.isDelivery===0){
                                return 0.1;
                            }
                            return 0.2;
                        });
                        console.log(orderList);
                        let dataList=data.map(function (item) {
                            let poetryArr = item.finishPercent.split(";")
                            let sub=poetryArr[0].substring(0,poetryArr[0].length-1);
                            return parseInt(sub)/100;
                        });
                        console.log(dataList);
                        let dataList2=data.map(function (item) {
                            let poetryArr1 = item.finishPercent.split(";")
                            console.log(poetryArr1);
                            console.log(poetryArr1.length);
                            if(poetryArr1.length===1){
                                console.log("第二项没有");
                                return 0;
                            }
                            else{
                                let sub=poetryArr1[1].substring(0,poetryArr1[1].length-1);
                                console.log(sub);
                                return parseInt(sub)/100;
                            }
                        });
                        console.log(dataList2);


                        let dataList3=data.map(function (item) {
                            let poetryArr3 = item.finishPercent.split(";")
                            if(poetryArr3.length!==3){
                                console.log("第三项没有");
                                return 0;
                            }
                            else{
                                let sub=poetryArr3[2].substring(0,poetryArr3[1].length-1);
                                console.log(sub);
                                return parseInt(sub)/100;
                            }
                        });

                        let data1={
                            order:orderList,
                            data2:dataList,//装配
                            data3:dataList2,//测试
                            data5:dataList3,
                            //data4:[1,1.5,0.5,1,1.5,1.5]//状态
                            data4:stateList
                        };
                        //上面的小方块的数组、y轴的数组、产品的series数组
                        this.drawLine(data1);
                    }
                }).catch(err => {
                    alert('请求失败')
                })
            },
            getData(){
                this.testAxiosGET1();
                this.testAxiosGET();
            },
            drawLine(data1) {
                console.log(data1);
                let Gantt=this.$echarts.init(document.getElementById('Gantt'));
                Gantt.setOption({
                        title: {
                            text: "订单甘特图",
                            padding: 20,
                            textStyle: {
                                fontSize: 17,
                                fontWeight: "bolder",
                                color: "#333"
                            },
                            subtext:"该表展示订单编号及其对应的完成状态",
                            subtextStyle: {
                                fontSize: 13,
                                fontWeight: "bolder"
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend:{
                            data:["步骤1","步骤2","步骤3"]
                        },
                        grid: {
                            left: '10%',
                            right: '4%',
                        },
                        xAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        yAxis: [
                            {
                                type: 'category',
                                axisTick: {
                                    show: false
                                },
                                data: data1.order
                            }
                        ],
                        series: [
                            {
                                name: '步骤1',
                                type: 'bar',
                                stack:'数据',
                                itemStyle: {
                                    normal: {
                                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                                        color:'#87c3ba'
                                    }
                                },

                                label: {
                                    show: true,
                                },
                                data: data1.data3
                            },
                            {
                                name: '步骤2',
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                                        color:'#7e9ac3'
                                    }
                                },
                                stack:'数据',
                                label: {
                                    show: true
                                },
                                data: data1.data2
                            },{
                                name: '步骤3',
                                type: 'bar',
                                stack:'数据',
                                itemStyle: {
                                    normal: {
                                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                                        color:'#baadc3'
                                    }
                                },

                                label: {
                                    show: true,
                                },
                                data: data1.data5
                            },
                            {
                                name: '状态',
                                type: 'bar',
                                stack:'状态',
                                label: {
                                    show: true
                                },
                                itemStyle: {
                                    normal: {
                                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                                        color: function(params) {
                                            var colorList = [
                                                '#C1232B','#B5C334','#FCCE10'
                                            ];
                                            console.log(params);
                                            if(params.data==0.2){
                                                return colorList[1];
                                            }else if(params.data==0.3){
                                                return colorList[2]
                                            }
                                            return colorList[0]

                                        },
                                        //以下为是否显示，显示位置和显示格式的设置了
                                        // label: {
                                        //     show: true,
                                        //     position: 'top',
                                        //     formatter: '{b}\n{c}'
                                        // }
                                        label: {
                                            show: true,
                                            position: 'inside',
                                            formatter: function(params) {
                                                console.log(params);
                                                if(params.data==0.3){
                                                    return '已完成';
                                                }else if(params.data==0.2){
                                                    return '正在进行';
                                                }
                                                return '未开始';

                                            }
                                        }
                                    }

                                },
                                data: data1.data4
                            },
                            {
                                name: '状态',
                                type: 'bar',
                                stack:'状态',
                                label: {
                                    show: true
                                },
                                itemStyle: {
                                    normal: {
                                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                                        color: function(params) {
                                            var colorList = [
                                                '#c1675e','#6ac35d'
                                            ];
                                            console.log(params);
                                            if(params.data==0.1){
                                                return colorList[1];
                                            }
                                            return colorList[0]

                                        },
                                        //以下为是否显示，显示位置和显示格式的设置了
                                        // label: {
                                        //     show: true,
                                        //     position: 'top',
                                        //     formatter: '{b}\n{c}'
                                        // }
                                        label: {
                                            show: true,
                                            position: 'inside',
                                            formatter: function(params) {
                                                console.log(params);
                                                if(params.data==0.2){
                                                    return '延期';
                                                }
                                                return '未延期';

                                            }
                                        }
                                    }

                                },
                                data: data1.data4
                            }

                        ]
                    }
                );



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
            },
            // increase() {
            //     this.percentage += 10;
            //     if (this.percentage > 100) {
            //         this.percentage = 100;
            //     }
            // },
            // decrease() {
            //     this.percentage -= 10;
            //     if (this.percentage < 0) {
            //         this.percentage = 0;
            //     }
            // },
            // formatDate(year, month, day) {
            //     const y = year;
            //     let m = month;
            //     if (m < 10) m = `0${m}`;
            //     let d = day;
            //     if (d < 10) d = `0${d}`;
            //     return `${y}-${m}-${d}`;
            // },
            pickDate(date) {
                let that = this;
                that.newDate = moment(date).format("YYYY-MM-DD");
                console.log("选的时间");
                console.log(this.newDate);
                this.testAxiosGET();
                this.testAxiosGET1();
            },
            // initData(cur) {
            //     let date = "";
            //     if (cur) {
            //         date = new Date(cur);
            //     } else {
            //         date = new Date();
            //     }
            //     this.currentDay = date.getDate(); // 今日日期 几号
            //     this.currentYear = date.getFullYear(); // 当前年份
            //     this.currentMonth = date.getMonth() + 1; // 当前月份
            //     this.currentWeek = date.getDay(); // 1...6,0  // 星期几
            //     if (this.currentWeek === 0) {
            //         this.currentWeek = 7;
            //     }
            //     const str = this.formatDate(
            //         this.currentYear,
            //         this.currentMonth,
            //         this.currentDay
            //     ); // 今日日期 年-月-日
            //     this.days.length = 0;
            //     // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
            //     /* eslint-disabled */
            //     // 今天
            //     for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
            //         const d = new Date(str);
            //         d.setDate(d.getDate() - i);
            //         // console.log(y:" + d.getDate())
            //         // console.log('d: ', d);
            //         this.days.push(d);
            //     }
            //     // 这个星期
            //     for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
            //         const d = new Date(str);
            //         d.setDate(d.getDate() + i);
            //         this.days.push(d);
            //         // console.log('d1: ', d);
            //     }
            // },
            // // 上个星期
            // weekPre() {
            //     const d = this.days[0]; // 如果当期日期是7号或者小于7号
            //     d.setDate(d.getDate() - 7);
            //     this.initData(d);
            // },
            // // 下个星期
            // weekNext() {
            //     const d = this.days[6]; // 如果当期日期是7号或者小于7号
            //     d.setDate(d.getDate() + 7);
            //     this.initData(d);
            // },
            // // 上一個月  传入当前年份和月份
            // pickPre(year, month) {
            //     const d = new Date(this.formatDate(year, month, 1));
            //     d.setDate(0);
            //     this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            // },
            // // 下一個月  传入当前年份和月份
            // pickNext(year, month) {
            //     const d = new Date(this.formatDate(year, month, 1));
            //     d.setDate(35);
            //     this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            // },
            // // 当前选择日期
            // pick(date, index) {
            //     this.newDate = moment(date).format("YYYY-MM-DD");
            //     this.$emit("dateValue", this.newDate);
            //     // console.log("index: ", index);
            //     this.tabIndex = index;
            //     // alert(
            //     //   this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
            //     // );
            // },
            // pickTime(time, index) {
            //     // console.log('time: ', time);
            //     let timeArr = [];
            //     timeArr.push(_.split(time.time, "~"));
            //     // console.log("timeArr: ", timeArr);
            //     this.$emit("timeValue", _.join(timeArr), "");
            //     // console.log("index: ", index);
            //     this.tabTimeIndex = index;
            //     // alert(
            //     //   this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
            //     // );
            // }
        }
    };

</script>

<style lang="less" scoped>
    .title{
        padding-top: 10px;
        background-color: #dcdfe6;
        padding-bottom: 10px;
        /*border-bottom: 2px solid #2c3e50;*/
    }
    @media screen and (max-width: 800px) {
        .days {
            li {
                padding: 5px 0 !important;
            }
        }
    }
    .today-item {
        cursor: pointer;
        /*line-height: 45px;*/
    }
    .selected {
        height: 47px !important;
        box-sizing: border-box;
        color: #fff !important;
        background: #409eff !important;
    }
    .item-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .prev-btn,
    .next-btn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        // padding: 5px 10px;
        // border: 1px solid #ccc;
        .fa-icon {
            font-size: 18px;
        }
    }
    .right-pick-btn {
        // height: 55px;
        // .el-input--small .el-input__inner{
        //   height: 100%;
        // }
    }
    .date {
        font-size: 14px;
        margin-top: 15px;
        .time-range {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 10px 0;
            span {
                cursor: pointer;
                padding-bottom: 5px;
                border-bottom: 3px solid #fff;
                &:hover {
                    border-bottom: 3px solid rgb(151, 198, 245);
                }
                &:active {
                    border-bottom: 3px solid rgb(151, 198, 245);
                }
            }
            .active {
                border-bottom: 3px solid #409eff;
            }
        }
        .days {
            display: flex;
            li {
                cursor: pointer;
                padding: 5px 10px;
                border: 1px solid #ccc;
                border-right: none;
                list-style: none;
                flex: 1;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                .other-month {
                    // color: #c0c4cc;
                }
            }
            .date-item {
                &:hover {
                    background: #dff0d8;
                }
                &:active {
                    background: #dff0d8;
                }
            }
            li:nth-last-child(1) {
                border-right: 1px solid #ccc;
            }
        }
    }
    .datePick{
        float: left;
        margin-left: 20%;
    }
    .late{
        float: right;
        margin-right: 20%;
        background-color: red;
        width: 200px;
        height: 40px;
    }

</style>
<!--<template>-->
<!--    <div class="page1">-->
<!--        <div class="item">-->
<!--&lt;!&ndash;            按期交货率&ndash;&gt;-->
<!--            <h4>按期交货率</h4>-->
<!--            <h5>2020年10月1日之前</h5>-->
<!--            <el-progress type="circle" :percentage="25"></el-progress>-->
<!--        </div>-->
<!--        <br/>-->
<!--        <div>-->
<!--            <div class="block date">-->
<!--                <span class="demonstration">今天是</span>-->
<!--                <el-date-picker-->
<!--                        v-model="value2"-->
<!--                        type="date"-->
<!--                        placeholder="Pick a day"-->
<!--                        :picker-options="pickerOptions">-->
<!--                </el-date-picker>-->
<!--            </div>-->
<!--            <div class="late">-->
<!--                红色表示延期订单-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->

<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "page1",-->
<!--        data() {-->
<!--            return {-->
<!--                pickerOptions: {-->
<!--                    disabledDate(time) {-->
<!--                        return time.getTime() > Date.now();-->
<!--                    },-->
<!--                    shortcuts: [{-->
<!--                        text: 'Today',-->
<!--                        onClick(picker) {-->
<!--                            picker.$emit('pick', new Date());-->
<!--                        }-->
<!--                    }, {-->
<!--                        text: 'Yesterday',-->
<!--                        onClick(picker) {-->
<!--                            const date = new Date();-->
<!--                            date.setTime(date.getTime() - 3600 * 1000 * 24);-->
<!--                            picker.$emit('pick', date);-->
<!--                        }-->
<!--                    }, {-->
<!--                        text: 'A week ago',-->
<!--                        onClick(picker) {-->
<!--                            const date = new Date();-->
<!--                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);-->
<!--                            picker.$emit('pick', date);-->
<!--                        }-->
<!--                    }]-->
<!--                },-->
<!--                value2: '',-->
<!--            };-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    .item {-->
<!--        text-align: center;-->
<!--        border: 1px solid #e5e4e9;-->
<!--        width: 250px;-->
<!--        height: 250px;-->
<!--        margin: 0 auto;-->
<!--    }-->
<!--    .date{-->
<!--        float: left;-->
<!--        margin-left: 20%;-->
<!--    }-->
<!--    .late{-->
<!--        float: right;-->
<!--        margin-right: 20%;-->
<!--        background-color: red;-->
<!--        width: 200px;-->
<!--        height: 40px;-->
<!--    }-->
<!--</style>-->