<template>
  <div class="newslist">
    <tel-carousel
      :height = 'calImgheight'
      :width = 'calImgwidth'
      :isMobile = "true"
      :picNum = 'calNews.length'
    >
      <tel-carousel-item v-for="(item, index) in calNews" :key="index">
        <img :src='item.picurl'>
        <h3>{{ item.intext }}</h3>
      </tel-carousel-item>
    </tel-carousel>
    <div class="scroll-news-containers">
      <div class="hot-title">热点</div>
      <div class="scroll-content" 
           :style="{
             msTransform: translatescroll,
             webkitTransform: translatescroll,
             transform: translatescroll
           }">
        <div class="scroll-item" v-for="(item, index) in scrollNews">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import telcarousel from '@/components/public/carousel'
import telcarouselItem from '@/components/public/carouselItem'
export default{
  name: 'home',
  data () {
    return {
      newsList: [],
      calImgheight: Math.round(0.6 * window.innerWidth),
      calImgwidth: window.innerWidth,
      calNews: [],
      scrollNews: [],
      translatescroll: '',
      scrollIndex: 0,
      apiurl: location.href.indexOf('http://ty.qitouch.cn') > -1 ? 'http://ty.qitouch.cn:8081' : 'http://localhost:8081'
    }
  },
  mounted () {
    this.getCalnews()
  },
  methods: {
    getCalnews () {
      let _this = this
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          let backdata = JSON.parse(xmlhttp.response);
          _this.calNews = backdata.data;
          _this.scrollNews = backdata.scrollNews;
          if (_this.scrollNews.length > 0) {
            _this.scrollHotnews(_this.scrollNews.length)
          }
        }
      }
      xmlhttp.open('get', this.apiurl + '/getcalNews.html', true);
      xmlhttp.send(null);
    },
    scrollHotnews (len) {
      let _this = this
      setInterval(function () {
        if (_this.scrollIndex < len - 1) {
          _this.scrollIndex++
        } else {
          _this.scrollIndex = 0
        }
        _this.translatescroll = 'translateY(-0.' + 26 * (_this.scrollIndex) + 'rem)'
      }, 2000)
    }
  },

  components: {
    'tel-carousel': telcarousel,
    'tel-carousel-item': telcarouselItem
  }
}
</script>

<style scoped>
.newslist{
  margin-top: 89px
}
.hot-title{
  padding: 1px 2px;
  display: inline-block;
  background-color: #e02f2f;
  color: #fff;
  text-align: center;
  font-size: .14rem;
  margin-top: 2px;
  border-radius: 2px;
  position: absolute;
  left: 30px;
}
.scroll-news-containers{
  height: 24px;
  overflow-y: hidden; 
  margin-top: 10px;
  position: relative;
}
.scroll-item{
  font-size: .18rem;
}
.scroll-content{
  transition: 1s ease-out 0s;
  transform: translatey(-1px);
}
</style>
