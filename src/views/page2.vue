<template>
    <div class="page2">
        <h1>页面2</h1>
        <el-progress type="dashboard" :percentage="percentage" :color="colors"></el-progress>
        <div>
            <el-button-group>
                <el-button icon="el-icon-minus" @click="decrease"></el-button>
                <el-button icon="el-icon-plus" @click="increase"></el-button>
            </el-button-group>
        </div>
        <div>
<!--            选择日期控件-->
            <div class="block">
                <span class="demonstration">默认</span>
                <br>
                <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">带快捷选项</span>
                <br>
                <el-date-picker
                        v-model="value2"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">周</span>
                <br>
                <el-date-picker
                        v-model="value1"
                        type="week"
                        format="yyyy 第 WW 周"
                        placeholder="选择周">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">月</span>
                <br>
                <el-date-picker
                        v-model="value2"
                        type="month"
                        placeholder="选择月">
                </el-date-picker>
            </div>
        </div>
        <div class="container">
            <div class="block">
                <span class="demonstration">年</span>
                <br>
                <el-date-picker
                        v-model="value3"
                        type="year"
                        placeholder="选择年">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">多个日期</span>
                <br>
                <el-date-picker
                        type="dates"
                        v-model="value4"
                        placeholder="选择一个或多个日期">
                </el-date-picker>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "page2",
        data() {
            return {
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
                value1: '',
                value2: '',
                value3: '',
                value4: ''
            };
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
            }
        }
    }
</script>

<style scoped>

</style>