<template>
    <div>
<!--        {{href}}-->
<!--        <div>-->
<!--            {{tempHref}}-->
<!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: "temp",
        props:{
            href:{
                type:String,
                required:true
            }
        },
        date(){
            return{
                tempHref:"http://localhost:8081/#/temp",
                tempDay:new Date().getDate(),
            }
        },
        mounted(){
            window.setInterval(() => {
                //tempHref用于保存href之前的值
                this.tempHref=this.href;
                // console.log("tempHref");
                // console.log(this.tempHref);
                //如果变成新的一天了，就改变网址里day参数的值
                // if(this.tempHref.indexOf("day")!==-1){
                //     let str = this.tempHref.match(/(\S*)day/)[1];
                //     this.tempHref=str+"day="+this.day
                //     window.location=this.tempHref;
                // }
                // console.log("--------------------");
                // console.log(this.href);
            },10000)

        }
    }
</script>

<style scoped>

</style>