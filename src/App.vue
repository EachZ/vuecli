<template>
  <div id="app">
    <div>
      <a-affix :offset-top="top">
        <a-menu v-model="current" mode="horizontal">
            <a-menu-item key="clock">
                <router-link :to="{path:'/'}"><a-icon type="clock-circle" />设置时间</router-link>
            </a-menu-item>
          <a-sub-menu>
          <span slot="title" class="submenu-title-wrapper"><a-icon type="table" />输出表单</span>
              <a-menu-item key="table:1">
                <router-link :to="{path:'/table1',query:{year:this.year,month:this.month,day:this.day}}">订单计划表</router-link>
              </a-menu-item>
              <a-menu-item key="table:2">
                <router-link :to="{path:'/table2',query:{year:this.year,month:this.month,day:this.day}}">订单-生产单关系表</router-link>
              </a-menu-item>
              <a-menu-item key="table:3">
                <router-link :to="{path:'/table3',query:{year:this.year,month:this.month,day:this.day}}">生产单表</router-link>
              </a-menu-item>
              <a-menu-item key="table:4">
                <router-link :to="{path:'/table4',query:{year:this.year,month:this.month,day:this.day}}">生产单-资源关系表</router-link>
              </a-menu-item>
          </a-sub-menu>
          <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper"><a-icon type="bar-chart" />资源图表</span>
              <a-sub-menu key="graph:1" title="资源负载图">
                  <a-menu-item key="graph:1-1">
                      <router-link :to="{path:'/resourceLoadGraph',query:{year:this.year,month:this.month,day:this.day}}">人员&设备负载图</router-link>
                  </a-menu-item>
                  <a-menu-item key="graph:1-2">
                      <router-link :to="{path:'/staffResourceLoadGraph',query:{year:this.year,month:this.month,day:this.day}}">人员负载图</router-link>
                  </a-menu-item>
                  <a-menu-item key="graph:1-3">
                      <router-link :to="{path:'/deviceResourceLoadGraph',query:{year:this.year,month:this.month,day:this.day}}">设备负载图</router-link>
                  </a-menu-item>
              </a-sub-menu>
            <a-menu-item key="graph:2">
              <router-link :to="{path:'/orderGanttGraph',query:{year:this.year,month:this.month,day:this.day}}">订单甘特图</router-link>
            </a-menu-item>
              <a-sub-menu key="graph:3" title="资源甘特图">
                  <a-menu-item key="graph:3-1">
                      <router-link :to="{path:'/resourceGanttGraph',query:{year:this.year,month:this.month,day:this.day}}">人员&设备甘特图</router-link>
                  </a-menu-item>
                  <a-menu-item key="graph:3-2">
                      <router-link :to="{path:'/staffResourceGanttGraph',query:{year:this.year,month:this.month,day:this.day}}">人员甘特图</router-link>
                  </a-menu-item>
                  <a-menu-item key="graph:3-3">
                      <router-link :to="{path:'/deviceResourceGanttGraph',query:{year:this.year,month:this.month,day:this.day}}">设备甘特图</router-link>
                  </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-menu-item key="routingPage">
                <router-link :to="{path:'/routing'}"><a-icon type="cluster" />工艺路线</router-link>
            </a-menu-item>
            <a-sub-menu>
                <span slot="title" class="submenu-title-wrapper"><a-icon type="schedule" />管理资源</span>
                <a-menu-item key="orderPage">
                    <router-link :to="{path:'/orderPage',query:{year:this.year,month:this.month,day:this.day}}">管理订单</router-link>
                </a-menu-item>
    <!--            <a-sub-menu>-->
    <!--                <span slot="title" class="submenu-title-wrapper"><a-icon type="team" />管理人员</span>-->
                <a-menu-item key="staffPage">
                    <router-link :to="{path:'/staffPage',query:{year:this.year,month:this.month,day:this.day}}">管理人员</router-link>
                </a-menu-item>
    <!--                <a-menu-item key="staff:2">-->
    <!--                    <router-link :to="{path:'/addStaffPage',query:{year:this.year,month:this.month,day:this.day}}">新增人员</router-link>-->
    <!--                </a-menu-item>-->
    <!--                <a-menu-item key="staff:3" disabled>-->
    <!--                    <router-link :to="{path:'/modifyStaffPage',query:{year:this.year,month:this.month,day:this.day}}">修改人员</router-link>-->
    <!--                </a-menu-item>-->
    <!--                <a-menu-item key="staff:4" disabled>-->
    <!--                    <router-link :to="{path:'/deleteStaffPage',query:{year:this.year,month:this.month,day:this.day}}">删除人员</router-link>-->
    <!--                </a-menu-item>-->
    <!--            </a-sub-menu>-->
                <a-menu-item key="devicePage">
                    <router-link :to="{path:'/devicePage',query:{year:this.year,month:this.month,day:this.day}}">管理设备</router-link>
                </a-menu-item>
            </a-sub-menu>


