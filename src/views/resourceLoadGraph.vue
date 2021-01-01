<template>
    <div class="home">
        <a-button type="primary" shape="circle" id="loading" loading/>
<!--        <a-week-picker></a-week-picker>-->
        <div id="container">
<!--            {{this.$route.query.year}}-->
<!--            {{this.$route.query.month}}-->
<!--            {{this.$route.query.day}}-->

            <div class="device item">
                <!--              设备总负载-->
                <h3>设备总负载</h3>
                <h5>{{timeString}}</h5>
                <a-progress type="circle" :percentage=percentages></a-progress>
            </div>
            <div class="staff item">
        <!--                人员总负载-->
                <h3>人员总负载</h3>
                <h5>{{timeString}}</h5>
                <a-progress type="circle" :percentage=percentages1></a-progress>
            </div>
        </div>

        <div style="width:720px;height:80px;margin:0 auto">
<!--            <h3>图例</h3>-->
            <br/>
            <div class="0">
                <div style="float:left;width:100px; height:40px;margin:3px 10px 0 10px;background-color:lightseagreen; position:relative;border-style:solid;border-width:1px;">
                    <div style="left:20px;top:10px;position:absolute">0%~20%</div>
                    <div style="height:10px;width:78px;position:absolute;bottom:0"></div>
                </div>
            </div>
            <div class="1">
                <div style="float:left;width:100px; height:40px;margin:3px 10px 0 10px;background-color:cornflowerblue; position:relative;border-style:solid;border-width:1px;">
                    <div style="left:20px;top:10px;position:absolute">20%~40%</div>
                    <div style="height:10px;width:78px;position:absolute;bottom:0"></div>
                </div>
            </div>
            <div class="2">
                <div style="float:left;width:100px; height:40px;margin:3px 10px 0 10px;background-color:mediumpurple; position:relative;border-style:solid;border-width:1px;">
                    <div style="left:20px;top:10px;position:absolute">40%~60%</div>
                    <div style="height:10px;width:78px;position:absolute;bottom:0"></div>
                </div>
            </div>
            <div class="3">
                <div style="float:left;width:100px; height:40px;margin:3px 10px 0 10px;background-color:deeppink; position:relative;border-style:solid;border-width:1px;">
                    <div style="left:20px;top:10px;position:absolute">60%~80%</div>
                    <div style="height:10px;width:78px;position:absolute;bottom:0"></div>
                </div>
            </div>
            <div class="4">
                <div style="float:left;width:100px; height:40px;margin:3px 10px 0 10px;background-color:orange; position:relative;border-style:solid;border-width:1px;">
                    <div style="left:20px;top:10px;position:absolute">80%~100%</div>
                    <div style="height:10px;width:78px;position:absolute;bottom:0"></div>
                </div>
            </div>
            <div class="5">
                <div style="float:left;width:100px; height:40px;margin:3px 10px 0 10px;background-color:red; position:relative;border-style:solid;border-width:1px;">
                    <div style="left:20px;top:10px;position:absolute"><span> >= 100%</span></div>
                    <div style="height:10px;width:78px;position:absolute;bottom:0"></div>
                </div>
            </div>
        </div>
        <a-affix :offset-top="400">
            <a-button type="primary" shape="circle" icon="to-top" size="large" style="left:560px" @click="toTop"/>
        </a-affix>
        <div class="date">
            <el-date-picker
                    class="right-pick-btn"

                    :clearable="false"
                    @change="pickDate"
                    v-model="newDate"
                    type="date"
                    placeholder="按日期查询"
            />


            <hr/>
            <el-row>
                <el-col :span="24">
                    <a-affix :offset-top="48">

                    <div class="weeks" style="background-color: lightsteelblue">
                        <!-- 日期 -->
                        <ul class="days">
                            <li @click="weekPre" class="prev-btn" style="background-color: steelblue;color: white">
                                <i class="fa fa-angle-left fa-icon" aria-hidden="true"/>
                                <span class="hidden-sm-and-down" style="margin-left: 5px;">上一周</span>
                            </li>
                            <li
                                    class="date-item"
                                    v-for="(day, index) in days"
                                    :key="index"
                                    :class="{selected: index === tabIndex}"
                            >
                                <!--本月-->
