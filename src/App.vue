<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">订单计划表</router-link> |
      <router-link to="/table2">订单-生产单关系表</router-link> |
      <router-link to="/table3">生产单表</router-link> |
      <router-link to="/table4">生产单-资源关系表</router-link> |

      <router-link :to="{path:'/home',query:{year:this.year,month:this.month,day:this.day}}">资源负载图</router-link> |
<!--      <router-link to="/about">About</router-link> |-->
      <router-link :to="{path:'/page1',query:{year:this.year,month:this.month,day:this.day}}">订单甘特图</router-link> |
      <router-link :to="{path:'/page2'}">资源甘特图</router-link> |
<!--      <router-link :to="{path:'/page3'}">增删改查</router-link> |-->
      <router-link :to="{path:'/page4'}">设置时间</router-link>
<!--      <router-link to="/page6">实验页面</router-link> |-->
<!--      <router-link to="/page7">甘特图实验</router-link>-->
      <Time @current-virtual-time="getTime"></Time>

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
  export default{
    // components: {Clock},
    components:{Time},
    data(){
      return{
        currentVirtualTime: new Date(),
        year: new Date().getFullYear,
        month: new Date().getMonth()+1,
        day: new Date().getDate(),
      }
    },
    methods:{
      getTime(data){
        this.currentVirtualTime=data;
        this.year=data.getFullYear();
        this.month=data.getMonth()+1;
        this.day=data.getDate();
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
  padding: 30px;
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
