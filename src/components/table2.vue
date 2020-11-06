<template>
    <div>
        <h1>2. 订单-生产单关系表</h1>
        <a-table :columns="columns" :data-source="data" bordered :rowClassName="rowClassName"></a-table>

    </div>
</template>
<script>
    const renderContent = (value) => {
        const obj = {
            children: value,
            attrs: {},
        };
        return obj;
    };

    const data = [
        {
            key: "1",
            orderNumber: "order1",
            productNumber: "order1-production1",
        },
        {
            key: "2",
            orderNumber: "order1",
            productNumber: "order1-production2",
        },
        {
            key: "3",
            orderNumber: "order1",
            productNumber: "order1-production3",
        },
        {
            key: "4",
            orderNumber: "order2",
            productNumber: "order2-production1",
        },
        {
            key: "5",
            orderNumber: "order3",
            productNumber: "order3-production1",
        },
        {
            key: "6",
            orderNumber: "order3",
            productNumber: "order3-production2",
        },
        {
            key: "7",
            orderNumber: "order3",
            productNumber: "order3-production3",
        },
    ];

    export default {
        data() {
            return {
                data,
                columns: [],
            };
        },
        created() {
            this.columns = [
                {
                    title: "订单号",
                    dataIndex: "orderNumber",
                    key: "orderNumber",
                    //customRender这个函数返回要合并的数据
                    customRender(_, row) {
                        return {
                            children: row.orderNumber,
                            attrs: {
                                rowSpan: row.orderNumberRowSpan,
                            },
                        };
                    },
                },
                {
                    title: "生产单号",
                    dataIndex: "productNumber",
                    key: "productNumber",
                    customRender: renderContent,
                },
            ];
            this.rowSpan("orderNumber");
        },
        methods: {
            // 合并单元格，这里我抽出了一个函数，调用的时候只需要将dataIndex作为参数传入即可
            rowSpan(key) {
                let arr = this.data
                    .reduce((result, item) => {
                        if (result.indexOf(item[key]) < 0) {
                            result.push(item[key]);
                        }
                        return result;
                    }, [])
                    .reduce((result, keys) => {
                        const children = this.data.filter((item) => item[key] === keys);
                        result = result.concat(
                            children.map((item, index) => ({
                                ...item,
                                [`${key}RowSpan`]: index === 0 ? children.length : 0,
                            }))
                        );
                        return result;
                    }, []);
                this.data = arr;
            },
            rowClassName(record,index) {
                let className = "light-row";
                if (index % 2 === 1) className = "dark-row";
                return className;
            }
        },
    };
</script>

<style>
    .light-row {background-color: #fff;}
    .dark-row {background-color: #f2f4f5;}
</style>
