<template>
    <div class="daily-article">
        <div class="daily-article-title">
            {{data.title}}
        </div>
        <div class="daily-article-content" v-html="data.body">
        </div>
        <div class="daily-comments" v-if="comments.length">
            <span>评论({{comments.length}})</span>
            <div class="daily-comment" v-for="comment in comments" :key="comment.id">
                <div class="daily-avatar">
                    <img :src="comment.avatar">
                </div>
                <div class="daily-comment-content">
                    <div class="daily-comment-name">{{comment.author}}
                    </div>
                    <div class="daily-comment-time">{{commentTime - comment.time | formatDate}}
                    </div>
                    <div class="daily-comment-text">{{comment.content}}
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import $ from "../util"
export default {
    props: {
        storyId: {
            type: Number,
            default: 0
        },
        storyDate: {
            type: String,
            default: "19700101"
        }
    },
    data() {
        debugger
        return {
            data: {},
            comments: [],
            commentTime: null
        }
    },
    watch: {
        storyId (val) {
            debugger
            if (val){
                this.getArticle();
                this.getComments();
            }
            const base = new Date();
            base.setHours(0);
            base.setMinutes(0);
            base.setSeconds(0);
            base.setMilliseconds(0);
            this.commentTime = base.getTime();
        }
    },
    methods: {
        getArticle() {
            $.ajax.get("story/" + this.storyId).then(res => {
                // 未替换图片代理

                this.data = res;
                window.scrollTo(0, 0);
            })
        },
        getComments() {
            $.ajax.get("story/" + this.storyId + "/short-comments").then(res => {
                if (!res) console.error("Get Comments Error");
                this.comments = res.comments;
            })
        }
    },
    computed: {
    },
    filters: {
        formatDate(time){
            const date = new Date(time);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const hour = date.getHours();
            const minutes = date.getMinutes();
            return `${month}月${day}日${hour}小时${minutes}分钟`;
        }
    }
}
</script>

<style scoped>
.daily-article-title{
    font-size: 28px;
    font-weight: bold;
    color: #222;
    padding: 10px 0;
}
.daily-comments{
    margin: 10px 0;
}
.daily-comments span{
    display: block;
    margin: 10px 0;
    font-size: 20px;
}
.daily-avatar{
    width: 50px;
    height: 50px;
    float: left;
}
.daily-avatar img{
    width: 100%;
    height: 100%;
    border-radius: 3px;
}
.daily-comment{
    overflow: hidden;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #e3e8ee;
}
.daily-comment-time{
    color: #9ea7b4;
    font-size: 14px;
    margin-top: 5px;
}
.daily-comment-text{
    margin-top: 10px;
}
</style>