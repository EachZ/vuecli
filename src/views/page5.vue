<template>
    <div>
<!--        四个表格-->
<!--        <div>-->
<!--            <TryTable></TryTable>-->
<!--            <br/>-->
<!--        </div>-->
<!--        第一个表格-->
        <div class="table1">
            <Table1></Table1>
            <br/>
<!--            <a-table :columns="columns" :data-source="data">-->
<!--                <a slot="name" slot-scope="text">{{ text }}</a>-->
<!--                <span slot="customTitle"><a-icon type="smile-o" /> Name</span>-->
<!--                <span slot="tags" slot-scope="tags">-->
<!--      <a-tag-->
<!--              v-for="tag in tags"-->
<!--              :key="tag"-->
<!--              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"-->
<!--      >-->
<!--        {{ tag.toUpperCase() }}-->
<!--      </a-tag>-->
<!--    </span>-->
<!--                <span slot="action" slot-scope="text, record">-->
<!--      <a>Invite 一 {{ record.name }}</a>-->
<!--      <a-divider type="vertical" />-->
<!--      <a>Delete</a>-->
<!--      <a-divider type="vertical" />-->
<!--      <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>-->
<!--    </span>-->
<!--            </a-table>-->
        </div>

<!--        第二个表格-->
        <div class="table2">
            <Table2></Table2>
            <br/>
        </div>

<!--        第三个表格-->
        <div class="table3">
            <Table3></Table3>
            <br/>
        </div>

<!--        第四个表格-->
        <div class="table4">
            <Table4></Table4>
            <br/>
        </div>

    </div>
</template>

<script>
    import Table1 from '../components/table1'
    import Table2 from '../components/table2'
    import Table3 from '../components/table3'
    import Table4 from '../components/table4'
    // import TryTable from '../components/tryTable'


    export default {
        components: {Table1,Table2,Table3,Table4},
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

</style>