<!--                                <span v-if="day.getMonth()+1 !== currentMonth" class="other-month item-wrapper">-->
                                <span class="item-wrapper">
                                    <span>{{day | getWeekFormat}}</span>
                                    <span class="hidden-sm-and-down">{{ day | dateFormat }}</span>
                                </span>

<!--                                </span>-->
<!--                                <span v-else>-->
<!--                                    &lt;!&ndash;今天&ndash;&gt;-->
<!--                                    <span-->
<!--                                            v-if="day.getFullYear() === new Date().getFullYear() && day.getMonth() === new Date().getMonth() && day.getDate() === new Date().getDate()"-->
<!--                                            class="today-item"-->
<!--                                    >今天</span>-->
<!--                                    <span class="item-wrapper" v-else>-->
<!--                                      <span>{{day | getWeekFormat}}</span>-->
<!--                                      <span class="hidden-sm-and-down">{{ day | dateFormat }}</span>-->
<!--                                    </span>-->
<!--                                </span>-->
                            </li>
                            <li @click="weekNext" class="next-btn" style="background-color: steelblue;color: white">
                                <span class="hidden-sm-and-down" style="margin-right: 5px;">下一周</span>
                                <i class="fa fa-angle-right fa-icon" aria-hidden="true"/>
                            </li>
<!--                            <li>-->
<!--              <span>-->
<!--                <el-date-picker-->
<!--                        class="right-pick-btn"-->
<!--                        style="width: 100%"-->
<!--                        :clearable="false"-->
<!--                        @change="pickDate"-->
<!--                        v-model="newDate"-->
<!--                        type="date"-->
<!--                        placeholder="按日期查询"-->
<!--                />-->
<!--              </span>-->
<!--                            </li>-->
                        </ul>
<!--                        资源负载-->
                    </div>
                    </a-affix>

                        <div id="theResources">

                        </div>

                </el-col>
            </el-row>
            <!--            <el-row>-->
            <!--                <el-col :span="20" :offset="2" class="time-range">-->
            <!--        <span-->
            <!--                @click="pickTime(time, index)"-->
            <!--                v-for="(time, index) in times"-->
            <!--                :key="index"-->
            <!--                :class="{active:index == tabTimeIndex}"-->
            <!--        >{{time.label}}</span>-->
            <!--                </el-col>-->
            <!--            </el-row>-->
        </div>

    </div>
</template>