<!--          <a-menu-item key="try">-->
<!--            <router-link :to="{path:'/page8',query:{year:this.year,month:this.month,day:this.day}}"><a-icon type="bulb" />实验页面</router-link>-->
<!--          </a-menu-item>-->
<!--            <a-menu-item key="CRUD">-->
<!--                <router-link :to="{path:'/page3'}"><a-icon type="form" />增删改查废弃版本</router-link>-->
<!--            </a-menu-item>-->
<!--            <a-menu-item key="temp">-->
<!--                <router-link :to="{path:'/temp'}">temp</router-link>-->
<!--            </a-menu-item>-->

        </a-menu>
      </a-affix>

    </div>

    <div id="nav">
<!--      <router-link to="/">订单计划表</router-link> |-->
<!--      <router-link to="/table2">订单-生产单关系表</router-link> |-->
<!--      <router-link to="/table3">生产单表</router-link> |-->
<!--      <router-link to="/table4">生产单-资源关系表</router-link> |-->

<!--      <router-link :to="{path:'/home',query:{year:this.year,month:this.month,day:this.day}}">资源负载图</router-link> |-->
<!--      <router-link to="/about">About</router-link> |-->
<!--      <router-link :to="{path:'/page1',query:{year:this.year,month:this.month,day:this.day}}">订单甘特图</router-link> |-->
<!--      <router-link :to="{path:'/page2'}">资源甘特图</router-link> |-->
<!--      <router-link :to="{path:'/page3'}">增删改查</router-link> |-->
<!--      <router-link :to="{path:'/page4'}">设置时间</router-link>-->
<!--      <router-link to="/page6">实验页面</router-link> |-->
<!--      <router-link to="/page7">甘特图实验</router-link>-->
      <Time @current-virtual-time="getTime"></Time>
<!--        <Temp v-bind:href="href"></Temp>-->
    </div>
<!--    <div class="time">-->
<!--      <clock :time="time"></clock>-->
<!--    </div>-->

    <router-view/>

  </div>
</template>

<script>
  // import Clock from 'vue-clock2';
  import Time from './components/time'
  import Temp from './views/temp'
  export default{
    // components: {Clock},
      components:{Time},
      // components:{Time,Temp},
    data(){
      return{
        currentVirtualTime: new Date(),
        year: new Date().getFullYear,
        month: new Date().getMonth()+1,
        day: new Date().getDate(),
          //“昨天的日”
          tempDay:15,
          href:window.location.href,
        current: ['mail'],
      }
    },
    methods:{
      getTime(data){
        this.currentVirtualTime=data;
        this.year=data.getFullYear();
        this.month=data.getMonth()+1;
        this.day=data.getDate();
        //过了一天
        if(this.day!==this.tempDay){
            this.tempDay=this.day;
            //tempHref是当前的网址
            let tempHref=window.location.href;
            //如果路由网址里包含日期，就把day的值换成最新的，目的是在新一天刷新该页面，并且当前虚拟时间不受影响
            if(tempHref.indexOf("day")!==-1){
                let str = tempHref.match(/(\S*)day/)[1];
                tempHref=str+"day="+this.day;
                // tempHref="http://localhost:8081/#/home?year=2020&month=11&day=18";
                this.href=tempHref;
                // window.open(tempHref);
            }
            // console.log(tempHref);
            //href是传给temp页面的值

            // window.location=tempHref;
        }
        // console.log("APP.VUE:");
        // console.log(this.currentVirtualTime);
        // console.log("|||||||||||||||||||||||||||");
      }
    },
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  /*padding-top: 30px;*/
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

Time{
  float: right;
}

</style>
