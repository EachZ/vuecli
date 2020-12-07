<template>
    <div>
        <h1>zzzjr</h1>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "latePage",
        data() {
            return {
                target: 'http://123.57.239.79:3180',
                name:(this.$route.query.name),
            };
        },
    }
</script>

<style scoped>

</style>