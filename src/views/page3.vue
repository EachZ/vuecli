<template>
    <div class="page2">
        <h1>增删改查</h1>
<!--        进行增删改查的表格-->
        <div id="crud">
            <div>
                <input type="text" placeholder="search" @input="search" list="cars" class="search">
                <datalist id="cars">
                    <option v-for="item in searchlist" :value="item" v-bind:key="item"></option>
                </datalist>
                <input type="button" class="add" @click="add" value="新增">
            </div>
            <div>
                <table>
                    <tr>
                        <th>id</th>
                        <th>订单号</th>
                        <th>人员/设备</th>
<!--                        <th>性别</th>-->
<!--                        <th>省份</th>-->
<!--                        <th>爱好</th>-->
                        <th>操作</th>
                    </tr>
                    <tr v-cloak v-for="(item, index) of slist" v-bind:key="index">
                        <td>{{index+1}}</td>
<!--                        username对应订单号-->
                        <td>{{item.username}}</td>
<!--                        email对应人员/设备-->
                        <td>{{item.email}}</td>
<!--                        <td>{{item.sex}}</td>-->
<!--                        <td>{{item.province}}</td>-->
<!--                        <td>{{item.hobby.join(' | ')}}</td>-->
                        <td><a href="javascript:;" @click="showOverlay(index)">修改</a> | <a href="javascript:;" @click="del(index)">删除</a></td>
                    </tr>
                </table>
            </div>
            <model :list='selectedlist' :isactive="isActive" v-cloak @change="changeOverlay" @modify="modify"></model>
        </div>
<!--        <div id="container">-->
<!--            <div class="item item-1">-->
<!--                <el-progress :text-inside="true" :stroke-width="30" :percentage="70"></el-progress>-->
<!--                <br/>-->
<!--                <el-progress :text-inside="true" :stroke-width="30" :percentage="100" status="success"></el-progress>-->
<!--                <br/>-->
<!--                <el-progress :text-inside="true" :stroke-width="30" :percentage="80" status="warning"></el-progress>-->
<!--                <br/>-->
<!--                <el-progress :text-inside="true" :stroke-width="30" :percentage="50" status="exception"></el-progress>-->
<!--                <br/>-->
<!--            </div>-->
<!--            <div class="item item-2">-->
<!--                <el-progress type="circle" :percentage="25"></el-progress>-->
<!--            </div>-->
<!--            <div class="item item-6">-->
<!--                <el-progress type="circle" :percentage="50"></el-progress>-->
<!--            </div>-->
<!--            <div class="item item-4">-->
<!--                <el-progress type="circle" :percentage="70" status="warning"></el-progress>-->
<!--            </div>-->
<!--            <div class="item item-3">-->
<!--                <el-progress type="circle" :percentage="100" status="success"></el-progress>-->
<!--            </div>-->
<!--            <div class="item item-5">-->
<!--                <el-progress type="circle" :percentage="50" status="exception"></el-progress>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="date">-->
<!--            <el-date-picker-->
<!--                    class="right-pick-btn"-->
<!--                    :clearable="false"-->
<!--                    @change="pickDate"-->
<!--                    v-model="newDate"-->
<!--                    type="date"-->
<!--                    placeholder="按日期查询"-->
<!--            />-->
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
<!--            &lt;!&ndash;            <el-row>&ndash;&gt;-->
<!--            &lt;!&ndash;                <el-col :span="20" :offset="2" class="time-range">&ndash;&gt;-->
<!--            &lt;!&ndash;        <span&ndash;&gt;-->
<!--            &lt;!&ndash;                @click="pickTime(time, index)"&ndash;&gt;-->
<!--            &lt;!&ndash;                v-for="(time, index) in times"&ndash;&gt;-->
<!--            &lt;!&ndash;                :key="index"&ndash;&gt;-->
<!--            &lt;!&ndash;                :class="{active:index == tabTimeIndex}"&ndash;&gt;-->
<!--            &lt;!&ndash;        >{{time.label}}</span>&ndash;&gt;-->
<!--            &lt;!&ndash;                </el-col>&ndash;&gt;-->
<!--            &lt;!&ndash;            </el-row>&ndash;&gt;-->
<!--        </div>-->

    </div>
