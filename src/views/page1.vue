<!--<template>-->
<!--    <div class="page1">-->
<!--        <h1>页面1</h1>-->
<!--        <el-progress type="circle" :percentage="0"></el-progress>-->
<!--        <el-progress type="circle" :percentage="25"></el-progress>-->
<!--        <el-progress type="circle" :percentage="100" status="success"></el-progress>-->
<!--        <el-progress type="circle" :percentage="70" status="warning"></el-progress>-->
<!--        <el-progress type="circle" :percentage="50" status="exception"></el-progress>-->
<!--    </div>-->

<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "page1"-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
    <div class="container">
        <Gantt class="left-container" :tasks="tasks"></Gantt>
    </div>
</template>

<script>
    import Gantt from '../components/Gantt.vue';

    export default {
        name: 'app',
        components: {Gantt},
        data () {
            return {
                tasks: {
                    data: [
                        {id: 1, text: 'Task #1', start_date: '2020-01-17', duration: 3, progress: 0.6},
                        {id: 2, text: 'Task #2', start_date: '2020-01-20', duration: 3, progress: 0.4}
                    ],
                    links: [
                        {id: 1, source: 1, target: 2, type: '0'}
                    ]
                },
            }
        }
    }
</script>

<style>
    html, body {
        padding: 0px;
        margin: 0px;
        height: 90%;
    }
    .container {
        height: 100%;
        width: 100%;
    }
    .left-container {
        /*overflow: hidden;*/
        /*position: relative;*/
        /*height: 550px;*/
        width:100%;
        height:calc(100vh - 52px);
    }
</style>