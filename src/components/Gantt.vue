<template>
    <div ref="gantt"></div>
</template>

<script>
    import {gantt} from 'dhtmlx-gantt';
    export default {
        name: 'gantt',
        props: {
            tasks: {
                type: Object,
                default () {
                    return {data: [], links: []}
                }
            }
        },

        mounted: function () {
            gantt.config.xml_date = "%Y-%m-%d";
            // 在时间线上增加一行年份显示
            gantt.config.subscales = [
                {
                    unit: 'year',
                    step: 1,
                    date: '%Y'
                }
            ];


            gantt.init(this.$refs.gantt);

            gantt.createDataProcessor((entity, action, data, id) => {
                this.$emit(`${entity}-updated`, id, action, data);
            });

            gantt.parse(this.$props.tasks);

        }
    }
</script>

<style>
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>