</template>

<script>
    import model from "@/components/model";
    export default {
        name: "page3",
        components:{
            model
        },
        data() {
            return {
                isActive: false,
                selected: -1,
                selectedlist: {},
                slist: [],
                searchlist: [],
                list: [
                    {
                        username: '123456',
                        email: 'line1',
                        // sex: '男',
                        // province: '北京市',
                        // hobby: ['篮球', '读书', '编程']
                    },
                    {
                        username: '123456',
                        email: 'line2',
                        // sex: '女',
                        // province: '河北省',
                        // hobby: ['弹琴', '读书', '插画']
                    },
                    {
                        username: '123456',
                        email: 'line3',
                        // sex: '女',
                        // province: '重庆市',
                        // hobby: ['篮球']
                    },
                    {
                        username: '123456',
                        email: '张三',
                        // sex: '男',
                        // province: '北京市',
                        // hobby: ['篮球', '读书', '编程']
                    },
                    {
                        username: '123456',
                        email: '李四',
                        // sex: '女',
                        // province: '河北省',
                        // hobby: ['弹琴', '读书', '插画']
                    },
                    {
                        username: '123456',
                        email: '王五',
                        // sex: '女',
                        // province: '重庆市',
                        // hobby: ['篮球']
                    }
                ]
            }
        },
        created() {
            console.log(Date.now());
            this.setSlist(this.list);
        },
        methods: {
            // 修改数据
            showOverlay(index) {
                this.selected = index;
                this.selectedlist = this.list[index];
                this.changeOverlay();
            },
            // 点击保存按钮
            modify(arr) {
                if (this.selected > -1) {
                    //修改
                    // this.set(this.list, this.selected, arr);
                    console.log(this.list);
                    console.log(this.selected);
                    console.log("arr:");
                    console.log(arr);
                    this.list[this.selected]=arr;

                } else {
                    //新增
                    this.list.push(arr);
                }
                this.setSlist(this.list);
                this.changeOverlay();
            },
            add: function () {
                this.selectedlist = {
                    username: '',
                    email: '',
                    sex: '男',
                    province: '北京市',
                    hobby: []
                };
                this.isActive = true;
            },
            // delete list in index location
            del(index) {
                this.list.splice(index, 1);
                this.setSlist(this.list);
            },
            changeOverlay() {
                this.isActive = !this.isActive;
            },
            // 获取需要渲染到页面中的数据
            setSlist(arr) {
                this.slist = JSON.parse(JSON.stringify(arr));
            },
            // 搜索
            search(e) {
                var v = e.target.value,
                    self = this;
                self.searchlist = [];
                if (v) {
                    var ss = [];
                    // 过滤需要的数据
                    this.list.forEach(function (item) {
                        if (item.username.indexOf(v) > -1) {
                            if (self.searchlist.indexOf(item.username) == -1) {
                                self.searchlist.push(item.username);
                            }
                            ss.push(item);
                        } else if (item.email.indexOf(v) > -1) {
                            if (self.searchlist.indexOf(item.email) == -1) {
                                self.searchlist.push(item.email);
                            }
                            ss.push(item);
                        }
                    });
                    this.setSlist(ss); // 将过滤后的数据给了slist
                } else {
                    // 没有搜索内容，则展示全部数据
                    this.setSlist(this.list);
                }
            }
        },
    }
    /* eslint-disable */
    /*
    import moment from "moment";
    export default {
        name: "page3",
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
            // 拿到要访问课程详情的课程id
            let id = this.$route.params.pk || this.$route.query.pk || 1;
            this.$axios({
                url: `http://127.0.0.1:8000/course/detail/${id}/`,  // 后台接口
                method: 'get',  // 请求方式
            }).then(response => {  // 请求成功
                console.log('请求成功');
                console.log(response.data);
                this.course_ctx = response.data;  // 将后台数据赋值给前台变量完成页面渲染
            }).catch(error => {  // 请求失败
                console.log('请求失败');
                console.log(error);
            })
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
    */

