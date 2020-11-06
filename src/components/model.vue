<template>
    <div class="overlay" v-show="isactive">
    <div class="con">
        <h2 class="title">新增 | 修改</h2>
        <div class="content">
            <table>
                <tr>
                    <td>订单号</td>
                    <td><input type="text" v-model="modifylist.username"></td>
                </tr>
                <tr>
                    <td>人员/设备</td>
                    <td><input type="text" v-model="modifylist.email"></td>
                </tr>
<!--                <tr>-->
<!--                    <td>性别</td>-->
<!--                    <td>-->
<!--                        <label><input type="radio" name="sex" value="男" v-model="modifylist.sex">男</label>-->
<!--                        <label><input type="radio" name="sex" value="女" v-model="modifylist.sex">女</label>-->
<!--                        <label><input type="radio" name="sex" value="未知" v-model="modifylist.sex">未知</label>-->
<!--                    </td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td>省份</td>-->
<!--                    <td>-->
<!--                        <select name="" id="" v-model="modifylist.province">-->
<!--                            <option value="北京市">北京市</option>-->
<!--                            <option value="河北省">河北省</option>-->
<!--                            <option value="河南省">河南省</option>-->
<!--                            <option value="重庆市">重庆市</option>-->
<!--                            <option value="广东省">广东省</option>-->
<!--                            <option value="辽宁省">辽宁省</option>-->
<!--                        </select>-->
<!--                    </td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td>爱好</td>-->
<!--                    <td>-->
<!--                        <label><input type="checkbox" v-model="modifylist.hobby" value="篮球">篮球</label>-->
<!--                        <label><input type="checkbox" v-model="modifylist.hobby" value="读书">读书</label>-->
<!--                        <label><input type="checkbox" v-model="modifylist.hobby" value="插画">插画</label>-->
<!--                        <label><input type="checkbox" v-model="modifylist.hobby" value="编程">编程</label>-->
<!--                        <label><input type="checkbox" v-model="modifylist.hobby" value="弹琴">弹琴</label>-->
<!--                    </td>-->
<!--                </tr>-->
            </table>
            <p>
                <input type="button" @click="changeActive" value="取消">
                <input type="button" @click="modify" value="保存">
            </p>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: "model",
        props: ['list', 'isactive'],
        computed: {
            modifylist() {
                return this.list;
            }
        },
        methods: {
            changeActive() {
                this.$emit('change');
            },
            modify() {
                this.$emit('modify', this.modifylist);
            }
        }
    }
</script>

<style scoped>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 6;
        background: rgba(0, 0, 0, 0.7);
    }
    .overlay td:first-child {
        width: 66px;
    }
    .overlay .con {
        position: absolute;
        width: 420px;
        min-height: 300px;
        background: #fff;
        left: 50%;
        top: 50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        /*margin-top: -150px;*/
        padding: 20px;
    }
</style>