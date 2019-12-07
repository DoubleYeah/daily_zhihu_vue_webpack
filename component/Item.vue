<template>
    <a class="daily-item">
        <div class="daily-item-img" v-if="data.images||data.image">
            <img :src="storyImgUrl">
        </div>
        <div class="daily-item-title"
            :class="{noImg: (!data.images && !data.image)}">{{data.title}}
        </div>
    </a>
</template>
<script>
import $ from '../util'
export default {
    props:{
        data: {
            type : Object
        },
    },
    data() {
        return {
            imgPath: $.imgPath
        }
    },
    computed: {
        storyImgUrl() {
            return this.data.image || this.data.images[0];
        }
    }    
}
</script>
<style scoped>
.daily-item{
    display: block;
    color: inherit;
    text-decoration: none;
    padding: 16px;
    cursor: pointer;
    transition: all .3s ease-in-out;
    overflow: hidden;
}
.daily-item:hover{
    background: #e3e8ee;
}
.daily-item-img{
    width: 80px;
    height: 80px;
    float: left;
}
.daily-item-img img{
    width: 100%;
    height: 100%;
    border-radius: 3px;
}
.daily-item-title{
    padding: 10px 5px 10px 90px;
}
.daily-item-title.onImg{
    /* padding-left: 5px; */
}
</style>