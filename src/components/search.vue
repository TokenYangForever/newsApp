<template>
  <div class="search-page">
    <header class='search-header'><i class='news-iconarrow-left2' @click='backToHome'></i>搜新闻</header>
    <div class="search-box">
      <input id="search-input" type="search" @click='clickInput'>
      <button @click='searchNews'>搜索</button>
      <div class="record-box" v-show='showRecord'>
        <div class="record-item" v-for='(item, index) in searchRecord' v-if='index<5'>
          <p @click='useRecord(item)'>{{item}}</p>
        <i class='news-iconarrow-up-left2' @click='fillInput(item)'></i>
        </div>
        <div class="record-bottom">
          <div class="record-clear" @click='cleanRecord'>清除搜索历史</div>
          <div class="record-close" @click='closeRecord'>关闭</div>
        </div>
      </div>
    </div>



    <div class="main-news-item" v-for="(item, index) in newsList" :id='index' v-if='item.title' @click='clickNews(item.URL)'>
      <div class="news-item-pic" v-if='item.allPics'>
        <img :src='item.allPics'>
      </div>
      <div class="news-item-content">
        <h4 class="news-item-title">{{item.title}}</h4>
        <div class="news-item-source">
          <span class="news-author">{{item.author}}</span>
          <span class="news-comments"><i class='news-iconsmile'></i>{{item.comments}}</span>
        </div>
      </div>
    </div>

    <div class="nomore" v-show='shownoreulst'>
      没有找到相关内容
    </div>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'hello',
  mounted () {
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      newsList: [],
      shownoreulst: false,
      searchRecord: [],
      showRecord: false
    }
  },
  methods: {
    backToHome () {
      router.push({
        name: 'home'
      })
    },
    cleanRecord () {
      window.localStorage.clear('serRecord')
      this.showRecord = false
    },
    closeRecord () {
      this.showRecord = false
    },
    useRecord (val) {
      document.getElementById('search-input').value = val
      this.searchNews()
    },
    fillInput (val) {
      document.getElementById('search-input').value = val
    },
    clickInput () {
      if (window.localStorage) {
        if (window.localStorage.getItem('serRecord')) {
          this.searchRecord = window.localStorage.getItem('serRecord').split('&');
          this.showRecord = true;
        }
      }
    },
    searchNews () {
      let _this = this;
      let inputval = document.getElementById('search-input').value
      this.showRecord = false
      if (inputval.trim() === '') {
        alert('请输入搜索内容')
      } else {
        this.$commonjs.ajax({
          url: this.$commonjs.apiurl + '/searchNews.html',
          async: true,
          type: 'GET',
          data: {
            searchval: inputval.trim()
          },
          success: (data) => {
            let backdata = JSON.parse(data);
            if (backdata.data && backdata.data.length > 0) {
              _this.newsList = backdata.data
            } else {
              _this.shownoreulst = true;
            }
          },
          cache: true,
          error: (e) => {
            _this.shownoreulst = true;
          }
        });
        if (window.localStorage) {
          if (window.localStorage.getItem('serRecord')) {
            if (!window.localStorage.getItem('serRecord').split('&').includes(inputval.trim())) {
              window.localStorage.setItem('serRecord', window.localStorage.getItem('serRecord') + '&' + inputval.trim())
            }
          } else {
            window.localStorage.setItem('serRecord', inputval.trim())
          }
        }
        document.getElementById('search-input').value = ''
      }
    },
    clickNews (url) {
      location.href = url;
    }
  }
}
</script>

<style scoped>
.record-clear{
  text-align: left;
}
.record-close{
  position: absolute;
  right: 5px;
  top: 0;
  padding: 0 5px;
}
.record-bottom{
  position: relative;
  padding: 0 30px 0 20px; 
  color: #666;
  background: #f8f8f8;
  height: 36px;
  font-size: .14rem;
  line-height: 36px;
}
.news-iconarrow-up-left2{
  right: 10px;
  position: absolute;
  top: 9px;
  font-size: .22rem;
}
.search-header{
  text-align: center;
  height: 48px;
  line-height: 48px;
  background-color: #3e98f0;
  color: #fff;
  font-size: .18rem;
}
.search-header .news-iconarrow-left2{
  position: absolute;
  left: 10px;
  top: 14px;
  font-size: .2rem;
}
.search-page{
  position: fixed;
  top: 0;
  z-index: 12;
  width: 100%;
  background-color: white
}
.search-box{
  margin: 15px 17px 0;
  position: relative;
  height: 44px;
  border: 1px solid #ececec;
}
.record-box{
  position: absolute;
  top: 44px;
  width: 100%;
  border-right: 1px solid #e4e4e4;
  border-left: 1px solid #e4e4e4;
  background-color: white;
  z-index: 13
}
.record-item{
  padding-left: 20px;
  text-align: left;
  position: relative;
  height: 40px;  
  line-height: 40px;
  border-bottom: 1px solid #e0e0e0;
  padding-right: 50px;
}
.search-box button{
  position: absolute;
  right: 0;
  top: 0;
  background: #fcfcfc;
  height: 44px;
  line-height: 44px;
  padding: 0 15px;
  font-size: .16rem;
  text-align: center;
  box-sizing: border-box;
}
#search-input{
  height: 44px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
