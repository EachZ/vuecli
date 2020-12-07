<template>
    <div>
        <h2>订单号：{{name}}</h2>
        <h3>该订单被限制在【装配】</h3>
    </div>
</template>

<script>
    export default {
        name: "latePage",
        data() {
            return {
                target: 'http://123.57.239.79:3180',
                name:window.location.href.split("=")[1],
            };
        },
    }
</script>

<style scoped>

</style>