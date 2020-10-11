<template>
    <div>
        <h1>页面3</h1>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
        <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
        <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
        <div>
            <Gantt2
                    ref="ganttchart"
                    class="left-container"
                    :tasks="dataSource"
                    style="height:720px;"
            ></Gantt2>
        </div>
    </div>
</template>

<script>
    import Gantt2 from "@/components/Gantt2";

    export default {
        name: "page3",
        components: {Gantt2},
        data(){
            return{
                dataSource: {
                    data: []
                },

            }


        }

    }
</script>

<style scoped>

</style>