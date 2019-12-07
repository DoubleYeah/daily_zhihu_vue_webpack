<template>
<div>
    <p>{{message}}</p>
    <img src="./src/img/test.jpg">
</div>
</template>
<script>
export default {
    data(){
        return {
            message: "Hello World"
        }
    }
}
</script>
<style scoped>
    p{
        color: aqua;
        font-size: 24px;
    }
</style>