<script>
    /* eslint-disable */
    import moment from "moment";
    export default {
        name: "home",
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
                target: 'http://172.17.237.22:3180',
                text: '',
                loadData:[
                    // {
                    //     loadRate: [
                    //         {
                    //             rate: 30,
                    //             time: "2020-11-06 15:02:04"
                    //         },
                    //         {
                    //             rate: 34,
                    //             time: "2020-11-07 15:02:04"
                    //         },
                    //         {
                    //             rate: 36,
                    //             time: "2020-11-08 15:02:04"
                    //         },
                    //         {
                    //             rate: 39,
                    //             time: "2020-11-09 15:02:04"
                    //         },
                    //         {
                    //             rate: 40,
                    //             time: "2020-11-10 15:02:04"
                    //         },
                    //         {
                    //             rate: 44,
                    //             time: "2020-11-11 15:02:04"
                    //         },
                    //         {
                    //             rate: 47,
                    //             time: "2020-11-06 15:02:04"
                    //         }
                    //     ],
                    //     resourceName: "5组-童玲 (5)"
                    // },
                    // {
                    //     loadRate: [
                    //         {
                    //             rate: 50,
                    //             time: "2020-11-06 15:02:04"
                    //         },
                    //         {
                    //             rate: 54,
                    //             time: "2020-11-07 15:02:04"
                    //         },
                    //         {
                    //             rate: 56,
                    //             time: "2020-11-08 15:02:04"
                    //         },
                    //         {
                    //             rate: 59,
                    //             time: "2020-11-09 15:02:04"
                    //         },
                    //         {
                    //             rate: 60,
                    //             time: "2020-11-10 15:02:04"
                    //         },
                    //         {
                    //             rate: 64,
                    //             time: "2020-11-11 15:02:04"
                    //         },
                    //         {
                    //             rate: 67,
                    //             time: "2020-11-06 15:02:04"
                    //         }
                    //     ],
                    //     resourceName: "6组-张三 (6)"
                    // }
                ],
                percentages:0,
                percentages1:0,
                timeString:"",
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
        created() {
            this.initData(null);
        },
        methods: {
            toTop(){
                window.scrollTo(0,0);
            },
            testAxiosGET1(sDate,eDate) {
                let dateS=moment(sDate).format("YYYY-MM-DD");
                let dateE=moment(eDate).format("YYYY-MM-DD");
                this.timeString=dateS.toString()+" 到 "+dateE.toString();

                let year1=(dateS.toString()).substring(0,4);
                let month1=(dateS.toString()).substring(5,7);
                let day1=(dateS.toString()).substring(8,10);
                let date1=year1+"/"+month1+"/"+day1;

                let year2=(dateE.toString()).substring(0,4);
                let month2=(dateE.toString()).substring(5,7);
                let day2=(dateE.toString()).substring(8,10);
                let date2=year2+"/"+month2+"/"+day2;

                console.log(date1);
                console.log(date2);

                this.$axios.get(this.target+"/rate/load/machine?startDate="+date1+"&endDate="+date2).then(response => {
                    console.log("jiqifuzai GET请求发出了");
                    if (response.data) {
                        console.log(response.data.data);
                        this.GETcontent=response.data.data;
                        let data=this.GETcontent;
                        if(isNaN(data))
                            this.percentages=Number(0);
                        else{
                            this.percentages= Number(parseFloat((data*100).toString()).toFixed(2));
                        }
                    }
                }).catch(err => {
                    alert('请求失败')
                })

                this.$axios.get(this.target+"/rate/load/people?startDate="+date1+"&endDate="+date2).then(response => {
                    console.log("jiqifuzai GET请求发出了");
                    if (response.data) {
                        console.log(response.data.data);
                        this.GETcontent=response.data.data;
                        let data=this.GETcontent;
                        if(isNaN(data))
                            this.percentages1=Number(0);
                        else{
                            this.percentages1= Number(parseFloat((data*100).toString()).toFixed(2));
                        }
                    }
                }).catch(err => {
                    alert('请求失败')
                })

            },
            increase() {
                this.percentage += 10;
                if (this.percentage > 100) {
                    this.percentage = 100;
                }
            },
            decrease() {
                this.percentage -= 10;
                if (this.percentage < 0) {
                    this.percentage = 0;
                }
            },
            formatDate(year, month, day) {
                const y = year;
                let m = month;
                if (m < 10) m = `0${m}`;
                let d = day;
                if (d < 10) d = `0${d}`;
                return `${y}-${m}-${d}`;
            },
            pickDate(date) {
                let that = this;
                that.newDate = moment(date).format("YYYY-MM-DD");
                that.$emit("dateValue", that.newDate);
                console.log("this.newDate: ", that.newDate);
                that.initData(that.newDate);

                console.log("选择了之后的days:");
                console.log(this.days);
                console.log("++++++++++++++++++");
                let sDate =this.days[0];
                let eDate =this.days[6];

                let sDateYear=sDate.getFullYear();
                let sDateMonth=sDate.getMonth()+1;
                let sDateDay=sDate.getDate();
                let sDateString=sDateYear+"/"+sDateMonth+"/"+sDateDay+" 00:00:00";

                let eDateYear=eDate.getFullYear();
                let eDateMonth=eDate.getMonth()+1;
                let eDateDay=eDate.getDate();
                let eDateString=eDateYear+"/"+eDateMonth+"/"+eDateDay+" 00:00:00";

                //向后端调用方法
                this.testAxiosGET1(sDate,eDate);
                console.log("资源甘特图 axios get");
                this.$axios.get(this.target+'/resource/gantt/loading',{
                    params:{
                        //要改成日历上的开始时间
                        // startDate: "2018/11/19 12:00:00",
                        startDate: sDateString,
                        //要改成日历上的结束时间
                        endDate: eDateString,
                        // endDate: "2018/11/21 12:00:00",
                        frequency :1
                    }
                }).then(response => {
                    console.log("资源甘特图get传参数");
                    if (response.data) {
                        console.log(response.data.data);
                        this.renderHTML(response.data.data);
                    }
                }).catch(err => {
                    alert('请求资源负载图失败');
                });



                const index = _.findIndex(that.days, function(o) {
                    return o.getDate() === new Date(that.newDate).getDate();
                });
                // console.log("index: ", index);
                this.tabIndex = index;

            },
            initData(cur) {
                let date = "";
                if (cur) {
                    date = new Date(cur);
                } else {
                    date = new Date(this.$route.query.year,this.$route.query.month-1,this.$route.query.day);
                }
                this.currentDay = date.getDate(); // 今日日期 几号
                this.currentYear = date.getFullYear(); // 当前年份
                this.currentMonth = date.getMonth() + 1; // 当前月份
                this.currentWeek = date.getDay(); // 1...6,0  // 星期几
                if (this.currentWeek === 0) {
                    this.currentWeek = 7;
                }
                const str = this.formatDate(
                    this.currentYear,
                    this.currentMonth,
                    this.currentDay
                ); // 今日日期 年-月-日
                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
                /* eslint-disabled */
                // 今天
                for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
                    const d = new Date(str);
                    d.setDate(d.getDate() - i);
                    // console.log(y:" + d.getDate())
                    // console.log('d: ', d);
                    this.days.push(d);
                }
                // 这个星期
                for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
                    const d = new Date(str);
                    d.setDate(d.getDate() + i);
                    this.days.push(d);
                    // console.log('d1: ', d);
                }
            },
            // 上个星期
            weekPre() {
                const d = this.days[0]; // 如果当期日期是7号或者小于7号
                d.setDate(d.getDate() - 7);
                this.initData(d);
                this.axiosToBackend();

            },
            // 下个星期
            weekNext() {
                const d = this.days[6]; // 如果当期日期是7号或者小于7号
                d.setDate(d.getDate() + 7);
                this.initData(d);
                this.axiosToBackend();

            },
            // 上一個月  传入当前年份和月份
            pickPre(year, month) {
                const d = new Date(this.formatDate(year, month, 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            },
            // 下一個月  传入当前年份和月份
            pickNext(year, month) {
                const d = new Date(this.formatDate(year, month, 1));
                d.setDate(35);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            },
            // 当前选择日期
            pick(date, index) {
                this.newDate = moment(date).format("YYYY-MM-DD");
                this.$emit("dateValue", this.newDate);
                // console.log("index: ", index);
                this.tabIndex = index;
                // alert(
                //   this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
                // );
            },
            pickTime(time, index) {
                // console.log('time: ', time);
                let timeArr = [];
                timeArr.push(_.split(time.time, "~"));
                // console.log("timeArr: ", timeArr);
                this.$emit("timeValue", _.join(timeArr), "");
                // console.log("index: ", index);
                this.tabTimeIndex = index;
                // alert(
                //   this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
                // );
            },
            splitDate(s){
              let sArr=s.split(" ");
              // console.log(sArr);
              return sArr[0]
            },
            renderHTML(graphData){
                console.log("到这里了");
                let testDom=document.getElementById("theResources");
                console.log(graphData);
                console.log(graphData.length);
                let theHTML="";
                for(let j=0;j<graphData.length;j++){
                    theHTML +=
                        "<ul class=\"resources\">\n" +
                        "                            <li>\n" +
                        "                                <span>"+graphData[j].resourceName+"</span>\n" +
                        "                            </li>\n";
                    for(let i=0;i<graphData[j].loadRate.length;i++){
                        let sateArr=["state0","state1","state2","state3","state4","state5",];
                        let index;
                        let rate=Number(graphData[j].loadRate[i].rate);
                        // let rate=Number(200);
                        let h=80*rate/120;
                        // let h=80*graphData[j].loadRate[i].rate/120;

                        if(0<=rate && rate<=20){
                            index=0;
                        }else if(20<=rate && rate<=40){
                            index=1;
                        }else if(40<=rate && rate<=60){
                            index=2;
                        }else if(60<=rate && rate<=80){
                            index=3;
                        }else if(80<=rate && rate<100){
                            index=4;
                        }else if(rate>=100){
                            index=5;
                            h=78
                        }
                        // console.log(sateArr[index]);
                        theHTML +=
                            "                            <li>\n"+
                            // "<span>"+this.splitDate(graphData[j].loadRate[i].time)+"**</span>"+
                            // "<el-progress type='circle' class='huan' :percentage='55'>"+graphData[j].loadRate[i].rate+"%</el-progress>"+
                            "        <div style=\"z-index:0;float:left;width:80px; height:80px;\n" +
                            "            margin:3px 10px 0 10px;background-color:whitesmoke; position:relative;border-style:solid;border-width:1px;\">\n" +
                            // "<hr style='position: absolute'/>" +
                            "            <div style=\"left: 20px;position:absolute;z-index:999\">\n" +
                            rate+
                            "            %</div>\n" +
                            "            <div class="+sateArr[index]+
                            " style=\"z-index:0;height:"+h+"px;width:78px;position:absolute;bottom:0\">\n" +
                            "            </div>\n" +
                            "        </div>"+
                            // "<span>"+graphData[j].loadRate[i].rate+"%</span>"+
                            "                            </li>\n";
                    }
                    // theHTML +=
                    //     "                            <li>\n"+
                    //     "<span>"+this.loadData[0].loadRate[0].rate+"</span>"+
                    //     "                            </li>\n" +
                    //     "                            <li>\n" +
                    //     "<span>"+this.loadData[0].loadRate[1].rate+"</span>"+
                    //     "                            </li>\n" +
                    //     "                            <li>\n" +
                    //     "<span>"+this.loadData[0].loadRate[2].rate+"</span>"+
                    //     "                            </li>\n" +
                    //     "                            <li>\n" +
                    //     "<span>"+this.loadData[0].loadRate[3].rate+"</span>"+
                    //     "                            </li>\n" +
                    //     "                            <li>\n" +
                    //     "<span>"+this.loadData[0].loadRate[4].rate+"</span>"+
                    //     "                            </li>\n" +
                    //     "                            <li>\n" +
                    //     "<span>"+this.loadData[0].loadRate[5].rate+"</span>"+
                    //     "                            </li>\n" +
                    //     "                            <li>\n" +
                    //     "<span>"+this.loadData[0].loadRate[6].rate+"</span>"+
                    //     "                            </li>\n" +
                    //     "                            <li>\n" +
                    //     "                            </li>\n" +
                    //     "                        </ul>";
                    theHTML+=
                        "                            <li>\n" +
                        "                            </li>\n" +
                        "                        </ul>\n";
                }

                testDom.innerHTML=theHTML;
                document.getElementById("loading").style.display="none";
            },
            axiosToBackend(){
                console.log("显示日期:");

                //一周的开始时间
                let sDate =this.days[0];
                //一周的结束时间
                let eDate =this.days[6];

                this.newDate=sDate;

                this.testAxiosGET1(sDate,eDate);

                let sDateYear=sDate.getFullYear();
                let sDateMonth=sDate.getMonth()+1;
                let sDateDay=sDate.getDate();
                let sDateString=sDateYear+"/"+sDateMonth+"/"+sDateDay+" 00:00:00";

                let eDateYear=eDate.getFullYear();
                let eDateMonth=eDate.getMonth()+1;
                let eDateDay=eDate.getDate();
                let eDateString=eDateYear+"/"+eDateMonth+"/"+eDateDay+" 00:00:00";

                console.log(sDateString);
                console.log(eDateString);
                console.log("ppppppppppppppppppppp");

                //向后端调用方法
                console.log("资源甘特图 axios get");
                this.$axios.get(this.target+'/resource/gantt/loading',{
                    params:{
                        //要改成日历上的开始时间
                        // startDate: "2018/11/19 12:00:00",
                        startDate: sDateString,
                        //要改成日历上的结束时间
                        endDate: eDateString,
                        // endDate: "2018/11/21 12:00:00",
                        // frequency :1
                    }
                }).then(response => {
                    console.log("资源甘特图get传参数");
                    if (response.data) {
                        console.log(response.data.data);
                        this.renderHTML(response.data.data);
                        console.log("获取渲染图形的参数");
                    }
                }).catch(err => {
                    alert('请求资源负载图失败');
                });
            }
        },
        mounted() {
            // const index = _.findIndex(this.days, function(o) {
            //     // console.log('o: ', o.getDate());
            //     // console.log('new Date().getDate(): ', new Date().getDate());
            //     return o.getDate() === new Date().getDate();
            // });
            // console.log("index: ", index);
            // this.tabIndex = index;

            this.axiosToBackend();

            const index = _.findIndex(this.days, function(o) {
                // console.log('o: ', o.getDate());
                // console.log('new Date().getDate(): ', new Date().getDate());
                return o.getDate() === new Date().getDate();
            });
            console.log("index: ", index);
            this.tabIndex = index;
        }
    };

