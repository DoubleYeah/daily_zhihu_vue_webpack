<template>
    <div class="daily">
        <div class="daily-menu">
            <div class="daily-menu-item"
            :class="{ on: type === 'top_stories'}"
            @click="handleType('top_stories')">推荐故事</div>
            <div class="daily-menu-item"
            :class="{ on: type === 'stories'}"
            @click="handleType('stories')">今日热文</div>
        </div>
        <div class="daily-list"
            @scroll="handleScroll"
            ref="dailyList">
            <div class="daily-top-stories" v-if="showTop">
                <div class="daily-top-stories-day" v-for="stories in storiesData" :key="stories.date">
                    <div class="daily-date" v-if="stories.top_stories && stories.top_stories.length">{{stories.date | formatDay}}</div>
                    <daily-item v-for="story in stories.top_stories" :key="story.id" :data="story"
                        @click.native="handleClick(story.id, stories.date)"
                        :class="{ on: story.id === storyId && type === 'top_stories'}">
                    </daily-item>
                </div>
            </div>

            <div class="daily-stories" v-if="!showTop">
                <div class="daily-stories-day"  v-for="stories in storiesData" :key="stories.date">
                    <div class="daily-date">{{stories.date | formatDay}}</div>
                    <daily-item v-for="story in stories.stories" :key="story.id" :data="story"
                        @click.native="handleClick(story.id, stories.date)"
                        :class="{ on: story.id === storyId && type === 'stories'}">
                    </daily-item>
                </div>
                <div class="move-stories" @click="getMoreThemes">加载更多</div>
            </div>
        </div>
        <daily-article :storyId="storyId" :storyDate="storyDate"></daily-article>
    </div>
</template>

<script>
import $ from "../util"
import Item from "./Item"
import Article from "./Article"
export default {
    components:{
        "daily-item" : Item,
        "daily-article" : Article
    },
    data() {
        return {
            top_stories: [],
            stories: [],
            storiesData: [],
            showTop: true,
            type: "top_stories",
            storyId: null,
            storyDate: null,
            themeId: 0,
            dailyTime: null
        }
    },
    mounted() {
        this.getThemes();
        this.setDailyTime();
    },
    methods: {
        getThemes() {
            $.ajax.get("stories/latest").then((res) => {
                //res.top_stories
                //res.stories
                this.storiesData.push(res);
                // this.top_stories.push(res.top_stories);
                // this.stories.push(res.stories);
            })
        },
        getMoreThemes() {
            $.ajax.get("stories/before/" + this.getPreTime()).then((res) => {
                //res.top_stories
                //res.stories
                this.storiesData.push(res);
                // this.top_stories.push(res.top_stories);
                // this.stories.push(res.stories);
            })
        },
        handleType(type){
            this.type = type;
            this.showTop = "top_stories" === type;
        },
        handleClick(storyId, storyDate){
            this.storyId = storyId;
            this.storyDate = storyDate;
        },
        setDailyTime() {
            const base = new Date();
            base.setHours(0);
            base.setMinutes(0);
            base.setSeconds(0);
            base.setMilliseconds(0);
            this.dailyTime = base.getTime();
        },
        getPreTime(){
            this.dailyTime -= 86400000;
            let time = new Date(this.dailyTime);
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            return year + "" + month + "" + day;
        },
        handleScroll() {
            let list = this.$refs.dailyList;
            if (this.type === "top_stories" || this.isLoading) return;
            if (list.scrollTop + document.body.clientHeight >= list.scrollHeight){
                this.getMoreThemes();
            }
        }
    },
    filters: {
        formatDay(date) {
            let month = date.substr(4, 2);
            let day = date.substr(6, 2);
            let year = date.substr(0, 4);
            if (day.substr(0, 1) === 0) day = day.substr(1, 1);
            if (month.substr(0, 1) === 0) month = month.substr(1, 1);
            return `${month}月${day}日`;
        }
    }
}
</script>

<style>
    html, body{
        margin: 0;
        padding: 0;
        height: 100%;
        color: #657280;
        font-size: 16px;
    }
    .daily-menu{
        width: 150px;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        overflow: auto;
        background: #f5f7f9;
    }
    .daily-menu-item{
        font-size: 18px;
        text-align: center;
        margin: 5px 0;
        padding: 10px 0;
        cursor: pointer;
        border-right: 2px solid transparent;
        transition: all .3s ease-in-out;
    }
    .daily-menu-item:hover{
        background: #e3e8ee;
    }
    .daily-menu-item.on{
        border-right: 2px solid #3399ff
    }
    .daily-menu ul{
        list-style: none;
    }
    .daily-menu ul li a{
        display: block;
        color: inherit;
        text-decoration: none;
        padding: 5px 0;
        margin: 5px 0;
        cursor: pointer;
    }
    .daily-menu ul li a:hover, .daily-menu ul li a.on{
        color: #3399ff;
    }
    .daily-list{
        width: 300px;
        position: fixed;
        left: 150px;
        top: 0;
        bottom: 0;
        overflow: auto;
        border-right: 1px solid #d7dde4;
    }
    .daily-item{

    }
    .adily-item:hover{

    }
    .daily-date{
        text-align: center;
        margin: 10px 0;
    }
    .daily-article{
        margin-left: 450px;
        padding: 20px;
    }
    .daily-item{

    }
    .daily-item.on{

    }
    .view-more a{
        display: block;
        cursor: pointer;
        background: #f5f7f9;
        text-align: center;
        color: inherit;
        text-decoration: none;
        padding: 4px 0;
        border-radius: 3px;
    }
    .content img{
        display: block;
        margin: 1.4em auto;
    }
    .move-stories{
        padding: 10px 0;
        text-align: center;
        margin: 20px 0;
        background: #f5f7f9;
        color: inherit;
        text-decoration: none;
        border-radius: 3px;
    }
    .move-stories:hover{
        cursor: pointer;
    }
</style>