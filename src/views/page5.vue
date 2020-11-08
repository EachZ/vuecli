<template>
    <div>
        <div id="nav">
            <router-link :to="{path:'/table1'}">表1</router-link> |
            <router-link :to="{path:'/table2'}">表2</router-link> |
            <router-link :to="{path:'/table3'}">表3</router-link> |
            <router-link :to="{path:'/table4'}">表4</router-link>

        </div>
        <!--        四个表格-->
<!--        <div>-->
<!--            <TryTable></TryTable>-->
<!--            <br/>-->
<!--        </div>-->
<!--        第一个表格-->
<!--        <div class="table1">-->
<!--            <Table1></Table1>-->
<!--            <br/>-->
<!--        </div>-->

<!--        第二个表格-->
<!--        <div class="table2">-->
<!--            <Table2></Table2>-->
<!--            <br/>-->
<!--        </div>-->

<!--        第三个表格-->
<!--        <div class="table3">-->
<!--            <Table3></Table3>-->
<!--            <br/>-->
<!--        </div>-->

<!--        第四个表格-->
<!--        <div class="table4">-->
<!--            <Table4></Table4>-->
<!--            <br/>-->
<!--        </div>-->
        <router-view/>
    </div>
</template>

<script>
    // import Table1 from '../components/table1'
    // import Table2 from '../components/table2'
    // import Table3 from '../components/table3'
    // import Table4 from '../components/table4'
    // import TryTable from '../components/tryTable'


    export default {
        // components: {Table1,Table2,Table3,Table4},
    }
    // const columns = [
    //     {
    //         dataIndex: 'name',
    //         key: 'name',
    //         slots: { title: 'customTitle' },
    //         scopedSlots: { customRender: 'name' },
    //     },
    //     {
    //         title: 'Age',
    //         dataIndex: 'age',
    //         key: 'age',
    //     },
    //     {
    //         title: 'Address',
    //         dataIndex: 'address',
    //         key: 'address',
    //     },
    //     {
    //         title: 'Tags',
    //         key: 'tags',
    //         dataIndex: 'tags',
    //         scopedSlots: { customRender: 'tags' },
    //     },
    //     {
    //         title: 'Action',
    //         key: 'action',
    //         scopedSlots: { customRender: 'action' },
    //     },
    // ];
    //
    // const data = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sidney No. 1 Lake Park',
    //         tags: ['cool', 'teacher'],
    //     },
    // ];
    //
    // export default {
    //     data() {
    //         return {
    //             data,
    //             columns,
    //         };
    //     },
    // };
</script>

<style scoped>
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
</style>