</script>

<style lang="less" scoped>
    .huan{
        width:80px;
        height: 80px;
        background-color: red;
        border: #2c3e50 1px solid;
    }
    /*0~20*/
    .state0{
        background-color:lightseagreen;
    }
    /*20~40*/
    .state1{
        background-color:cornflowerblue;
    }
    /*40~60*/
    .state2{
        background-color:mediumpurple;
    }
    /*60~80*/
    .state3{
        background-color:deeppink;
    }
    /*80~100*/
    .state4{
        background-color:orange;
    }
    /*100以上*/
    .state5{
        background-color:red;
    }
    #container{
        display: grid;
        grid-template-columns: 250px 250px;
        grid-template-rows: 190px;
        margin-left: 30%;
    }
    .item {
        text-align: center;
        border: 1px solid #e5e4e9;
    }
    @media screen and (max-width: 1000px) {
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
                /*cursor: pointer;*/
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
                /*&:hover {*/
                /*    background: #dff0d8;*/
                /*}*/
                /*&:active {*/
                /*    background: #dff0d8;*/
                /*}*/
            }
            li:nth-last-child(1) {
                border-right: 1px solid #ccc;
            }
        }
        .resources{
            display: flex;
            li {
                line-height: 80px;
                cursor: default;
                padding: 5px 10px;
                /*border: 1px solid black;*/
                border-bottom: solid #2c3e50;
                border-right: none;
                list-style: none;
                flex: 1;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            li:nth-last-child(9){
                border-right: solid #2c3e50;
            }
            li:nth-last-child(1) {
                /*border-right: 1px solid black;*/
                border-bottom: none;
            }

        }
    }
