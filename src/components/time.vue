<template>
    <div class="time">
        <br/>
        <div v-show="current">
            当前时间: {{time}}
            <!--      不自动更新秒的date:{{date}}-->
            <br/>
            <br/>

            <!--      开始时间：{{start_time}}-->
            <div v-show="setTime">
                <a-button type="primary" size="small" @click="showOverlay" style="margin-right: 10px" v-show="visibleSet">设置时间</a-button>
                <a-button type="primary" size="small" @click="showSpeed" v-show="visibleSpeed">设置流速</a-button>
            </div>
        </div>
<!--        <br/>-->
        <div v-show="false">页面计时:{{count_time}}</div>
<!--        <br/>-->
<!--        <br/>-->
        <div class="overlay" v-show="isActive">

            <a-input-number v-model="year" class="inYear" :min="0"/>年
            <a-input-number v-model="month" class="in" :min="1" :max="12"/>月
            <a-input-number v-model="day" class="in" :min="1" :max="31"/>日
            <a-input-number v-model="hour" class="in" :min="0" :max="23"/>时
            <a-input-number v-model="minute" class="in" :min="0" :max="59"/>分
            <a-input-number v-model="second" class="in" :min="0" :max="59"/>秒
            <a-button type="primary" size="small" @click="hideOverlay">确定</a-button>
        </div>

        <div class="overlay" v-show="setSpeed">
            <br/>
            设置时间流速:
            <br/>
            <a-button-group>
                <a-button type="primary" @click="setSecondSpeed"> x秒 </a-button>
                <a-button type="primary"  @click="setMinuteSpeed"> x分 </a-button>
                <a-button type="primary" @click="setHourSpeed"> x时 </a-button>
                <a-button type="primary" @click="setDaySpeed"> x日 </a-button>
                <a-button type="primary" @click="setMonthSpeed" disabled> x月 </a-button>
                <a-button type="primary" @click="setYearSpeed" disabled> x年 </a-button>
            </a-button-group>
            <br/>
            <br/>
            <a-button type="primary" size="small" @click="hideSpeed">确定</a-button>
        </div>


    </div>
</template>

