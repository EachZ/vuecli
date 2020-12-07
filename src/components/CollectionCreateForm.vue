<template>
<!--    <a-modal-->
<!--            :visible="visible"-->
<!--            title='Create a new collection'-->
<!--            okText='Create'-->
<!--            @cancel="() => { $emit('cancel') }"-->
<!--            @ok="() => { $emit('create') }"-->
<!--    >-->
<!--        <a-form layout='vertical' :form="form">-->
<!--            <a-form-item label='Title'>-->
<!--                <a-input-->
<!--                        v-decorator="[-->
<!--              'title',-->
<!--              {-->
<!--                rules: [{ required: true, message: 'Please input the title of collection!' }],-->
<!--              }-->
<!--            ]"-->
<!--                />-->
<!--            </a-form-item>-->
<!--            <a-form-item label='Description'>-->
<!--                <a-input-->
<!--                        type='textarea'-->
<!--                        v-decorator="['description']"-->
<!--                />-->
<!--            </a-form-item>-->
<!--            <a-form-item class='collection-create-form_last-form-item'>-->
<!--                <a-radio-group-->
<!--                        v-decorator="[-->
<!--              'modifier',-->
<!--              {-->
<!--                initialValue: 'private',-->
<!--              }-->
<!--            ]"-->
<!--                >-->
<!--                    <a-radio value='public'>Public</a-radio>-->
<!--                    <a-radio value='private'>Private</a-radio>-->
<!--                </a-radio-group>-->
<!--            </a-form-item>-->
<!--        </a-form>-->
<!--    </a-modal>-->
        <a-modal
                :visible="visible"
                title='Create a new collection'
                okText='Create'
                @cancel="() => { $emit('cancel') }"
                @ok="() => { $emit('create') }"
        >
<!--            <a-form :form="form" @submit="handleSubmit">-->
<!--                <a-form-item-->
<!--                        v-for="(k, index) in form.getFieldValue('keys')"-->
<!--                        :key="k"-->
<!--                        v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"-->
<!--                        :label="index === 0 ? 'Passengers' : ''"-->
<!--                        :required="false"-->
<!--                >-->
<!--                    <a-input-->
<!--                            v-decorator="[-->
<!--                  `names[${k}]`,-->
<!--                  {-->
<!--                    validateTrigger: ['change', 'blur'],-->
<!--                    rules: [-->
<!--                      {-->
<!--                        required: true,-->
<!--                        whitespace: true,-->
<!--                        message: 'Please input passenger\'s name or delete this field.',-->
<!--                      },-->
<!--                    ],-->
<!--                  },-->
<!--                ]"-->
<!--                            placeholder="passenger name"-->
<!--                            style="width: 60%; margin-right: 8px"-->
<!--                    />-->
<!--                    <a-icon-->
<!--                            v-if="form.getFieldValue('keys').length > 1"-->
<!--                            class="dynamic-delete-button"-->
<!--                            type="minus-circle-o"-->
<!--                            :disabled="form.getFieldValue('keys').length === 1"-->
<!--                            @click="() => remove(k)"-->
<!--                    />-->
<!--                </a-form-item>-->
<!--                <a-form-item v-bind="formItemLayoutWithOutLabel">-->
<!--                    <a-button type="dashed" style="width: 60%" @click="add">-->
<!--                        <a-icon type="plus" /> Add field-->
<!--                    </a-button>-->
<!--                </a-form-item>-->
<!--                <a-form-item v-bind="formItemLayoutWithOutLabel">-->
<!--                    <a-button type="primary" html-type="submit">-->
<!--                        Submit-->
<!--                    </a-button>-->
<!--                </a-form-item>-->
<!--            </a-form>-->
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
        </a-modal>
</template>

<script>
    let id = 0;
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
    // for (let i = 0; i < 5; i++) {
    //     data.push({
    //         key: i.toString(),
    //         // name: `Edrward ${i}`,
    //         // age: 32,
    //         // address: `London Park no. ${i}`,
    //         orderId : i.toString(),
    //         orderNumber: 418477+i,
    //         materialCoding: "3246515",
    //         count: 7700+i,
    //         deadline: "2018-11-09 23:59:59",
    //         remainingCount: "7700",
    //         state: i
    //     });
    // }

    export default {
        name: "CollectionCreateForm",
        props: ['visible'],
        data(){
            this.cacheData = data.map(item => ({ ...item }));
            return{
                data,
                columns,
                editingKey: '',
                count: 5,
                formItemLayout: {
                    labelCol: {
                        xs: { span: 24 },
                        sm: { span: 4 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 20 },
                    },
                },
                formItemLayoutWithOutLabel: {
                    wrapperCol: {
                        xs: { span: 24, offset: 0 },
                        sm: { span: 20, offset: 4 },
                    },
                },
            }
        },
        // beforeCreate() {
        //     this.form = this.$form.createForm(this, { name: 'form_in_modal' });
        // },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'dynamic_form_item' });
            this.form.getFieldDecorator('keys', { initialValue: [], preserve: true });
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
            /////////////////////////////////////////
            remove(k) {
                const { form } = this;
                // can use data-binding to get
                const keys = form.getFieldValue('keys');
                // We need at least one passenger
                if (keys.length === 1) {
                    return;
                }

                // can use data-binding to set
                form.setFieldsValue({
                    keys: keys.filter(key => key !== k),
                });
            },

            add() {
                const { form } = this;
                // can use data-binding to get
                const keys = form.getFieldValue('keys');
                const nextKeys = keys.concat(id++);
                // can use data-binding to set
                // important! notify form to detect changes
                form.setFieldsValue({
                    keys: nextKeys,
                });
            },

            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        const { keys, names } = values;
                        console.log('Received values of form: ', values);
                        console.log(
                            'Merged values:',
                            keys.map(key => names[key]),
                        );
                    }
                });
            },
        },
    }
</script>

<style scoped>
    .dynamic-delete-button {
        cursor: pointer;
        position: relative;
        top: 4px;
        font-size: 24px;
        color: #999;
        transition: all 0.3s;
    }
    .dynamic-delete-button:hover {
        color: #777;
    }
    .dynamic-delete-button[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }
</style>