</script>

<style lang="less" scoped>
    [v-cloak] {
        display: none
    }
    table {
        border: 1px solid #ccc;
        padding: 0;
        border-collapse: collapse;
        table-layout: fixed;
        margin-top: 10px;
        width: 100%;
    }
    table td,
    table th {
        height: 30px;
        border: 1px solid #ccc;
        background: #fff;
        font-size: 15px;
        padding: 3px 3px 3px 8px;
    }
    table th:first-child {
        width: 30px;
    }
    .container,
    .st {
        width: 1000px;
        margin: 10px auto 0;
        font-size: 13px;
        font-family: 'Microsoft YaHei'
    }
    .container .search {
        font-size: 15px;
        padding: 4px;
    }
    .container .add {
        padding: 5px 15px;
    }
    /*.overlay {*/
    /*    position: fixed;*/
    /*    top: 0;*/
    /*    left: 0;*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    z-index: 6;*/
    /*    background: rgba(0, 0, 0, 0.7);*/
    /*}*/
    /*.overlay td:first-child {*/
    /*    width: 66px;*/
    /*}*/
    /*.overlay .con {*/
    /*    position: absolute;*/
    /*    width: 420px;*/
    /*    min-height: 300px;*/
    /*    background: #fff;*/
    /*    left: 50%;*/
    /*    top: 50%;*/
    /*    -webkit-transform: translate3d(-50%, -50%, 0);*/
    /*    transform: translate3d(-50%, -50%, 0);*/
    /*    !*margin-top: -150px;*!*/
    /*    padding: 20px;*/
    /*}*/
    /*#container{*/
    /*    display: grid;*/
    /*    grid-template-columns: 250px 600px 250px;*/
    /*    grid-template-rows: 150px 150px 150px;*/
    /*    margin-left: 10%;*/
    /*}*/

    /*.item {*/
    /*    !*font-size: 4em;*!*/
    /*    text-align: center;*/
    /*    !*border: 1px solid #e5e4e9;*!*/
    /*}*/

    /*.item-1 {*/
    /*    grid-column-start: 1;*/
    /*    grid-column-end: 3;*/
    /*    grid-row-start: 2;*/
    /*    grid-row-end: 4;*/
    /*    padding-top: 5%;*/
    /*}*/
    /*@media screen and (max-width: 800px) {*/
    /*    .days {*/
    /*        li {*/
    /*            padding: 5px 0 !important;*/
    /*        }*/
    /*    }*/
    /*}*/
    /*.today-item {*/
    /*    cursor: pointer;*/
    /*    !*line-height: 45px;*!*/
    /*}*/
    /*.selected {*/
    /*    height: 47px !important;*/
    /*    box-sizing: border-box;*/
    /*    color: #fff !important;*/
    /*    background: #409eff !important;*/
    /*}*/
    /*.item-wrapper {*/
    /*    display: flex;*/
    /*    justify-content: center;*/
    /*    align-items: center;*/
    /*    flex-direction: column;*/
    /*}*/
    /*.prev-btn,*/
    /*.next-btn {*/
    /*    cursor: pointer;*/
    /*    display: flex;*/
    /*    justify-content: center;*/
    /*    align-items: center;*/
    /*    // padding: 5px 10px;*/
    /*    // border: 1px solid #ccc;*/
    /*    .fa-icon {*/
    /*        font-size: 18px;*/
    /*    }*/
    /*}*/
    /*.right-pick-btn {*/
    /*    // height: 55px;*/
    /*    // .el-input--small .el-input__inner{*/
    /*    //   height: 100%;*/
    /*    // }*/
    /*}*/
    /*.date {*/
    /*    font-size: 14px;*/
    /*    margin-top: 15px;*/
    /*    .time-range {*/
    /*        display: flex;*/
    /*        justify-content: space-around;*/
    /*        align-items: center;*/
    /*        padding: 10px 0;*/
    /*        span {*/
    /*            cursor: pointer;*/
    /*            padding-bottom: 5px;*/
    /*            border-bottom: 3px solid #fff;*/
    /*            &:hover {*/
    /*                border-bottom: 3px solid rgb(151, 198, 245);*/
    /*            }*/
    /*            &:active {*/
    /*                border-bottom: 3px solid rgb(151, 198, 245);*/
    /*            }*/
    /*        }*/
    /*        .active {*/
    /*            border-bottom: 3px solid #409eff;*/
    /*        }*/
    /*    }*/
    /*    .days {*/
    /*        display: flex;*/
    /*        li {*/
    /*            cursor: pointer;*/
    /*            padding: 5px 10px;*/
    /*            border: 1px solid #ccc;*/
    /*            border-right: none;*/
    /*            list-style: none;*/
    /*            flex: 1;*/
    /*            text-align: center;*/
    /*            display: flex;*/
    /*            justify-content: center;*/
    /*            align-items: center;*/
    /*            .other-month {*/
    /*                // color: #c0c4cc;*/
    /*            }*/
    /*        }*/
    /*        .date-item {*/
    /*            &:hover {*/
    /*                background: #dff0d8;*/
    /*            }*/
    /*            &:active {*/
    /*                background: #dff0d8;*/
    /*            }*/
    /*        }*/
    /*        li:nth-last-child(1) {*/
    /*            border-right: 1px solid #ccc;*/
    /*        }*/
    /*    }*/
    /*}*/