</style>
<!--<template>-->
<!--  <div class="home">-->
<!--&lt;!&ndash;    <img alt="Vue logo" src="../assets/logo.png">&ndash;&gt;-->
<!--&lt;!&ndash;    <HelloWorld msg="Welcome to Your Vue.js App"/>&ndash;&gt;-->
<!--&lt;!&ndash;      <h1>资源负载图</h1>&ndash;&gt;-->
<!--      <div id="container">-->
<!--          <div class="device item">-->
<!--&lt;!&ndash;              设备总负载&ndash;&gt;-->
<!--              <h4>设备总负载</h4>-->
<!--              <h5>2020年10月1-7日</h5>-->
<!--              <el-progress type="circle" :percentage="25"></el-progress>-->
<!--          </div>-->
<!--          <div class="staff item">-->
<!--&lt;!&ndash;                人员总负载&ndash;&gt;-->
<!--              <h4>人员总负载</h4>-->
<!--              <h5>2020年10月1-7日</h5>-->
<!--              <el-progress type="circle" :percentage="75"></el-progress>-->

<!--          </div>-->
<!--      </div>-->
<!--      <div>-->
<!--&lt;!&ndash;          资源负载图&ndash;&gt;-->
<!--          <el-calendar>-->
<!--          </el-calendar>-->
<!--              <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">-->
<!--                  <el-table-column prop="date" label="日期" width="180">-->
<!--                  </el-table-column>-->
<!--                  <el-table-column prop="name" label="姓名" width="180">-->
<!--                  </el-table-column>-->
<!--                  <el-table-column prop="address" label="地址">-->
<!--                  </el-table-column>-->
<!--              </el-table>-->
<!--              &lt;!&ndash; 分页器 &ndash;&gt;-->
<!--              <div class="block" style="margin-top:15px;">-->
<!--                  <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1,5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">-->
<!--                  </el-pagination>-->
<!--              </div>-->

