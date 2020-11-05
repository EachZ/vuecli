<template>
    <div class="page1">
        <div class="item">
            <!--            按期交货率-->
            <h4>按期交货率</h4>
            <h5>2020年10月1日之前</h5>
            <a-progress type="circle" :percent="25" />

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
<!--        <div class="date">-->
<!--            <el-row>-->
<!--                <el-col :span="24">-->
<!--                    <div class="weeks">-->
<!--                        &lt;!&ndash; 日期 &ndash;&gt;-->
<!--                        <ul class="days">-->
<!--                            <li @click="weekPre" class="prev-btn">-->
<!--                                <i class="fa fa-angle-left fa-icon" aria-hidden="true"/>-->
<!--                                <span class="hidden-sm-and-down" style="margin-left: 5px;">上一周</span>-->
<!--                            </li>-->
<!--                            <li-->
<!--                                    class="date-item"-->
<!--                                    @click="pick(day, index)"-->
<!--                                    v-for="(day, index) in days"-->
<!--                                    :key="index"-->
<!--                                    :class="{selected: index === tabIndex}"-->
<!--                            >-->
<!--                                &lt;!&ndash;本月&ndash;&gt;-->
<!--                                <span v-if="day.getMonth()+1 !== currentMonth" class="other-month item-wrapper">-->
<!--                <span>{{day | getWeekFormat}}</span>-->
<!--                <span class="hidden-sm-and-down">{{ day | dateFormat }}</span>-->
<!--              </span>-->
<!--                                <span v-else>-->
<!--                &lt;!&ndash;今天&ndash;&gt;-->
<!--                <span-->
<!--                        v-if="day.getFullYear() === new Date().getFullYear() && day.getMonth() === new Date().getMonth() && day.getDate() == new Date().getDate()"-->
<!--                        class="today-item"-->
<!--                >今天</span>-->
<!--                <span class="item-wrapper" v-else>-->
<!--                  <span>{{day | getWeekFormat}}</span>-->
<!--                  <span class="hidden-sm-and-down">{{ day | dateFormat }}</span>-->
<!--                </span>-->
<!--              </span>-->
<!--                            </li>-->
<!--                            <li @click="weekNext" class="next-btn">-->
<!--                                <span class="hidden-sm-and-down" style="margin-right: 5px;">下一周</span>-->
<!--                                <i class="fa fa-angle-right fa-icon" aria-hidden="true"/>-->
<!--                            </li>-->
<!--&lt;!&ndash;                            <li>&ndash;&gt;-->
<!--&lt;!&ndash;              <span>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-date-picker&ndash;&gt;-->
<!--&lt;!&ndash;                        class="right-pick-btn"&ndash;&gt;-->
<!--&lt;!&ndash;                        style="width: 100%"&ndash;&gt;-->
<!--&lt;!&ndash;                        :clearable="false"&ndash;&gt;-->
<!--&lt;!&ndash;                        @change="pickDate"&ndash;&gt;-->
<!--&lt;!&ndash;                        v-model="newDate"&ndash;&gt;-->
<!--&lt;!&ndash;                        type="date"&ndash;&gt;-->
<!--&lt;!&ndash;                        placeholder="按日期查询"&ndash;&gt;-->
<!--&lt;!&ndash;                />&ndash;&gt;-->
<!--&lt;!&ndash;              </span>&ndash;&gt;-->
<!--&lt;!&ndash;                            </li>&ndash;&gt;-->
<!--                        </ul>-->


<!--                    </div>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--        </div>-->

        <div class="order">
            <el-row>
                <el-col :span="6" class="title">
                    <h3>订单号</h3>
                </el-col>
                <el-col :span="18" class="title">
                    <h3>订单进度</h3>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    418575
                </el-col>
                <el-col :span="16">
                    <a-tooltip title="订单进度为60%，已完成30%，正在完成30%">
                        <a-progress :percent="60" :success-percent="30" />
                    </a-tooltip>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    418577
                </el-col>
                <el-col :span="16">
                    <a-tooltip title="订单已完成">
                        <a-progress :percent="100" />
                    </a-tooltip>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    764486
                </el-col>
                <el-col :span="16">
                    <a-tooltip title="订单进度为80%，已完成30%，正在完成50%">
                        <a-progress :percent="80" :success-percent="30" />
                    </a-tooltip>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    762904
                </el-col>
                <el-col :span="16">
                    <a-tooltip  title="订单异常">
                        <a-progress :percent="60" status="exception"/>
                    </a-tooltip>
                </el-col>
            </el-row>

        </div>

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
                currentYear: 1970, // 年份
                currentMonth: 1, // 月份
                currentDay: 1, // 日期
                currentWeek: 1, // 星期
                days: [],
                value1: "",
                tabIndex: null,
                newDate: moment(new Date()).format("YYYY-MM-DD"),
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
        mounted() {
            const index = _.findIndex(this.days, function(o) {
                // console.log('o: ', o.getDate());
                // console.log('new Date().getDate(): ', new Date().getDate());
                return o.getDate() === new Date().getDate();
            });
            console.log("index: ", index);
            this.tabIndex = index;
        },
        created() {
            this.initData(null);
        },
        methods: {
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
                    date = new Date();
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
            },
            // 下个星期
            weekNext() {
                const d = this.days[6]; // 如果当期日期是7号或者小于7号
                d.setDate(d.getDate() + 7);
                this.initData(d);
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
            }
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