</style>

<!--<template>-->
<!--    <div>-->
<!--        <h1>页面3</h1>-->
<!--        <div id="container">-->
<!--            <div class="item item-1">-->
<!--                <el-progress :text-inside="true" :stroke-width="30" :percentage="70"></el-progress>-->
<!--                <br/>-->
<!--                <el-progress :text-inside="true" :stroke-width="30" :percentage="100" status="success"></el-progress>-->
<!--                <br/>-->
<!--                <el-progress :text-inside="true" :stroke-width="30" :percentage="80" status="warning"></el-progress>-->
<!--                <br/>-->
<!--                <el-progress :text-inside="true" :stroke-width="30" :percentage="50" status="exception"></el-progress>-->
<!--                <br/>-->
<!--            </div>-->
<!--            <div class="item item-2">-->
<!--                <el-progress type="circle" :percentage="25"></el-progress>-->
<!--            </div>-->
<!--            <div class="item item-6">-->
<!--                <el-progress type="circle" :percentage="50"></el-progress>-->
<!--            </div>-->
<!--            <div class="item item-4">-->
<!--                <el-progress type="circle" :percentage="70" status="warning"></el-progress>-->
<!--            </div>-->
<!--            <div class="item item-3">-->
<!--                <el-progress type="circle" :percentage="100" status="success"></el-progress>-->
<!--            </div>-->

<!--            <div class="item item-5">-->
<!--                <el-progress type="circle" :percentage="50" status="exception"></el-progress>-->
<!--            </div>-->

<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->

<!--    export default {-->
<!--        name: "page3",-->
<!--        data(){-->
<!--            return{-->
<!--                dataSource: {-->
<!--                    data: []-->
<!--                },-->

<!--            }-->


<!--        }-->

<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    #container{-->
<!--        display: grid;-->
<!--        grid-template-columns: 250px 600px 250px;-->
<!--        grid-template-rows: 150px 150px 150px;-->
<!--        margin-left: 10%;-->
<!--    }-->

<!--    .item {-->
<!--        /*font-size: 4em;*/-->
<!--        text-align: center;-->
<!--        /*border: 1px solid #e5e4e9;*/-->
<!--    }-->

<!--    .item-1 {-->
<!--        grid-column-start: 1;-->
<!--        grid-column-end: 3;-->
<!--        grid-row-start: 2;-->
<!--        grid-row-end: 4;-->
<!--        padding-top: 5%;-->
<!--    }-->


<!--</style>-->