<!--      </div>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// @ is an alias to /src-->
<!--// import HelloWorld from '@/components/HelloWorld.vue'-->
<!--//-->
<!--// export default {-->
<!--//   name: 'Home',-->
<!--//   components: {-->
<!--//     HelloWorld-->
<!--//   }-->
<!--// }-->
<!--export default {-->
<!--    data() {-->
<!--        return {-->
<!--            tableData: [-->
<!--                {-->
<!--                    date: "2016-05-02",-->
<!--                    name: "王小虎",-->
<!--                    address: "上海市普陀区金沙江路 1518 弄"-->
<!--                },-->
<!--                {-->
<!--                    date: "2016-05-04",-->
<!--                    name: "王小虎",-->
<!--                    address: "上海市普陀区金沙江路 1517 弄"-->
<!--                },-->
<!--                {-->
<!--                    date: "2016-05-01",-->
<!--                    name: "王小虎",-->
<!--                    address: "上海市普陀区金沙江路 1519 弄"-->
<!--                },-->
<!--                {-->
<!--                    date: "2016-05-03",-->
<!--                    name: "王小虎",-->
<!--                    address: "上海市普陀区金沙江路 1516 弄"-->
<!--                }-->
<!--            ],-->
<!--            currentPage: 1, // 当前页码-->
<!--            total: 20, // 总条数-->
<!--            pageSize: 1 // 每页的数据条数-->

<!--        };-->
<!--    },-->
<!--    methods: {-->
<!--        handleSizeChange(val) {-->
<!--            console.log(`每页 ${val} 条`);-->
<!--            this.currentPage = 1;-->
<!--            this.pageSize = val;-->
<!--        },-->
<!--        handleCurrentChange(val) {-->
<!--            console.log(`当前页: ${val}`);-->
<!--            this.currentPage = val;-->
<!--        }-->

<!--    }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--    #container{-->
<!--        display: grid;-->
<!--        grid-template-columns: 250px 250px;-->
<!--        grid-template-rows: 250px;-->
<!--        margin-left: 30%;-->
<!--    }-->
<!--    .item {-->
<!--        text-align: center;-->
<!--        border: 1px solid #e5e4e9;-->
<!--    }-->

<!--</style>-->
