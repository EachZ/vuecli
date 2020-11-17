<template>
    <div>
        <a-button class="editable-add-btn" type="primary" @click="handleAdd">
            <a-icon type="plus" />Add
        </a-button>
        <a-table :columns="columns" :data-source="data" bordered>
            <template
                    v-for="col in ['orderNumber','orderId','materialCoding','count','state','deadline','remainingCount']"
                    :slot="col"
                    slot-scope="text, record"
            >
                <div :key="col">
                    <a-input
                            v-if="record.editable"
                            style="margin: -5px 0"
                            :value="text"
                            @change="e => handleChange(e.target.value, record.key, col)"
                    />
                    <template v-else>
                        {{ text }}
                    </template>
                </div>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                    <span v-if="record.editable">
                      <a @click="() => save(record.key)">Save</a>
                      <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                        <a>Cancel</a>
                      </a-popconfirm>
                    </span>
                                <span v-else>
                      <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
                    </span>
                </div>
                <div class="editable-row-operations">
                    <a-popconfirm
                            v-if="data.length"
                            title="Sure to delete?"
                            @confirm="() => onDelete(record.key)"
                    >
                        <a href="javascript:;">Delete</a>
                    </a-popconfirm>
                </div>

            </template>

        </a-table>
    </div>
</template>

<script>
    const columns = [
        {
            title: 'orderNumber',
            dataIndex: 'orderNumber',
            scopedSlots: { customRender: 'orderNumber' },
        },
        {
            title: 'orderId',
            dataIndex: 'orderId',
            scopedSlots: { customRender: 'orderId' },
        },
        {
            title: 'materialCoding',
            dataIndex: 'materialCoding',
            scopedSlots: { customRender: 'materialCoding' },
        },
        {
            title: 'count',
            dataIndex: 'count',
            scopedSlots: { customRender: 'count' },
        },
        {
            title: 'state',
            dataIndex: 'state',
            scopedSlots: { customRender: 'state' },
        },
        {
            title: 'deadline',
            dataIndex: 'deadline',
            scopedSlots: { customRender: 'deadline' },
        },
        {
            title: 'remainingCount',
            dataIndex: 'remainingCount',
            scopedSlots: { customRender: 'remainingCount' },
        },
        // {
        //     title: 'name',
        //     dataIndex: 'name',
        //     width: '25%',
        //     scopedSlots: { customRender: 'name' },
        // },
        // {
        //     title: 'age',
        //     dataIndex: 'age',
        //     width: '15%',
        //     scopedSlots: { customRender: 'age' },
        // },
        // {
        //     title: 'address',
        //     dataIndex: 'address',
        //     width: '40%',
        //     scopedSlots: { customRender: 'address' },
        // },
        {
            title: 'operation',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
        },
    ];

    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            key: i.toString(),
            // name: `Edrward ${i}`,
            // age: 32,
            // address: `London Park no. ${i}`,
            orderId : i.toString(),
            orderNumber: 418477+i,
            materialCoding: "3246515",
            count: 7700+i,
            deadline: "2018-11-09 23:59:59",
            remainingCount: "7700",
            state: i
        });
    }
    export default {
        data() {
            this.cacheData = data.map(item => ({ ...item }));
            return {
                data,
                columns,
                editingKey: '',
                count: 5,
            };
        },
        methods: {
            //增加一个订单
            handleAdd() {
                const { count, data } = this;
                const newData = {
                    key: count,
                    orderId : count,
                    orderNumber: 418477+count,
                    materialCoding: "新加的",
                    count: 7700+count,
                    deadline: "",
                    remainingCount: "",
                    state: 0
                };
                this.data = [...data, newData];
                this.count = count + 1;
            },
            //删除一个订单
            onDelete(key) {
                const data = [...this.data];
                this.data = data.filter(item => item.key !== key);
            },
            handleChange(value, key, column) {
                const newData = [...this.data];
                const target = newData.filter(item => key === item.key)[0];
                if (target) {
                    target[column] = value;
                    this.data = newData;
                }
            },
            //修改一个订单
            edit(key) {
                const newData = [...this.data];
                const target = newData.filter(item => key === item.key)[0];
                this.editingKey = key;
                if (target) {
                    target.editable = true;
                    this.data = newData;
                }
            },
            //修改一个订单后进行保存
            save(key) {
                alert("save");
                //此处保存值，要将修改后的值返回
                const newData = [...this.data];
                const newCacheData = [...this.cacheData];
                const target = newData.filter(item => key === item.key)[0];
                const targetCache = newCacheData.filter(item => key === item.key)[0];
                if (target && targetCache) {
                    delete target.editable;
                    this.data = newData;
                    Object.assign(targetCache, target);
                    this.cacheData = newCacheData;
                }
                this.editingKey = '';
            },
            //修改一个订单后选择取消修改
            cancel(key) {
                const newData = [...this.data];
                const target = newData.filter(item => key === item.key)[0];
                this.editingKey = '';
                if (target) {
                    Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
                    delete target.editable;
                    this.data = newData;
                }
            },
        },
    };
</script>

<style scoped>
    .editable-row-operations a {
        margin-right: 8px;
    }
    .editable-add-btn{
        background-color: #42b983;
        border:none;
    }
</style>