<script>
    export default{
        name:"time",
        data(){
            return{
                date:new Date().toLocaleString(),
                // date: new Date("2019/9/9 12:20:05").toLocaleString(),
                // start_time: '2020-11-4 12:00:00',
                start_time:new Date(),
                count_time: '00:00:00',
                //year是希望跳转到的年
                year:new Date().getFullYear(),
                //month是希望跳转到的月
                month:new Date().getMonth()+1,
                //day是希望跳转到的日
                day:new Date().getDate(),
                //hour是希望跳转的小时
                hour:new Date().getHours(),
                //minute是希望跳转的分钟
                minute:new Date().getMinutes(),
                //second是希望跳转的秒
                second:new Date().getSeconds(),
                miao:0,
                visibleSet:true,
                visibleSpeed:true,
                //是否设置时间
                setTime:false,
                //是否显示设置时间
                isActive:false,
                //是否显示虚拟时间
                current:true,
                //当前的虚拟时间[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
                currentVirtualTime: new Date(),
                //设置时间流速:0是按秒正常算 1是按分钟算 2是按小时算 3是按日算 4是按月算 5是按年算
                timeSpeed:0,
                //是否设置时间流速
                setSpeed:false,
                //时间流速对应的时间戳 1是一秒，60是一分钟，3600是一小时，86400是一天，2592000是一个月，31104000是一年
                speedStamp:1,

            }
        },
        methods: {
            showOverlay(){
                this.year=this.currentVirtualTime.getFullYear();
                this.month=this.currentVirtualTime.getMonth()+1;
                this.day=this.currentVirtualTime.getDate();
                this.hour=this.currentVirtualTime.getHours();
                this.minute=this.currentVirtualTime.getMinutes();
                this.second=this.currentVirtualTime.getSeconds();

                this.isActive=true;
                this.current=false;
            },
            hideOverlay(){
                this.isActive=false;
                this.current=true;
            },
            //点击设置流速
            showSpeed(){
                this.setSpeed=true;
                this.visibleSet=false;
                this.visibleSpeed=false;
            },
            hideSpeed(){
              this.setSpeed=false;
              this.visibleSet=true;
              this.visibleSpeed=true;
            },
            //时间流速对应的时间戳 1是一秒，60是一分钟，3600是一小时，86400是一天，2592000是一个月，31104000是一年
            setSecondSpeed(){
                this.timeSpeed=0;
                this.speedStamp=1;
            },
            setMinuteSpeed(){
                this.timeSpeed=1;
                this.speedStamp=60;
            },
            setHourSpeed(){
                this.timeSpeed=2;
                this.speedStamp=3600;
            },
            setDaySpeed(){
                this.timeSpeed=3;
                this.speedStamp=86400;
            },
            setMonthSpeed(){
                this.timeSpeed=4;
                this.speedStamp=2592000;
            },
            setYearSpeed(){
                this.timeSpeed=5;
                this.speedStamp=31104000;
            },
            fun() {
                // this.year=new Date().getFullYear();
                // this.month=new Date().getMonth()+1;
                // this.day=new Date().getDate();
                // this.hour=new Date().getHours();
                // this.minute=new Date().getMinutes();
                // this.second=new Date().getSeconds();
                let date = new Date();
                let newDateString=this.year.toString()+"/"+this.month.toString()+"/"+this.day.toString()+" "+this.hour.toString()+":"+this.minute.toString()+":"+this.second.toString();
                let newDate=new Date(newDateString);

                //===============================================
                //以下只能按天改变
                //计算出date和newDate之间相差的天数days
                //然后date.set(date.getDate()+this.days);

                // let days=Math.round(Math.abs(newDate-date)/86400000);
                //
                // console.log("wwwwwwwww");
                // console.log(newDate.toLocaleString());
                // console.log(date.toLocaleString());
                // console.log("相差天数");
                // console.log(days);
                //
                // //修改date为设置的时间
                // date.setDate(date.getDate()+days);

                //===================================
                //以下按秒改变
                //设置时间的时间戳
                let newStamp=newDate.getTime();
                //一秒的时间戳
                //1000
                //一小时的时间戳
                //3600000
                //一天的时间戳
                //86400000
                //一个月的时间戳
                //2592000000
                //一年的时间戳
                //31104000000

                // console.log(newStamp+this.miao);
                // date=new Date(newStamp+this.miao);
                // console.log("aaaaaaaaaaaaaaaaaaaaaa");
                // console.log(date);
                if(!this.isActive){
                    for(let i=1;i<=this.speedStamp;i++){
                        this.miao=this.miao+1000;
                        date=new Date(newStamp+this.miao);
                        if(date.getHours()===0 && date.getMinutes()===0 && date.getSeconds()===0){
                            console.log(date.toLocaleString());
                            console.log("零点了！！！");
                        //    零点的时候要向后端调用排程方法
                            this.postSchedule();
                        }
                    }
                    // this.miao=this.miao+86400000;
                }
                this.currentVirtualTime=date;

                let y=date.getFullYear();
                let mo=date.getMonth() + 1;
                let d =date.getDate();
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                this.time = y + "/" + mo + "/" + d + " " + h + ":" + m+":"+s;

            },
            // // 计算用时 startTime为开始时间 字符串格式‘2020-10-29 14:00:00’或者Date格式都可以
            countTime (startTime) {
                if (!startTime) return;
                let start_time = new Date(startTime);
                let _this = this;
                this.timer = setInterval(() => {
                    let millisecond = new Date() - start_time;
                    let h = Math.floor(millisecond / (60 * 60 * 1000));
                    h = h < 10 ? '0' + h : h;
                    let min = Math.floor(millisecond % (60 * 60 * 1000) / (60 * 1000));
                    min = min < 10 ? '0' + min : min;
                    let sec = Math.floor(millisecond % (60 * 60 * 1000) % (60 * 1000) / 1000);
                    sec = sec < 10 ? '0' + sec : sec;
                    _this.count_time = h + ':' + min + ':' + sec
                }, 1000)
            },
            postSchedule(){
                let postYear=this.currentVirtualTime.getFullYear();
                let postMonth=this.currentVirtualTime.getMonth()+1;
                let postDay=this.currentVirtualTime.getDate();
                // let postHour=this.currentVirtualTime.getHours();
                // let postMinute=this.currentVirtualTime.getMinutes();
                // let postSecond=this.currentVirtualTime.getSeconds();

                let postDateString=postYear+"/"+postMonth+"/"+postDay+" 00:00:00";

                this.$axios.post('/schedule',{
                    params:{
                        date: postDateString
                    }
                }).then(response => {
                    console.log("发送时间");
                    console.log(postDateString);
                    console.log("成功");
                    console.log(response);
                }).catch(err => {
                    alert('请求失败')
                })
            }
        },
        mounted() {
            //最后的timeout,大概1000是过去1秒[980更准一点]
            //越小越快,越大越慢
            window.setInterval(() => {
                setTimeout(this.fun, 0);
                //向父组件传值
                this.$emit('current-virtual-time',this.currentVirtualTime);
                if((this.$route.path.toString())==="/page4"){
                    this.setTime=true;
                }else{
                    this.setTime=false;
                }

                //每到当前虚拟时间的00:00:00,就调用和后端交互的一个接口,但是没有返回值

            }, 980)


        },
        created () {
            // 调用时机根据需求
            this.countTime(this.start_time)
        },
        //在Vue实例销毁前，清除定时器
        beforeDestroy () {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
    }
</script>

<style scoped>
    .time{
        /*height: 50px;*/
        /*width:350px;*/
        /*float: right;*/
    }
    .inYear{
        /*border: none;*/
        border-bottom: #2c3e50 1px solid;
        border-top: none;
        border-right: none;
        border-left:none;
        border-radius: 0;

        width:65px;
        height:30px;
        align-items: center;
    }
    .in{
        /*border: none;*/
        border-bottom: #2c3e50 1px solid;
        border-top: none;
        border-right: none;
        border-left:none;
        border-radius: 0;

        width:50px;
        height:30px;
        align-items: center;
    }
    .overlay{
        width: 500px;
        margin: 0 auto;
        /*border: #c0ccda 2px solid;*/
    }

</style>